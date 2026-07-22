/**
 * 开发态搜索目录：不依赖 Pagefind 构建，改文即随 Astro 刷新可搜。
 * 仅在 import.meta.env.DEV 时由布局注入；生产走 Pagefind。
 * 本文件含 astro:content，禁止被 Vue 岛直接 import。
 */
import { getCollection } from "astro:content";
import { publishedSorted } from "@/content/_helpers";
import { localePath, translate, type Locale, type MessageKey } from "@/lib/i18n";
import type { DevSearchEntry } from "./types";

export type { DevSearchEntry };

const COLLECTION_PATH: Record<"blog" | "build-log" | "life" | "fun", string> = {
  blog: "blog",
  "build-log": "build",
  life: "life",
  fun: "fun",
};

/** 静态频道页（仅当前语言，避免结果里刷出 zh-Hans 等噪音） */
function staticPages(locale: Locale): DevSearchEntry[] {
  const pages: Array<{ path: string; titleKey: MessageKey }> = [
    { path: "", titleKey: "nav.home" },
    { path: "blog", titleKey: "nav.blog" },
    { path: "build", titleKey: "nav.build" },
    { path: "life", titleKey: "nav.life" },
    { path: "fun", titleKey: "nav.fun" },
    { path: "about", titleKey: "nav.about" },
    { path: "archive", titleKey: "nav.archive" },
    { path: "friends", titleKey: "nav.friends" },
    { path: "lab", titleKey: "nav.lab" },
    { path: "on-this-day", titleKey: "onThisDay.title" },
    { path: "tags", titleKey: "nav.tags" },
  ];
  return pages.map((p) => ({
    id: `page:${locale}:${p.path || "home"}`,
    url: localePath(locale, p.path),
    title: translate(locale, p.titleKey),
    excerpt: "",
  }));
}

function pushEntries(
  out: DevSearchEntry[],
  locale: Locale,
  collection: keyof typeof COLLECTION_PATH,
  entries: Array<{ id: string; data: { title: string; description?: string } }>,
): void {
  const segment = COLLECTION_PATH[collection];
  for (const entry of entries) {
    out.push({
      id: `${collection}:${locale}:${entry.id}`,
      url: localePath(locale, `${segment}/${entry.id}`),
      title: entry.data.title,
      excerpt: entry.data.description ?? "",
    });
  }
}

/** @param locale 只编当前语言目录，减轻噪音与体积 */
export async function buildDevSearchCatalog(locale: Locale): Promise<DevSearchEntry[]> {
  const out: DevSearchEntry[] = [...staticPages(locale)];

  // 字面量分别取集：避免 getCollection(变量) 被 tsgolint 收成无 title 的交叉类型
  pushEntries(out, locale, "blog", publishedSorted(await getCollection("blog")));
  pushEntries(out, locale, "build-log", publishedSorted(await getCollection("build-log")));
  pushEntries(out, locale, "life", publishedSorted(await getCollection("life")));
  pushEntries(out, locale, "fun", publishedSorted(await getCollection("fun")));

  return out;
}
