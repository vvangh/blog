/**
 * ADR（架构决策记录）静态图数据。
 * 目录外请经 `@/lib/adr` 导入。
 */

export type AdrNode = {
  id: string;
  title: string;
  status: "accepted" | "superseded" | "proposed";
};

export type AdrEdge = {
  from: string;
  to: string;
  /** 例如 superseded_by */
  rel: string;
};

export const ADR_NODES: AdrNode[] = [
  { id: "adr-001", title: "Husky + ESLint 双轨", status: "superseded" },
  { id: "adr-002", title: "Vite+ 统一门禁", status: "accepted" },
  { id: "adr-003", title: "墨衡水墨视觉", status: "superseded" },
  { id: "adr-004", title: "Signal 现代简约", status: "accepted" },
  { id: "adr-005", title: "Deploy 仅 main", status: "accepted" },
];

export const ADR_EDGES: AdrEdge[] = [
  { from: "adr-001", to: "adr-002", rel: "superseded_by" },
  { from: "adr-003", to: "adr-004", rel: "superseded_by" },
];
