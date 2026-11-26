#!/usr/bin/env node
/**
 * 用 GitHub Actions Secrets API 写入加密 Secret。
 *
 * GitHub 要求 libsodium sealed box（crypto_box_seal）加密。libsodium 中
 * crypto_box 默认绑定 curve25519xsalsa20poly1305，故格式为：
 *   sealed = epk(32) || mac(16) || ciphertext(len)
 *   nonce  = BLAKE2b-24(epk || recipient_pk)
 *   k      = HSalsa20(X25519(esk, recipient_pk), zero_nonce)
 *   密文    = crypto_secretbox_xsalsa20poly1305(msg, nonce, k)
 *           其中 polyKey = XSalsa20(k, nonce, counter=0)[0:32]
 *                mac     = Poly1305(polyKey, ciphertext)
 *
 * Node 内置 crypto 提供 X25519；BLAKE2b / HSalsa20 / Salsa20 / Poly1305
 * 在此用纯 JS 实现，算法对齐 libsodium 源码：
 *   src/libsodium/crypto_box/crypto_box_seal.c
 *   src/libsodium/crypto_box/curve25519xsalsa20poly1305/box_curve25519xsalsa20poly1305.c
 *   src/libsodium/crypto_secretbox/xsalsa20poly1305/secretbox_xsalsa20poly1305.c
 *   src/libsodium/crypto_core/hsalsa20/ref2/core_hsalsa20_ref2.c
 *
 * 用法：node scripts/set-gh-secret.js <SECRET_NAME> <value>
 */
'use strict';

const crypto = require('crypto');
const https = require('https');
const { execFileSync } = require('child_process');

const REPO = process.env.GH_REPO || 'weix2020/opc_story';
const API = 'https://api.github.com';

/* ================= GitHub API ================= */
function ghToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync('security', ['find-internet-password', '-s', 'github.com', '-w'], {
      encoding: 'utf8',
    }).trim();
  } catch (e) {
    throw new Error('未找到 GitHub 凭据，请设置 GITHUB_TOKEN 环境变量');
  }
}

function api(pathname, method, body, token) {
  return new Promise(function (resolve, reject) {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request(
      API + pathname,
      {
        method: method,
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'opc-story-seo-script',
          'Content-Type': 'application/json',
          'Content-Length': data ? Buffer.byteLength(data) : 0,
        },
        timeout: 30000,
      },
      function (res) {
        let out = '';
        res.on('data', function (c) { out += c; });
        res.on('end', function () {
          let j = null;
          try { j = JSON.parse(out); } catch (e) { j = out; }
          if (res.statusCode >= 200 && res.statusCode < 300) resolve(j);
          else reject(new Error('HTTP ' + res.statusCode + ': ' + (j && j.message ? j.message : out)));
        });
      }
    );
    req.on('timeout', function () { req.destroy(new Error('请求超时')); });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

/* ================= BLAKE2b（可变输出长度） ================= */
const BLAKE2B_IV = [
  0x6a09e667f3bcc908n, 0xbb67ae8584caa73bn, 0x3c6ef372fe94f82bn, 0xa54ff53a5f1d36f1n,
  0x510e527fade682d1n, 0x9b05688c2b3e6c1fn, 0x1f83d9abfb41bd6bn, 0x5be0cd19137e2179n,
];
const SIGMA = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
  [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
  [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
  [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
  [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
  [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11],
  [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
  [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5],
  [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0],
];
const MASK64 = (1n << 64n) - 1n;

function rotr64(x, n) { return ((x >> n) | (x << (64n - n))) & MASK64; }

function blake2bCompress(h, block, t, last) {
  const v = new Array(16);
  for (let i = 0; i < 8; i++) v[i] = h[i];
  for (let i = 0; i < 8; i++) v[8 + i] = BLAKE2B_IV[i];
  v[12] ^= t & MASK64;
  v[13] ^= (t >> 64n) & MASK64;
  if (last) v[14] = ~v[14] & MASK64;

  const m = new Array(16);
  for (let i = 0; i < 16; i++) m[i] = block.readBigUInt64LE(i * 8);

  const G = function (a, b, c, d, x, y) {
    v[a] = (v[a] + v[b] + x) & MASK64;
    v[d] = rotr64(v[d] ^ v[a], 32n);
    v[c] = (v[c] + v[d]) & MASK64;
    v[b] = rotr64(v[b] ^ v[c], 24n);
    v[a] = (v[a] + v[b] + y) & MASK64;
    v[d] = rotr64(v[d] ^ v[a], 16n);
    v[c] = (v[c] + v[d]) & MASK64;
    v[b] = rotr64(v[b] ^ v[c], 63n);
  };

  for (let r = 0; r < 12; r++) {
    const s = SIGMA[r % 10];
    G(0, 4, 8, 12, m[s[0]], m[s[1]]);
    G(1, 5, 9, 13, m[s[2]], m[s[3]]);
    G(2, 6, 10, 14, m[s[4]], m[s[5]]);
    G(3, 7, 11, 15, m[s[6]], m[s[7]]);
    G(0, 5, 10, 15, m[s[8]], m[s[9]]);
    G(1, 6, 11, 12, m[s[10]], m[s[11]]);
    G(2, 7, 8, 13, m[s[12]], m[s[13]]);
    G(3, 4, 9, 14, m[s[14]], m[s[15]]);
  }
  for (let i = 0; i < 8; i++) h[i] = h[i] ^ v[i] ^ v[8 + i];
}

/** BLAKE2b 摘要（无 key），outlen 字节 */
function blake2b(input, outlen) {
  const h = BLAKE2B_IV.slice();
  h[0] ^= 0x01010000n ^ BigInt(outlen);

  let off = 0;
  while (input.length - off > 128) off += 128;
  const lastBlock = Buffer.alloc(128);
  input.copy(lastBlock, 0, off, input.length);
  const t = BigInt(input.length - off);
  blake2bCompress(h, lastBlock, t, true);

  const out = Buffer.alloc(outlen);
  for (let i = 0; i < outlen; i++) {
    const word = h[i >> 3];
    out[i] = Number((word >> BigInt(8 * (i & 7))) & 0xffn);
  }
  return out;
}

/* ================= Salsa20 / HSalsa20 ================= */
/* 严格按 libsodium 的置换状态布局与「先加后旋转」四分之一轮实现：
   src/libsodium/crypto_core/salsa/ref/core_salsa_ref.c
   src/libsodium/crypto_core/hsalsa20/ref2/core_hsalsa20_ref2.c */
function rotl32(v, n) { return ((v << n) | (v >>> (32 - n))) >>> 0; }

/** 20 轮（10 次双轮）Salsa20 核心，返回 16 个 u32 */
function salsaCore(x) {
  for (let i = 0; i < 10; i++) {
    /* columnround */
    x[4] ^= rotl32((x[0] + x[12]) >>> 0, 7);
    x[8] ^= rotl32((x[4] + x[0]) >>> 0, 9);
    x[12] ^= rotl32((x[8] + x[4]) >>> 0, 13);
    x[0] ^= rotl32((x[12] + x[8]) >>> 0, 18);
    x[9] ^= rotl32((x[5] + x[1]) >>> 0, 7);
    x[13] ^= rotl32((x[9] + x[5]) >>> 0, 9);
    x[1] ^= rotl32((x[13] + x[9]) >>> 0, 13);
    x[5] ^= rotl32((x[1] + x[13]) >>> 0, 18);
    x[14] ^= rotl32((x[10] + x[6]) >>> 0, 7);
    x[2] ^= rotl32((x[14] + x[10]) >>> 0, 9);
    x[6] ^= rotl32((x[2] + x[14]) >>> 0, 13);
    x[10] ^= rotl32((x[6] + x[2]) >>> 0, 18);
    x[3] ^= rotl32((x[15] + x[11]) >>> 0, 7);
    x[7] ^= rotl32((x[3] + x[15]) >>> 0, 9);
    x[11] ^= rotl32((x[7] + x[3]) >>> 0, 13);
    x[15] ^= rotl32((x[11] + x[7]) >>> 0, 18);
    /* rowround */
    x[1] ^= rotl32((x[0] + x[3]) >>> 0, 7);
    x[2] ^= rotl32((x[1] + x[0]) >>> 0, 9);
    x[3] ^= rotl32((x[2] + x[1]) >>> 0, 13);
    x[0] ^= rotl32((x[3] + x[2]) >>> 0, 18);
    x[6] ^= rotl32((x[5] + x[4]) >>> 0, 7);
    x[7] ^= rotl32((x[6] + x[5]) >>> 0, 9);
    x[4] ^= rotl32((x[7] + x[6]) >>> 0, 13);
    x[5] ^= rotl32((x[4] + x[7]) >>> 0, 18);
    x[11] ^= rotl32((x[10] + x[9]) >>> 0, 7);
    x[8] ^= rotl32((x[11] + x[10]) >>> 0, 9);
    x[9] ^= rotl32((x[8] + x[11]) >>> 0, 13);
    x[10] ^= rotl32((x[9] + x[8]) >>> 0, 18);
    x[12] ^= rotl32((x[15] + x[14]) >>> 0, 7);
    x[13] ^= rotl32((x[12] + x[15]) >>> 0, 9);
    x[14] ^= rotl32((x[13] + x[12]) >>> 0, 13);
    x[15] ^= rotl32((x[14] + x[13]) >>> 0, 18);
  }
  return x;
}

/** 构造 libsodium 置换布局的 16 词初始状态 */
function salsaInitState(key32, in16) {
  const x = new Uint32Array(16);
  x[0] = 0x61707865; x[5] = 0x3320646e; x[10] = 0x79622d32; x[15] = 0x6b206574;
  x[1] = key32.readUInt32LE(0);
  x[2] = key32.readUInt32LE(4);
  x[3] = key32.readUInt32LE(8);
  x[4] = key32.readUInt32LE(12);
  x[11] = key32.readUInt32LE(16);
  x[12] = key32.readUInt32LE(20);
  x[13] = key32.readUInt32LE(24);
  x[14] = key32.readUInt32LE(28);
  x[6] = in16.readUInt32LE(0);
  x[7] = in16.readUInt32LE(4);
  x[8] = in16.readUInt32LE(8);
  x[9] = in16.readUInt32LE(12);
  return x;
}

/**
 * Salsa20 keystream。
 * libsodium crypto_stream_salsa20 传入的 16 字节为 nonce(8) || counter(8)，
 * core 按 x6=in[0..3], x7=in[4..7], x8=in[8..11], x9=in[12..15] 映射。
 */
function salsa20Keystream(key32, nonce8, counter, length) {
  const out = Buffer.alloc(length);
  const block = Buffer.alloc(64);
  let pos = 0;
  let ctr = counter;
  const in16 = Buffer.alloc(16);
  while (pos < length) {
    in16.writeUInt32LE(nonce8.readUInt32LE(0), 0);
    in16.writeUInt32LE(nonce8.readUInt32LE(4), 4);
    in16.writeUInt32LE(Number(ctr & 0xffffffffn), 8);
    in16.writeUInt32LE(Number((ctr >> 32n) & 0xffffffffn), 12);

    const x = salsaInitState(key32, in16);
    const j = new Uint32Array(x);
    salsaCore(x);
    for (let i = 0; i < 16; i++) block.writeUInt32LE((x[i] + j[i]) >>> 0, i * 4);

    const n = Math.min(64, length - pos);
    for (let i = 0; i < n; i++) out[pos + i] = block[i];
    pos += n;
    ctr += 1n;
  }
  return out;
}

/**
 * HSalsa20（libsodium crypto_core_hsalsa20）
 * 输入 16 字节，key 32 字节 → 输出 32 字节
 * 输出顺序：x0, x5, x10, x15, x6, x7, x8, x9（不加回初始状态）
 */
function hsalsa20(input16, key32) {
  const x = salsaInitState(key32, input16);
  salsaCore(x);
  const out = Buffer.alloc(32);
  const pick = [x[0], x[5], x[10], x[15], x[6], x[7], x[8], x[9]];
  for (let i = 0; i < 8; i++) out.writeUInt32LE(pick[i], i * 4);
  return out;
}

/** XSalsa20：subkey = HSalsa20(key, nonce[0:16])，再用 Salsa20 流加密 */
function xsalsa20Xor(key32, nonce24, counter, data) {
  const subkey = hsalsa20(nonce24.subarray(0, 16), key32);
  const ks = salsa20Keystream(subkey, nonce24.subarray(16, 24), counter, data.length);
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) out[i] = data[i] ^ ks[i];
  return out;
}

/* ================= Poly1305 ================= */
function poly1305(key32, msg) {
  const P = (1n << 130n) - 5n;
  let r = 0n;
  for (let i = 15; i >= 0; i--) r = (r << 8n) | BigInt(key32[i]);
  r &= 0x0ffffffc0ffffffc0ffffffc0fffffffn;
  let s = 0n;
  for (let i = 31; i >= 16; i--) s = (s << 8n) | BigInt(key32[i]);

  let acc = 0n;
  for (let off = 0; off < msg.length; off += 16) {
    const chunk = msg.subarray(off, Math.min(off + 16, msg.length));
    let n = 0n;
    for (let i = chunk.length - 1; i >= 0; i--) n = (n << 8n) | BigInt(chunk[i]);
    n |= 1n << BigInt(8 * chunk.length);
    acc = ((acc + n) * r) % P;
  }
  acc = (acc + s) & ((1n << 128n) - 1n);
  const out = Buffer.alloc(16);
  let t = acc;
  for (let i = 0; i < 16; i++) { out[i] = Number(t & 0xffn); t >>= 8n; }
  return out;
}

/**
 * crypto_secretbox_xsalsa20poly1305（detached 形式）
 * libsodium 的实现约定：
 *   crypto_stream_xsalsa20_xor(c, m, mlen, n, k)   → c[j] = m[j] ⊕ keystream[j]
 *   crypto_onetimeauth_poly1305(c + 16, c + 32, mlen - 32, c)
 * 因 NaCl 约定下 m[0..31] 为零，故：
 *   polyKey = keystream[0:32]
 *   cipher  = m ⊕ keystream[32:32+len]   ← 密文从偏移 32 处开始异或
 *   mac     = Poly1305(polyKey, cipher)
 */
function secretboxXSalsa20Poly1305(msg, nonce24, key32) {
  const ks = xsalsa20Xor(key32, nonce24, 0n, Buffer.alloc(32 + msg.length));
  const polyKey = ks.subarray(0, 32);
  const cipher = Buffer.alloc(msg.length);
  for (let i = 0; i < msg.length; i++) cipher[i] = msg[i] ^ ks[32 + i];
  const mac = poly1305(polyKey, cipher);
  return { mac: mac, cipher: cipher };
}

/* ================= X25519（Node 原生） ================= */
function x25519Raw(privRaw, pubRaw) {
  const privDer = Buffer.concat([
    Buffer.from('302e020100300506032b656e04220420', 'hex'), privRaw,
  ]);
  const privKey = crypto.createPrivateKey({ key: privDer, format: 'der', type: 'pkcs8' });
  const pubDer = Buffer.concat([
    Buffer.from('302a300506032b656e032100', 'hex'), pubRaw,
  ]);
  const pubKey = crypto.createPublicKey({ key: pubDer, format: 'der', type: 'spki' });
  return crypto.diffieHellman({ privateKey: privKey, publicKey: pubKey });
}

/* ================= crypto_box_seal ================= */
function cryptoBoxSeal(recipientPk, plaintext) {
  const eph = crypto.generateKeyPairSync('x25519');
  const ephPrivDer = eph.privateKey.export({ format: 'der', type: 'pkcs8' });
  const esk = ephPrivDer.subarray(ephPrivDer.length - 32);
  const ephPubDer = eph.publicKey.export({ format: 'der', type: 'spki' });
  const epk = ephPubDer.subarray(ephPubDer.length - 32);

  /* nonce = BLAKE2b-24(epk || recipient_pk) */
  const nonce = blake2b(Buffer.concat([epk, recipientPk]), 24);

  /* k = HSalsa20(shared, zero_nonce) */
  const shared = x25519Raw(esk, recipientPk);
  const k = hsalsa20(Buffer.alloc(16), shared);

  const { mac, cipher } = secretboxXSalsa20Poly1305(plaintext, nonce, k);
  return Buffer.concat([epk, mac, cipher]);
}

/* ================= 主流程 ================= */
async function main() {
  const name = process.argv[2];
  const value = process.argv[3];
  if (!name || !value) {
    console.log('用法：node scripts/set-gh-secret.js <SECRET_NAME> <value>');
    process.exit(1);
  }
  const token = ghToken();
  const pk = await api('/repos/' + REPO + '/actions/secrets/public-key', 'GET', null, token);
  console.log('仓库公钥 key_id：' + pk.key_id);

  const recipientPk = Buffer.from(pk.key, 'base64');
  if (recipientPk.length !== 32) {
    throw new Error('公钥长度异常：' + recipientPk.length + '（应为 32）');
  }

  const sealed = cryptoBoxSeal(recipientPk, Buffer.from(value, 'utf8'));
  console.log('密文长度：' + sealed.length + ' 字节（epk 32 + mac 16 + 密文 ' + (sealed.length - 48) + '）');

  const body = { encrypted_value: sealed.toString('base64'), key_id: pk.key_id };
  const res = await api('/repos/' + REPO + '/actions/secrets/' + name, 'PUT', body, token);
  console.log('✓ Secret 已写入：' + name + '（' + (res && res.state ? res.state : 'ok') + '）');
}

main().catch(function (e) {
  console.error('失败：' + e.message);
  process.exit(1);
});
