-- OPC 案例墙 · 全站互动计数（Cloudflare D1）
-- 用法：wrangler d1 execute opc-counts --remote --file=schema.sql

-- 计数主表：每个项目 × 每种互动一条
CREATE TABLE IF NOT EXISTS counter (
  slug TEXT    NOT NULL,
  kind TEXT    NOT NULL,          -- view | like | share
  n    INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (slug, kind)
);

-- 去重表：like 的 day 固定为空串（终身一次），view / share 用 UTC 日期（每天一次）
CREATE TABLE IF NOT EXISTS dedupe (
  slug TEXT NOT NULL,
  kind TEXT NOT NULL,
  vid  TEXT NOT NULL,             -- 浏览器端生成的访客 ID
  day  TEXT NOT NULL,
  PRIMARY KEY (slug, kind, vid, day)
);
