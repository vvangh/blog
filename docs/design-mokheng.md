# 衡录「墨衡」视觉方案

## 概念

**墨衡**：墨色记录 × 刻度衡量。品牌名「衡录」做成印章式大字；背景用墨晕纸纹与竖向刻度，避免模板站的紫渐变 / 奶油衬线套餐。

## 技能与工具

| 来源                                 | 用途                                                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `anthropics-skills-frontend-design`  | 品牌优先、一屏一构图、忌 AI 套模板                                                                                       |
| `jezweb-claude-skills-ux-audit`      | 对比度、焦点、导航认知负荷                                                                                               |
| `jeffallan-claude-skills-vue-expert` | Theme / Language 岛                                                                                                      |
| Figma MCP（`plugin-figma-figma`）    | 本轮 `whoami` / `mcp_auth` 连接超时；设计先以本文件 + 线上实现为准，待 MCP 恢复后补 `create_new_file` + `use_figma` 同步 |

## 动效（尊重 reduce-motion）

1. 品牌印章 `seal-in`
2. 导航墨线 `scaleX`
3. 英雄区印记 `wash-drift`

## 主题四模式

CSS 变量浅/暗齐全；自定义时段 UI 与浅/暗对比度需保持 AA。
