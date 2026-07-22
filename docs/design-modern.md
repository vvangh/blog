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

| 要                                                            | 不要                                        |
| ------------------------------------------------------------- | ------------------------------------------- |
| 近白 `#fbfbfd` / 纯黑画布 + 链接蓝强调                        | 信号橙、石墨网格纸                          |
| Instrument Sans + Noto Sans SC                                | Syne 厚重展示 / Inter                       |
| 全出血壁纸 + `ink-invert` 自动反色字                          | 整页白蒙 / 大块琉璃卡片挡壁纸 / 海岸线波浪  |
| 顶栏透明→磨砂双态；导航 hover 细线                            | emoji 导航墙、热度火苗堆叠                  |
| 首页仅 Hero + 页脚；列表页再用 `home-deck`                    | Element Plus 等重型后台 UI 库挡品牌         |
| Lucide（`@lucide/vue`）作图标源                               | emoji / 字符凑合当图标；全站粒子特效库      |
| 其它页 UI：shadcn-vue 原子 + molecules（见 `docs/ui-kit.md`） | Element Plus / 未对齐 `--hl-*` 的第二套色板 |
| `prefers-reduced-motion` 降级                                 | 全站粒子与入场轰炸                          |

## 色板（CSS 令牌）

浅色：`#fbfbfd` 底、`#1d1d1f` 字、`#0071e3` 链接蓝、`#c4849a` 氛围玫瑰、墨色 CTA。  
暗色：`#000000` 底、`#f5f5f7` 字、`#2997ff` 链接、反白 CTA。

令牌在 `src/styles/tokens.css`（经 `index.css` 入口 `@import`）；`html[data-theme]` 切换浅暗。样式另拆 `base.css` / `motion/` / `chrome/` / `content.css`。

## 动效（克制 · 对齐 POETIZE「可学三刀」）

1. 顶栏：首屏透明 → 滚入内容区渐变成悬浮玻璃胶囊（`--header-lift`）
2. 链 hover 细下划线；CTA / 列表轻抬升（0.3s）
3. 英雄区文案错落入场 `rise`（首页无下滚引导；Splash 未关时 `data-splash=pending` 按住，关闭后再播）

辅刀（仍克制）：壁纸 `media-drift` 极慢漂移；副标题打字机逐字 + 墨白光标闪烁（Splash 门控后播）；页脚随 Splash 后入场；顶栏胶囊偶发柔光扫边（旋转与显隐分轨，避免固定起点）。

关闭 / 清除类图标（设置抽屉 X、搜索清空等）：统一 `motion-safe-icon-spin`，悬停内层 svg 转 90°；新按钮禁止另写一套。

多选项下拉：统一分子 `FilterableSelect`（触发框内 Combobox 录入过滤，勿在面板另开搜索条）。

不做：海岸线波浪、樱花粒子、emoji 导航、热度堆叠、链接蓝淡铺 hover。

## 叠媒体可读（自动反色）

`.ink-invert` = 源色 `#fff` + `mix-blend-mode: difference`：与背后像素做差值，亮底变深、暗底变浅——**不是**固定展示成白色。壁纸须与文字同属 `.site-chrome`。

搜索弹层（Ctrl+K）：跟随外观主题（`.site-search-panel` 用 `--hl-*`）+ 半透明黑遮罩（**不** blur）；选中行中性浅铺；输入光标用墨色，不用链接蓝。

## Figma

- 文件：[vv Air · Brand Redesign](https://www.figma.com/design/TPrsAJ7W3qDTz4N0AN0i5O)
- 账号席位可能为 View；以代码 `styles/index.css` 为最终真相源。

## 废弃

- `docs/design-mokheng.md`：水墨 / 印章（历史）
- 「vv Studio」石墨 + 信号橙 + Syne（本文件旧版）
