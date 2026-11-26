#!/usr/bin/env node
/**
 * 百度推送脚本的配额收敛回归测试（不请求真实接口）。
 *
 * 用本地 mock 服务端模拟百度返回，验证：
 *   1) 服务端剩余配额小于计划量时，收敛逻辑能用满剩余额度且不浪费
 *   2) 收敛过程不把被判定非法的 URL 记成已推送
 *   3) 服务端余额为 0 时干净退出，不报失败
 *
 * 用法：node scripts/test-baidu-push.js
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SCRIPT = path.join(__dirname, 'baidu-push.js');
const STATE_FILE = path.join(ROOT, '.baidu-push-state.json');
const TMP_SCRIPT = path.join(__dirname, '.baidu-push-test-run.js');

let failed = 0;
function assert(name, cond, detail) {
  if (cond) {
    console.log('PASS  ' + name);
  } else {
    console.log('FAIL  ' + name + (detail ? '  → ' + detail : ''));
    failed++;
  }
}

/**
 * 跑一次 mock 场景
 * @param {object} opt
 *   quota        服务端今日配额
 *   limit        本次计划推送条数
 *   invalidCount 前 N 条被判为非法
 * @returns {Promise<object>} { served, state, exitCode, stdout }
 */
function runScenario(opt) {
  return new Promise(function (resolve) {
    let served = [];
    const invalid = [];
    /* 固定前 N 条 sitemap URL 为非法（按 URL 判定，跨轮一致） */
    if (opt.invalidCount) {
      const xml = fs.readFileSync(path.join(ROOT, 'site', 'sitemap.xml'), 'utf8');
      const re = /<loc>([^<]+)<\/loc>/g;
      let m;
      /* 取与脚本优先级一致的前 N 条：用脚本自身的排序结果 */
      const all = [];
      while ((m = re.exec(xml)) !== null) all.push(m[1].trim());
      /* 核心页（/、/all、/insights/）排在最前，其后是报告页 */
      const core = ['https://opc-story.top/', 'https://opc-story.top/all', 'https://opc-story.top/insights/'];
      const ordered = core.filter(function (u) { return all.indexOf(u) >= 0; })
        .concat(all.filter(function (u) { return core.indexOf(u) < 0; }));
      for (let i = 0; i < opt.invalidCount && i < ordered.length; i++) {
        invalid.push(ordered[i]);
      }
    }

    const server = http.createServer(function (req, res) {
      let body = '';
      req.on('data', function (c) { body += c; });
      req.on('end', function () {
        const urls = body.split('\n').filter(Boolean);
        /* 固定的 invalidCount 条 URL 判为非法（按 URL 本身判定，跨轮一致） */
        const bad = urls.filter(function (u) { return invalid.indexOf(u) >= 0; });
        const good = urls.filter(function (u) { return invalid.indexOf(u) < 0; });
        /* 配额只约束被受理的条目 */
        if (served.length + good.length > opt.quota) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 400, message: 'over quota' }));
          return;
        }
        served = served.concat(good);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          remain: opt.quota - served.length,
          success: good.length,
          not_valid: bad,
        }));
      });
    });

    server.listen(0, '127.0.0.1', function () {
      const port = server.address().port;
      const patched = fs.readFileSync(SCRIPT, 'utf8').replace(
        /const target = 'http:\/\/data\.zz\.baidu\.com\/urls\?site=' \+ encodeURIComponent\(SITE_PARAM\) \+ '&token=' \+ TOKEN;/,
        "const target = 'http://127.0.0.1:" + port + "/urls?site=opc-story.top&token=x';"
      );
      fs.writeFileSync(TMP_SCRIPT, patched);

      /* 备份真实状态，用隔离状态跑测试 */
      const realState = fs.existsSync(STATE_FILE)
        ? fs.readFileSync(STATE_FILE, 'utf8') : null;
      fs.writeFileSync(STATE_FILE, JSON.stringify({ pushed: [], dates: {}, invalid: [] }, null, 2) + '\n');

      const child = spawn('node', [TMP_SCRIPT, '--limit', String(opt.limit), '--remain', String(opt.limit)], {
        env: Object.assign({}, process.env, { BAIDU_TOKEN: 'mock' }),
        cwd: ROOT,
      });
      let out = '';
      child.stdout.on('data', function (c) { out += c; });
      child.stderr.on('data', function (c) { out += c; });
      child.on('close', function (code) {
        const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        if (realState !== null) fs.writeFileSync(STATE_FILE, realState);
        else fs.unlinkSync(STATE_FILE);
        fs.unlinkSync(TMP_SCRIPT);
        server.close();
        resolve({ served: served, invalid: invalid, state: state, exitCode: code, stdout: out });
      });
    });
  });
}

async function main() {
  /* 场景 1：计划 10 条，服务端只剩 3 条 → 必须用满 3 条且不浪费 */
  const r1 = await runScenario({ quota: 3, limit: 10 });
  assert('场景1 服务端受理数 = 配额上限（零浪费）', r1.served.length === 3, '实际 ' + r1.served.length);
  assert('场景1 退出码为 0', r1.exitCode === 0, '实际 ' + r1.exitCode);
  assert('场景1 状态记录数 = 受理数', r1.state.pushed.length === 3, '实际 ' + r1.state.pushed.length);

  /* 场景 2：服务端配额充足（10 条计划 vs 10 条配额）→ 一次推完 */
  const r2 = await runScenario({ quota: 10, limit: 10 });
  assert('场景2 一次推满 10 条', r2.served.length === 10, '实际 ' + r2.served.length);
  assert('场景2 退出码为 0', r2.exitCode === 0, '实际 ' + r2.exitCode);

  /* 场景 3：服务端余额为 0 → 干净退出，不算失败，也不误记 */
  const r3 = await runScenario({ quota: 0, limit: 10 });
  assert('场景3 余额为 0 时退出码为 0', r3.exitCode === 0, '实际 ' + r3.exitCode);
  assert('场景3 未受理任何条目', r3.served.length === 0, '实际 ' + r3.served.length);
  assert('场景3 未误记已推送', r3.state.pushed.length === 0, '实际 ' + r3.state.pushed.length);

  /* 场景 4：被判定非法的条目不计入已推送，也不占用配额 */
  const r4 = await runScenario({ quota: 10, limit: 10, invalidCount: 2 });
  assert('场景4 非法条目未占配额（有效条目用满 10 条）', r4.served.length === 10, '实际 ' + r4.served.length);
  assert('场景4 非法条目未记入 pushed', r4.state.pushed.length === 10, '实际 ' + r4.state.pushed.length);
  assert('场景4 非法条目记入 invalid', (r4.state.invalid || []).length === 2, '实际 ' + (r4.state.invalid || []).length);
  assert('场景4 pushed 不含非法条目',
    r4.state.pushed.every(function (u) { return r4.invalid.indexOf(u) < 0; }), 'pushed 含非法条目');

  console.log('');
  console.log(failed === 0 ? '全部通过。' : '失败 ' + failed + ' 项。');
  process.exit(failed === 0 ? 0 : 1);
}

main();
