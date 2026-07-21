import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(rootDir, "src");

/**
 * Vite+ 工程配置：lint / fmt / check / staged / test 集中在此。
 * Astro 业务仍用 `vp run dev|build`，勿对 Astro 使用裸 `vp dev`。
 * 路径别名：`@` → src/，`~` → 项目根；禁止目录外深层相对路径。
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": srcDir,
      "~": rootDir,
    },
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  check: {},
  staged: {
    "*.{ts,tsx,js,mjs,astro,vue,css,scss,md,mdx,json}": "vp check --fix",
  },
  test: {
    // Vitest 经 `vp test`；先覆盖纯函数，业务 e2e 留到 M4
    include: ["src/**/*.{test,spec}.ts"],
  },
});
