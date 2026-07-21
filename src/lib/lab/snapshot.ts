/**
 * 仓库仪表盘静态数据（构建时展示；可由 CI 后续覆写 JSON）。
 * 目录外请经 `@/lib/lab` 导入。
 */

export type LabSnapshot = {
  repo: string;
  defaultBranch: string;
  tags: string[];
  ciStatus: "passing" | "unknown";
  unitTests: number;
  e2eTests: number;
  lastUpdated: string;
};

export const LAB_SNAPSHOT: LabSnapshot = {
  repo: "vvangh/blog",
  defaultBranch: "develop",
  tags: ["milestone/06-blog-mvp"],
  ciStatus: "passing",
  unitTests: 20,
  e2eTests: 12,
  lastUpdated: "2026-07-21",
};
