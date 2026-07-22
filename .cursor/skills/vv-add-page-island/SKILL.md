---
name: vv-add-page-island
description: >-
  在 vv 博客新增 [locale] 页面、Vue 岛或 molecules，并接上布局、i18n 与测试。
  Use when creating a new route under src/pages/[locale], a Site* island,
  a molecule, or when the user mentions 新页面 / 新岛 / 组件分层.
---

# vv · 新页面 / 新岛

## 开工前

1. 确认 `docs/产品/想法清单.md` 已 `planned`（或用户明确授权例外）
2. 读规则：`henglu-blog-ui-kit`、`henglu-blog-astro-islands`、`henglu-blog-i18n-routing`
3. Vue 岛改动前可读外部 `jeffallan-claude-skills-vue-expert`（若环境有）

## 页面（Astro）

1. 路径：`src/pages/[locale]/<seg>/index.astro`（或 `[slug].astro`）
2. `getStaticPaths`：对每个 `LOCALES` 生成路径；内容页再乘 `publishedSorted(getCollection)`
3. 包进 `SiteLayout`；传入 `locale`、`title`、`description`；链接一律 `localePath`
4. 壳文案走 `translate`；需要时在导航（`SiteHeader`）加入口并补 i18n

## Vue 岛

1. 目录：`src/components/<Name>/` + `index.ts` barrel；目录外 `@/components/<Name>`
2. 分层：原子 → `ui/`；组合 → `molecules/`；业务 → `Site*` / 功能目录（禁止反向依赖）
3. **禁止**手写 `import { ref, … } from "vue"` / `@vueuse/core` 运行时导入
4. 在 `.astro` 挂载：`<X client:load … />`；标签/文案用 props 传入已翻译字符串
5. 跨岛状态进 `@/lib/stores`；偏好类改动同步 `boot-script.ts` + `siteStorageKey`

## 样式

- Tailwind + `--hl-*`；首屏勿用 Card 硬套；关/清图标用 `motion-safe-icon-spin`
- 长列表过滤用 `FilterableSelect`

## 测试与收尾

- 纯逻辑：同居 `*.test.ts` + `vp test`
- 交互：`e2e/` 用角色名；`beforeEach` 写入 `vv-splash-seen`
- 胶片等静态资源 URL 含 `/blog/` 前缀
- 跑完本单元后执行技能 `vv-self-review`
