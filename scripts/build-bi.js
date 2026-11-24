#!/usr/bin/env node
/**
 * BI 派生数据生成器
 *
 * 从 site/data/cases.json 派生 site/data/bi.json：
 *   - year：时间锚点年份
 *   - revenue_type：按 revenue_note 归入口径大类
 *   - comparable：严格可比（年营收/年化/ARR 口径）
 *   - revenue_bucket：收入分桶
 *
 * 用法：node scripts/build-bi.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CASES_FILE = path.join(ROOT, 'site/data/cases.json');
const OUT_FILE = path.join(ROOT, 'site/data/bi.json');

const REVENUE_TYPES = [
  '年营收/年化/ARR',
  '年销售额',
  '累计营收/流水',
  '单月口径',
  '合同额',
  '单店销售额',
  '分账/到手',
  '其他',
];

/** revenue_note → 口径大类 */
function revenueType(note) {
  const s = String(note || '');
  if (!s) return null;
  if (/单店/.test(s)) return '单店销售额';
  if (/合同额/.test(s)) return '合同额';
  if (/分账|到手/.test(s)) return '分账/到手';
  if (/累计|流水/.test(s)) return '累计营收/流水';
  if (/年化|ARR|年营收|年化收入|年化营收|年化收益/.test(s)) return '年营收/年化/ARR';
  if (/月/.test(s)) return '单月口径';
  if (/销售额/.test(s)) return '年销售额';
  return '其他';
}

function bucketOf(v) {
  if (v == null) return null;
  const w = v / 1e4;
  if (w < 30) return '<30万';
  if (w < 50) return '30-50万';
  if (w < 100) return '50-100万';
  if (w < 300) return '100-300万';
  return '300万+';
}

const data = JSON.parse(fs.readFileSync(CASES_FILE, 'utf8'));
const cases = data.cases || [];

const out = cases.map(function (c) {
  const rt = revenueType(c.revenue_note);
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    url: c.url,
    founder: c.founder,
    track: c.track,
    year: parseInt(String(c.time_anchor).slice(0, 4), 10),
    time_anchor: c.time_anchor,
    summary: c.summary,
    evidence: c.evidence,
    revenue: c.revenue_cny_annualized,
    revenue_note: c.revenue_note,
    revenue_type: rt,
    comparable: rt === '年营收/年化/ARR',
    revenue_bucket: bucketOf(c.revenue_cny_annualized),
    users: c.users,
    users_note: c.users_note,
    verification: c.verification,
    source_count: c.source_count,
  };
});

const tracks = [];
cases.forEach(function (c) { if (tracks.indexOf(c.track) < 0) tracks.push(c.track); });
const years = [];
out.forEach(function (c) { if (years.indexOf(c.year) < 0) years.push(c.year); });
years.sort();

const buckets = ['<30万', '30-50万', '50-100万', '100-300万', '300万+'];

const result = {
  meta: {
    generated_at: new Date().toISOString().slice(0, 10),
    count: out.length,
    revenue_disclosed: out.filter(function (c) { return c.revenue != null; }).length,
    comparable_disclosed: out.filter(function (c) { return c.comparable; }).length,
    users_disclosed: out.filter(function (c) { return c.users != null; }).length,
    tracks: tracks,
    years: years,
    buckets: buckets,
    revenue_types: REVENUE_TYPES,
    note: 'revenue 为年化折算值（月收入×12）；仅 comparable=true 的 ' +
      out.filter(function (c) { return c.comparable; }).length +
      ' 例为严格可比的年营收/年化/ARR 口径，其余仅供口径构成分析，不可横向比较。缺失值为 null，未做补零。',
  },
  cases: out,
};

fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2) + '\n');
console.log('已生成 ' + OUT_FILE + '（' + out.length + ' 例）');
