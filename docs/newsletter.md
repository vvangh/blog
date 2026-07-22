# Newsletter 订阅（可选）

vv 以 **RSS** 为默认订阅通道。邮件 Newsletter 需要外部服务账号（Buttondown、Listmonk、Mailchimp 等），本站只提供**可配置表单骨架**。

## 启用步骤

1. 在邮件服务商创建订阅表单，拿到 `action` URL（或兼容的 POST 端点）。
2. 在仓库 Secrets / 本地 `.env` 设置：

```bash
PUBLIC_NEWSLETTER_ACTION=https://your-provider.example/subscribe
```

3. 重新 `vp run build`。在挂载了 `NewsletterSignup` 的页面会渲染真实 `<form method="post">`。

未配置时显示「端点未配置」说明，**不发起任何网络请求**。当前首页不展示订阅框。

## 隐私

表单旁文案提示：仅用于发送更新、可退订。具体隐私政策以你选用的服务商为准。
