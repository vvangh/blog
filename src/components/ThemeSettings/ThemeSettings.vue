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

function onModeChange(mode: ThemeMode): void {
  preference.value = { ...preference.value, mode };
  applyAndAnnounce();
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
  () => [preference.value.schedule.lightStart, preference.value.schedule.lightEnd],
  () => {
    if (preference.value.mode === "custom") onScheduleChange();
  },
);
</script>

<template>
  <section class="theme-settings" aria-labelledby="theme-settings-heading">
    <h2 id="theme-settings-heading" class="theme-settings__title">{{ props.heading }}</h2>
    <p class="theme-settings__hint">{{ props.hint }}</p>

    <fieldset class="theme-settings__modes">
      <legend class="sr-only">主题模式</legend>
      <label v-for="item in modes" :key="item.value" class="theme-settings__option">
        <input
          type="radio"
          name="henglu-theme-mode"
          :value="item.value"
          :checked="preference.mode === item.value"
          @change="onModeChange(item.value)"
        />
        <span class="theme-settings__option-label">{{ item.label }}</span>
        <span class="theme-settings__option-hint">{{ item.hint }}</span>
      </label>
    </fieldset>

    <div v-if="showSchedule" class="theme-settings__schedule">
      <label class="theme-settings__time">
        <span>浅色开始</span>
        <input
          v-model="preference.schedule.lightStart"
          type="time"
          name="lightStart"
          required
          @change="onScheduleChange"
        />
      </label>
      <label class="theme-settings__time">
        <span>浅色结束</span>
        <input
          v-model="preference.schedule.lightEnd"
          type="time"
          name="lightEnd"
          required
          @change="onScheduleChange"
        />
      </label>
      <p class="theme-settings__schedule-note">支持跨午夜（例如 22:00 到次日 06:00）。</p>
    </div>

    <p class="sr-only" aria-live="polite" aria-atomic="true">{{ liveMessage }}</p>
  </section>
</template>

<style scoped>
.theme-settings {
  display: grid;
  gap: 0.75rem;
  max-width: 28rem;
  padding: 1rem;
  border: 1px solid color-mix(in oklab, var(--henglu-fg) 18%, transparent);
  border-radius: 0.5rem;
  background: color-mix(in oklab, var(--henglu-bg) 92%, var(--henglu-accent));
}

.theme-settings__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.theme-settings__hint {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.75;
}

.theme-settings__modes {
  margin: 0;
  padding: 0;
  border: 0;
  display: grid;
  gap: 0.5rem;
}

.theme-settings__option {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 0.5rem;
  align-items: center;
  cursor: pointer;
}

.theme-settings__option input {
  grid-row: 1 / span 2;
}

.theme-settings__option-label {
  font-weight: 600;
}

.theme-settings__option-hint {
  font-size: 0.8125rem;
  opacity: 0.7;
}

.theme-settings__schedule {
  display: grid;
  gap: 0.75rem;
  padding-top: 0.25rem;
}

.theme-settings__time {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.theme-settings__time input {
  min-height: 2.25rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid color-mix(in oklab, var(--henglu-fg) 25%, transparent);
  border-radius: 0.375rem;
  background: var(--henglu-bg);
  color: var(--henglu-fg);
}

.theme-settings__schedule-note {
  margin: 0;
  font-size: 0.8125rem;
  opacity: 0.7;
}

.theme-settings :focus-visible {
  outline: 2px solid var(--henglu-accent);
  outline-offset: 2px;
}
</style>
