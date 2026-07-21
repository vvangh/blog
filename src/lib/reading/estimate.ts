/**
 * 阅读时长估算（纯函数，便于单测）。
 * 目录外请经 `@/lib/reading` 导入。
 */

/** 中文约 400 字/分；英文约 200 词/分；混合按字符粗估 */
const CJK_CHARS_PER_MINUTE = 400;
const LATIN_WORDS_PER_MINUTE = 200;

export type ReadingEstimate = {
  /** 预计分钟数（至少 1） */
  minutes: number;
  /** 用于估算的字/词量 */
  units: number;
};

/**
 * 从纯文本估算阅读分钟数。
 * 含 CJK 时按字符计；否则按空白分词。
 */
export function estimateReadingMinutes(text: string): ReadingEstimate {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return { minutes: 1, units: 0 };

  const cjk = cleaned.match(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g);
  const cjkCount = cjk?.length ?? 0;
  if (cjkCount > 0) {
    const minutes = Math.max(1, Math.ceil(cjkCount / CJK_CHARS_PER_MINUTE));
    return { minutes, units: cjkCount };
  }

  const words = cleaned.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / LATIN_WORDS_PER_MINUTE));
  return { minutes, units: words };
}
