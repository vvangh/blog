# vv Air 视觉方案

> **状态：现行方向（2026-07）**  
> 取代「vv Studio」石墨 + 信号橙方案。  
> 参考 [POETIZE](https://poetize.cn/) 的氛围节奏与苹果产品页的留白/字阶。

## 概念

**vv Air**：安静、通透、当代。巨型字标 **vv** 仍是首屏英雄信号，但字重变轻、去掉粗色条；设置仍在右下角抽屉。

## 品牌文案（定稿）

| 项         | 文案                   |
| ---------- | ---------------------- |
| 站名       | `vv`                   |
| 副标题     | `记录值得留下的事`     |
| 浏览器标题 | `{页} · vv`            |
| 页脚       | `© {year} vv · vvangh` |

## 关键词

| 要                                     | 不要                   |
| -------------------------------------- | ---------------------- |
| 近白 `#fbfbfd` / 纯黑画布 + 链接蓝强调 | 信号橙、石墨网格纸     |
| Instrument Sans + Noto Sans SC         | Syne 厚重展示 / Inter  |
| 柔光斑（蓝 + 淡玫瑰）+ 波浪软过渡      | 墨晕、紫粉渐变套餐     |
| 墨色/反白胶囊主按钮；灰链导航          | 粗下划线字标、emoji 墙 |
| `prefers-reduced-motion` 降级          | 樱花粒子常驻           |

## 色板（CSS 令牌）

浅色：`#fbfbfd` 底、`#1d1d1f` 字、`#0071e3` 链接蓝、`#c4849a` 氛围玫瑰、墨色 CTA。  
暗色：`#000000` 底、`#f5f5f7` 字、`#2997ff` 链接、反白 CTA。

令牌经 `global.css` 的 `@theme` 映射；`html[data-theme]` 切换浅暗。

## 动效（克制）

1. 英雄区文案错落入场 `rise`
2. 柔光缓动 `glow-pulse`
3. 下滚引导 `scroll-cue`（可减动效关闭）

## Figma

- 文件：[vv Air · Brand Redesign](https://www.figma.com/design/TPrsAJ7W3qDTz4N0AN0i5O)
- 账号席位可能为 View；以代码 `global.css` 为最终真相源。

## 废弃

- `docs/design-mokheng.md`：水墨 / 印章（历史）
- 「vv Studio」石墨 + 信号橙 + Syne（本文件旧版）
