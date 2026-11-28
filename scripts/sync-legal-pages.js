#!/usr/bin/env node
/**
 * 接入合规与信任页面（privacy / about / contact）所需的站点级改动：
 *   - index.html 与 all.html 页脚加入合规链接
 *   - index.html 侧边指南导航加入「关于本站」
 *   - ads.txt 写入 AdSense 发布商 ID
 *   - sitemap.xml 收录三个新页面
 *   - llms.txt / llms-full.txt 顶部加入新页面索引
 *
 * 用法：node scripts/sync-legal-pages.js [ca-pub-id]
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const TODAY = '2026-11-26';

const PUB_ID = process.argv[2] || process.env.ADSEENSE_PUB_ID || 'ca-pub-0000000000000000';

/* ---------- 1. index.html 页脚 + 侧边导航 ---------- */
{
  const f = path.join(SITE, 'index.html');
  let h = fs.readFileSync(f, 'utf8');

  /* 侧边指南导航：加入「关于本站」 */
  if (h.indexOf('href="about/"') < 0) {
    h = h.replace(
      /(<nav class="side-guides" aria-label="指南">[\s\S]*?)(<\/nav>)/,
      '$1\n  <a href="about/"><b>GUIDE 04</b>关于本站</a>$2'
    );
  }

  /* 页脚：index.html 目前没有 <footer>，在 </body> 前插入 */
  if (h.indexOf('<footer class="site-foot"') < 0) {
    const foot = [
      '',
      '<footer class="site-foot">',
      '  <div class="sf-inner">',
      '    <div class="sf-links">',
      '      <a href="what-is-opc/">什么是 OPC</a>',
      '      <a href="method/">信源核验标准</a>',
      '      <a href="data-notes/">数据口径</a>',
      '      <a href="insights/">数据洞察</a>',
      '      <a href="about/">关于本站</a>',
      '      <a href="contact/">联系我们</a>',
      '      <a href="privacy/">隐私政策</a>',
      '    </div>',
      '    <div class="sf-note">OPC Story · 收录 110 例 · 数据检索截止 ' + TODAY +
        ' · 所有经营数据标注口径，不构成投资建议</div>',
      '  </div>',
      '</footer>',
      '',
    ].join('\n');
    h = h.replace(/\n<\/body>/, foot + '\n</body>');
  }

  /* 页脚样式 */
  if (h.indexOf('.site-foot{') < 0) {
    h = h.replace('</style>', [
      '/* 站点页脚（合规链接） */',
      '.site-foot{border-top:1px solid var(--line);background:#080b11;padding:26px 24px 34px;margin-top:10px}',
      '.sf-inner{max-width:1080px;margin:0 auto;text-align:center}',
      '.sf-links{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 22px;margin-bottom:12px}',
      '.sf-links a{color:var(--sub);text-decoration:none;font-size:13.5px;transition:color .18s}',
      '.sf-links a:hover{color:var(--gold)}',
      '.sf-note{color:var(--faint);font-size:12.5px;line-height:1.9}',
      '@media(max-width:720px){.sf-links{gap:6px 16px}.sf-links a{font-size:12.5px}}',
    ].join('\n') + '\n</style>');
  }

  fs.writeFileSync(f, h);
  console.log('index.html：页脚合规链接与侧边「关于本站」已就位');
}

/* ---------- 2. all.html 页脚 ---------- */
{
  const f = path.join(SITE, 'all', 'index.html');
  let h = fs.readFileSync(f, 'utf8');
  if (h.indexOf('/privacy/') < 0) {
    h = h.replace(
      /(<footer>[\s\S]*?<\/footer>)/,
      function (m0) {
        return m0.replace(
          /(\s*)<a href="\/">← 返回/,
          '$1<a href="/about/">关于本站</a> · <a href="/contact/">联系我们</a> · <a href="/privacy/">隐私政策</a><br>$1<a href="/">← 返回'
        );
      }
    );
  }
  fs.writeFileSync(f, h);
  console.log('all.html：页脚合规链接已就位');
}

/* ---------- 3. 报告页页脚 ---------- */
{
  /* 110 个报告页的页脚统一加合规链接 */
  const dir = path.join(SITE, 'report');
  const slugs = fs.readdirSync(dir).filter(function (s) {
    return fs.existsSync(path.join(dir, s, 'index.html'));
  });
  let changed = 0;
  slugs.forEach(function (s) {
    const f = path.join(dir, s, 'index.html');
    let h = fs.readFileSync(f, 'utf8');
    if (h.indexOf('/privacy/') >= 0) return;
    /* 插到 <footer> 内（页脚）而非面包屑 */
    const footRe = /(<footer[^>]*>)([\s\S]*?)(<\/footer>)/;
    const mf = h.match(footRe);
    if (!mf) return;
    if (mf[2].indexOf('/privacy/') >= 0) return;
    const legal = '<a href="../../about/">关于本站</a> · <a href="../../contact/">联系我们</a> · <a href="../../privacy/">隐私政策</a><br>';
    const newFoot = mf[1] + legal + mf[2] + mf[3];
    h = h.replace(mf[0], newFoot);
    fs.writeFileSync(f, h);
    changed++;
  });
  console.log('report/：' + changed + ' 个报告页页脚已加入合规链接');
}

/* ---------- 4. ads.txt ---------- */
/* 本站不投放广告，故不生成 ads.txt。若未来接入 AdSense，
   用 `node scripts/sync-legal-pages.js <ca-pub-id>` 生成。 */
if (fs.existsSync(path.join(SITE, 'ads.txt'))) {
  const f = path.join(SITE, 'ads.txt');
  const body = [
    '# ads.txt for opc-story.top',
    '# Google AdSense publisher ID',
    'google.com, ' + PUB_ID + ', DIRECT, f08c47fec0942fa0',
    '',
  ].join('\n');
  fs.writeFileSync(f, body);
  console.log('ads.txt：已写入 ' + PUB_ID);
}

/* ---------- 5. sitemap.xml ----------
 * sitemap.xml 改由 scripts/build-sitemap.js 统一生成（按站点实际页面遍历，
 * lastmod 取内容真实变更日期），此处不再插入条目，避免两处来源不一致。 */
console.log('sitemap.xml：由 build-sitemap.js 统一生成，本脚本不再插入');

/* ---------- 6. llms.txt / llms-full.txt ---------- */
{
  const f = path.join(SITE, 'llms.txt');
  let h = fs.readFileSync(f, 'utf8');
  if (h.indexOf('/about/') < 0) {
    h = h.replace(
      /(> 方法论（建议优先阅读）：)/,
      '> 关于本站与联系方式：\n> - 关于本站（我们是谁、案例如何入选、数据从哪来）：https://opc-story.top/about/\n' +
      '> - 联系我们（勘误、授权、合作）：https://opc-story.top/contact/\n' +
      '> - 隐私政策（收集什么、第三方 Cookie 与广告）：https://opc-story.top/privacy/\n$1'
    );
  }
  fs.writeFileSync(f, h);
  console.log('llms.txt：新页面索引已加入');
}
{
  const f = path.join(SITE, 'llms-full.txt');
  let h = fs.readFileSync(f, 'utf8');
  if (h.indexOf('https://opc-story.top/about/') < 0) {
    h = h.replace(
      /(> 引用建议：)/,
      '> 站点其他页面：关于本站 https://opc-story.top/about/ ｜ 联系我们 https://opc-story.top/contact/ ｜ 隐私政策 https://opc-story.top/privacy/\n$1'
    );
  }
  fs.writeFileSync(f, h);
  console.log('llms-full.txt：新页面索引已加入');
}

console.log('\n完成。');
