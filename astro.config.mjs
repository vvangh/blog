// @ts-check
/**
 * Astro 站点配置。
 * site + base 对齐 GitHub Pages 项目站 https://vvangh.github.io/blog/
 * 路径别名走 Vite resolve：`@` → src/，`~` → 项目根（避免 tsconfig baseUrl 与 Vite+ typeAware 冲突）。
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(rootDir, "src");

export default defineConfig({
  site: "https://vvangh.github.io",
  base: "/blog/",
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": srcDir,
        "~": rootDir,
      },
    },
  },
});
