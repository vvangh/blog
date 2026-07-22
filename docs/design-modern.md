# vv Air 视觉方案

> **状态：现行方向（2026-07）**  
> 取代「vv Studio」石墨 + 信号橙方案。  
> 参考 [POETIZE](https://poetize.cn/) 的氛围节奏与苹果产品页的留白/字阶。

## 概念

**vv Air**：安静、通透、当代。巨型字标 **vv** 仍是首屏英雄信号，但字重变轻、去掉粗色条；设置仍在右下角抽屉。

## 品牌文案（定稿）

| 项         | 文案                                                   |
| ---------- | ------------------------------------------------------ |
| 站名       | `vv`                                                   |
| 副标题     | `记录值得留下的事`                                     |
| 浏览器标题 | `{页} · vv`                                            |
| 页脚       | `vv` + `© {year} vvangh · Apache-2.0 · 文章版权归作者` |

## 关键词

| 要                                         | 不要                                       |
| ------------------------------------------ | ------------------------------------------ |
| 近白 `#fbfbfd` / 纯黑画布 + 链接蓝强调     | 信号橙、石墨网格纸                         |
| Instrument Sans + Noto Sans SC             | Syne 厚重展示 / Inter                      |
| 全出血壁纸 + `ink-invert` 自动反色字       | 整页白蒙 / 大块琉璃卡片挡壁纸 / 海岸线波浪 |
| 顶栏透明→磨砂双态；导航 hover 细线         | emoji 导航墙、热度火苗堆叠                 |
| 首页仅 Hero + 页脚；列表页再用 `home-deck` | Element Plus 等重型后台 UI 库挡品牌        |
| Lucide（`@lucide/vue`）作图标源            | emoji / 字符凑合当图标；全站粒子特效库     |
| `prefers-reduced-motion` 降级              | 全站粒子与入场轰炸                         |

## 色板（CSS 令牌）

浅色：`#fbfbfd` 底、`#1d1d1f` 字、`#0071e3` 链接蓝、`#c4849a` 氛围玫瑰、墨色 CTA。  
暗色：`#000000` 底、`#f5f5f7` 字、`#2997ff` 链接、反白 CTA。

令牌在 `src/styles/tokens.css`（经 `global.css` 入口 `@import`）；`html[data-theme]` 切换浅暗。样式另拆 `base.css` / `chrome.css` / `content.css`。

## 动效（克制 · 对齐 POETIZE「可学三刀」）

1. 顶栏：首屏透明 → 滚入内容区渐变成悬浮玻璃胶囊（`--header-lift`）
2. 链 hover 细下划线；列表/频道轻抬升（0.3s）
3. 英雄区文案错落入场 `rise`（首页无下滚引导，仅 Hero + 页脚）

不做：海岸线波浪、樱花粒子、emoji 导航、热度堆叠。

## 叠媒体可读（自动反色）

`.ink-invert` = 源色 `#fff` + `mix-blend-mode: difference`：与背后像素做差值，亮底变深、暗底变浅——**不是**固定展示成白色。壁纸须与文字同属 `.site-chrome`。

## Figma

- 文件：[vv Air · Brand Redesign](https://www.figma.com/design/TPrsAJ7W3qDTz4N0AN0i5O)
- 账号席位可能为 View；以代码 `global.css` 为最终真相源。

## 废弃

- `docs/design-mokheng.md`：水墨 / 印章（历史）
- 「vv Studio」石墨 + 信号橙 + Syne（本文件旧版）
