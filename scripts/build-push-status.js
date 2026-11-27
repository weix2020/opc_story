#!/usr/bin/env node
/**
 * 由推送状态生成站点内的公开进度数据 site/data/push-status.json。
 *
 * 数据来源：
 *   - .baidu-push-state.json（推送状态，CI 每次推送后回写仓库）
 *   - site/sitemap.xml（待推队列的来源）
 *
 * 站点上的「百度推送进度」页面读取该 JSON 渲染，因此进度随 CI 推送自动更新，
 * 无需人工干预。
 *
 * 用法：node scripts/build-push-status.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const shared = require('./lib/baidu-shared');

const OUT_FILE = path.join(shared.SITE, 'data', 'push-status.json');

/**
 * generated_at 只在内容实际变化时更新。
 * 否则每次 CI 跑都会产生一处 diff，导致「派生数据无漂移」检查误报。
 */
function finalize(body) {
  if (fs.existsSync(OUT_FILE)) {
    try {
      const prev = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
      const strip = function (o) {
        const c = JSON.parse(JSON.stringify(o));
        if (c && c.meta) delete c.meta.generated_at;
        return JSON.stringify(c);
      };
      if (strip(prev) === strip(body) && prev.meta && prev.meta.generated_at) {
        body.meta.generated_at = prev.meta.generated_at;
        console.log('内容未变化，保留原 generated_at：' + body.meta.generated_at);
      }
    } catch (e) { /* 旧文件损坏时按新内容写入 */ }
  }
  fs.writeFileSync(OUT_FILE, JSON.stringify(body, null, 2) + '\n');
}

function main() {
  const xml = fs.readFileSync(shared.SITEMAP, 'utf8');
  const state = shared.loadState();
  const p = shared.computeProgress(state, xml);

  const body = {
    meta: {
      generated_at: new Date().toISOString().slice(0, 10),
      site: shared.SITE_URL,
      quota_date: p.quota_date,
    },
    progress: {
      sitemap_total: p.sitemap_total,
      pushed_total: p.pushed_total,
      pending_total: p.pending_total,
      invalid_total: p.invalid_total,
      daily_limit: p.daily_limit,
      pushed_today: p.pushed_today,
      remaining_quota: p.remaining_quota,
      days_left: p.days_left,
      percent: p.sitemap_total ? Math.round(p.pushed_total / p.sitemap_total * 1000) / 10 : 0,
    },
    daily: p.daily,
    next_batch: p.next_batch,
  };

  finalize(body);
  console.log(
    '已生成 ' + OUT_FILE +
    '（已推 ' + p.pushed_total + ' / ' + p.sitemap_total +
    '，待推 ' + p.pending_total + '，预计 ' + p.days_left + ' 天推完）'
  );
}

main();
