# 衡录 · 未决与已决问题

记录方案讨论中的开放问题，查证后改为 `resolved`，避免口头约定丢失。

---

## Q1. Node 是否必须用 `vp` 写入 `package.json`？写入哪个字段？

| 项         | 内容                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **问题**   | 项目级 Node 版本应如何钉死？是否必须经 `vp`，写到 `package.json` 的哪个字段？                                                                                                                                                                                                                                                                            |
| **背景**   | 曾用 `vp env pin lts --target node-version` 写 `.node-version`；用户纠正：应用 `vp` 写入 `package.json`，不以 `.node-version` 为真相源。                                                                                                                                                                                                                 |
| **拟验证** | 读 `vp env pin --help` 与 [Vite+ env 文档](https://viteplus.dev/guide/env)；执行 `vp env pin lts --target dev-engines`；用 `vp env current` 看 Source。                                                                                                                                                                                                  |
| **状态**   | **resolved**                                                                                                                                                                                                                                                                                                                                             |
| **结论**   | 必须用 `vp` 钉版本。命令：`vp env pin lts --target dev-engines`（可加 `--force`）。写入字段：`package.json` → `devEngines.runtime`（当前为 `node@24.18.0`，最新 LTS）。`engines.node` 可作消费者下限（如 `>=24.18.0`）；`vp env pin` **不会**自动改 `engines.node`。解析优先级：`.node-version` > `devEngines.runtime` > `engines.node` > 全局 default。 |

---

## Q2. `.node-version` 是否多余、是否应删除？

| 项         | 内容                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **问题**   | 已有 `package.json#devEngines.runtime` 时，`.node-version` / `.nvmrc` 是否多余？                                                                                                     |
| **背景**   | Vite+ 兼容优先：若目录已有 `.node-version`，`vp env pin` 会继续更新它，而不是写 `package.json`。                                                                                     |
| **拟验证** | 删除 `.node-version` 后 `vp env pin lts --target dev-engines`；`vp env current` 的 Source 应为 `devEngines.runtime`。                                                                |
| **状态**   | **resolved**                                                                                                                                                                         |
| **结论**   | **多余，应删除。** 本仓不以 `.node-version` / `.nvmrc` 钉 Node；仅保留 `package.json#devEngines.runtime`。已删 `.node-version`；`vp env current` 显示 `Source: devEngines.runtime`。 |

---

## Q3. 依赖 latest、Vue 锁 3.5、路径别名是否已落地？

| 项         | 内容                                                                                                                                                                                          |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **问题**   | 「依赖取最新稳定」「Vue 固定 3.5.x」「`@/` → `src/`、`~/` → 项目根」是否已在仓内落地？                                                                                                        |
| **背景**   | 计划 §2 / 工具链规则已写约定；需对照实际文件核对，避免规则与仓库脱节。                                                                                                                        |
| **拟验证** | 读 `package.json` 的 `vue` 范围；读 `tsconfig.json` paths、`astro.config.mjs` / `vite.config.ts` 的 `resolve.alias`。                                                                         |
| **状态**   | **resolved**                                                                                                                                                                                  |
| **结论**   | **已落地。** `vue` 为 `~3.5.40`；`tsconfig` paths、`astro`/`vite` alias 均配置 `@`→`src/`、`~`→项目根。依赖日常仍走 `vp add` / `vp install` 取稳定最新；Vue 禁止升到 3.6 RC（除非计划改口）。 |
