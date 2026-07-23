/**
 * 相关文章：按 tags 重叠数打分，同分较新优先。
 * 目录外请经 `@/lib/related` 导入。
 */

export type RelatedPostInput = {
  id: string;
  title: string;
  description?: string;
  tags?: readonly string[];
  pubDate: Date;
};

export type RelatedScored = {
  post: RelatedPostInput;
  score: number;
};

/**
 * 为当前文挑选相关文章；无标签重叠时返回空数组。
 */
export function getRelatedPosts(
  currentId: string,
  all: readonly RelatedPostInput[],
  limit = 3,
): RelatedPostInput[] {
  const current = all.find((p) => p.id === currentId);
  if (!current) return [];

  const currentTags = new Set(current.tags ?? []);
  if (currentTags.size === 0) return [];

  return all
    .filter((p) => p.id !== currentId)
    .map((post) => {
      const score = (post.tags ?? []).reduce((n, tag) => n + (currentTags.has(tag) ? 1 : 0), 0);
      return { post, score } satisfies RelatedScored;
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.post.pubDate.valueOf() - a.post.pubDate.valueOf();
    })
    .slice(0, limit)
    .map((item) => item.post);
}
