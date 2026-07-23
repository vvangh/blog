---
name: vv-add-content
description: >-
  按 vv Content Collections 规范新增或修改 blog / build-log / life / fun 文章。
  Use when adding a post, diary, photo entry, build-log note, editing frontmatter,
  or when the user mentions 发文 / 建站日志 / 日记 / 胶片.
---

# vv · 新增内容

## 步骤

1. 确认集合与目录（见规则 `henglu-blog-content`）
2. 对照 `src/content.config.ts` 写 frontmatter；缺字段勿臆造 schema 外键
3. 正文用 Markdown（`.md`）或 MDX（`.mdx`）；面向人的说明用简体中文
4. 若需出现在系列 / 修订时间线 / 地图 / 胶片：填对应可选字段
5. `draft: true` 时不会进 `publishedSorted`（列表、RSS、搜索目录均不可见）
6. 本地用 `vp run dev` 打开对应 `locale` 路径目检；改文后开发态 Ctrl+K 即可搜到标题/摘要

## 正文增强（可选）

- **提示框（`.md` / `.mdx`）**：`:::tip` / `:::note` / `:::warn` / `:::danger` … `:::`
- **音视频嵌入**：用 **`.mdx`**，把 YouTube / Vimeo 等链接单独成段（一行一个 URL）
- **代码块**：默认有行号；终端语言关闭行号。折叠：`collapse={8-18}`（Expressive Code）
- **相关文章**：靠 frontmatter `tags` 重叠自动推荐，无需手写

## Frontmatter 模板

### blog / fun

```md
---
title: 标题
description: 一句话摘要
pubDate: 2026-07-22
tags: [标签]
---
```

### build-log

```md
---
title: M? · 短名
description: 本里程碑做了什么
pubDate: 2026-07-22
milestone: M?
tags: [里程碑]
---
```

### life（日记）

```md
---
title: 短题
pubDate: 2025-07-21
kind: diary
tags: [日记]
---
```

### life（胶片）

```md
---
title: 短题
pubDate: 2025-08-12
kind: photo
image: /blog/images/film/frame-01.svg
caption: 读屏可读的说明
location: 城市名
---
```

文件放 `public/images/…`；frontmatter 的 `image` 须带 **`SITE_BASE` 前缀**（现为 `/blog/…`），与现有胶片条目一致。勿写 `/images/…`（缺 base，Pages 上 404）。

## 完成后

- [ ] 文件名符合约定（生活用日期前缀）
- [ ] `draft` 意图正确
- [ ] 未改 schema 却使用了未定义字段
- [ ] 胶片 `image` 含 `/blog/` 前缀
- [ ] 无需改 UI 文案则不动 `src/lib/i18n/messages/`
