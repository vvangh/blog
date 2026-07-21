// @ts-check
/**
 * Astro 站点配置。
 * site + base 对齐 GitHub Pages 项目站 https://vvangh.github.io/blog/
 * DX：Vue 岛用 auto-import / components / DevTools（仅开发）；PWA 兼容 base=/blog/。
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";
import expressiveCode from "astro-expressive-code";
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
  integrations: [
    expressiveCode({
      themes: ["github-dark", "github-light"],
      defaultProps: {
        wrap: true,
      },
      styleOverrides: {
        borderRadius: "0.5rem",
        codeFontFamily: '"IBM Plex Mono", ui-monospace, monospace',
      },
    }),
    vue(),
    sitemap({
      i18n: {
        defaultLocale: "zh-Hans",
        locales: {
          "zh-Hans": "zh-Hans",
          "zh-Hant": "zh-Hant",
          en: "en",
          de: "de",
          ja: "ja",
          ko: "ko",
          fr: "fr",
          es: "es",
          ru: "ru",
        },
      },
    }),
    AstroPWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "og-default.png"],
      manifest: {
        name: "衡录 · Henglu",
        short_name: "衡录",
        description: "记下技术，也留下生活与趣味",
        theme_color: "#2f5d50",
        background_color: "#121412",
        display: "standalone",
        lang: "zh-Hans",
        start_url: "/blog/",
        scope: "/blog/",
        icons: [
          {
            src: "/blog/og-default.png",
            sizes: "1200x630",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/blog/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/blog/index.html",
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webp,woff2}"],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
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
        include: [/\.vue$/, /\.vue\?vue/],
      }),
      ...(isDev ? [vueDevTools()] : []),
    ],
    css: {
      preprocessorOptions: {
        scss: {},
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
