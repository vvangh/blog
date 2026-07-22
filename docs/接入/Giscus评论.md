# Giscus 评论

文末讨论区。四项环境变量齐全才注入脚本；缺一则**不渲染**任何评论 UI（与 Umami 同思路）。

## 配置步骤

1. 仓库开启 GitHub Discussions。
2. 打开 [giscus.app](https://giscus.app)，选中本仓库与分类，复制生成的 `data-repo` / `data-repo-id` / `data-category` / `data-category-id`。
3. 写入本地 `.env`（可参考 `.env.example`）或 CI/Pages 的环境变量：

```env
PUBLIC_GISCUS_REPO=owner/repo
PUBLIC_GISCUS_REPO_ID=R_...
PUBLIC_GISCUS_CATEGORY=Announcements
PUBLIC_GISCUS_CATEGORY_ID=DIC_...
# 可选，默认 pathname
PUBLIC_GISCUS_MAPPING=pathname
```

4. `vp run build` 后预览文章详情页文末。

## 行为说明

- 映射默认按 `pathname`，多语言路径各自一条讨论线程。
- 主题为 `preferred_color_scheme`，跟随系统浅/暗。
- 界面语言随站点 locale 映射（如 `zh-Hans` → `zh-CN`）。

对应路线图 `plug-giscus`；解析逻辑在 `@/lib/giscus`，组件为 `GiscusComments`。
