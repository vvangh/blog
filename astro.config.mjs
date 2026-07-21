// @ts-check
/**
 * Astro 站点配置。
 * site + base 对齐 GitHub Pages 项目站 https://vvangh.github.io/blog/
 * DX：Vue 岛用 auto-import / components / DevTools（仅开发）；样式 Tailwind 优先，SCSS 经 sass 可用。
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vueDevTools from "vite-plugin-vue-devtools";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(rootDir, "src");
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  site: "https://vvangh.github.io",
  base: "/blog/",
  integrations: [vue()],
  vite: {
    plugins: [
      tailwindcss(),
      AutoImport({
        imports: ["vue"],
        dts: path.resolve(srcDir, "auto-imports.d.ts"),
        vueTemplate: true,
      }),
      Components({
        dirs: [path.resolve(srcDir, "components")],
        extensions: ["vue"],
        dts: path.resolve(srcDir, "components.d.ts"),
        // Astro 页面仍显式 import；此处主要服务 .vue 岛内部子组件
        include: [/\.vue$/, /\.vue\?vue/],
      }),
      ...(isDev ? [vueDevTools()] : []),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // 预留：局部复杂样式可 @use；不注入全局大库
        },
      },
    },
    resolve: {
      alias: {
        "@": srcDir,
        "~": rootDir,
      },
    },
  },
});
