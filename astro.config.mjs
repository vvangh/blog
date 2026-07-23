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
import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import AstroPWA from "@vite-pwa/astro";
import expressiveCode from "astro-expressive-code";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import embeds from "astro-embed/integration";
import remarkDirective from "remark-directive";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vueDevTools from "vite-plugin-vue-devtools";
import { remarkCallouts } from "./src/lib/markdown/remark-callouts.ts";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(rootDir, "src");
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  site: "https://vvangh.github.io",
  base: "/blog/",
  markdown: {
    // 交给 Expressive Code，避免变成裸的 astro-code 默认块
    syntaxHighlight: false,
    // Astro 7 默认 Sätteri；提示框 / 嵌入需 unified + remark
    processor: unified({
      remarkPlugins: [remarkDirective, remarkCallouts],
    }),
  },
  integrations: [
    expressiveCode({
      // 与站点 html[data-theme] 对齐，避免代码块不跟主题切换
      themes: ["vesper", "snazzy-light"],
      themeCssSelector: (theme) =>
        theme.type === "dark" ? "[data-theme='dark']" : "[data-theme='light']",
      useDarkModeMediaQuery: true,
      useThemedScrollbars: true,
      plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
      defaultProps: {
        wrap: true,
        showLineNumbers: true,
        overridesByLang: {
          "bash,sh,zsh,shell,powershell,ps1": { wrap: false, showLineNumbers: false },
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
          theme.type === "dark" ? "rgba(244, 245, 247, 0.12)" : "rgba(18, 20, 26, 0.16)",
        codeFontFamily: '"JetBrains Mono", "Cascadia Code", ui-monospace, monospace',
        codeFontSize: "0.9rem",
        codeLineHeight: "1.7",
        codePaddingBlock: "1.2rem",
        codePaddingInline: "1.35rem",
        // 浅色画布上避免 #fbfbfc 与正文融成「像没样式」
        codeBackground: ({ theme }) => (theme.type === "dark" ? "#12151c" : "#f0f1f4"),
        uiFontFamily: '"Source Sans 3", "Noto Sans SC", "Segoe UI", sans-serif',
        uiFontSize: "0.8rem",
        frames: {
          shadowColor: ({ theme }) =>
            theme.type === "dark" ? "rgba(255, 106, 61, 0.22)" : "rgba(18, 20, 26, 0.12)",
          frameBoxShadowCssValue: ({ resolveSetting }) =>
            `0 18px 48px -28px ${resolveSetting("frames.shadowColor")}`,
          editorActiveTabIndicatorTopColor: ({ theme }) =>
            theme.type === "dark" ? "#ff6a3d" : "#e2411a",
          editorActiveTabIndicatorBottomColor: "transparent",
          editorTabBarBackground: ({ theme }) => (theme.type === "dark" ? "#0d1016" : "#e5e6ea"),
          terminalTitlebarBackground: ({ theme }) =>
            theme.type === "dark" ? "#0d1016" : "#e5e6ea",
          terminalTitlebarBorderBottomColor: ({ theme }) =>
            theme.type === "dark" ? "rgba(244, 245, 247, 0.08)" : "rgba(18, 20, 26, 0.12)",
          terminalTitlebarDotsForeground: ({ theme }) =>
            theme.type === "dark" ? "#ff6a3d" : "#e2411a",
          terminalTitlebarDotsOpacity: "0.85",
          terminalBackground: ({ theme }) => (theme.type === "dark" ? "#12151c" : "#f0f1f4"),
          inlineButtonForeground: ({ theme }) => (theme.type === "dark" ? "#ff6a3d" : "#e2411a"),
          inlineButtonBorder: ({ theme }) => (theme.type === "dark" ? "#ff6a3d" : "#e2411a"),
          inlineButtonBorderOpacity: "0.35",
          inlineButtonBackgroundHoverOrFocusOpacity: "0.12",
          tooltipSuccessBackground: ({ theme }) => (theme.type === "dark" ? "#ff6a3d" : "#e2411a"),
        },
      },
    }),
    // embeds 须在 mdx 之前；裸链接段落在 MDX 中自动换成嵌入组件
    ...embeds({
      services: {
        LinkPreview: false,
      },
    }),
    mdx(),
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
        // 扫 composables 供岛内免导入；排除 barrel，避免与具体文件重复注册
        dirs: [path.resolve(srcDir, "composables")],
        dirsScanOptions: {
          fileFilter: (file) => !/(^|[/\\])index\.ts$/.test(file),
        },
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.astro$/],
        dts: path.resolve(srcDir, "types/auto-imports.d.ts"),
        vueTemplate: true,
      }),
      Components({
        dirs: [
          path.resolve(srcDir, "components"),
          path.resolve(srcDir, "components/ui"),
          path.resolve(srcDir, "components/molecules"),
        ],
        extensions: ["vue"],
        dts: path.resolve(srcDir, "types/components.d.ts"),
        include: [/\.vue$/, /\.vue\?vue/],
      }),
      ...(isDev ? [vueDevTools()] : []),
    ],
    resolve: {
      alias: {
        "@": srcDir,
        "~": rootDir,
      },
    },
  },
});
