/**
 * Content Collections 定义。
 * blog / build-log 为一期；life / fun 为二期、三期预留骨架。
 */
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

const buildLogSchema = postSchema.extend({
  milestone: z.string().optional(),
  commit: z.string().optional(),
  tag: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: postSchema,
});

const buildLog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/build-log" }),
  schema: buildLogSchema,
});

/** 二期：生活（日记/相册等）占位集合 */
const life = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/life" }),
  schema: postSchema,
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
