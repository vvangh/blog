/**
 * remark 容器指令 → 提示框（:::tip / :::note / :::warn / :::danger）。
 * 需配合 `remark-directive`，并经 unified 处理器启用。
 */
import { visit } from "unist-util-visit";

const CALLOUT_LABELS: Record<string, string> = {
  tip: "提示",
  note: "说明",
  info: "信息",
  warn: "注意",
  warning: "注意",
  danger: "警告",
};

type DirectiveLike = {
  type: string;
  name?: string;
  data?: {
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
  children?: unknown[];
};

function titleParagraph(label: string) {
  return {
    type: "paragraph",
    data: {
      hName: "p",
      hProperties: { className: ["callout__title"] },
    },
    children: [{ type: "text", value: label }],
  };
}

/** Astro / unified remark 插件：把 containerDirective 变成 aside.callout */
export function remarkCallouts() {
  return (tree: { type: string }) => {
    visit(tree, (node) => {
      const directive = node as DirectiveLike;
      if (directive.type !== "containerDirective" || !directive.name) return;

      const key = directive.name.toLowerCase();
      const label = CALLOUT_LABELS[key];
      if (!label) return;

      const normalized = key === "warning" ? "warn" : key;
      const data = directive.data ?? (directive.data = {});
      data.hName = "aside";
      data.hProperties = {
        className: ["callout", `callout--${normalized}`],
        role: "note",
        "data-callout": normalized,
      };

      const children = (directive.children ??= []);
      children.unshift(titleParagraph(label));
    });
  };
}
