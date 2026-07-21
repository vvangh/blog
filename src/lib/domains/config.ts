/**
 * 多域名 / 规范源配置骨架（自定义域名需 GitHub Pages + DNS；本文件仅配置与文档）。
 * 目录外请经 `@/lib/domains` 导入。
 */

export type DomainConfig = {
  /** 规范站点源，如 https://henglu.dev；空则沿用 GitHub Pages */
  canonicalOrigin: string;
  /** 语言子域映射（可选，未启用时为空） */
  localeHosts: Partial<Record<string, string>>;
};

/**
 * 静态配置：填好后配合 docs/custom-domains.md 与 CI/DNS。
 * 未配置时 absolute URL 仍用 GitHub Pages 源。
 */
export const DOMAIN_CONFIG: DomainConfig = {
  canonicalOrigin: "",
  localeHosts: {
    // "zh-Hans": "https://zh.henglu.dev",
    // en: "https://en.henglu.dev",
  },
};

export function resolveCanonicalOrigin(fallback = "https://vvangh.github.io"): string {
  const configured = DOMAIN_CONFIG.canonicalOrigin.trim();
  return configured || fallback;
}
