---
title: 用 Vite+ 管住个人站工具链
description: 为什么不用 Husky + ESLint 双轨，而用 vp check / staged。
pubDate: 2026-07-21
tags: [Vite+, 工程化]
series: vv 入门
seriesOrder: 2
---

## 问题

个人站也容易拖出一长串脚本：lint、format、hook、CI 各说各话。

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
