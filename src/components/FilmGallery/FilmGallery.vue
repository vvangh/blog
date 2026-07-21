<script setup lang="ts">
/**
 * 胶片相册：键盘左右切换，读屏读 caption。
 */
import { computed, onMounted, onUnmounted, ref } from "vue";

export type FilmFrame = {
  src: string;
  caption: string;
  title: string;
};

const props = defineProps<{
  frames: FilmFrame[];
  title: string;
  hint: string;
  prevLabel: string;
  nextLabel: string;
}>();

const index = ref(0);
const current = computed(() => props.frames[index.value] ?? null);

function prev(): void {
  if (props.frames.length === 0) return;
  index.value = (index.value - 1 + props.frames.length) % props.frames.length;
}

function next(): void {
  if (props.frames.length === 0) return;
  index.value = (index.value + 1) % props.frames.length;
}

function onKey(e: KeyboardEvent): void {
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    prev();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    next();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKey);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <section class="space-y-4" aria-labelledby="film-heading">
    <div>
      <h1 id="film-heading" class="text-3xl font-semibold">{{ props.title }}</h1>
      <p class="mt-2 text-hl-muted">{{ props.hint }}</p>
    </div>

    <div
      v-if="current"
      class="overflow-hidden rounded-lg border border-hl-border bg-black/80"
      role="group"
      :aria-roledescription="'film frame'"
      :aria-label="`${index + 1} / ${props.frames.length}: ${current.caption}`"
    >
      <img
        class="mx-auto max-h-[70vh] w-full object-contain"
        :src="current.src"
        :alt="current.caption"
      />
    </div>

    <p v-if="current" class="text-sm text-hl-muted" aria-live="polite">{{ current.caption }}</p>

    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        class="inline-flex min-h-10 items-center rounded-md border border-hl-border px-4 font-medium"
        @click="prev"
      >
        {{ props.prevLabel }}
      </button>
      <button
        type="button"
        class="inline-flex min-h-10 items-center rounded-md border border-hl-border px-4 font-medium"
        @click="next"
      >
        {{ props.nextLabel }}
      </button>
      <span class="self-center font-mono text-sm text-hl-muted"
        >{{ index + 1 }} / {{ props.frames.length }}</span
      >
    </div>
  </section>
</template>
