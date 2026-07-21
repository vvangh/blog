/**
 * 按语言输出 RSS：/blog/<locale>/rss.xml
 */
import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { publishedSorted } from "@/content/_helpers";
import { LOCALES, isLocale, localePath, type Locale } from "@/lib/i18n";
import { SITE_DESCRIPTION, SITE_NAME_ZH } from "@/lib/site";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

export const GET: APIRoute = async (context) => {
  const raw = context.params.locale ?? "zh-Hans";
  if (!isLocale(raw)) {
    return new Response("Not Found", { status: 404 });
  }
  const locale: Locale = raw;
  const posts = publishedSorted(await getCollection("blog"));

  return rss({
    title: `${SITE_NAME_ZH} · ${locale}`,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: localePath(locale, `blog/${post.id}`),
    })),
    customData: `<language>${locale}</language>`,
  });
};
