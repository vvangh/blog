# vv UI 组件分层（原子化）

> 底座：shadcn-vue（reka-ui）+ Tailwind v4 + `@vueuse/core` + nanostores。  
> Agent 硬约束同步：`.cursor/rules/henglu-blog-ui-kit.mdc`。

## 分层

| 层               | 路径                              | 规则                                                                                      |
| ---------------- | --------------------------------- | ----------------------------------------------------------------------------------------- |
| 原子 Atoms       | `src/components/ui/*`             | shadcn 原语；只依赖 `reka-ui` / `@/lib/utils` / VueUse；**禁止**依赖 molecules 与业务组件 |
| 分子 Molecules   | `src/components/molecules/*`      | 由原子组合（如 `IconButton`、`LabeledInput`）；无页面数据、无 content collection          |
| 有机体 Organisms | `src/components/Site*` 等现有目录 | 业务岛 / 布局块；可依赖 ui + molecules + `@/lib/*`                                        |

首页 Hero / 壁纸 / `ink-invert` 顶栏：**继续自研**，不要用 Card 硬套首屏。

## 令牌

- 品牌色真相源：`src/styles/tokens.css`（`--hl-*`）
- shadcn 语义色桥接：`src/styles/shadcn.css`（`--primary` 等 → `--hl-*`）
- 图标：`@lucide/vue`（与 `components.json` 的 `iconLibrary` 一致）

## 状态

| 场景                   | 方案                                              |
| ---------------------- | ------------------------------------------------- |
| 单岛内 UI              | `ref` / composable / VueUse                       |
| 跨岛共享（如设置抽屉） | `nanostores`（`@/lib/stores`）+ `@nanostores/vue` |
| 不默认使用             | Pinia、vue-router                                 |

## 封装习惯

- 单文件 ≤ 500 行；超限拆 composable / 子组件
- 样式优先 Tailwind + 现有 `glass-*`；少写大块 scoped CSS

## 新增原子

```bash
pnpm dlx shadcn-vue@latest add dialog
```

装完后核对是否误写第二套 CSS 变量；视觉应继续走 `--hl-*` 桥接。
