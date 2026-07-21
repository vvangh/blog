/**
 * Webmentions：需外部账号（如 webmention.io）；缺配置则优雅降级。
 * 目录外请经 `@/lib/webmentions` 导入。
 */

export type WebmentionEnv = {
  /** 例如 https://webmention.io/example.com/webmention */
  endpoint?: string;
  /** 拉取用 API，例如 https://webmention.io/api/mentions.jf2?target= */
  apiBase?: string;
};

export type WebmentionItem = {
  id: string;
  author: string;
  url: string;
  published?: string;
  content?: string;
};

export function resolveWebmentionEndpoint(env: WebmentionEnv): string | null {
  const endpoint = env.endpoint?.trim();
  return endpoint || null;
}

export function resolveWebmentionApiBase(env: WebmentionEnv): string | null {
  const api = env.apiBase?.trim();
  return api || null;
}

export function readWebmentionEnvFromImportMeta(): WebmentionEnv {
  return {
    endpoint: import.meta.env.PUBLIC_WEBMENTION_ENDPOINT,
    apiBase: import.meta.env.PUBLIC_WEBMENTION_API,
  };
}

/** 解析 JF2 children 为列表（构建期 fetch 用） */
export function parseJf2Mentions(payload: unknown): WebmentionItem[] {
  if (!payload || typeof payload !== "object") return [];
  const children = (payload as { children?: unknown }).children;
  if (!Array.isArray(children)) return [];
  const items: WebmentionItem[] = [];
  for (const child of children) {
    if (!child || typeof child !== "object") continue;
    const c = child as Record<string, unknown>;
    const url = typeof c.url === "string" ? c.url : "";
    if (!url) continue;
    const authorObj =
      c.author && typeof c.author === "object" ? (c.author as Record<string, unknown>) : {};
    const author =
      typeof authorObj.name === "string"
        ? authorObj.name
        : typeof c["wm-source"] === "string"
          ? String(c["wm-source"])
          : "unknown";
    items.push({
      id:
        typeof c["wm-id"] === "string" || typeof c["wm-id"] === "number" ? String(c["wm-id"]) : url,
      author,
      url,
      published: typeof c.published === "string" ? c.published : undefined,
      content:
        c.content &&
        typeof c.content === "object" &&
        typeof (c.content as { text?: string }).text === "string"
          ? (c.content as { text: string }).text
          : undefined,
    });
  }
  return items;
}
