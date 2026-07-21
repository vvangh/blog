# 衡录 · Henglu

记下技术，也留下生活与趣味。

衡录是 vvangh 的个人站点：写技术、记生活、收藏一点娱乐；并从零公开搭建过程。

线上地址（规划）：[https://vvangh.github.io/blog/](https://vvangh.github.io/blog/)

## 技术栈摘要

| 层       | 选型                                                         |
| -------- | ------------------------------------------------------------ |
| 站点框架 | Astro（SSG）                                                 |
| 交互岛   | Vue 3.5.x（`@astrojs/vue`）                                  |
| 工具链   | Vite+（`vp`）：install / check / test / staged / run         |
| 样式     | Tailwind 优先；局部复杂样式 SCSS 降级                        |
| 内容     | Content Collections（`blog` / `build-log`，预留 life / fun） |
| 部署     | GitHub Pages 项目站（`base: '/blog/'`）                      |

## 工程硬约定

- **Node：** 当前最新 LTS，由 `vp env pin lts --target dev-engines` 写入 `package.json#devEngines.runtime`（现为 **24.18.0**）；可选 `engines.node` 作消费者下限。**不使用** `.node-version`。
- **依赖：** 安装/升级取当前最新稳定版；Vue 固定 **3.5.x** 稳定线（`~3.5`），不上 3.6 RC。
- **导入：** 优先 `@/`（→ `src/`）与 `~/`（→ 项目根）；目录外经 barrel，禁止 `../../../` 深层相对路径。
- **生成类型：** `src/auto-imports.d.ts` / `src/components.d.ts` 由 unplugin 在 `vp run dev` / `vp run build` 时写出，已 gitignore，勿提交。

## 本地开发

脚手架已可用（Astro + Vue 3.5 + Tailwind；`base: '/blog/'`）。

```bash
vp install
vp run dev
vp run build
vp check
vp test
```

Astro 业务命令一律用 `vp run <script>`，不要对 Astro 使用裸 `vp dev`。

预提交：`vp staged`（经 `.vite-hooks/pre-commit`）；提交信息：`commitlint`（经 `.vite-hooks/commit-msg`）。

## CI 与部署触发

| 场景                                              | 何时跑                                                                                       | 说明                                                 |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **CI**（`vp check` / `vp test` / `vp run build`） | 向 `main` / `develop` 的 **PR**；**push** 到 `main` 或 `develop`；或手动 `workflow_dispatch` | 只做质量门禁，**不**发 GitHub Pages                  |
| **Deploy Pages**                                  | **push** 到 `main`，或手动 `workflow_dispatch`                                               | 构建 `dist`（`base: '/blog/'`）并发布到 GitHub Pages |

约定：`develop` 日常提交只跑 CI；合入 / 推到 `main` 才部署。仓库 Settings → Pages → Source 需选 **GitHub Actions**。

## 分支与里程碑

- `main`：可部署、与生产一致
- `develop`：日常集成默认开发分支
- `feature/<主题>`：功能开发
- 标签：`milestone/N-短名`（如 `milestone/01-scaffold`）

## 想法清单

尚未排期的想法见 [`docs/BACKLOG.md`](docs/BACKLOG.md)。未升格为 `planned` 前不实现。

## 许可

代码：Apache-2.0（见 [LICENSE](LICENSE)）。文章版权归作者；页脚将另行说明转载约定。
