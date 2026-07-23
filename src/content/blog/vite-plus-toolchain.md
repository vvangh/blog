---
title: 用 Vite+ 管住个人站工具链
description: 为什么不用 Husky + ESLint 双轨，而用 vp check / staged。
pubDate: 2026-07-21
tags: [Vite+, 工程化, vv]
series: vv 入门
seriesOrder: 2
---

## 问题

个人站也容易拖出一长串脚本：lint、format、hook、CI 各说各话。

:::note
本站依赖变更一律走 `vp add` / `vp remove`，不要手改 `package.json` 依赖字段。
:::

## 做法

统一走 **Vite+（`vp`）**：本地与 CI 同一套 `vp check` / `vp test`；预提交 `vp staged`；提交信息用 commitlint。

## 效果

改完文件后，钩子自动修格式；CI 红就别合并——个人站也按产品纪律来。

## 命令速查

```bash title="vv · shell" frame="terminal"
vp install
vp run dev
vp check
vp test
```

## 长片段可折叠

```ts title="相关文章打分（示意）" collapse={8-18} showLineNumbers
type Post = { id: string; tags?: string[] };

export function scoreOverlap(current: Post, other: Post): number {
  const set = new Set(current.tags ?? []);
  let score = 0;
  for (const tag of other.tags ?? []) {
    if (set.has(tag)) score += 1;
  }
  return score;
}

// —— 以下为示意填充，演示折叠段 ——
function unusedHelperA() {
  return 1;
}
function unusedHelperB() {
  return 2;
}
function unusedHelperC() {
  return 3;
}
```
