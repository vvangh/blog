<script setup lang="ts">
/**
 * 可配置背景层：图/视频、静态/轮播、手动切换；支持仅首页或全站。
 * 首页现为 Hero+页脚，壁纸常驻，不随滚动淡成白底。
 */
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import {
  advanceIndex,
  BACKGROUND_CONFIG,
  resolvePlaylist,
  shouldShowBackground,
  type BgItem,
} from "@/lib/bg";

const props = withDefaults(
  defineProps<{
    /** 当前路由是否首页 */
    isHome?: boolean;
    prevLabel?: string;
    nextLabel?: string;
    switcherLabel?: string;
  }>(),
  {
    isHome: false,
    prevLabel: "上一张背景",
    nextLabel: "下一张背景",
    switcherLabel: "切换背景",
  },
);

const base = import.meta.env.BASE_URL;
const playlist = ref<BgItem[]>(resolvePlaylist(BACKGROUND_CONFIG));
const index = ref(0);
const videoRef = ref<HTMLVideoElement | null>(null);
let timer: ReturnType<typeof setInterval> | undefined;

const active = computed(() => shouldShowBackground(BACKGROUND_CONFIG, props.isHome));
const current = computed(() => (active.value ? (playlist.value[index.value] ?? null) : null));
const opacity = BACKGROUND_CONFIG.opacity;
const showSwitcher = computed(
  () => active.value && BACKGROUND_CONFIG.manualSwitch && playlist.value.length > 1,
);

function assetUrl(src: string) {
  return `${base}${src.replace(/^\//, "")}`;
}

function clearTimer() {
  if (timer) {
    clearInterval(timer);
    timer = undefined;
  }
}

function startAutoplay() {
  clearTimer();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const list = playlist.value;
  if (!active.value || list.length <= 1 || reduce || BACKGROUND_CONFIG.mode === "static") {
    return;
  }
  timer = setInterval(() => {
    index.value = advanceIndex(index.value, list.length, 1);
  }, BACKGROUND_CONFIG.intervalMs);
}

function go(delta: number) {
  const list = playlist.value;
  if (list.length <= 1) return;
  index.value = advanceIndex(index.value, list.length, delta);
  startAutoplay();
}

function syncVideoPlayback() {
  const el = videoRef.value;
  if (!el) return;
  if (!active.value) {
    el.pause();
  } else if (el.paused) {
    void el.play().catch(() => {
      /* 自动播放被拒时忽略 */
    });
  }
}

onMounted(() => {
  startAutoplay();
  syncVideoPlayback();
});

onUnmounted(() => {
  clearTimer();
});

watch(
  () => props.isHome,
  () => {
    startAutoplay();
    syncVideoPlayback();
  },
);
</script>

<template>
  <div
    v-if="current"
    class="bg-layer pointer-events-none fixed inset-0 z-0 overflow-hidden"
    aria-hidden="true"
  >
    <img
      v-if="current.type === 'image'"
      :key="current.src"
      :src="assetUrl(current.src)"
      :alt="current.alt ?? ''"
      class="bg-layer__media motion-safe-media-drift h-full w-full object-cover"
      :style="{ opacity }"
    />
    <video
      v-else
      :key="current.src"
      ref="videoRef"
      class="bg-layer__media motion-safe-media-drift h-full w-full object-cover"
      :style="{ opacity }"
      autoplay
      muted
      loop
      playsinline
      :src="assetUrl(current.src)"
    />
  </div>

  <div
    v-if="showSwitcher"
    class="bg-switcher glass-chip pointer-events-auto fixed bottom-6 left-4 z-40 flex items-center gap-1 md:left-6"
    role="group"
    :aria-label="switcherLabel"
  >
    <button type="button" class="bg-switcher__btn" :aria-label="prevLabel" @click="go(-1)">
      ‹
    </button>
    <span class="bg-switcher__count" aria-live="polite">
      {{ index + 1 }}/{{ playlist.length }}
    </span>
    <button type="button" class="bg-switcher__btn" :aria-label="nextLabel" @click="go(1)">›</button>
  </div>
</template>

<style scoped>
.bg-switcher {
  padding: 0.25rem;
}

.bg-switcher__btn {
  display: inline-flex;
  min-height: 2.25rem;
  min-width: 2.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: none;
  background: transparent;
  font-size: 1.25rem;
  line-height: 1;
  color: var(--hl-fg);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.bg-switcher__btn:hover {
  background: color-mix(in oklab, var(--hl-fg) 8%, transparent);
}

.bg-switcher__btn:focus-visible {
  outline: 2px solid var(--hl-focus);
  outline-offset: 2px;
}

.bg-switcher__count {
  min-width: 2.5rem;
  text-align: center;
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  color: var(--hl-muted);
}

@media (prefers-reduced-motion: no-preference) {
  .bg-layer {
    transition: opacity 0.35s ease;
  }

  .bg-layer__media {
    transition: opacity 1.2s ease;
  }
}
</style>
