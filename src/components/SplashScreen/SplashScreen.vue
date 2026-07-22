<script setup lang="ts">
/**
 * 进站 Splash：点火亮相（全站动效峰值）。
 * 极光铺场 → 合拢闪光 → 副标 → 序曲结束自动揭幕交棒首页。
 * 揭幕一开始写 data-splash=exit，首页 rise / 打字机与遮罩叠化。
 * 默认本会话只播一次；`?splash=1` 强制每次播，`?splash=0` 跳过；「跳过」可提前揭幕。
 * vue API 由 unplugin-auto-import 注入。
 */
import {
  SPLASH_CHOREO_MS,
  SPLASH_EXIT_MS,
  SPLASH_STORAGE_KEY,
  shouldForceSplashShow,
} from "@/lib/splash";

const props = defineProps<{
  brand: string;
  skipLabel: string;
  tagline?: string;
}>();

const visible = ref(false);
const exiting = ref(false);
let choreoTimer: ReturnType<typeof setTimeout> | undefined;
let exitTimer: ReturnType<typeof setTimeout> | undefined;

const forceShow = import.meta.env.SSR
  ? false
  : shouldForceSplashShow(import.meta.env.DEV, window.location.search);

/** 拆成单字，便于双翼合拢；品牌一般为 vv */
const glyphs = computed(() => Array.from(props.brand));

function hideStaticCover() {
  document.querySelector<HTMLElement>("[data-splash-cover]")?.setAttribute("hidden", "");
}

function markSplashDone() {
  document.documentElement.dataset.splash = "done";
  hideStaticCover();
}

function clearTimers() {
  if (choreoTimer) clearTimeout(choreoTimer);
  if (exitTimer) clearTimeout(exitTimer);
  choreoTimer = undefined;
  exitTimer = undefined;
}

function finishDismiss() {
  visible.value = false;
  exiting.value = false;
  markSplashDone();
  if (!forceShow) {
    try {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }
}

function beginExit() {
  if (exiting.value || !visible.value) return;
  exiting.value = true;
  clearTimers();
  /* 先放行首页入场，再播揭幕，形成叠化交棒 */
  const root = document.documentElement;
  root.dataset.splashHandoff = "1";
  root.dataset.splash = "exit";
  exitTimer = setTimeout(finishDismiss, SPLASH_EXIT_MS);
}

function dismiss() {
  beginExit();
}

onMounted(() => {
  if (!forceShow) {
    try {
      if (sessionStorage.getItem(SPLASH_STORAGE_KEY) === "1") {
        markSplashDone();
        return;
      }
    } catch {
      /* ignore */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      try {
        sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      markSplashDone();
      return;
    }
  }

  document.documentElement.dataset.splash = "pending";
  visible.value = true;
  void nextTick(() => hideStaticCover());

  /* 序曲结束自动揭幕（强制展示也不钉死） */
  choreoTimer = setTimeout(beginExit, SPLASH_CHOREO_MS);
});

onUnmounted(() => {
  clearTimers();
});
</script>

<template>
  <div
    v-if="visible"
    class="splash"
    :class="{ 'is-exiting': exiting }"
    role="dialog"
    aria-modal="true"
    :aria-label="props.brand"
  >
    <div class="splash__aurora splash__aurora--cool" aria-hidden="true" />
    <div class="splash__aurora splash__aurora--warm" aria-hidden="true" />
    <div class="splash__beam" aria-hidden="true" />
    <div class="splash__rings" aria-hidden="true">
      <span class="splash__ring splash__ring--1" />
      <span class="splash__ring splash__ring--2" />
      <span class="splash__ring splash__ring--3" />
    </div>
    <div class="splash__flash" aria-hidden="true" />
    <div class="splash__streak" aria-hidden="true" />

    <p class="splash__mark brand-mark" aria-hidden="true">
      <span
        v-for="(g, i) in glyphs"
        :key="`${g}-${i}`"
        class="splash__v"
        :class="i % 2 === 0 ? 'splash__v--a' : 'splash__v--b'"
        >{{ g }}</span
      >
    </p>
    <span class="sr-only">{{ props.brand }}</span>

    <p v-if="props.tagline" class="splash__tagline">
      <span class="splash__tagline-text">{{ props.tagline }}</span>
      <span class="splash__tagline-rule" aria-hidden="true" />
    </p>

    <button type="button" class="splash__skip" @click="dismiss">
      {{ props.skipLabel }}
    </button>
  </div>
</template>
