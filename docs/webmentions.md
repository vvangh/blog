# Webmentions（可选）

收录「别的站点提到你」的链接。常见托管：[webmention.io](https://webmention.io/)。

## 启用

1. 在 webmention.io（或自建）登记域名，拿到：
   - Webmention endpoint（接收）
   - JF2 mentions API（拉取展示）
2. 写入环境变量：

```bash
PUBLIC_WEBMENTION_ENDPOINT=https://webmention.io/your-domain/webmention
PUBLIC_WEBMENTION_API=https://webmention.io/api/mentions.jf2?target=
```

3. 重建站点。`<head>` 会输出 `<link rel="webmention">`；文章页「被提及」区在构建期拉取。

未配置时文末显示说明文案，不报错。

## 注意

- 静态站**无法在访客浏览器里代收** webmention；接收端必须是你配置的外部服务。
- GitHub Pages 自定义域名后，target URL 需与对外公开的绝对地址一致。
