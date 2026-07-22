<script setup lang="ts">
/**
 * 首页副标题打字机：逐字输入 → 打完停留 → 逐字删除 → 循环。
 * 轮间间隔在「打完」时计时；光标跟在已显示文本后。
 * Splash pending 时等待揭开再播。vue / VueUse 由 auto-import 注入。
 */
const props = defineProps<{
  text: string;
}>();

const shown = ref("");
const ready = ref(false);

const CHAR_MS = 580;
const DELETE_MS = 110;
const START_DELAY_MS = 700;
/** 打完一整句后的停留（轮间间隔从这里计，不是删干净后） */
const HOLD_MS = 2600;
/** 删完到下一轮开打：只留极短空档，避免空屏硬接 */
const AFTER_DELETE_MS = 320;

let timer: ReturnType<typeof setTimeout> | undefined;
const signal = { stopped: false };

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    timer = setTimeout(resolve, ms);
  });
}

function waitSplashDone(): Promise<void> {
  return new Promise((resolve) => {
    const root = document.documentElement;
    if (root.dataset.splash !== "pending") {
      resolve();
      return;
    }
    const obs = new MutationObserver(() => {
      if (root.dataset.splash !== "pending") {
        obs.disconnect();
        resolve();
      }
    });
    obs.observe(root, { attributes: true, attributeFilter: ["data-splash"] });
  });
}

async function runLoop(): Promise<void> {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    shown.value = props.text;
    ready.value = true;
    return;
  }

  await waitSplashDone();
  if (signal.stopped) return;
  await sleep(START_DELAY_MS);
  if (signal.stopped) return;
  ready.value = true;

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
