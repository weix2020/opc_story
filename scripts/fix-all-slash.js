#!/usr/bin/env node
/**
 * 把「全部案例索引」页的 URL 从 /all 统一为 /all/。
 *
 * 背景：全站其它目录页（/insights/、/privacy/、/about/、/contact/、
 * /what-is-opc/、/method/、/data-notes/、/push-status/）一律以末尾斜杠为准，
 * 无斜杠形式会 308 跳转到带斜杠版本。唯独 /all 是反的：
 *   /all  → 200
 *   /all/ → 308 Location: /all
 *
 * 这带来两个问题：
 *   1) URL 规范不一致，Google 可能把 /all 与 /all/ 当作两个不同 URL；
 *   2) 外部或用户习惯用带斜杠形式访问，抓到 /all/ 被重定向到 /all，
 *      GSC 归类为「网页会重新定向」，不予索引。
 *
 * 本脚本把全站（含 sitemap、canonical、og:url、JSON-LD、面包屑、站内链接、
 * llms.txt 等）里指向 https://opc-story.top/all 的引用统一改为 /all/，
 * 并确保站点在 /all/ 下以 200 直接返回。
 *
 * 用法：node scripts/fix-all-slash.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'site');

/* 需要修正的文件类型 */
const WALK_EXT = ['.html', '.txt', '.xml', '.json'];

function walk(dir, out) {
  out = out || [];
  fs.readdirSync(dir).forEach(function (name) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === '.git') return;
      walk(p, out);
    } else if (WALK_EXT.indexOf(path.extname(name)) >= 0) {
      out.push(p);
    }
  });
  return out;
}

/* 各种引用形态 → 统一为带斜杠 */
const RULES = [
  /* 绝对 URL：结尾的 /all 不带斜杠 → /all/ */
  { re: /https:\/\/opc-story\.top\/all(?![\w-])/g, to: 'https://opc-story.top/all/' },
  /* 站内绝对链接 href="/all" */
  { re: /href="\/all"(?![\w-])/g, to: 'href="/all/"' },
  /* 站内相对链接 href="../all" / "../../all" */
  { re: /href="((?:\.\.\/)+)all"(?![\w-])/g, to: 'href="$1all/"' },
  /* 相对链接 all/xxx（index.html 同级） */
  { re: /href="all(?![\w-/])/g, to: 'href="all/' },
];

function main() {
  const files = walk(SITE);
  let changedFiles = 0;
  let totalRepl = 0;

  files.forEach(function (f) {
    const before = fs.readFileSync(f, 'utf8');
    let after = before;
    let n = 0;

    RULES.forEach(function (r) {
      after = after.replace(r.re, function (m, g1) {
        n++;
        return r.to.replace('$1', g1 || '');
      });
    });

    if (after !== before) {
      fs.writeFileSync(f, after);
      changedFiles++;
      totalRepl += n;
      console.log('  ' + path.relative(ROOT, f) + '：' + n + ' 处');
    }
  });

  console.log('---');
  console.log('共修改 ' + changedFiles + ' 个文件、' + totalRepl + ' 处引用。');
  console.log('注意：/all/ 需能以 200 直接返回，否则会变成反向跳转。');
}

main();
