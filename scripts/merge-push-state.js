#!/usr/bin/env node
/**
 * 合并两份推送状态，取并集。
 *
 * 背景：CI 里同时存在两份状态来源——
 *   - 仓库中的 .baidu-push-state.json（每次推送后回写，最新）
 *   - GitHub Actions cache 中的副本（restore-keys 回溯命中时可能更旧）
 * 若直接以 cache 覆盖仓库状态，会重复提交已推过的 URL、白耗每日配额；
 * 若只信仓库状态，则 cache 里有而仓库里没有的记录会丢失。
 * 故取并集：已推 URL 与已判非法 URL 都以「见过即记录」为准。
 *
 * 用法：node scripts/merge-push-state.js <基准文件> <待合并文件>
 *   基准文件（仓库状态）优先级更高；合并结果写回待合并文件。
 */
'use strict';

const fs = require('fs');

function readState(file) {
  if (!fs.existsSync(file)) return { pushed: [], dates: {}, invalid: [] };
  try {
    const s = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!Array.isArray(s.pushed)) s.pushed = [];
    if (!s.dates || typeof s.dates !== 'object') s.dates = {};
    if (!Array.isArray(s.invalid)) s.invalid = [];
    return s;
  } catch (e) {
    return { pushed: [], dates: {}, invalid: [] };
  }
}

function merge(base, other) {
  const pushed = [];
  const seen = new Set();
  /* 基准在前：保持基准的顺序与日期归属 */
  base.pushed.concat(other.pushed).forEach(function (u) {
    if (seen.has(u)) return;
    seen.add(u);
    pushed.push(u);
  });

  /* 按日记录取并集 */
  const dates = {};
  const allDates = new Set(
    Object.keys(base.dates).concat(Object.keys(other.dates))
  );
  allDates.forEach(function (d) {
    const set = new Set();
    (base.dates[d] || []).concat(other.dates[d] || []).forEach(function (u) {
      set.add(u);
    });
    if (set.size) dates[d] = Array.from(set);
  });

  const invalidSet = new Set();
  base.invalid.concat(other.invalid).forEach(function (u) { invalidSet.add(u); });

  return { pushed: pushed, dates: dates, invalid: Array.from(invalidSet) };
}

function main() {
  const baseFile = process.argv[2];
  const otherFile = process.argv[3];
  if (!baseFile || !otherFile) {
    console.error('用法：node scripts/merge-push-state.js <基准文件> <待合并文件>');
    process.exit(1);
  }

  const base = readState(baseFile);
  const other = readState(otherFile);
  const merged = merge(base, other);

  fs.writeFileSync(otherFile, JSON.stringify(merged, null, 2) + '\n');

  const changed = merged.pushed.length !== other.pushed.length ||
    merged.invalid.length !== other.invalid.length;
  console.log(
    '状态合并完成：已推 ' + merged.pushed.length + ' 条' +
    '（基准 ' + base.pushed.length + '，另一份 ' + other.pushed.length + '）' +
    '，非法 ' + merged.invalid.length + ' 条' +
    (changed ? '（有合并，状态已更新）' : '（无变化）')
  );
}

main();
