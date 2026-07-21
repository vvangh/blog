/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/vanillajs" />
/// <reference types="vite-plugin-pwa/info" />

interface ImportMetaEnv {
  readonly PUBLIC_UMAMI_SRC?: string;
  readonly PUBLIC_UMAMI_WEBSITE_ID?: string;
  readonly PUBLIC_GISCUS_REPO?: string;
  readonly PUBLIC_GISCUS_REPO_ID?: string;
  readonly PUBLIC_GISCUS_CATEGORY?: string;
  readonly PUBLIC_GISCUS_CATEGORY_ID?: string;
  readonly PUBLIC_GISCUS_MAPPING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * 环境与模块声明：供 barrel 再导出 `.astro` / `.vue` 时类型检查使用。
 */

declare module "*.astro" {
  const Component: (props: Record<string, unknown>) => unknown;
  export default Component;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}
