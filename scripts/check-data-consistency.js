#!/usr/bin/env node
/**
 * 数据一致性检查
 * 扫描 site/report/<slug>/index.html，与 site/data/cases.json 逐条比对。
 *
 * 用法：
 *   node scripts/check-data-consistency.js          仅输出摘要与问题
 *   node scripts/check-data-consistency.js --json   输出 JSON
 *   node scripts/check-data-consistency.js --strict 警告也视为失败
 *
 * 检查分两级：
 *   error 结构性错误（目录/URL/canonical/信源数/枚举值），必须修复
 *   warn  内容层可能漂移（关键数字未在正文命中），需人工确认
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const CASES_FILE = path.join(ROOT, 'site/data/cases.json');
const LEDGER_FILE = path.join(ROOT, 'site/data/sources.json');
const REPORT_DIR = path.join(ROOT, 'site/report');
const TRACKS = ['作品型', '内容创作', '垂直应用', '营销电商', '开发者工具'];
const VERIFICATIONS = ['verified', 'cross', 'partial'];
const JSON_OUT = process.argv.includes('--json');
const STRICT = process.argv.includes('--strict');

const errors = [];
const warns = [];
const infos = [];

function err(slug, check, msg) { errors.push({ slug, check, msg }); }
function warn(slug, check, msg) { warns.push({ slug, check, msg }); }
function info(slug, check, msg) { infos.push({ slug, check, msg }); }

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ');
}

function norm(s) {
  return String(s || '')
    .replace(/[《》〈〉“”"'`·\s（）()【】\[\]：:，,。.\-—_+]/g, '')
    .toLowerCase();
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 与 build-source-ledger.js 保持一致的信源区块哈希 */
function sourcesHash(html) {
  const blocks = (html.match(/<li id="ref-\d+" class="src">[\s\S]*?<\/li>/g) || [])
    .map(function (b) { return b.replace(/\s+/g, ' ').trim(); });
  return crypto.createHash('sha1').update(blocks.join('\n')).digest('hex').slice(0, 16);
}

/** 判断某个金额（元）是否以常见中文格式出现在正文中 */
function hasAmount(text, yuan, opts) {
  if (yuan == null) return true;
  const allowMonthly = !opts || opts.allowMonthly !== false;
  const cands = [{ v: yuan / 1e4, u: '万' }];
  if (yuan >= 1e8) cands.push({ v: yuan / 1e8, u: '亿' });
  if (allowMonthly) cands.push({ v: yuan / 12 / 1e4, u: '万' });
  for (const c of cands) {
    for (const d of [0, 1, 2]) {
      const fixed = c.v.toFixed(d);
      const forms = [fixed, fixed.replace(/\.0+$/, '')];
      for (const s of forms) {
        if (s === '0') continue;
        const re = new RegExp('(?<![\\d.])' + escapeRe(s) + '\\s*' + c.u);
        if (re.test(text)) return true;
      }
    }
  }
  return false;
}

/** 判断用户数是否以 万/亿 或原文数字出现 */
function hasCount(text, n) {
  if (n == null) return true;
  for (const c of [{ v: n / 1e4, u: '万' }, { v: n / 1e8, u: '亿' }]) {
    if (c.v < 0.01) continue;
    for (const d of [0, 1, 2]) {
      const fixed = c.v.toFixed(d);
      const forms = [fixed, fixed.replace(/\.0+$/, '')];
      for (const s of forms) {
        if (s === '0') continue;
        if (new RegExp('(?<![\\d.])' + escapeRe(s) + '\\s*' + c.u).test(text)) return true;
      }
    }
  }
  return new RegExp('(?<![\\d.])' + n + '(?![\\d])').test(text.replace(/(\d),(?=\d{3})/g, '$1'));
}

/** 原文区间/区间中点场景：evidence 里的数字只要有一个带单位出现，就认为可追溯 */
function evidenceTraceable(evidence, text) {
  if (!evidence) return false;
  const nums = String(evidence).match(/\d+(?:\.\d+)?/g) || [];
  return nums.some(function (n) {
    return new RegExp('(?<![\\d.])' + escapeRe(n) + '\\s*(万|亿|元|美元|港币)').test(text);
  });
}

function main() {
  if (!fs.existsSync(CASES_FILE)) {
    console.error('找不到 ' + CASES_FILE);
    process.exit(2);
  }
  const data = JSON.parse(fs.readFileSync(CASES_FILE, 'utf8'));
  const cases = data.cases || [];
  const dirs = new Set(fs.readdirSync(REPORT_DIR).filter(function (d) {
    return fs.statSync(path.join(REPORT_DIR, d)).isDirectory();
  }));

  // 1. 全局唯一性
  const seen = { slug: {}, url: {}, id: {} };
  cases.forEach(function (c) {
    ['slug', 'url', 'id'].forEach(function (k) {
      const v = c[k];
      if (v == null) return;
      if (seen[k][v]) err(c.slug, 'unique', k + ' 重复：' + v);
      seen[k][v] = true;
    });
  });

  // 2. 目录与数据集合互相覆盖
  const dataSlugs = new Set(cases.map(function (c) { return c.slug; }));
  dirs.forEach(function (d) {
    if (!dataSlugs.has(d)) err(d, 'orphan', '报告目录存在但 cases.json 无对应条目');
  });

  // 2.5 信源台账
  const ledgerBySlug = {};
  let ledger = null;
  if (fs.existsSync(LEDGER_FILE)) {
    ledger = JSON.parse(fs.readFileSync(LEDGER_FILE, 'utf8'));
    (ledger.cases || []).forEach(function (e) { ledgerBySlug[e.slug] = e; });
  } else {
    warn('*', 'ledger', '未找到 site/data/sources.json，跳过信源台账校验（运行 node scripts/build-source-ledger.js 生成）');
  }
  const uncited = [];

  cases.forEach(function (c) {
    const slug = c.slug;
    const urlSlug = (String(c.url || '').split('/report/')[1] || '').replace(/\/$/, '');
    if (!urlSlug) { err(slug, 'url', 'url 不是报告地址：' + c.url); return; }
    if (c.slug !== urlSlug) err(slug, 'slug-url', 'slug(' + c.slug + ') 与 URL slug(' + urlSlug + ') 不一致');
    if (!dirs.has(urlSlug)) { err(slug, 'dir', '缺少报告目录 site/report/' + urlSlug + '/'); return; }

    const file = path.join(REPORT_DIR, urlSlug, 'index.html');
    if (!fs.existsSync(file)) { err(slug, 'file', '缺少 index.html'); return; }
    const html = fs.readFileSync(file, 'utf8');
    const text = textOf(html);

    // 3. canonical
    const can = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
    if (!can) err(slug, 'canonical', '缺少 canonical');
    else if (can[1] !== c.url) err(slug, 'canonical', 'canonical 与 url 不一致：' + can[1]);

    // 4. JSON-LD 可解析
    const jsonLdBlocks = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
    let published = null;
    jsonLdBlocks.forEach(function (block) {
      const body = block.replace(/^[\s\S]*?>/, '').replace(/<\/script>$/i, '');
      let obj;
      try { obj = JSON.parse(body); } catch (e) { err(slug, 'jsonld', 'JSON-LD 解析失败：' + e.message); return; }
      const find = function (o) {
        if (!o || typeof o !== 'object') return;
        if (o['@type'] === 'Article' || o['@type'] === 'NewsArticle') published = o.datePublished || published;
        Object.keys(o).forEach(function (k) { if (o[k] && typeof o[k] === 'object') find(o[k]); });
      };
      find(obj);
    });

    // 5. 信源数量
    const refs = new Set((html.match(/id="ref-(\d+)"/g) || []).map(function (m) { return m.replace(/\D/g, ''); }));
    if (c.source_count != null && refs.size !== c.source_count) {
      err(slug, 'sources', 'source_count=' + c.source_count + '，报告实际信源条目=' + refs.size);
    }

    // 5.5 台账是否与报告同步
    if (ledger) {
      const entry = ledgerBySlug[c.slug];
      if (!entry) {
        err(slug, 'ledger', '信源台账缺少该案例');
      } else {
        if (entry.sources_hash !== sourcesHash(html)) {
          err(slug, 'ledger', '信源台账已过期，请运行 node scripts/build-source-ledger.js');
        }
        if (entry.source_count !== refs.size) {
          err(slug, 'ledger', '台账信源数 ' + entry.source_count + ' 与报告 ' + refs.size + ' 不一致');
        }
        (entry.sources || []).forEach(function (s) {
          if (!s.cited) uncited.push(c.slug + '[ref-' + s.ref + ']');
        });
      }
    }

    // 6. 枚举与年份
    if (!TRACKS.includes(c.track)) err(slug, 'track', '未知赛道：' + c.track);
    if (!VERIFICATIONS.includes(c.verification)) err(slug, 'verification', '未知核验等级：' + c.verification);

    // 7. 标题/创业者/数字
    const nameNorms = [norm(c.name), norm(String(c.name).replace(/（.*?）/g, '')), norm(String(c.name).split('·')[0])]
      .filter(function (s) { return s.length >= 2; });
    if (!nameNorms.some(function (n) { return norm(text).includes(n); })) {
      warn(slug, 'name', '正文未出现项目名「' + c.name + '」');
    }
    if (c.founder && !norm(text).includes(norm(c.founder))) {
      warn(slug, 'founder', '正文未出现创业者「' + c.founder + '」');
    }
    if (c.revenue_cny_annualized != null) {
      if (!hasAmount(text, c.revenue_cny_annualized, { allowMonthly: /月|单店|合同/.test(c.revenue_note || '') || true })) {
        if (evidenceTraceable(c.evidence, text)) info(slug, 'revenue', '年化值未直接命中，但 evidence 区间数字可追溯');
        else warn(slug, 'revenue', '正文未找到收入数字（' + c.revenue_cny_annualized + ' 元 / ' + c.revenue_note + '）');
      }
    }
    if (c.users != null) {
      if (!hasCount(text, c.users)) {
        if (evidenceTraceable(c.evidence, text)) info(slug, 'users', '用户数未直接命中，但 evidence 数字可追溯');
        else warn(slug, 'users', '正文未找到用户数（' + c.users + ' / ' + (c.users_note || '') + '）');
      }
    }
    if (c.time_anchor && published && String(published).slice(0, 4) !== String(c.time_anchor).slice(0, 4)) {
      warn(slug, 'date', 'JSON-LD datePublished(' + published + ') 与 time_anchor(' + c.time_anchor + ') 年份不一致');
    }
  });

  // 7.5 台账聚合校验
  if (ledger) {
    const sum = (ledger.cases || []).reduce(function (n, e) { return n + (e.source_count || 0); }, 0);
    if (ledger.meta && ledger.meta.total_sources != null && ledger.meta.total_sources !== sum) {
      err('*', 'ledger-meta', '台账 meta.total_sources=' + ledger.meta.total_sources + '，各案例合计=' + sum);
    }
    if (uncited.length) {
      warn('*', 'uncited', '共 ' + uncited.length + ' 条信源未被正文引用：' + uncited.slice(0, 5).join('、') + (uncited.length > 5 ? ' 等' : ''));
    }
  }

  // 8. 汇总输出
  const byCheck = function (list) {
    const m = {};
    list.forEach(function (x) { m[x.check] = (m[x.check] || 0) + 1; });
    return m;
  };
  const result = {
    generated_at: new Date().toISOString(),
    cases: cases.length,
    reports: dirs.size,
    errors: errors,
    warnings: warns,
    infos: infos,
    error_summary: byCheck(errors),
    warning_summary: byCheck(warns)
  };

  if (JSON_OUT) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log('数据一致性检查 · ' + cases.length + ' 例 / ' + dirs.size + ' 个报告目录');
    console.log('错误 ' + errors.length + ' · 警告 ' + warns.length + ' · 提示 ' + infos.length);
    if (errors.length) {
      console.log('\n== 错误（必须修复）');
      errors.forEach(function (e) { console.log('  [' + e.check + '] ' + e.slug + '：' + e.msg); });
    }
    if (warns.length) {
      console.log('\n== 警告（建议人工确认）');
      warns.forEach(function (w) { console.log('  [' + w.check + '] ' + w.slug + '：' + w.msg); });
    }
    if (infos.length) {
      console.log('\n== 提示（区间值可追溯，不计入问题）');
      console.log('  ' + Object.keys(byCheck(infos)).map(function (k) { return k + '×' + byCheck(infos)[k]; }).join('  '));
    }
    if (!errors.length && !warns.length) console.log('\n全部一致。');
    if (Object.keys(result.error_summary).length) console.log('\n错误分类：' + JSON.stringify(result.error_summary));
    if (Object.keys(result.warning_summary).length) console.log('警告分类：' + JSON.stringify(result.warning_summary));
  }

  const failed = errors.length > 0 || (STRICT && warns.length > 0);
  process.exit(failed ? 1 : 0);
}

main();
