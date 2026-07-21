/**
 * Conventional Commits + 中文摘要约定。
 * type 用英文；subject 用简体中文说明「为什么」。
 */
/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 允许中文 subject；不强制 ASCII
    "subject-case": [0],
    "subject-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
  },
};

export default config;
