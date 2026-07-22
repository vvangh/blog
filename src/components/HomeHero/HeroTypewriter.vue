<script setup lang="ts">
/**
 * 首页副标题打字机：逐字输入 → 打完停留 → 逐字删除 → 循环。
 * Splash 交棒时：先承接整句（开屏已亮过），停顿后再删循环，避免立刻重打。
 * 无 Splash / 已看过：揭开后光标占位 → 停顿开打。
 * vue / VueUse 由 auto-import 注入。
 */
const props = defineProps<{
  text: string;
}>();

const shown = ref("");
const ready = ref(false);

const CHAR_MS = 280;
const DELETE_MS = 100;
/** 无交棒时：揭开后 / 首轮开打前的停顿 */
const START_DELAY_MS = 1600;
/** 交棒后整句亮着再开删的停留（略长于揭幕，让人看清衔接） */
const HANDOFF_HOLD_MS = 1400;
/** 打完一整句后的停留（轮间间隔从这里计，不是删干净后） */
const HOLD_MS = 2600;
/** 删完后稍停再开打，避免空屏立刻接下一轮 */
const AFTER_DELETE_MS = 1600;

let timer: ReturnType<typeof setTimeout> | undefined;
const signal = { stopped: false };

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    timer = setTimeout(resolve, ms);
  });
}

/** 等到不再 pending（exit 即放行，与揭幕叠化） */
function waitSplashGate(): Promise<"handoff" | "plain"> {
  return new Promise((resolve) => {
    const root = document.documentElement;
    const decide = (): "handoff" | "plain" | null => {
      const state = root.dataset.splash;
      if (state === "pending") return null;
      if (state === "exit" || root.dataset.splashHandoff === "1") return "handoff";
      return "plain";
    };
    const first = decide();
    if (first) {
      resolve(first);
      return;
    }
    const obs = new MutationObserver(() => {
      const next = decide();
      if (next) {
        obs.disconnect();
        resolve(next);
      }
    });
    obs.observe(root, {
      attributes: true,
      attributeFilter: ["data-splash", "data-splash-handoff"],
    });
  });
}

async function deleteThenTypeLoop(): Promise<void> {
  const chars = [...props.text];
  while (!signal.stopped) {
    for (let i = chars.length - 1; i >= 0; i--) {
      if (signal.stopped) return;
      shown.value = chars.slice(0, i).join("");
      await sleep(DELETE_MS);
    }
    await sleep(AFTER_DELETE_MS);
    for (let i = 1; i <= chars.length; i++) {
      if (signal.stopped) return;
      shown.value = chars.slice(0, i).join("");
      await sleep(CHAR_MS);
    }
    await sleep(HOLD_MS);
  }
}

async function typeThenLoop(): Promise<void> {
  const chars = [...props.text];
  while (!signal.stopped) {
    for (let i = 1; i <= chars.length; i++) {
      if (signal.stopped) return;
      shown.value = chars.slice(0, i).join("");
      await sleep(CHAR_MS);
    }
    await sleep(HOLD_MS);
    for (let i = chars.length - 1; i >= 0; i--) {
      if (signal.stopped) return;
      shown.value = chars.slice(0, i).join("");
      await sleep(DELETE_MS);
    }
    await sleep(AFTER_DELETE_MS);
  }
}

async function runLoop(): Promise<void> {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    shown.value = props.text;
    ready.value = true;
    return;
  }

  const gate = await waitSplashGate();
  if (signal.stopped) return;

  ready.value = true;

  if (gate === "handoff") {
    /* 开屏副标已亮过同一句：整句承接 → 再进入删打循环 */
    shown.value = props.text;
    await sleep(HANDOFF_HOLD_MS);
    if (signal.stopped) return;
    await deleteThenTypeLoop();
    return;
  }

  await sleep(START_DELAY_MS);
  if (signal.stopped) return;
  await typeThenLoop();
}

onMounted(() => {
  void runLoop();
});

onUnmounted(() => {
  signal.stopped = true;
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <span class="home-hero__typewriter">
    <span class="sr-only">{{ text }}</span>
    <span class="ink-invert" aria-hidden="true">{{ shown }}</span>
    <span v-show="ready" class="home-hero__cursor" aria-hidden="true" />
  </span>
</template>
