/**
 * 站点品牌与部署相关常量。
 * 目录外请经 `@/lib/site` 导入，勿直接引用本文件。
 */

/** 中文 / 展示站名 */
export const SITE_NAME_ZH = "vv";

/** 英文标识（与展示名一致） */
export const SITE_NAME_EN = "vv";

/** localStorage / sessionStorage 键前缀（与品牌标识一致，勿再写死散落字符串） */
export const SITE_STORAGE_PREFIX = SITE_NAME_EN;

/** 拼出站点存储键：`vv-theme` / `vv-locale` 等 */
export function siteStorageKey(suffix: string): string {
  return `${SITE_STORAGE_PREFIX}-${suffix}`;
}

/** 副标题：苹果式短句，避免「栏目枚举」观感 */
export const SITE_TAGLINE = "记录值得留下的事";

/** 默认 SEO 描述 */
export const SITE_DESCRIPTION = "vvangh 的个人站点：技术、生活与趣味，含公开建站手记。";

/** GitHub Pages 项目站 base（与 astro.config 保持一致） */
export const SITE_BASE = "/blog/";
