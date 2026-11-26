#!/usr/bin/env node
/**
 * 把已通过其它途径推送成功的 URL 手动记入百度推送状态，
 * 避免重复提交浪费每日配额。
 *
 * 用法：node scripts/baidu-push-mark.js <url1> <url2> ...
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

const urls = process.argv.slice(2);
if (!urls.length) {
  console.log('用法：node scripts/baidu-push-mark.js <url1> [url2 ...]');
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
