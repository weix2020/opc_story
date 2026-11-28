#!/usr/bin/env node
/**
 * 把「百度收录进度」页面接入全站各入口。
 *
 * 接入点：
 *   - site/sitemap.xml        收录新页面
 *   - site/llms.txt           顶部索引加入新页面
 *   - site/llms-full.txt      顶部索引加入新页面
 *   - site/index.html         侧边指南导航 + 页脚
 *   - site/all/index.html    页脚
 *   - site/report 各报告页页脚
 *
 * 幂等：重复运行不会重复插入。
 *
 * 用法：node scripts/sync-push-status-page.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const REPORT_DIR = path.join(SITE, 'report');

const PAGE_PATH = '/push-status/';
const PAGE_URL = 'https://opc-story.top' + PAGE_PATH;
const LASTMOD = '2026-11-27';

/* ---------- 1. sitemap.xml ---------- */
{
  const f = path.join(SITE, 'sitemap.xml');
  let h = fs.readFileSync(f, 'utf8');
  if (h.indexOf(PAGE_URL) < 0) {
    const entry = '  <url><loc>' + PAGE_URL + '</loc><lastmod>' + LASTMOD +
      '</lastmod><changefreq>daily</changefreq><priority>0.4</priority></url>\n';
    h = h.replace('</urlset>', entry + '</urlset>');
    fs.writeFileSync(f, h);
    console.log('sitemap.xml：已收录 ' + PAGE_URL);
  } else {
    console.log('sitemap.xml：已收录，跳过');
  }
}

/* ---------- 2. llms.txt / llms-full.txt ---------- */
{
  /* llms.txt：在「方法论」块之前插入条目 */
  const f = path.join(SITE, 'llms.txt');
  if (fs.existsSync(f)) {
    let h = fs.readFileSync(f, 'utf8');
    /* 清理此前格式异常的插入 */
    h = h.replace(/^> > - 百度收录进度.*\n/m, '');
    if (h.indexOf(PAGE_URL) < 0) {
      const line = '> - 百度收录进度（主动推送状态、每日配额与预计完成时间）：' + PAGE_URL + '\n';
      h = h.replace('> 方法论（建议优先阅读）：', line + '> 方法论（建议优先阅读）：');
      fs.writeFileSync(f, h);
      console.log('llms.txt：已加入索引');
    } else {
      console.log('llms.txt：已存在，跳过');
    }
  }

  /* llms-full.txt：在「站点其他页面」一行追加 */
  const f2 = path.join(SITE, 'llms-full.txt');
  if (fs.existsSync(f2)) {
    let h = fs.readFileSync(f2, 'utf8');
    if (h.indexOf(PAGE_URL) < 0) {
      h = h.replace(
        /^(> 站点其他页面：.*)$/m,
        '$1 ｜ 收录进度 ' + PAGE_URL
      );
      fs.writeFileSync(f2, h);
      console.log('llms-full.txt：已加入索引');
    } else {
      console.log('llms-full.txt：已存在，跳过');
    }
  }
}

/* ---------- 3. index.html 侧边导航 + 页脚 ---------- */
{
  const f = path.join(SITE, 'index.html');
  let h = fs.readFileSync(f, 'utf8');

  /* 侧边指南导航：加入「收录进度」 */
  if (h.indexOf('<b>GUIDE 05</b>收录进度') < 0) {
    h = h.replace(
      /(<nav class="side-guides" aria-label="指南">[\s\S]*?)(<\/nav>)/,
      '$1\n  <a href="push-status/"><b>GUIDE 05</b>收录进度</a>$2'
    );
    console.log('index.html：侧边导航已加入「收录进度」');
  }

  /* 页脚链接：先清理格式异常的旧插入，再按正确格式插入 */
  h = h.replace(/\n[ \t]*\n([ \t]*)<a href="push-status\/">收录进度<\/a><\/div>/, '\n$1<a href="push-status/">收录进度</a>\n    </div>');
  if (h.indexOf('<a href="push-status/">收录进度</a>') < 0) {
    h = h.replace(
      /(<div class="sf-links">[\s\S]*?)(<\/div>)/,
      '$1\n      <a href="push-status/">收录进度</a>$2'
    );
    console.log('index.html：页脚已加入「收录进度」');
  }

  fs.writeFileSync(f, h);
}

/* ---------- 4. all.html 与报告页页脚 ---------- */
{
  const targets = [];
  const allFile = path.join(SITE, 'all', 'index.html');
  if (fs.existsSync(allFile)) targets.push({ f: allFile, rel: '/push-status/' });

  if (fs.existsSync(REPORT_DIR)) {
    fs.readdirSync(REPORT_DIR).forEach(function (d) {
      const p = path.join(REPORT_DIR, d, 'index.html');
      if (fs.existsSync(p)) targets.push({ f: p, rel: '../../push-status/' });
    });
  }

  let n = 0;
  targets.forEach(function (t) {
    let h = fs.readFileSync(t.f, 'utf8');
    if (h.indexOf('href="' + t.rel + '"') >= 0) return;
    /* 在页脚第一个链接之后追加，避免破坏原有的分隔符结构 */
    const re = /(<footer[^>]*>[\s\S]*?<a href="[^"]*">[^<]*<\/a>)/;
    if (!re.test(h)) return;
    h = h.replace(re, '$1 · <a href="' + t.rel + '">收录进度</a>');
    fs.writeFileSync(t.f, h);
    n++;
  });
  console.log('页脚：已为 ' + n + ' 个页面加入「收录进度」链接');
}
