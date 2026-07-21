/**
 * 构建期 OG PNG：Satori + Inter（拉丁），标题含非拉丁时回退品牌英文标识。
 * 目录外请经 `@/lib/og` 导入。
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { SITE_NAME_EN, SITE_TAGLINE } from "@/lib/site";

export interface OgPayload {
  title: string;
  subtitle?: string;
}

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function displayTitle(title: string): string {
  // Inter 不含 CJK；非 ASCII 标题用站名英文，完整中文走 og:title meta
  return hasNonAscii(title) ? SITE_NAME_EN : title;
}

function hasNonAscii(value: string): boolean {
  for (const ch of value) {
    if (ch.codePointAt(0)! > 0x7f) return true;
  }
  return false;
}

async function loadInter(): Promise<ArrayBuffer> {
  const fontPath = path.join(
    rootDir,
    "node_modules/@fontsource/inter/files/inter-latin-700-normal.woff",
  );
  const buf = await readFile(fontPath);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

/** 生成 1200×630 PNG Buffer */
export async function renderOgPng(payload: OgPayload): Promise<Buffer> {
  const font = await loadInter();
  const title = displayTitle(payload.title);
  const subtitle = payload.subtitle ?? SITE_TAGLINE;
  // 副标题若含 CJK，改用英文标识，避免 tofu
  const sub = hasNonAscii(subtitle) ? `${SITE_NAME_EN} · personal site` : subtitle;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #0f1412 0%, #1a2420 55%, #24352e 100%)",
          color: "#f2efe8",
          fontFamily: "Inter",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 36,
                      color: "#7eb6a4",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    },
                    children: SITE_NAME_EN,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 18px",
                      borderRadius: "999px",
                      border: "2px solid #7eb6a4",
                      color: "#7eb6a4",
                      fontSize: 22,
                      fontWeight: 700,
                    },
                    children: "vv · From Zero",
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: { fontSize: 64, fontWeight: 700, lineHeight: 1.15, maxWidth: "1000px" },
              children: title,
            },
          },
          {
            type: "div",
            props: {
              style: { fontSize: 28, color: "#a8a59c" },
              children: sub,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: font, weight: 700, style: "normal" }],
    },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  return Buffer.from(resvg.render().asPng());
}

/** 贴纸角标文案（OG 系列感） */
export const OG_STICKER = "vv · From Zero";
