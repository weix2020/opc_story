#!/usr/bin/env node
/**
 * 校验 robots.txt 对搜索引擎爬虫的可抓取性。
 *
 * 背景：Cloudflare 的「托管 robots.txt」会在站点自己的 robots.txt 之前注入
 * Baiduspider / PetalBot 等爬虫的 Disallow: /。若处理不当，百度蜘蛛会拒绝抓取，
 * 主动推送（只是「提交 URL」）的页面就无法被抓取收录，等于白推。
 *
 * 本脚本按 RFC 9309 语义解析 robots.txt：
 *   - 匹配 product token 的多个组，规则必须合并
 *   - 组内按最长路径匹配；长度相同时 Allow 胜出
 * 并用真实爬虫 UA 字符串验证可抓取性。
 *
 * 用法：
 *   node scripts/check-robots-crawlable.js            # 校验线上
 *   node scripts/check-robots-crawlable.js --local    # 校验 site/robots.txt
 */
'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_URL = 'https://opc-story.top';
const LOCAL_FILE = path.resolve(__dirname, '..', 'site', 'robots.txt');

/* 真实爬虫 UA 字符串 */
const CRAWLERS = [
  { name: 'Baiduspider 主蜘蛛', ua: 'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)', must: true },
  { name: 'Baiduspider-image', ua: 'Baiduspider-image+(+http://www.baidu.com/search/spider.htm)', must: true },
  { name: 'Baiduspider-render', ua: 'Mozilla/5.0 (compatible; Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html)', must: true },
  { name: 'PetalBot 华为搜索', ua: 'Mozilla/5.0 (compatible; PetalBot;+https://webmaster.huawei.com/petalbot)', must: true },
  { name: 'Bytespider 字节', ua: 'Mozilla/5.0 (compatible; Bytespider; spider-feedback@bytedance.com)', must: true },
  { name: 'Googlebot', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', must: true },
  { name: 'GPTBot', ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.0; +https://openai.com/gptbot', must: true },
  { name: 'ClaudeBot', ua: 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)', must: true },
];

/* ---------- RFC 9309 解析 ---------- */
function parseGroups(txt) {
  const groups = [];
  let cur = null;
  for (const raw of txt.split('\n')) {
    const line = raw.split('#')[0].trim();
    if (!line) continue;
    const low = line.toLowerCase();
    if (low.startsWith('user-agent:')) {
      const ua = line.split(':')[1].trim().toLowerCase();
      if (!cur || cur.rules.length || cur.uas.indexOf(ua) >= 0) {
        cur = { uas: [], rules: [] };
        groups.push(cur);
      }
      cur.uas.push(ua);
    } else if (low.startsWith('allow:') || low.startsWith('disallow:')) {
      if (!cur) continue;
      const parts = line.split(':');
      cur.rules.push([parts[0].toLowerCase(), parts.slice(1).join(':').trim()]);
    }
  }
  return groups;
}

/* 从真实 UA 字符串中提取 product token */
function uaTokens(ua) {
  const tokens = new Set();
  /* 百度图片蜘蛛的 UA 形如 "Baiduspider-image+(+http://…)"，
     product token 在 '+' 之前，故先按 '+' 与空白/括号拆分 */
  const parts = ua.toLowerCase().split(/[+;\s()]+/);
  for (let p of parts) {
    p = p.trim();
    if (!p) continue;
    if (/^(mozilla|applewebkit|safari|khtml|chrome)\//.test(p)) continue;
    const base = p.split('/')[0];
    if (!base || base.indexOf('http') === 0 || base.indexOf('www') === 0) continue;
    tokens.add(base);
  }
  return tokens;
}

function canFetch(txt, ua) {
  const groups = parseGroups(txt);
  const tokens = uaTokens(ua);
  const matched = new Set();
  groups.forEach(function (g) {
    g.uas.forEach(function (u) {
      if (u === '*') return;
      if (tokens.has(u) || Array.from(tokens).some(function (t) { return t.indexOf(u) >= 0; })) {
        matched.add(u);
      }
    });
  });
  let match;
  if (!matched.size) {
    match = ['*'];
  } else {
    const maxLen = Math.max.apply(null, Array.from(matched).map(function (m) { return m.length; }));
    match = Array.from(matched).filter(function (m) { return m.length === maxLen; });
  }
  /* 合并所有匹配组的规则 */
  const rules = [];
  groups.forEach(function (g) {
    if (g.uas.some(function (u) { return match.indexOf(u) >= 0; })) {
      g.rules.forEach(function (r) { rules.push(r); });
    }
  });
  let best = null;
  rules.forEach(function (r) {
    const kind = r[0];
    let p = r[1];
    if (kind === 'disallow' && p === '') return;
    if (p.charAt(0) !== '/') p = '/' + p;
    if (best === null || p.length > best[1].length ||
        (p.length === best[1].length && kind === 'allow' && best[0] === 'disallow')) {
      best = [kind, p];
    }
  });
  if (best === null) return true;
  return best[0] === 'allow';
}

/* ---------- 取文件 ---------- */
function fetchOnline() {
  return new Promise(function (resolve, reject) {
    https.get(SITE_URL + '/robots.txt', { headers: { 'User-Agent': 'robots-check/1.0' }, timeout: 20000 }, function (res) {
      let d = '';
      res.on('data', function (c) { d += c; });
      res.on('end', function () { resolve(d); });
    }).on('error', reject).on('timeout', function () { reject(new Error('请求超时')); });
  });
}

/* ---------- 主流程 ---------- */
async function main() {
  const local = process.argv.indexOf('--local') >= 0;
  const txt = local
    ? fs.readFileSync(LOCAL_FILE, 'utf8')
    : await fetchOnline();

  const source = local ? 'site/robots.txt（本地）' : SITE_URL + '/robots.txt（线上）';
  console.log('检查来源：' + source);
  console.log('---');

  let failed = 0;
  CRAWLERS.forEach(function (c) {
    const ok = canFetch(txt, c.ua);
    const mark = ok ? 'PASS' : 'FAIL';
    if (!ok) failed++;
    console.log('  ' + mark + '  ' + c.name.padEnd(24) + (ok ? '可抓取' : '被禁止抓取'));
  });

  console.log('---');
  if (failed) {
    console.error('失败 ' + failed + ' 项：部分爬虫被 robots.txt 禁止抓取，会影响搜索收录。');
    process.exit(1);
  }
  console.log('全部 ' + CRAWLERS.length + ' 项通过。');
}

main().catch(function (e) {
  console.error('检查失败：' + e.message);
  process.exit(1);
});
