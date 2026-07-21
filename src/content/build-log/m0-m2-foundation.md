---
title: M0–M2 仓库、脚手架与 Vite+ 工具链
description: 从空仓到可检查、可提交、可部署的底座。
pubDate: 2026-07-20
milestone: M2
tags: [工程化, Vite+, Astro]
---

## 背景

衡录要从「有想法」变成「有仓库、有命令、有门禁」。前三个里程碑把远端、Astro 脚手架和 Vite+（check / staged / commitlint / CI）一次钉死。

## 做了什么

- 克隆 [vvangh/blog](https://github.com/vvangh/blog)，建立 `main` / `develop`
- `vp create` Astro + Vue 3.5 + Tailwind，`base: /blog/`
- `vp check` / `vp staged` / commit-msg → commitlint；Actions 跑检查

## 踩坑

GitHub Pages 必须同时配 `site` 与 `base`，否则静态资源路径会漂到域名根。
