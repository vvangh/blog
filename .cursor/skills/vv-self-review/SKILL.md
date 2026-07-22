---
name: vv-self-review
description: >-
  对 vv 博客一个可审单元做最严边改边审（质量、a11y、测试、范围）。
  Use after finishing a component, page, test, or config change; before starting
  the next unit; or when the user asks for 自审 / 收口 / 里程碑检查.
---

# vv · 边改边审

每个可审单元结束即跑本清单；**不通过不做下一块**。

## 清单

### 1. 工程形态

- [ ] TypeScript strict 友好；无无必要 `any`
- [ ] 组件 PascalCase；单文件 ≤ 500 行
- [ ] 做减法；中文描述性注释（业务意图）
- [ ] 目录外经 barrel + `@/` / `~/`；无 `../../../`

### 2. 本仓硬约定

- [ ] 入口仍是 `vp run` / `vp test` / `vp check`（Astro 不裸 `vp dev`）
- [ ] 链接用 `localePath`；UI 文案在 messages 九语齐套
- [ ] 静态资源 URL 含 `/blog/` base（若涉及 `public/`）
- [ ] UI 分层未反向依赖；未引入 Element Plus / Pinia / vue-router
- [ ] 未实现 BACKLOG 里仍为 `idea` 的条目

### 3. 无障碍

- [ ] 语义标签 / 地标；焦点可见且不丢
- [ ] 控件有可访问名；图有 alt；`lang` 正确
- [ ] 尊重 `prefers-reduced-motion`（若有动效）

### 4. 测试

- [ ] 有行为则有测；`vp test`（及必要 e2e）绿
- [ ] e2e 跳过 splash；断言用角色 + 可访问名

### 5. 差分挑错

实质代码变更：优先走 `review-bugbot`；安全敏感再走 `review-security`。

## 输出格式

用简体中文短报：

```text
自审：通过 | 阻断
- 阻断项：…
- 建议：…
```
