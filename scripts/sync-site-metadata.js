#!/usr/bin/env node
/**
 * 同步全站元数据口径到当前案例数：
 *   - all.html：meta/og description、JSON-LD ItemList（numberOfItems + 新增案例）
 *   - method / what-is-opc / data-notes 三个长青页：计数、平均信源数、核验分布、更新时间
 *   - llms.txt：信源台账条数
 *
 * 用法：node scripts/sync-site-metadata.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const TODAY = '2026-11-24';

const casesData = JSON.parse(fs.readFileSync(path.join(SITE, 'data/cases.json'), 'utf8'));
const biData = JSON.parse(fs.readFileSync(path.join(SITE, 'data/bi.json'), 'utf8'));
const srcData = JSON.parse(fs.readFileSync(path.join(SITE, 'data/sources.json'), 'utf8'));
const cases = casesData.cases;
const TOTAL = cases.length;

/* 统计 */
const verifyCount = {};
cases.forEach(function (c) { verifyCount[c.verification] = (verifyCount[c.verification] || 0) + 1; });
const withRev = biData.cases.filter(function (c) { return c.revenue != null; });
const withUsers = biData.cases.filter(function (c) { return c.users != null; }).length;
const avgSrc = (cases.reduce(function (s, c) { return s + c.source_count; }, 0) / TOTAL).toFixed(1);
const minSrc = Math.min.apply(null, cases.map(function (c) { return c.source_count; }));
const revSorted = withRev.map(function (c) { return c.revenue; }).sort(function (a, b) { return a - b; });
const median = revSorted.length
  ? (revSorted.length % 2
    ? revSorted[(revSorted.length - 1) / 2]
    : Math.round((revSorted[revSorted.length / 2 - 1] + revSorted[revSorted.length / 2]) / 2))
  : null;
const maxRev = revSorted.length ? revSorted[revSorted.length - 1] : null;
const minRev = revSorted.length ? revSorted[0] : null;

function wan(v) {
  if (v == null) return '—';
  const w = v / 10000;
  return (w >= 100 ? Math.round(w) : Math.round(w * 10) / 10) + ' 万元';
}

/* ============ all.html ============ */
{
  const f = path.join(SITE, 'all', 'index.html');
  let h = fs.readFileSync(f, 'utf8');

  h = h.replace(/收录 100 个中国 AI 一人公司案例/g, '收录 ' + TOTAL + ' 个中国 AI 一人公司案例');
  h = h.replace(/按五个赛道收录 100 个中国 AI 一人公司案例/g, '按五个赛道收录 ' + TOTAL + ' 个中国 AI 一人公司案例');

  /* JSON-LD ItemList：用 cases.json 全量重建 */
  const MARK = '"@type":"ItemList","numberOfItems":';
  const mk = h.indexOf(MARK);
  if (mk < 0) throw new Error('all.html 未找到 ItemList');
  const arrStart = h.indexOf('[', mk + MARK.length);
  let depth = 0, arrEnd = -1;
  for (let i = arrStart; i < h.length; i++) {
    if (h[i] === '[') depth++;
    else if (h[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
  }
  /* 原有顺序保留（按 all.html 里的旧顺序），新的 10 条按 cases.json 顺序追加 */
  const oldItems = JSON.parse(h.slice(arrStart, arrEnd + 1));
  const oldUrls = oldItems.map(function (x) { return x.url; });
  const byUrl = {};
  cases.forEach(function (c) { byUrl[c.url] = c; });
  const merged = [];
  oldUrls.forEach(function (u) { if (byUrl[u]) merged.push(byUrl[u]); });
  /* 追加旧列表里没有的（按 cases.json 顺序） */
  cases.forEach(function (c) { if (oldUrls.indexOf(c.url) < 0) merged.push(c); });

  const items = merged.map(function (c, i) {
    return '{"@type":"ListItem","position":' + (i + 1) + ',"name":' + JSON.stringify(c.name) + ',"url":"' + c.url + '"}';
  }).join(',');
  const newList = '"@type":"ItemList","numberOfItems":' + merged.length + ',"itemListElement":[' + items + ']';
  h = h.slice(0, mk) + newList + h.slice(arrEnd + 1);

  fs.writeFileSync(f, h);
  console.log('all.html：description 与 ItemList 已更新为 ' + merged.length + ' 条');
}

/* ============ 长青页 ============ */
const PAGES = [
  {
    file: 'method/index.html',
    subs: [
      [/100 个案例平均 11\.8 条信源，最少 4 条/g, TOTAL + ' 个案例平均 ' + avgSrc + ' 条信源，最少 ' + minSrc + ' 条'],
      [/当前 100 个案例的分布是：verified 23 例、cross 54 例、partial 23 例/g,
        '当前 ' + TOTAL + ' 个案例的分布是：verified ' + (verifyCount.verified || 0) + ' 例、cross ' + (verifyCount.cross || 0) + ' 例、partial ' + (verifyCount.partial || 0) + ' 例。'],
      [/全部 100 个案例索引/g, '全部 ' + TOTAL + ' 个案例索引'],
      [/收录 100 例/g, '收录 ' + TOTAL + ' 例'],
    ],
  },
  {
    file: 'what-is-opc/index.html',
    subs: [
      [/以及 100 个国内案例的数据画像/g, '以及 ' + TOTAL + ' 个国内案例的数据画像'],
      [/站内 100 个案例里/g, '站内 ' + TOTAL + ' 个案例里'],
      [/<h2 id="data">100 个案例的数据画像<\/h2>/g, '<h2 id="data">' + TOTAL + ' 个案例的数据画像</h2>'],
      [/<div class="v">11\.8<\/div><div class="k">平均信源数<\/div>/g,
        '<div class="v">' + avgSrc + '</div><div class="k">平均信源数</div>'],
      [/观察这 100 个样本/g, '观察这 ' + TOTAL + ' 个样本'],
      [/全部 100 个案例索引/g, '全部 ' + TOTAL + ' 个案例索引'],
      [/收录 100 例/g, '收录 ' + TOTAL + ' 例'],
    ],
  },
  {
    file: 'data-notes/index.html',
    subs: [
      [/站内 100 例中，明确披露年化收入的有 33 例，中位数 85\.2 万元，最高 1200 万元，最低 1 万元/g,
        '站内 ' + TOTAL + ' 例中，明确披露年化收入的有 ' + withRev.length + ' 例，中位数 ' + wan(median) + '，最高 ' + wan(maxRev) + '，最低 ' + wan(minRev)],
      [/全部 100 个案例索引/g, '全部 ' + TOTAL + ' 个案例索引'],
      [/收录 100 例/g, '收录 ' + TOTAL + ' 例'],
    ],
  },
];

PAGES.forEach(function (p) {
  const f = path.join(SITE, p.file);
  let h = fs.readFileSync(f, 'utf8');
  let n = 0;
  p.subs.forEach(function (s) {
    const before = h;
    h = h.replace(s[0], s[1]);
    if (before !== h) n++;
  });
  fs.writeFileSync(f, h);
  console.log(p.file + '：已应用 ' + n + '/' + p.subs.length + ' 条替换');
});

/* ============ 长青页通用口径同步（防漂移） ============ */
/* 把「N 个案例索引」「收录 N 例」等与当前案例数脱节的表述统一改写 */
{
  const generic = [
    [/(全部\s*)[0-9,]+(\s*个案例索引)/g, '$1' + TOTAL + '$2'],
    [/(收录\s*)[0-9,]+(\s*例)/g, '$1' + TOTAL + '$2'],
    [/(全部\s*)[0-9,]+(\s*个 AI 一人公司案例)/g, '$1' + TOTAL + '$2'],
    [/(收录\s*)[0-9,]+(\s*个中国 AI 一人公司案例)/g, '$1' + TOTAL + '$2'],
    [/(按五个赛道收录\s*)[0-9,]+(\s*个中国 AI 一人公司案例)/g, '$1' + TOTAL + '$2'],
    [/(<div class="v">)[0-9,]+(<\/div><div class="k">收录案例)/g, '$1' + TOTAL + '$2'],
    [/(<div class="v">)[0-9.]+(<\/div><div class="k">平均信源数)/g, '$1' + avgSrc + '$2'],
    [/(<div class="v">)[0-9,]+(<\/div><div class="k">披露年化收入)/g, '$1' + withRev.length + '$2'],
    [/(<div class="v">)[0-9,]+(<\/div><div class="k">披露用户规模)/g, '$1' + withUsers + '$2'],
    [/(在披露年化收入的\s*)[0-9,]+(\s*例中)/g, '$1' + withRev.length + '$2'],
    [/(站内\s*)[0-9,]+(\s*例中，明确披露年化收入的有\s*)[0-9,]+/g, '$1' + TOTAL + '$2' + withRev.length],
    [/(中位数为\s*<b>)[0-9.]+( 万元<\/b>，最高为\s*)[0-9.]+( 万元)/g,
      '$1' + wan(median).replace(' 万元', '') + '$2' + wan(maxRev).replace(' 万元', '') + '$3'],
    [/(信源台账<\/b>：)[\d,]+( 条信源逐条记录)/g,
      '$1' + srcData.meta.total_sources.toLocaleString('en-US') + '$2'],
    [/(：)[\d,]+( 例未披露收入)/g, '$1' + (TOTAL - withRev.length) + '$2'],
  ];
  const files = ['all/index.html', 'method/index.html', 'what-is-opc/index.html', 'data-notes/index.html', 'insights/index.html', 'index.html', 'llms.txt', 'llms-full.txt'];
  files.forEach(function (rel) {
    const f = path.join(SITE, rel);
    if (!fs.existsSync(f)) return;
    let h = fs.readFileSync(f, 'utf8');
    const before = h;
    generic.forEach(function (g) { h = h.replace(g[0], g[1]); });
    if (before !== h) {
      fs.writeFileSync(f, h);
      console.log('通用口径同步：' + rel + ' 已更新');
    }
  });
}

/* ============ llms.txt：信源台账条数 ============ */
{
  const f = path.join(SITE, 'llms.txt');
  let h = fs.readFileSync(f, 'utf8');
  const total = srcData.meta.total_sources;
  const before = h;
  h = h.replace(/信源台账（[\d,]+ 条信源的可回溯元数据/g, '信源台账（' + total.toLocaleString('en-US') + ' 条信源的可回溯元数据');
  fs.writeFileSync(f, h);
  console.log('llms.txt：信源条数 ' + (before === h ? '未变（已是 ' + total + '）' : '已同步为 ' + total));
}

console.log('\n统计：案例 ' + TOTAL + ' · 披露收入 ' + withRev.length + ' · 披露用户 ' + withUsers +
  ' · 平均信源 ' + avgSrc + ' · 最少信源 ' + minSrc +
  ' · 核验分布 verified ' + (verifyCount.verified || 0) + ' / cross ' + (verifyCount.cross || 0) + ' / partial ' + (verifyCount.partial || 0));
