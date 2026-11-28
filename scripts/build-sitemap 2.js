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
 * 改为按页面文件的真实最后修改时间生成 lastmod：内容一改，时间就变，
 * Google 会据此重新抓取。
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

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const OUT = path.join(SITE, 'sitemap.xml');
const SITE_URL = 'https://opc-story.top';

/* 页面类型 → changefreq / priority */
const RULES = [
  /* 首页 */
  { match: function (p) { return p === 'index.html'; }, cf: 'daily', pr: '1.0' },
  /* 案例报告页 */
  { match: function (p) { return /^report\/[^/]+\/index\.html$/.test(p); }, cf: 'weekly', pr: '0.8' },
  /* 数据页 */
  { match: function (p) { return p === 'insights/index.html'; }, cf: 'daily', pr: '0.9' },
  /* 全部案例索引 */
  { match: function (p) { return p === 'all/index.html'; }, cf: 'weekly', pr: '0.9' },
  /* 长青说明页 */
  { match: function (p) { return /^(what-is-opc|method|data-notes)\/index\.html$/.test(p); }, cf: 'monthly', pr: '0.8' },
  /* 收录进度页 */
  { match: function (p) { return p === 'push-status/index.html'; }, cf: 'daily', pr: '0.4' },
  /* 合规页 */
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

/**
 * 取页面内容真实最后修改日期。
 *
 * 语义是「这个 URL 的内容何时实质变过」，用于告诉 Google 该重新抓取。
 * 不能简单取最近提交日：本项目多次改动只是统一页脚链接、更新 robots 之类
 * 的格式调整（每次仅动 1–2 行），若据此把 lastmod 前移，120 个页面会集体
 * 显示成「刚刚更新」，反而是低质量信号。
 *
 * 做法：回溯 git 历史，取最近一次「改动行数达到阈值」的提交日期；
 * 阈值以下的改动视为格式性调整，不反映内容更新。
 */
const SUBSTANTIVE_LINES = 5;

function lastmodOf(rel) {
  const f = path.join(SITE, rel);
  const relPath = path.relative(ROOT, f);
  try {
    const cp = require('child_process');
    /* 逐次提交回溯，取最近一次实质改动 */
    const log = cp.execFileSync(
      'git', ['log', '--format=%H', '--numstat', '--', relPath],
      { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 8 * 1024 * 1024 }
    );
    let sha = null;
    const commits = [];
    log.split('\n').forEach(function (line) {
      const m = line.match(/^([0-9a-f]{40})$/);
      if (m) { sha = m[1]; commits.push({ sha: sha }); return; }
      const ns = line.match(/^(\d+|-)\t(\d+|-)\t(.+)$/);
      if (ns && commits.length) {
        const a = ns[1] === '-' ? 0 : parseInt(ns[1], 10);
        const d = ns[2] === '-' ? 0 : parseInt(ns[2], 10);
        commits[commits.length - 1].changed = (commits[commits.length - 1].changed || 0) + a + d;
      }
    });
    for (const c of commits) {
      if ((c.changed || 0) >= SUBSTANTIVE_LINES) {
        const date = cp.execFileSync(
          'git', ['show', '-s', '--format=%cs', c.sha],
          { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
        ).trim();
        if (date) return date;
      }
    }
    /* 无实质改动则用最早的提交日期（即页面首次成形时间） */
    if (commits.length) {
      const date = cp.execFileSync(
        'git', ['show', '-s', '--format=%cs', commits[commits.length - 1].sha],
        { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
      ).trim();
      if (date) return date;
    }
  } catch (e) { /* 未纳入 git 时退回 mtime */ }
  return fs.statSync(f).mtime.toISOString().slice(0, 10);
}

function ruleOf(rel) {
  for (const r of RULES) {
    if (r.match(rel)) return r;
  }
  return { cf: 'monthly', pr: '0.6' };
}

function main() {
  const files = walk(SITE).sort();

  const entries = files.map(function (rel) {
    const r = ruleOf(rel);
    return '  <url><loc>' + urlOf(rel) + '</loc><lastmod>' + lastmodOf(rel) +
      '</lastmod><changefreq>' + r.cf + '</changefreq><priority>' + r.pr + '</priority></url>';
  });

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries.join('\n') + '\n</urlset>\n';

  const before = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  fs.writeFileSync(OUT, xml);

  const lm = {};
  entries.forEach(function (e) {
    const m = e.match(/<lastmod>([^<]+)<\/lastmod>/);
    if (m) lm[m[1]] = (lm[m[1]] || 0) + 1;
  });
  console.log('已生成 site/sitemap.xml：' + entries.length + ' 个 URL');
  console.log('lastmod 分布：' + JSON.stringify(lm));
  if (before !== xml) {
    console.log('（内容有变化，已更新）');
  } else {
    console.log('（内容无变化）');
  }
}

main();
