/**
 * Newsletter：外部表单端点（Buttondown / Listmonk 等）；缺配置则展示说明。
 * 目录外请经 `@/lib/newsletter` 导入。
 */

export type NewsletterEnv = {
  /** HTML form action URL */
  actionUrl?: string;
};

export function resolveNewsletterAction(env: NewsletterEnv): string | null {
  const url = env.actionUrl?.trim();
  return url || null;
}

export function readNewsletterEnvFromImportMeta(): NewsletterEnv {
  return {
    actionUrl: import.meta.env.PUBLIC_NEWSLETTER_ACTION,
  };
}
