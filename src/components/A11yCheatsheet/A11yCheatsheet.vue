<script setup lang="ts">
/**
 * 快捷键帮助：按 ? 打开（输入框内不拦截）。
 */
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{
  title: string;
  openLabel: string;
  closeLabel: string;
  body: string;
}>();

const open = ref(false);

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}

function onKey(e: KeyboardEvent): void {
  if (isTypingTarget(e.target)) return;
  if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
    e.preventDefault();
    open.value = !open.value;
  } else if (e.key === "Escape" && open.value) {
    open.value = false;
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
  <div data-pagefind-ignore>
    <button
      type="button"
      class="fixed right-4 bottom-4 z-50 inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-hl-border bg-hl-panel text-sm font-semibold shadow"
      :aria-label="props.openLabel"
      @click="open = true"
    >
      ?
    </button>

    <div
      v-if="open"
      class="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      :aria-label="props.title"
      @click.self="open = false"
    >
      <div class="max-w-md rounded-xl border border-hl-border bg-hl-bg p-5 shadow-lg">
        <div class="flex items-start justify-between gap-3">
          <h2 class="m-0 text-lg font-semibold">{{ props.title }}</h2>
          <button
            type="button"
            class="min-h-9 rounded-md border border-hl-border px-3 text-sm"
            @click="open = false"
          >
            {{ props.closeLabel }}
          </button>
        </div>
        <p class="mt-3 text-sm leading-relaxed text-hl-muted">{{ props.body }}</p>
      </div>
    </div>
  </div>
</template>
