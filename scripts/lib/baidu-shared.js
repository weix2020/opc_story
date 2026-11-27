'use strict';

/**
 * 百度主动推送的共享逻辑。
 *
 * 推送脚本（baidu-push.js）与进度构建脚本（build-push-status.js）
 * 都依赖「读取 sitemap → 按优先级排序 → 计算待推队列」这套逻辑，
 * 抽到这里避免两处实现漂移。
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SITE = path.join(ROOT, 'site');
const SITEMAP = path.join(SITE, 'sitemap.xml');
const STATE_FILE = path.join(ROOT, '.baidu-push-state.json');

const SITE_URL = 'https://opc-story.top';
/* 百度提交接口的 site 参数需为裸域（不带协议），否则返回 site init fail */
const SITE_PARAM = 'opc-story.top';
/* 百度新站每日配额 */
const DAILY_LIMIT = 10;

/**
 * 配额日切基准日（北京时间）。
 * 百度站长的每日配额按北京时间 00:00 重置，而 new Date().toISOString()
 * 取的是 UTC 日期：在北京时间 00:00–08:00 区间两者相差一天，会误判
 * 「今日配额已用尽」而空跑。故统一用 UTC+8 的日期作为配额日。
 */
function today() {
  return new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);
}

/* ---------- sitemap ---------- */
function readSitemap() {
  const xml = fs.readFileSync(SITEMAP, 'utf8');
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) urls.push(m[1].trim());
  return urls;
}

/**
 * 优先级排序：
 * 1) 站点主页与核心聚合页
 * 2) 案例报告页（按 sitemap 中 lastmod 从新到旧）
 * 3) 长青说明页
 */
function prioritize(urls, xml) {
  const lastmod = {};
  const re = /<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g;
  let m;
  while ((m = re.exec(xml)) !== null) lastmod[m[1].trim()] = m[2].trim();

  const isCore = function (u) {
    return [
      SITE_URL + '/',
      SITE_URL + '/all',
      SITE_URL + '/insights/',
    ].indexOf(u) >= 0;
  };
  const isGuide = function (u) {
    return ['/what-is-opc/', '/method/', '/data-notes/'].some(function (p) {
      return u.endsWith(p);
    });
  };

  return urls.slice().sort(function (a, b) {
    const score = function (u) {
      if (isCore(u)) return 0;
      if (u.indexOf('/report/') >= 0) return 1;
      if (isGuide(u)) return 2;
      return 3;
    };
    const d = score(a) - score(b);
    if (d !== 0) return d;
    /* 同组内 lastmod 新的优先 */
    const la = lastmod[a] || '';
    const lb = lastmod[b] || '';
    if (la !== lb) return lb < la ? -1 : 1;
    return a < b ? -1 : 1;
  });
}

/* ---------- 状态 ---------- */
function emptyState() {
  return { pushed: [], dates: {}, invalid: [] };
}

function loadState() {
  if (!fs.existsSync(STATE_FILE)) return emptyState();
  try {
    const s = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    if (!Array.isArray(s.pushed)) s.pushed = [];
    if (!s.dates) s.dates = {};
    if (!Array.isArray(s.invalid)) s.invalid = [];
    return s;
  } catch (e) {
    return emptyState();
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
}

/**
 * 计算推送进度快照。
 * @param {object} state  推送状态
 * @param {string} xml    sitemap 原文
 * @returns {object} 进度数据
 */
function computeProgress(state, xml) {
  const all = readSitemap();
  const ordered = prioritize(all, xml);
  const pushedSet = new Set(state.pushed);
  const invalidSet = new Set(state.invalid || []);
  const pending = ordered.filter(function (u) {
    return !pushedSet.has(u) && !invalidSet.has(u);
  });

  const t = today();
  const pushedToday = (state.dates[t] || []).length;
  const remainingQuota = Math.max(0, DAILY_LIMIT - pushedToday);

  /* 按日统计历史推送量（只保留有记录的日期，按日期升序） */
  const daily = Object.keys(state.dates)
    .filter(function (d) { return (state.dates[d] || []).length > 0; })
    .sort()
    .map(function (d) { return { date: d, count: state.dates[d].length }; });

  /* 预计还需多少天推完（按每日配额推算） */
  const daysLeft = Math.ceil(pending.length / DAILY_LIMIT);

  return {
    sitemap_total: all.length,
    pushed_total: state.pushed.length,
    pending_total: pending.length,
    invalid_total: (state.invalid || []).length,
    daily_limit: DAILY_LIMIT,
    pushed_today: pushedToday,
    remaining_quota: remainingQuota,
    days_left: daysLeft,
    daily: daily,
    next_batch: pending.slice(0, DAILY_LIMIT),
    quota_date: t,
  };
}

module.exports = {
  ROOT: ROOT,
  SITE: SITE,
  SITEMAP: SITEMAP,
  STATE_FILE: STATE_FILE,
  SITE_URL: SITE_URL,
  SITE_PARAM: SITE_PARAM,
  DAILY_LIMIT: DAILY_LIMIT,
  today: today,
  readSitemap: readSitemap,
  prioritize: prioritize,
  loadState: loadState,
  saveState: saveState,
  emptyState: emptyState,
  computeProgress: computeProgress,
};
