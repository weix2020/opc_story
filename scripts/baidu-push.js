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
const path = require('path');
const http = require('http');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const SITEMAP = path.join(SITE, 'sitemap.xml');
const STATE_FILE = path.join(ROOT, '.baidu-push-state.json');

const SITE_URL = 'https://opc-story.top';
/* 百度提交接口的 site 参数需为裸域（不带协议），否则返回 site init fail */
const SITE_PARAM = 'opc-story.top';
/* token 只从环境变量读取：
   - CI 中由 GitHub Actions Secret BAIDU_TOKEN 注入
   - 本地可用 `BAIDU_TOKEN=xxx node scripts/baidu-push.js`
   仓库为公开仓库，故不再内置默认 token */
const TOKEN = process.env.BAIDU_TOKEN;
const DAILY_LIMIT = 10;

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

/* ---------- 读取 sitemap ---------- */
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
function loadState() {
  if (!fs.existsSync(STATE_FILE)) return { pushed: [], dates: {} };
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch (e) {
    return { pushed: [], dates: {} };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

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
  const pending = ordered.filter(function (u) { return !pushedSet.has(u); });

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

  let successCount = 0;
  let remain = null;
  let notValid = [];
  let attempts = 0;
  let quotaExhausted = false;

  while (batch.length && attempts < 6) {
    attempts++;
    const res = await push(batch);
    console.log('HTTP ' + res.status + ' ' + res.body);

    let j = null;
    try { j = JSON.parse(res.body); } catch (e) {
      console.log('响应无法解析，终止重试。');
      break;
    }

    if (j.error === 400 && /over quota/i.test(j.message || '')) {
      /* 批量超过服务端剩余配额 → 减半重试 */
      const smaller = Math.floor(batch.length / 2);
      console.log('配额不足（over quota），降批至 ' + smaller + ' 条重试…');
      if (smaller < 1) {
        console.log('今日配额已用完，明日再推。');
        quotaExhausted = true;
        break;
      }
      batch = batch.slice(0, smaller);
      continue;
    }
    if (j.error) {
      console.log('接口错误：' + j.error + ' ' + (j.message || ''));
      break;
    }

    successCount = typeof j.success === 'number' ? j.success : 0;
    remain = j.remain !== undefined ? j.remain : null;
    notValid = j.not_valid || [];
    break;
  }

  if (remain !== null) console.log('接口返回剩余配额：' + remain);
  if (notValid.length) {
    console.log('被判定非法的条目（' + notValid.length + ' 条）：');
    notValid.slice(0, 10).forEach(function (v) { console.log('  ' + v); });
  }

  if (successCount > 0) {
    /* 只记录成功受理的条目；失败条目留在待推队列下次重试 */
    const accepted = batch.slice(0, successCount);
    state.pushed = state.pushed.concat(accepted);
    state.dates[t] = (state.dates[t] || []).concat(accepted);
    saveState(state);
    console.log('成功受理 ' + successCount + ' 条，已记录（累计 ' + state.pushed.length + ' 条）。');
    if (successCount < batch.length) {
      console.log('未受理 ' + (batch.length - successCount) + ' 条，将于下次重试。');
    }
  } else if (quotaExhausted) {
    /* 配额用尽属于正常状态，不应让 CI 报红 */
    console.log('今日配额已用尽，本次未推送任何条目；明日自动继续。');
  } else {
    console.log('本次无条目被受理，不写入状态（可重试）。');
    process.exitCode = 1;
  }
}

main();
