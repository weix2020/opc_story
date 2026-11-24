#!/usr/bin/env node
/**
 * 从 site/data/cases.json 全量重建 site/feed.json（RSS/JSON Feed）。
 *
 * 字段映射与既有 100 条保持一致：
 *   id/url          → 报告 URL
 *   title           → cases.name
 *   summary         → cases.summary
 *   content_text    → summary + 创业者/赛道/时间锚点/关键结果/规模 + 报告链接
 *   date_published  → cases.time_anchor（YYYY 或 YYYY-MM 补足为当月 1 日）
 *   tags            → [track, verification]
 *   authors         → [{ name: founder }]
 *
 * 用法：node scripts/build-feed.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'site');

const casesData = JSON.parse(fs.readFileSync(path.join(SITE, 'data/cases.json'), 'utf8'));
const biData = JSON.parse(fs.readFileSync(path.join(SITE, 'data/bi.json'), 'utf8'));
const cases = casesData.cases;
const biBy = {};
biData.cases.forEach(function (c) { biBy[c.slug] = c; });

/** 规模描述（沿用既有 feed.json 措辞） */
function scaleText(c) {
  const b = biBy[c.slug] || {};
  if (b.revenue != null) {
    return '年化收入 ' + b.revenue + ' 元（' + (b.revenue_note || '') + '）';
  }
  if (c.users != null) {
    return '用户 ' + c.users + '（' + (c.users_note || '') + '）';
  }
  return '营收与用户未披露';
}

/**
 * date_published：完全沿用既有 feed.json 的写法，不做规范化。
 *   YYYY-MM-DD → 'YYYY-MM-DDT00:00:00+08:00'
 *   YYYY-MM    → 'YYYY-MMT00:00:00+08:00'（与旧文件保持一致的既有格式）
 *   YYYY       → 'YYYYT00:00:00+08:00'
 */
function pubDate(anchor) {
  const s = String(anchor).trim();
  const m = s.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/);
  if (!m) return '2026-01-01T00:00:00+08:00';
  const y = m[1];
  if (m[3]) return y + '-' + m[2] + '-' + m[3] + 'T00:00:00+08:00';
  if (m[2]) return y + '-' + m[2] + 'T00:00:00+08:00';
  return y + 'T00:00:00+08:00';
}

/** 排序：与首页一致，按 rv 降序、r 作 tiebreak */
const sorted = cases.slice().sort(function (a, b) {
  const ra = a.revenue_cny_annualized || 0;
  const rb = b.revenue_cny_annualized || 0;
  if (rb !== ra) return rb - ra;
  return a.id - b.id;
});

const items = sorted.map(function (c) {
  const url = 'https://opc-story.top/report/' + c.slug + '/';
  const content = [
    c.summary,
    '',
    '创业者：' + c.founder,
    '赛道：' + c.track,
    '时间锚点：' + c.time_anchor,
    '关键结果：' + c.evidence,
    '规模：' + scaleText(c),
    '',
    '完整报告（含逐条信源核验）：' + url,
  ].join('\n');
  return {
    id: url,
    url: url,
    title: c.name,
    summary: c.summary,
    content_text: content,
    date_published: pubDate(c.time_anchor),
    tags: [c.track, c.verification],
    authors: [{ name: c.founder }],
  };
});

const feed = {
  version: 'https://jsonfeed.org/version/1.1',
  title: 'OPC Story · 中国 AI 一人公司案例库',
  home_page_url: 'https://opc-story.top/',
  feed_url: 'https://opc-story.top/feed.json',
  description: cases.length + ' 个以 AI 为核心生产力的中国一人公司案例，每例附逐条信源核验的深度报告。',
  language: 'zh-CN',
  items: items,
};

fs.writeFileSync(path.join(SITE, 'feed.json'), JSON.stringify(feed, null, 2) + '\n');
console.log('feed.json：已重建 ' + items.length + ' 条，description 已同步为 ' + cases.length + ' 个案例');
