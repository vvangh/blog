<script setup lang="ts">
/**
 * 听读岛：展示阅读时长估算，并用浏览器 Speech Synthesis 朗读正文。
 */
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    minutes: number;
    minutesLabel: string;
    startLabel: string;
    stopLabel: string;
    unsupportedLabel: string;
    /** 朗读目标选择器，默认文章正文 */
    targetSelector?: string;
  }>(),
  {
    targetSelector: "[data-read-aloud-root]",
  },
);

const supported = ref(false);
const speaking = ref(false);
let utterance: SpeechSynthesisUtterance | null = null;

function collectText(): string {
  const root = document.querySelector(props.targetSelector);
  return root?.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

function stop(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  speaking.value = false;
  utterance = null;
}

function start(): void {
  if (!supported.value) return;
  stop();
  const text = collectText();
  if (!text) return;
  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = document.documentElement.lang || "zh-CN";
  utterance.onend = () => {
    speaking.value = false;
  };
  utterance.onerror = () => {
    speaking.value = false;
  };
  speaking.value = true;
  window.speechSynthesis.speak(utterance);
}

function toggle(): void {
  if (speaking.value) stop();
  else start();
}

onMounted(() => {
  supported.value = typeof window !== "undefined" && "speechSynthesis" in window;
});

onBeforeUnmount(() => {
  stop();
});
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 text-sm text-hl-muted" data-pagefind-ignore>
    <p class="m-0">{{ props.minutesLabel.replace("{n}", String(props.minutes)) }}</p>
    <button
      v-if="supported"
      type="button"
      class="inline-flex min-h-9 items-center rounded-md border border-hl-border px-3 font-medium text-hl-fg transition hover:border-hl-accent hover:text-hl-accent"
      :aria-pressed="speaking"
      @click="toggle"
    >
      {{ speaking ? props.stopLabel : props.startLabel }}
    </button>
    <p v-else class="m-0 text-xs">{{ props.unsupportedLabel }}</p>
  </div>
</template>
