#!/usr/bin/env node
/**
 * 通过 Google Search Console API 提交站点地图，并读取索引状态。
 *
 * 背景：百度侧有「链接提交·普通收录」的主动推送接口（每日 10 条配额），
 * 而 Google 侧此前完全依赖爬虫被动发现，GSC 后台因此长期有 90 个页面
 * 处于「未编入索引」。Google Indexing API 只支持 JobPosting / BroadcastEvent，
 * 普通网页用它会违规；GSC API 的 sitemaps.put 则是官方支持途径。
 *
 * 提交 sitemap 的作用是让 Google 重新读取 sitemap 并重排抓取队列；
 * 真正的「请求索引」仍需在 GSC 后台用网址检查工具操作。
 *
 * 用法：
 *   node scripts/gsc-submit-sitemap.js            # 提交 sitemap
 *   node scripts/gsc-submit-sitemap.js --status   # 只读：查看 sitemap 与索引状态
 *
 * 环境变量：
 *   GSC_SITE_URL  站点地址，默认 https://opc-story.top/
 *   GSC_SITEMAP   sitemap 地址，默认 <站点>/sitemap.xml
 *   GSC_TOKEN     访问令牌（service account 换取的 OAuth2 access token）
 */
'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = process.env.GSC_SITE_URL || 'https://opc-story.top/';
const SITEMAP = process.env.GSC_SITEMAP || SITE_URL.replace(/\/$/, '') + '/sitemap.xml';
const TOKEN = process.env.GSC_TOKEN;

const API = 'https://searchconsole.googleapis.com/v1';

/* sitemap.xml 里声明的 URL 数，用于核对 GSC 是否全部发现 */
function sitemapUrlCount() {
  const f = path.join(ROOT, 'site', 'sitemap.xml');
  try {
    const xml = fs.readFileSync(f, 'utf8');
    return (xml.match(/<loc>/g) || []).length;
  } catch (e) {
    return null;
  }
}

function api(method, apiPath, body) {
  return new Promise(function (resolve, reject) {
    const data = body ? JSON.stringify(body) : null;
    const url = API + apiPath;
    const req = https.request(url, {
      method: method,
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': data ? Buffer.byteLength(data) : 0,
        'User-Agent': 'opc-story-gsc/1.0',
      },
      timeout: 30000,
    }, function (res) {
      let out = '';
      res.on('data', function (c) { out += c; });
      res.on('end', function () {
        let j = null;
        try { j = JSON.parse(out); } catch (e) { j = out; }
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(j);
        else reject(new Error('HTTP ' + res.statusCode + ': ' + (j && j.error ? j.error.message : out)));
      });
    });
    req.on('timeout', function () { req.destroy(new Error('请求超时')); });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  const statusOnly = process.argv.indexOf('--status') >= 0;

  if (!TOKEN) {
    console.error('缺少 GSC_TOKEN。');
    console.error('在 CI 中由 Secret GSC_TOKEN 注入；本地可先换取访问令牌再注入。');
    process.exit(1);
  }

  const site = encodeURIComponent(SITE_URL);
  const localCount = sitemapUrlCount();
  console.log('站点：' + SITE_URL);
  console.log('站点地图：' + SITEMAP);
  if (localCount) console.log('本地 sitemap URL 数：' + localCount);
  console.log('---');

  /* 1. 列出已提交的 sitemap */
  let listed = [];
  try {
    const r = await api('GET', '/sites/' + site + '/sitemaps');
    listed = r.sitemap || [];
    console.log('GSC 中已提交的 sitemap（' + listed.length + ' 个）：');
    listed.forEach(function (s) {
      const isOur = s.path === SITEMAP || (s.path || '').indexOf('opc-story.top/sitemap') >= 0;
      console.log(
        '  ' + (isOur ? '★ ' : '  ') + s.path +
        ' | 最后提交：' + (s.lastSubmitted || '—') +
        ' | 已发现：' + (s.isPending ? '处理中' : (s.errors || '无错误'))
      );
    });
  } catch (e) {
    console.log('读取 sitemap 列表失败：' + e.message);
  }

  if (statusOnly) {
    console.log('---');
    console.log('（--status 模式，未做任何提交）');
    return;
  }

  /* 2. 提交（put）站点地图 */
  try {
    await api('PUT', '/sites/' + site + '/sitemaps/' + encodeURIComponent(SITEMAP));
    console.log('已提交站点地图：' + SITEMAP);
  } catch (e) {
    console.error('提交失败：' + e.message);
    process.exitCode = 1;
    return;
  }

  /* 3. 读回该 sitemap 的状态 */
  try {
    const r = await api('GET', '/sites/' + site + '/sitemaps/' + encodeURIComponent(SITEMAP));
    console.log('---');
    console.log('提交后状态：');
    console.log('  最后提交：' + (r.lastSubmitted || '—'));
    console.log('  错误：' + (r.errors || '无'));
    console.log('  是否处理中：' + (r.isPending ? '是' : '否'));
    if (r.isSitemapsIndex) console.log('  类型：站点地图索引');
    if (r.contentTypes) console.log('  内容类型：' + JSON.stringify(r.contentTypes));
  } catch (e) {
    console.log('读取提交状态失败：' + e.message);
  }
}

main().catch(function (e) {
  console.error('失败：' + e.message);
  process.exit(1);
});
