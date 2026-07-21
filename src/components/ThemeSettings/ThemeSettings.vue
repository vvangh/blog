<script setup lang="ts">
/**
 * 主题四模式设置岛：浅色 / 暗色 / 自动 / 自定义时段。
 * 偏好写入 localStorage；切换后更新 html[data-theme] 并用 aria-live 播报。
 */
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import {
  applyResolvedTheme,
  readThemePreference,
  resolveEffectiveTheme,
  writeThemePreference,
  type ThemeMode,
  type ThemePreference,
} from "@/lib/theme";

const props = withDefaults(
  defineProps<{
    heading?: string;
    hint?: string;
  }>(),
  {
    heading: "外观",
    hint: "浅色、暗色、跟随系统，或按作息自定义时段。",
  },
);

const preference = ref<ThemePreference>(readThemePreference());
const liveMessage = ref("");
let media: MediaQueryList | null = null;

const modes: { value: ThemeMode; label: string; hint: string }[] = [
  { value: "light", label: "浅色", hint: "始终浅色" },
  { value: "dark", label: "暗色", hint: "始终暗色" },
  { value: "auto", label: "自动", hint: "跟随系统" },
  { value: "custom", label: "自定义", hint: "按时段切换" },
];

const showSchedule = computed(() => preference.value.mode === "custom");

function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyAndAnnounce(): void {
  const resolved = resolveEffectiveTheme(
    preference.value.mode,
    systemPrefersDark(),
    preference.value.schedule,
  );
  applyResolvedTheme(resolved);
  writeThemePreference(preference.value);
  const modeLabel =
    modes.find((m) => m.value === preference.value.mode)?.label ?? preference.value.mode;
  liveMessage.value = `主题已设为${modeLabel}，当前为${resolved === "dark" ? "暗色" : "浅色"}外观`;
}

function onScheduleChange(): void {
  applyAndAnnounce();
}

function onSystemChange(): void {
  if (preference.value.mode === "auto") applyAndAnnounce();
}

onMounted(() => {
  preference.value = readThemePreference();
  applyAndAnnounce();
  media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onSystemChange);
});

onUnmounted(() => {
  media?.removeEventListener("change", onSystemChange);
});

watch(
  () => preference.value.mode,
  () => {
    applyAndAnnounce();
  },
);

watch(
  () => [preference.value.schedule.lightStart, preference.value.schedule.lightEnd],
  () => {
    if (preference.value.mode === "custom") onScheduleChange();
  },
);
</script>

<template>
  <section
    class="grid max-w-md gap-3 rounded-xl border border-hl-border bg-hl-panel p-4"
    aria-labelledby="theme-settings-heading"
  >
    <h2 id="theme-settings-heading" class="m-0 text-lg font-semibold">{{ props.heading }}</h2>
    <p class="m-0 text-sm text-hl-muted">{{ props.hint }}</p>

    <fieldset class="m-0 grid gap-2 border-0 p-0">
      <legend class="sr-only">主题模式</legend>
      <label
        v-for="item in modes"
        :key="item.value"
        class="grid cursor-pointer grid-cols-[auto_1fr] grid-rows-[auto_auto] items-center gap-x-2 rounded-lg px-2 py-1.5 hover:bg-hl-soft/60"
      >
        <input
          v-model="preference.mode"
          class="row-span-2"
          type="radio"
          name="henglu-theme-mode"
          :value="item.value"
        />
        <span class="font-semibold">{{ item.label }}</span>
        <span class="text-xs text-hl-muted">{{ item.hint }}</span>
      </label>
    </fieldset>

    <div v-if="showSchedule" class="grid gap-3 pt-1">
      <label class="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>浅色开始</span>
        <input
          v-model="preference.schedule.lightStart"
          class="min-h-9 rounded-md border border-hl-border bg-hl-bg px-2 text-hl-fg"
          type="time"
          name="lightStart"
          required
          @change="onScheduleChange"
        />
      </label>
      <label class="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>浅色结束</span>
        <input
          v-model="preference.schedule.lightEnd"
          class="min-h-9 rounded-md border border-hl-border bg-hl-bg px-2 text-hl-fg"
          type="time"
          name="lightEnd"
          required
          @change="onScheduleChange"
        />
      </label>
      <p class="m-0 text-xs text-hl-muted">支持跨午夜（例如 22:00 到次日 06:00）。</p>
    </div>

    <p class="sr-only" aria-live="polite" aria-atomic="true">{{ liveMessage }}</p>
  </section>
</template>
