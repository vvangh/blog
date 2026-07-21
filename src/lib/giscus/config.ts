/**
 * Giscus 环境变量解析：缺任一必填项则禁用（优雅降级）。
 * 目录外请经 `@/lib/giscus` 导入。
 */
import type { Locale } from "@/lib/i18n";

export type GiscusConfig = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
  reactionsEnabled: "0" | "1";
  emitMetadata: "0" | "1";
  inputPosition: "top" | "bottom";
  theme: string;
  lang: string;
};

/** 站点 locale → Giscus 语言码 */
export function giscusLang(locale: Locale): string {
  const map: Record<Locale, string> = {
    "zh-Hans": "zh-CN",
    "zh-Hant": "zh-TW",
    en: "en",
    de: "de",
    ja: "ja",
    ko: "ko",
    fr: "fr",
    es: "es",
    ru: "ru",
  };
  return map[locale] ?? "zh-CN";
}

export type GiscusEnv = {
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
  mapping?: string;
};

/** 从环境变量拼配置；不完整则返回 null */
export function resolveGiscusConfig(env: GiscusEnv, locale: Locale): GiscusConfig | null {
  const repo = env.repo?.trim();
  const repoId = env.repoId?.trim();
  const category = env.category?.trim();
  const categoryId = env.categoryId?.trim();
  if (!repo || !repoId || !category || !categoryId) return null;

  return {
    repo,
    repoId,
    category,
    categoryId,
    mapping: env.mapping?.trim() || "pathname",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "bottom",
    theme: "preferred_color_scheme",
    lang: giscusLang(locale),
  };
}

/** 读取 import.meta.env 中的 PUBLIC_GISCUS_* */
export function readGiscusEnvFromImportMeta(): GiscusEnv {
  return {
    repo: import.meta.env.PUBLIC_GISCUS_REPO,
    repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID,
    category: import.meta.env.PUBLIC_GISCUS_CATEGORY,
    categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID,
    mapping: import.meta.env.PUBLIC_GISCUS_MAPPING,
  };
}
