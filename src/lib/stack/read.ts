/**
 * 今日栈：从 package.json 抽取主力版本（构建期可读）。
 * 目录外请经 `@/lib/stack` 导入。
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type StackItem = {
  name: string;
  version: string;
};

function stripRange(version: string): string {
  return version.replace(/^[\^~>=<\s]+/, "").split(" ")[0] ?? version;
}

/** 读取项目根 package.json 的关键依赖版本 */
export function readStackFromPackageJson(rootDir?: string): StackItem[] {
  const root = rootDir ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
  const raw = readFileSync(path.join(root, "package.json"), "utf8");
  const pkg = JSON.parse(raw) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  const deps = { ...pkg.devDependencies, ...pkg.dependencies };
  const keys = ["astro", "vue", "tailwindcss", "vite-plus", "pagefind"] as const;
  const items: StackItem[] = [];
  for (const key of keys) {
    const ver = deps[key];
    if (ver) items.push({ name: key, version: stripRange(ver) });
  }
  return items;
}
