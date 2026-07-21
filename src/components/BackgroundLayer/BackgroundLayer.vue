<script setup lang="ts">
/**
 * 可配置背景层：图/视频轮播，尊重 reduced-motion（停在静态首帧）。
 */
import { computed, onMounted, onUnmounted, ref } from "vue";
import { BACKGROUND_CONFIG, resolvePlaylist, type BgItem } from "@/lib/bg";

const base = import.meta.env.BASE_URL;
const playlist = ref<BgItem[]>([]);
const index = ref(0);
let timer: ReturnType<typeof setInterval> | undefined;

const current = computed(() => playlist.value[index.value] ?? null);
const opacity = BACKGROUND_CONFIG.opacity;

function assetUrl(src: string) {
  return `${base}${src.replace(/^\//, "")}`;
}

onMounted(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const list = resolvePlaylist(BACKGROUND_CONFIG);
  playlist.value = list;
  if (list.length <= 1 || reduce || BACKGROUND_CONFIG.mode === "static") return;
  timer = setInterval(() => {
    index.value = (index.value + 1) % list.length;
  }, BACKGROUND_CONFIG.intervalMs);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div
    v-if="current"
    class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    aria-hidden="true"
  >
    <img
      v-if="current.type === 'image'"
      :key="current.src"
      :src="assetUrl(current.src)"
      :alt="current.alt ?? ''"
      class="h-full w-full object-cover"
      :style="{ opacity }"
    />
    <video
      v-else
      :key="current.src"
      class="h-full w-full object-cover"
      :style="{ opacity }"
      autoplay
      muted
      loop
      playsinline
      :src="assetUrl(current.src)"
    />
  </div>
</template>
