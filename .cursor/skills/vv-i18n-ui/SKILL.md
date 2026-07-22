---
name: vv-i18n-ui
description: >-
  为 vv 站点新增或修改多语言 UI 文案、locale 路径与语言相关逻辑。
  Use when editing i18n messages, localePath, LanguageSwitcher, adding MessageKey,
  or when the user mentions i18n / 多语言 / 翻译 / 切换语言.
---

# vv · i18n UI 变更

## 新增一条壳文案

1. 在 `src/lib/i18n/messages/keys.ts` 的 `MessageKey` 联合类型追加 key（点分命名：`nav.x` / `search.x`）
2. 在 `src/lib/i18n/messages/` 下 **每个** locale 文件写入字符串（与 `LOCALES` 一一对应；缺译可暂用简中，但勿漏 key）
3. 页面/组件经 `@/lib/i18n` 使用 `translate(locale, "your.key")`；Vue 岛经 props 传入已译字符串，或自行读 locale
4. 可访问名（`aria-label`、对话框名）也走消息表，便于 e2e 用角色名断言

## 改路径 / 新分区链接

- 只用 `localePath(locale, "segment")`；解析现有 URL 用 `stripLocaleFromPath`
- 存储键：`siteStorageKey("…")`（`@/lib/site`），禁止散落 `"vv-…"` 字面量（除 e2e 与已知键对齐处）

## 新增语种（少见）

1. 扩 `LOCALES` + `LOCALE_LABELS`
2. 补 `messages/<locale>.ts`、sitemap `i18n.locales`、`negotiate` 相关测试
3. 跑 `vp test` 与至少一条语言切换 e2e/目检

## 校验

- [ ] 九语文件同一套 key
- [ ] 无手写 `/blog/{locale}/…`
- [ ] `html[lang]` 仍由布局按 locale 输出
- [ ] 未再引用已不存在的 `messages.ts` 单文件
