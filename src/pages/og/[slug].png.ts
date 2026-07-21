/**
 * 动态 OG PNG：`/blog/og/<slug>.png`
 * getStaticPaths 预生成首页与分区常用卡。
 */
import type { APIRoute } from "astro";
import { renderOgPng } from "@/lib/og";

const CARDS: { slug: string; title: string; subtitle?: string }[] = [
  { slug: "home", title: "vv", subtitle: "Tech · life · fun" },
  { slug: "blog", title: "Tech Notes", subtitle: "Engineering notes" },
  { slug: "build", title: "From Zero", subtitle: "Build log" },
  { slug: "life", title: "Life", subtitle: "Coming later" },
  { slug: "fun", title: "Fun", subtitle: "Coming later" },
];

export function getStaticPaths() {
  return CARDS.map((card) => ({
    params: { slug: card.slug },
    props: { title: card.title, subtitle: card.subtitle },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng({
    title: String(props.title ?? "vv"),
    subtitle: props.subtitle ? String(props.subtitle) : undefined,
  });
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
