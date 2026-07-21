# 多语言独立域名（可选）

目标：用短域名（如 `vv.dev`）替代 `vvangh.github.io/blog/`，并可按语言分子域。

## 本仓已有骨架

- `src/lib/domains/config.ts`：`DOMAIN_CONFIG.canonicalOrigin` 与 `localeHosts`
- 文档本页；**不自动改 DNS / 购买域名**

## 启用清单（需你方账号与 DNS）

1. 购买域名并在 DNS 添加 GitHub Pages 要求的 `A` / `CNAME` 记录。
2. 仓库 Settings → Pages → Custom domain 填入主域，开启 HTTPS。
3. 若仍使用 project site 的 `base: '/blog/'`，确认路径与反向代理/子路径策略一致；纯用户站可改为 `base: '/'`（需另开里程碑改配置与 CI）。
4. 在 `DOMAIN_CONFIG` 填入 `canonicalOrigin`（及可选语言子域）。
5. 更新 OG / canonical / sitemap 所用的绝对源（`absolutePageUrl` 等与 `resolveCanonicalOrigin` 对齐——若你改了源，请一并改 `src/lib/og`）。

## 状态

功能向骨架 + 文档已就绪；**完整生效依赖域名购买与 GitHub Pages 后台配置**，CI 无法代劳。
