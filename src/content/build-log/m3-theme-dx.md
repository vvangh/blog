---
title: M3 主题四模式与 Vue DX
description: 浅色 / 暗色 / 自动 / 自定义时段，以及 auto-import 与 DevTools。
pubDate: 2026-07-21
milestone: M3
tags: [主题, Vue, DX]
---

## 作用

让读者按环境光和个人作息切换外观，而不是只有一个「暗色开关」。

## 效果例子

设自定义 `07:00–19:00` 浅色：早上打开是浅色，晚上自动变暗色；`localStorage` + head 内联脚本避免闪白。

## 本里程碑测试

主题解析单测覆盖同日窗口与跨午夜。
