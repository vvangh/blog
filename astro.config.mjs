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
  markdown: {
    // 交给 Expressive Code，避免变成裸的 astro-code 默认块
    syntaxHighlight: false,
  },
  integrations: [
    expressiveCode({
      // 与站点 html[data-theme] 对齐，避免代码块不跟主题切换
      themes: ["vesper", "snazzy-light"],
      themeCssSelector: (theme) =>
        theme.type === "dark" ? "[data-theme='dark']" : "[data-theme='light']",
      useDarkModeMediaQuery: true,
      useThemedScrollbars: true,
      defaultProps: {
        wrap: true,
        overridesByLang: {
          "bash,sh,zsh,shell,powershell,ps1": { wrap: false },
        },
      },
      frames: {
        showCopyToClipboardButton: true,
        removeCommentsWhenCopyingTerminalFrames: true,
      },
      styleOverrides: {
        borderRadius: "0.9rem",
        borderWidth: "1px",
        borderColor: ({ theme }) =>
          theme.type === "dark" ? "rgba(244, 245, 247, 0.12)" : "rgba(18, 20, 26, 0.1)",
        codeFontFamily: '"JetBrains Mono", "Cascadia Code", ui-monospace, monospace',
        codeFontSize: "0.9rem",
        codeLineHeight: "1.7",
        codePaddingBlock: "1.2rem",
        codePaddingInline: "1.35rem",
        codeBackground: ({ theme }) => (theme.type === "dark" ? "#12151c" : "#fbfbfc"),
        uiFontFamily: '"Source Sans 3", "Noto Sans SC", "Segoe UI", sans-serif',
        uiFontSize: "0.8rem",
        frames: {
          shadowColor: ({ theme }) =>
            theme.type === "dark" ? "rgba(255, 106, 61, 0.22)" : "rgba(226, 65, 26, 0.14)",
          frameBoxShadowCssValue: ({ resolveSetting }) =>
            `0 18px 48px -28px ${resolveSetting("frames.shadowColor")}`,
          editorActiveTabIndicatorTopColor: ({ theme }) =>
            theme.type === "dark" ? "#ff6a3d" : "#e2411a",
          editorActiveTabIndicatorBottomColor: "transparent",
          editorTabBarBackground: ({ theme }) => (theme.type === "dark" ? "#0d1016" : "#f0f1f3"),
          terminalTitlebarBackground: ({ theme }) =>
            theme.type === "dark" ? "#0d1016" : "#f0f1f3",
          terminalTitlebarBorderBottomColor: ({ theme }) =>
            theme.type === "dark" ? "rgba(244, 245, 247, 0.08)" : "rgba(18, 20, 26, 0.08)",
          terminalTitlebarDotsForeground: ({ theme }) =>
            theme.type === "dark" ? "#ff6a3d" : "#e2411a",
          terminalTitlebarDotsOpacity: "0.85",
          terminalBackground: ({ theme }) => (theme.type === "dark" ? "#12151c" : "#fbfbfc"),
          inlineButtonForeground: ({ theme }) => (theme.type === "dark" ? "#ff6a3d" : "#e2411a"),
          inlineButtonBorder: ({ theme }) => (theme.type === "dark" ? "#ff6a3d" : "#e2411a"),
          inlineButtonBorderOpacity: "0.35",
          inlineButtonBackgroundHoverOrFocusOpacity: "0.12",
          tooltipSuccessBackground: ({ theme }) => (theme.type === "dark" ? "#ff6a3d" : "#e2411a"),
        },
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
        name: "vv",
        short_name: "vv",
        description: "技术 · 生活 · 趣味",
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
        imports: ["vue", "@vueuse/core"],
        dirs: [path.resolve(srcDir, "composables")],
        dts: path.resolve(srcDir, "auto-imports.d.ts"),
        vueTemplate: true,
      }),
      Components({
        dirs: [
          path.resolve(srcDir, "components"),
          path.resolve(srcDir, "components/ui"),
          path.resolve(srcDir, "components/molecules"),
        ],
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
