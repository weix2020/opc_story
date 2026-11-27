#!/usr/bin/env node
/**
 * 百度站长「链接提交 · 普通收录」主动推送。
 *
 * 新站配额限制：每日 10 条 URL。本脚本读取 site/sitemap.xml，
 * 依据 state 文件记录已推送过的 URL，按优先级挑选未推送的条目分批提交，
 * 避免重复提交浪费配额。
 *
 * 用法：
 *   node scripts/baidu-push.js            # 推送今日配额（默认 10 条）
 *   node scripts/baidu-push.js --limit 5  # 自定义本次条数
 *   node scripts/baidu-push.js --status   # 只看进度，不推送
 *   node scripts/baidu-push.js --reset    # 清空推送状态（谨慎使用）
 *
 * 环境变量：
 *   BAIDU_TOKEN  百度站长 API token（CI 中由 Secret 注入；仅 --status 不需要）
 */
'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');

const shared = require('./lib/baidu-shared');
const SITE_URL = shared.SITE_URL;
const SITE_PARAM = shared.SITE_PARAM;
const SITEMAP = shared.SITEMAP;
const DAILY_LIMIT = shared.DAILY_LIMIT;
const readSitemap = shared.readSitemap;
const prioritize = shared.prioritize;
const loadState = shared.loadState;
const saveState = shared.saveState;
const today = shared.today;

/* token 只从环境变量读取：
   - CI 中由 GitHub Actions Secret BAIDU_TOKEN 注入
   - 本地可用 `BAIDU_TOKEN=xxx node scripts/baidu-push.js`
   仓库为公开仓库，故不再内置默认 token */
const TOKEN = process.env.BAIDU_TOKEN;

/* ---------- 参数 ---------- */
const args = process.argv.slice(2);
const getArg = function (name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};
const limit = parseInt(getArg('--limit') || String(DAILY_LIMIT), 10);
const statusOnly = args.indexOf('--status') >= 0;
const reset = args.indexOf('--reset') >= 0;
/* 手工推送过或从其它途径消耗配额时，用 --remain 告知服务端真实剩余 */
const remainOverride = getArg('--remain') !== null ? parseInt(getArg('--remain'), 10) : null;

/* ---------- 读取 sitemap / 状态：见 scripts/lib/baidu-shared.js ---------- */

/* ---------- 推送 ---------- */
/**
 * 百度提交接口 http://data.zz.baidu.com/urls：
 *   - site 参数必须是裸域（如 opc-story.top），带协议会返回 site init fail
 *   - 请求体必须是换行分隔的纯文本 URL 列表；传 JSON 数组会被判为非法元素
 */
function push(urls) {
  return new Promise(function (resolve) {
    const body = urls.join('\n');
    const target = 'http://data.zz.baidu.com/urls?site=' + encodeURIComponent(SITE_PARAM) + '&token=' + TOKEN;
    const mod = target.startsWith('https:') ? https : http;
    const req = mod.request(
      target,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Content-Length': Buffer.byteLength(body),
          'User-Agent': 'opc-story-seo-push/1.0',
        },
        timeout: 30000,
      },
      function (res) {
        let data = '';
        res.on('data', function (c) { data += c; });
        res.on('end', function () {
          resolve({ status: res.statusCode, body: data });
        });
      }
    );
    req.on('timeout', function () { req.destroy(new Error('请求超时')); });
    req.on('error', function (e) { resolve({ status: 0, body: String(e.message) }); });
    req.write(body);
    req.end();
  });
}

/* ---------- 主流程 ---------- */
async function main() {
  if (reset) {
    saveState({ pushed: [], dates: {} });
    console.log('已清空推送状态。');
    return;
  }

  const xml = fs.readFileSync(SITEMAP, 'utf8');
  const all = readSitemap();
  const ordered = prioritize(all, xml);
  const state = loadState();
  const pushedSet = new Set(state.pushed);
  /* 已被判非法的 URL 不再重复提交，避免每天白耗配额 */
  const invalidSet = new Set(state.invalid || []);
  const pending = ordered.filter(function (u) {
    return !pushedSet.has(u) && !invalidSet.has(u);
  });

  const t = today();
  const pushedToday = (state.dates[t] || []).length;
  /* 服务端配额才是真实约束；本地计数仅作参考 */
  const remainToday = remainOverride !== null
    ? remainOverride
    : Math.max(0, DAILY_LIMIT - pushedToday);

  console.log('站点：' + SITE_URL);
  console.log('sitemap URL 总数：' + all.length);
  console.log('累计已推送：' + state.pushed.length + ' 条');
  console.log('今日已推送：' + pushedToday + '/' + DAILY_LIMIT + ' 条');
  console.log('待推送：' + pending.length + ' 条');
  console.log('---');

  if (statusOnly) {
    console.log('下次将推送（最多 ' + remainToday + ' 条）：');
    pending.slice(0, remainToday).forEach(function (u, i) {
      console.log('  ' + (i + 1) + '. ' + u);
    });
    if (pending.length > remainToday) {
      console.log('  … 剩余 ' + (pending.length - remainToday) + ' 条需后续日期继续推送');
    }
    return;
  }

  if (!remainToday) {
    console.log('今日配额已用完（' + pushedToday + '/' + DAILY_LIMIT + '），明日再来。');
    return;
  }

  if (!TOKEN) {
    console.error('缺少百度站长 API token。请设置环境变量 BAIDU_TOKEN（CI 中由 Secret 注入）。');
    process.exit(1);
  }

  let batch = pending.slice(0, Math.min(limit, remainToday));
  if (!batch.length) {
    console.log('没有待推送的新 URL。');
    return;
  }

  console.log('本次计划推送 ' + batch.length + ' 条：');
  batch.forEach(function (u) { console.log('  ' + u); });
  console.log('---');

  let accepted = [];
  let remain = null;
  let notValid = [];
  let attempts = 0;
  let quotaExhausted = false;
  let cursor = 0;
  let batchSize = Math.min(limit, remainToday);

  while (cursor < pending.length && attempts < 20) {
    attempts++;
    if (batchSize < 1) {
      quotaExhausted = true;
      break;
    }
    const batch = pending.slice(cursor, cursor + batchSize);

    const res = await push(batch);
    console.log('HTTP ' + res.status + ' ' + res.body);

    let j = null;
    try { j = JSON.parse(res.body); } catch (e) {
      console.log('响应不会解析，终止重试。');
      break;
    }

    if (j.error === 400 && /over quota/i.test(j.message || '')) {
      /* 批量超过服务端剩余配额。
         over quota 的请求不会被受理、不消耗配额。
         降批到 1 条探一次：成功则响应里的 remain 就是服务端真实余额，
         下一轮按 remain 精确推完；仍 over quota 则余额为 0。 */
      if (batchSize <= 1) {
        console.log('服务端已无剩余配额，明日再推。');
        quotaExhausted = true;
        break;
      }
      batchSize = 1;
      console.log('配额不足（over quota），降批至 1 条探测服务端余额…');
      continue;
    }
    if (j.error) {
      console.log('接口错误：' + j.error + ' ' + (j.message || ''));
      break;
    }

    const successCount = typeof j.success === 'number' ? j.success : 0;
    remain = j.remain !== undefined ? j.remain : null;
    notValid = j.not_valid || [];

    /* 受理条目 = 本批去掉被判非法的条目（而非简单取前 N 个） */
    const invalidSet = new Set(notValid);
    const ok = batch.filter(function (u) { return !invalidSet.has(u); }).slice(0, successCount);
    accepted = accepted.concat(ok);

    /* 非法条目记录下来，后续不再重复提交（去重，避免状态文件膨胀） */
    if (notValid.length) {
      const seen = new Set(state.invalid || []);
      notValid.forEach(function (u) { seen.add(u); });
      state.invalid = Array.from(seen);
    }

    cursor += batch.length;
    console.log('本批受理 ' + ok.length + ' 条，服务端剩余配额 ' + remain + '。');

    /* 服务端还有余额且仍有待推条目 → 继续推，直到配额见底 */
    if (remain !== null && remain > 0 && cursor < pending.length) {
      batchSize = Math.min(remain, pending.length - cursor);
      continue;
    }
    break;
  }

  if (notValid.length) {
    console.log('被判定非法的条目（' + notValid.length + ' 条）：');
    notValid.slice(0, 10).forEach(function (v) { console.log('  ' + v); });
  }

  if (accepted.length) {
    state.pushed = state.pushed.concat(accepted);
    state.dates[t] = (state.dates[t] || []).concat(accepted);
    saveState(state);
    console.log('成功受理 ' + accepted.length + ' 条，已记录（累计 ' + state.pushed.length + ' 条）。');
  } else if (quotaExhausted) {
    /* 配额用尽属于正常状态，不应让 CI 报红 */
    console.log('今日配额已用尽，本次未推送任何条目；明日自动继续。');
    saveState(state);
  } else {
    console.log('本次无条目被受理，不写入状态（可重试）。');
    process.exitCode = 1;
  }
}

main();
