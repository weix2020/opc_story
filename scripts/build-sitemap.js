#!/usr/bin/env node
/**
 * 统一生成 site/sitemap.xml。
 *
 * 背景：此前 sitemap.xml 由各 sync 脚本增量拼接，lastmod 写的是「页面加入
 * 站点的那天」。110 个案例页是在两天内批量生成的，于是 84 个页面的 lastmod
 * 挤在同一个日期。对 Google 而言，这等于告诉它「这些页面自那天起就没变过」，
 * 抓取与重新评估的优先级都被压低——这正是长期「已发现但未编入索引」的
 * 一个成因。
 *
 * lastmod 的语义是「这个 URL 的内容何时实质变过」。三种取法都有问题：
 *   - 最近提交日：本项目多次改动只是统一页脚链接、更新 robots 之类��格式
 *     调整（每次仅动 1–2 行），据此前移会让 120 个页面集体显示成「刚刚更新」，
 *     反而是低质量信号；
 *   - 文件 mtime：CI 检出后一律是当前时间，同样造成「集体刚更新」；
 *   - git 历史回溯：actions/checkout 默认浅克隆（depth=1），CI 里无历史可用。
 *
 * 采用「正文指纹 + 变更日期」清单（site/data/page-meta.json）：
 * 指纹基于页面可见正文（剔除 script/style/head 与样板行），指纹不变说明
 * 内容实质未变，保留原变更日期；指纹变了才更新日期。该清单随仓库提交，
 * CI 与本地行为一致。
 *
 * 另统一末尾斜杠规则：目录型页面一律带斜杠（/all/、/privacy/…），
 * 与 Cloudflare Pages 对目录 index.html 的默认行为一致，避免
 * 「无斜杠 → 308 → 带斜杠」这类往返跳转被判定为「网页会重新定向」。
 *
 * 用法：node scripts/build-sitemap.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const OUT = path.join(SITE, 'sitemap.xml');
const META_FILE = path.join(SITE, 'data', 'page-meta.json');
const SITE_URL = 'https://opc-story.top';

/* 页面类型 → changefreq / priority */
const RULES = [
  { match: function (p) { return p === 'index.html'; }, cf: 'daily', pr: '1.0' },
  { match: function (p) { return /^report\/[^/]+\/index\.html$/.test(p); }, cf: 'weekly', pr: '0.8' },
  { match: function (p) { return p === 'insights/index.html'; }, cf: 'daily', pr: '0.9' },
  { match: function (p) { return p === 'all/index.html'; }, cf: 'weekly', pr: '0.9' },
  { match: function (p) { return /^(what-is-opc|method|data-notes)\/index\.html$/.test(p); }, cf: 'monthly', pr: '0.8' },
  { match: function (p) { return p === 'push-status/index.html'; }, cf: 'daily', pr: '0.4' },
  { match: function (p) { return /^(privacy|about|contact)\/index\.html$/.test(p); }, cf: 'yearly', pr: '0.5' },
];

function walk(dir, out) {
  out = out || [];
  fs.readdirSync(dir).forEach(function (name) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name.startsWith('.')) return;
      walk(p, out);
    } else if (name === 'index.html') {
      out.push(path.relative(SITE, p));
    }
  });
  return out;
}

/* URL 由文件路径推导：目录型一律带末尾斜杠 */
function urlOf(rel) {
  if (rel === 'index.html') return SITE_URL + '/';
  const dir = rel.replace(/index\.html$/, '');
  return SITE_URL + '/' + dir;
}

/* 剔除与内容无关的部分，得到「正文指纹」 */
function contentFingerprint(rel) {
  let h = fs.readFileSync(path.join(SITE, rel), 'utf8');
  h = h.replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<head[\s\S]*?<\/head>/g, '');
  /* 去掉纯链接行与版权行——每页都有的样板，变化不代表内容更新 */
  h = h.split('\n').filter(function (line) {
    const t = line.trim();
    if (!t) return false;
    if (/^<a\s/.test(t)) return false;
    if (/版权|Copyright|©/.test(t)) return false;
    return true;
  }).join('\n');
  return crypto.createHash('sha1').update(h).digest('hex').slice(0, 16);
}

function loadMeta() {
  try {
    const j = JSON.parse(fs.readFileSync(META_FILE, 'utf8'));
    return j && j.pages ? j.pages : {};
  } catch (e) {
    return {};
  }
}

function saveMeta(meta) {
  fs.mkdirSync(path.dirname(META_FILE), { recursive: true });
  const body = { meta: { generated_at: new Date().toISOString().slice(0, 10) }, pages: meta };
  fs.writeFileSync(META_FILE, JSON.stringify(body, null, 2) + '\n');
}

function ruleOf(rel) {
  for (const r of RULES) {
    if (r.match(rel)) return r;
  }
  return { cf: 'monthly', pr: '0.6' };
}

function main() {
  const files = walk(SITE).sort();
  const meta = loadMeta();
  const today = new Date().toISOString().slice(0, 10);
  let changed = 0;

  const entries = files.map(function (rel) {
    const fp = contentFingerprint(rel);
    const prev = meta[rel];
    let lastmod;
    if (prev && prev.fingerprint === fp) {
      lastmod = prev.lastmod;
    } else {
      /* 内容变了 → 记为新的变更日期 */
      lastmod = today;
      meta[rel] = { fingerprint: fp, lastmod: lastmod };
      changed++;
    }
    const r = ruleOf(rel);
    return '  <url><loc>' + urlOf(rel) + '</loc><lastmod>' + lastmod +
      '</lastmod><changefreq>' + r.cf + '</changefreq><priority>' + r.pr + '</priority></url>';
  });

  /* 清理已删除页面的记录 */
  Object.keys(meta).forEach(function (k) {
    if (files.indexOf(k) < 0) delete meta[k];
  });

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries.join('\n') + '\n</urlset>\n';

  const before = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  fs.writeFileSync(OUT, xml);
  saveMeta(meta);

  const lm = {};
  entries.forEach(function (e) {
    const m = e.match(/<lastmod>([^<]+)<\/lastmod>/);
    if (m) lm[m[1]] = (lm[m[1]] || 0) + 1;
  });
  console.log('已生成 site/sitemap.xml：' + entries.length + ' 个 URL');
  console.log('lastmod 分布：' + JSON.stringify(lm));
  console.log('内容实质变更的页面：' + changed + ' 个');
  console.log(before !== xml ? '（内容有变化，已更新）' : '（内容无变化）');
}

main();
