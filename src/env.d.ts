/// <reference types="astro/client" />

/**
 * 环境与模块声明：供 barrel 再导出 `.astro` / `.vue` 时类型检查使用。
 * Vite+ typeAware 不会总是自动带上 Astro 生成类型，故在此显式声明。
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
