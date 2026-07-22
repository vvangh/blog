/**
 * `@/lib/search`：服务端目录构建 + 客户端可安全导入的过滤。
 * Vue 岛请只从 `@/lib/search/filter` 导入过滤函数。
 */
export type { DevSearchEntry } from "./types";
export { buildDevSearchCatalog } from "./dev-catalog";
export { filterDevCatalog } from "./filter";
