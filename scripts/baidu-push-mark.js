#!/usr/bin/env node
/**
 * 把已通过其它途径推送成功的 URL 手动记入百度推送状态，
 * 避免重复提交浪费每日配额。
 *
 * 用法：
 *   node scripts/baidu-push-mark.js <url1> [url2 ...]        # 记入已推送
 *   node scripts/baidu-push-mark.js --rename <旧URL> <新URL>   # URL 变更时迁移记录
 *
 * --rename 用于站点 URL 结构调整（如 /all → /all/）后，把旧 URL 的推送记录
 * 迁移到新 URL：既不丢失「已推送」的事实（避免重复提交浪费配额），
 * 也不让已失效的旧 URL 继续占用待推队列的统计口径。
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STATE_FILE = path.join(ROOT, '.baidu-push-state.json');

/** 配额日切基准日（北京时间），与 baidu-push.js 保持一致 */
function today() {
  return new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);
}

const state = fs.existsSync(STATE_FILE)
  ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
  : { pushed: [], dates: {}, invalid: [] };
if (!Array.isArray(state.pushed)) state.pushed = [];
if (!state.dates) state.dates = {};
if (!Array.isArray(state.invalid)) state.invalid = [];

const args = process.argv.slice(2);

if (args[0] === '--rename') {
  const oldUrl = args[1];
  const newUrl = args[2];
  if (!oldUrl || !newUrl) {
    console.error('用法：node scripts/baidu-push-mark.js --rename <旧URL> <新URL>');
    process.exit(1);
  }

  /* pushed 列表 */
  let moved = 0;
  state.pushed = state.pushed.map(function (u) {
    if (u !== oldUrl) return u;
    moved++;
    return newUrl;
  });
  /* 去重（若新 URL 已存在） */
  state.pushed = state.pushed.filter(function (u, i) {
    return state.pushed.indexOf(u) === i;
  });

  /* 按日记录 */
  Object.keys(state.dates).forEach(function (d) {
    const list = state.dates[d].map(function (u) { return u === oldUrl ? newUrl : u; });
    state.dates[d] = list.filter(function (u, i) { return list.indexOf(u) === i; });
  });

  /* 非法列表 */
  state.invalid = state.invalid.map(function (u) { return u === oldUrl ? newUrl : u; });
  state.invalid = state.invalid.filter(function (u, i) { return state.invalid.indexOf(u) === i; });

  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
  console.log(
    (moved ? '已迁移 ' + moved + ' 条记录' : '旧 URL 不在推送状态中，无需迁移') +
    '：' + oldUrl + ' → ' + newUrl +
    '（累计 ' + state.pushed.length + ' 条）'
  );
} else {
  const urls = args;
  if (!urls.length) {
    console.log('用法：node scripts/baidu-push-mark.js <url1> [url2 ...]');
    console.log('      node scripts/baidu-push-mark.js --rename <旧URL> <新URL>');
    process.exit(1);
  }

  const t = today();
  let added = 0;
  urls.forEach(function (u) {
    if (state.pushed.indexOf(u) >= 0) return;
    state.pushed.push(u);
    state.dates[t] = (state.dates[t] || []).concat([u]);
    added++;
  });

  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
  console.log('已记录 ' + added + ' 条（累计 ' + state.pushed.length + ' 条，今日 ' + (state.dates[t] || []).length + ' 条）');
}
