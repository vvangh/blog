/**
 * Content Collections 定义。
 * blog / build-log / life / fun；文章可挂 series、revisions。
 */
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const revisionSchema = z.object({
  /** 修订日期 */
  date: z.coerce.date(),
  /** 一句话说明观点如何变化 */
  summary: z.string(),
});

const postSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  /** 系列标识（同 series 的文按 seriesOrder 串联） */
  series: z.string().optional(),
  /** 系列内序号，越小越靠前 */
  seriesOrder: z.number().optional(),
  /** 观点修订时间线 */
  revisions: z.array(revisionSchema).default([]),
});

const buildLogSchema = postSchema.extend({
  milestone: z.string().optional(),
  commit: z.string().optional(),
  tag: z.string().optional(),
});

/** 生活：日记 / 胶片照片 */
const lifeSchema = postSchema.extend({
  kind: z.enum(["diary", "photo"]).default("diary"),
  /** 照片路径（相对 public/）或绝对 URL */
  image: z.string().optional(),
  caption: z.string().optional(),
  /** 城市级地点（旅行地图用，故意模糊到城市） */
  location: z.string().optional(),
  /** 纬度（可选，用于地图打点） */
  lat: z.number().optional(),
  /** 经度（可选） */
  lng: z.number().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: postSchema,
});

const buildLog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/build-log" }),
  schema: buildLogSchema,
});

const life = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/life" }),
  schema: lifeSchema,
});

/** 三期：娱乐占位集合 */
const fun = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/fun" }),
  schema: postSchema,
});

export const collections = {
  blog,
  "build-log": buildLog,
  life,
  fun,
};
