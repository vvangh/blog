/**
 * 标签路径段：编码后可进 URL，读回时解码。
 * 目录外请经 `@/lib/tags` 导入。
 */

/**
 * 写入 localePath 的 path 片段（单层百分号编码）。
 * 注意：`getStaticPaths` 的 `params.tag` 必须用原文，勿对本函数结果再塞进 params。
 */
export function toTagParam(tag: string): string {
  return encodeURIComponent(tag);
}

/** 从路由参数还原标签原文 */
export function fromTagParam(param: string): string {
  try {
    return decodeURIComponent(param);
  } catch {
    return param;
  }
}
