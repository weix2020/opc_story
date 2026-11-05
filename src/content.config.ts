import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  AI_TYPES,
  CATEGORIES,
  CONFIDENCE_LEVELS,
  LAUNCH_DATE_PRECISIONS,
  MAX_SUMMARY_LENGTH,
  MIN_AI_ROLE_LENGTH,
  MIN_DISTINCT_PUBLISHERS,
  MIN_PRIMARY_SOURCES,
  MIN_SOURCES,
  SOURCE_TYPES,
  normalizePublisher,
} from './lib/content-contract.mjs';

// 说明：Astro 5 的 content collection schema 位于 src/content.config.ts，
// 字段全部必填（不使用 .optional()），任何缺失或类型错误都会让 astro build 直接失败。

// 单条信源的结构约束
const sourceSchema = z
  .object({
    id: z.number().int().positive('信源 id 必须是正整数'),
    title: z.string().min(1, '信源标题不能为空'),
    publisher: z.string().min(1, '信源发布方不能为空'),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'publishedAt 必须是 YYYY-MM-DD 格式'),
    accessedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'accessedAt 必须是 YYYY-MM-DD 格式'),
    type: z.enum(SOURCE_TYPES),
    url: z.string().url('信源 url 必须是合法 URL'),
  })
  .strict();

// 营收预估子结构
const revenueEstimateSchema = z
  .object({
    value: z.string().min(1, 'revenueEstimate.value 不能为空'),
    basis: z.string().min(1, 'revenueEstimate.basis 不能为空'),
    confidence: z.enum(CONFIDENCE_LEVELS),
  })
  .strict();

// 种子互动指标子结构
const metricsSchema = z
  .object({
    views: z.number().int().nonnegative('views 必须是非负整数'),
    likes: z.number().int().nonnegative('likes 必须是非负整数'),
    shares: z.number().int().nonnegative('shares 必须是非负整数'),
  })
  .strict();

// 七维分析子结构
const dimensionsSchema = z
  .object({
    product: z.string().min(1, 'dimensions.product 不能为空'),
    audience: z.string().min(1, 'dimensions.audience 不能为空'),
    painPoint: z.string().min(1, 'dimensions.painPoint 不能为空'),
    revenue: z.string().min(1, 'dimensions.revenue 不能为空'),
    funding: z.string().min(1, 'dimensions.funding 不能为空'),
    evaluation: z.string().min(1, 'dimensions.evaluation 不能为空'),
    costRisk: z.string().min(1, 'dimensions.costRisk 不能为空'),
  })
  .strict();

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z
    .object({
      title: z.string().min(1, 'title 不能为空'),
      slug: z
        .string()
        .min(1, 'slug 不能为空')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug 必须是 kebab-case'),
      summary: z.string().min(1, 'summary 不能为空').max(MAX_SUMMARY_LENGTH, 'summary 不得超过 120 字符'),
      founder: z.string().min(1, 'founder 不能为空'),
      founded: z.string().min(1, 'founded 不能为空'),
      launchDate: z.string().min(1, 'launchDate 不能为空'),
      launchDatePrecision: z.enum(LAUNCH_DATE_PRECISIONS),
      hq: z.string().min(1, 'hq 不能为空'),
      teamSize: z.string().min(1, 'teamSize 不能为空'),
      category: z.array(z.enum(CATEGORIES)).min(1, 'category 至少要有一个标签'),
      aiType: z.enum(AI_TYPES),
      aiRole: z.string().min(MIN_AI_ROLE_LENGTH, 'aiRole 至少 15 个字符'),
      revenueEstimate: revenueEstimateSchema,
      funding: z.string().min(1, 'funding 不能为空'),
      website: z.string().url('website 必须是合法 URL'),
      metrics: metricsSchema,
      dimensions: dimensionsSchema,
      sources: z
        .array(sourceSchema)
        .min(MIN_SOURCES, 'sources 至少需要 5 条')
        .refine(
          (sources) => sources.filter((source) => source.type === 'primary').length >= MIN_PRIMARY_SOURCES,
          { message: 'sources 中至少需要 1 条 primary 类型信源' },
        )
        .refine(
          (sources) =>
            new Set(sources.map((source) => normalizePublisher(source.publisher)).filter(Boolean)).size >=
            MIN_DISTINCT_PUBLISHERS,
          { message: `sources 至少需要 ${MIN_DISTINCT_PUBLISHERS} 个独立发布方` },
        ),
    })
    .strict(),
});

export const collections = { projects };
