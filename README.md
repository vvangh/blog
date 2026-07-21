# 衡录 · Henglu

记下技术，也留下生活与趣味。

衡录是 vvangh 的个人站点：写技术、记生活、收藏一点娱乐；并从零公开搭建过程。

线上地址（规划）：[https://vvangh.github.io/blog/](https://vvangh.github.io/blog/)

## 技术栈摘要

| 层 | 选型 |
| --- | --- |
| 站点框架 | Astro（SSG） |
| 交互岛 | Vue 3.5.x（`@astrojs/vue`） |
| 工具链 | Vite+（`vp`）：install / check / test / staged / run |
| 样式 | Tailwind 优先；局部复杂样式 SCSS 降级 |
| 内容 | Content Collections（`blog` / `build-log`，预留 life / fun） |
| 部署 | GitHub Pages 项目站（`base: '/blog/'`） |

## 本地开发（脚手架落地后）

```bash
vp install
vp run dev
vp run build
vp check
vp test
```

Astro 业务命令一律用 `vp run <script>`，不要对 Astro 使用裸 `vp dev`。

## 分支与里程碑

- `main`：可部署、与生产一致
- `develop`：日常集成默认开发分支
- `feature/<主题>`：功能开发
- 标签：`milestone/N-短名`（如 `milestone/01-scaffold`）

## 想法清单

尚未排期的想法见 [`docs/BACKLOG.md`](docs/BACKLOG.md)。未升格为 `planned` 前不实现。

## 许可

代码：Apache-2.0（见 [LICENSE](LICENSE)）。文章版权归作者；页脚将另行说明转载约定。
