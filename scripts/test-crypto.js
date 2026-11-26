/* 用 libsodium 官方测试向量验证 XSalsa20-Poly1305 与 BLAKE2b 实现
   向量来源：libsodium test/default/secretbox2.c 与 secretbox2.exp */
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'set-gh-secret.js'), 'utf8');
const body = src
  .replace(/^#![^\n]*\n/, '')
  .replace(/\nasync function main\(\)[\s\S]*$/, '\nmodule.exports = { hsalsa20, xsalsa20Xor, poly1305, blake2b, secretboxXSalsa20Poly1305 };\n');
const m = { exports: {} };
new Function('module', 'exports', 'require', body)(m, m.exports, require);
const { xsalsa20Xor, poly1305, blake2b, secretboxXSalsa20Poly1305 } = m.exports;

let pass = 0, fail = 0;
function check(name, got, exp) {
  if (got === exp) { console.log('PASS  ' + name); pass++; }
  else { console.log('FAIL  ' + name + '\n  got ' + got + '\n  exp ' + exp); fail++; }
}

/* ---- 1) libsodium secretbox2（NaCl 经典向量）----
   c[0..15] = 零；c[16..31] = MAC；c[32..162] = 密文（131 字节）
   明文取自 secretbox2.exp（m[32..162]，131 字节） */
const KEY = '1b27556473e985d462cd51197a9a46c76009549eac6474f206c4ee0844f68389';
const NONCE = '69696ee955b62b73cd62bda875fc73d68219e0036b7a0b37';
const MAC = 'f3ffc7703f9400e52a7dfb4b3d3305d9';
const CT = '8e993b9f48681273c29650ba32fc76ce48332ea7164d96a4476fb8c531a1186a' +
  'c0dfc17c98dce87b4da7f011ec48c97271d2c20f9b928fe2270d6fb863d51738b48eeee314' +
  'a7cc8ab932164548e526ae90224368517acfeabd6bb3732bc0e9da99832b61ca01b6de56244a' +
  '9e88d5f9b37973f622a43d14a6599b1f654cb45a74e355a5';
const PLAIN = 'be075fc53c81f2d5cf141316ebeb0c7b5228c52a4c62cbd44b66849b64244ffce5e' +
  'cbaaf33bd751a1ac728d45e6c61296cdc3c01233561f41db66cce314adb310e3be8250c46f0' +
  '6dceea3a7fa1348057e2f6556ad6b1318a024a838f21af1fde048977eb48f59ffd4924ca1c' +
  '60902e52f0a089bc76897040e082f937763848645e0705';

const key = Buffer.from(KEY, 'hex');
const nonce = Buffer.from(NONCE, 'hex');
const cipher = Buffer.from(CT, 'hex');
const plain = Buffer.from(PLAIN, 'hex');

const polyKey = xsalsa20Xor(key, nonce, 0n, Buffer.alloc(32));
check('Poly1305(secretbox2)', poly1305(polyKey, cipher).toString('hex'), MAC);
/* libsodium secretbox 采用 NaCl 的 ZEROBYTES 约定：
   密文从 keystream 偏移 32 处开始与明文异或（前 32 字节为 0 填充 + MAC） */
const ks = xsalsa20Xor(key, nonce, 0n, Buffer.alloc(32 + cipher.length));
check('XSalsa20 解密(secretbox2)',
  Buffer.from(cipher.map((b, i) => b ^ ks[32 + i])).toString('hex'),
  plain.toString('hex'));

/* ---- 1b) secretbox 加密方向：密文必须从 keystream 偏移 32 处异或 ---- */
const sb = secretboxXSalsa20Poly1305(plain, nonce, key);
check('secretbox 密文（偏移 32）', sb.cipher.toString('hex'), CT);
check('secretbox MAC', sb.mac.toString('hex'), MAC);

/* ---- 2) RFC 8439 §2.5.2 Poly1305 ---- */
const pKey = Buffer.from('85d6be7857556d337f4452fe42d506a80103808afb0db2fd4abff6af4149f51b', 'hex');
check('Poly1305(RFC 8439)',
  poly1305(pKey, Buffer.from('Cryptographic Forum Research Group', 'utf8')).toString('hex'),
  'a8061dc1305136c6c22b8baf0c0127a9');

/* ---- 3) BLAKE2b-512("abc")，RFC 7693 附录 ---- */
check('BLAKE2b-512("abc")', blake2b(Buffer.from('abc', 'utf8'), 64).toString('hex'),
  'ba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d1' +
  '7d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923');

/* ---- 4) BLAKE2b-256("")，官方已知值（校验可变输出长度处理） ---- */
check('BLAKE2b-256("")', blake2b(Buffer.alloc(0), 32).toString('hex'),
  '0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8');

console.log('\n通过 ' + pass + ' / 失败 ' + fail);
process.exit(fail ? 1 : 0);
