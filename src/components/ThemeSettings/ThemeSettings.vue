<script setup lang="ts">
/**
 * 主题四模式：浅色 / 暗色 / 自动 / 自定义时段。
 * 自定义进入独立子页配置，确认后再写回；持久化仍走 localStorage（首屏防闪脚本依赖）。
 * vue API 由 unplugin-auto-import 注入，勿手写 import。
 */
import { ArrowLeft, Clock, Monitor, Moon, Sun } from "@lucide/vue";
import {
  applyResolvedTheme,
  readThemePreference,
  resolveEffectiveTheme,
  writeThemePreference,
  type CustomSchedule,
  type ThemeMode,
  type ThemePreference,
} from "@/lib/theme";

const props = withDefaults(
  defineProps<{
    heading?: string;
    scheduleTitle?: string;
    backLabel?: string;
    confirmLabel?: string;
    lightStartLabel?: string;
    lightEndLabel?: string;
  }>(),
  {
    heading: "外观",
    scheduleTitle: "自定义时段",
    backLabel: "返回",
    confirmLabel: "完成",
    lightStartLabel: "浅色开始",
    lightEndLabel: "浅色结束",
  },
);

const preference = ref<ThemePreference>(readThemePreference());
const panel = ref<"modes" | "schedule">("modes");
const draftSchedule = ref<CustomSchedule>({ ...preference.value.schedule });
const liveMessage = ref("");
let media: MediaQueryList | null = null;

const modes: {
  value: ThemeMode;
  label: string;
  hint: string;
  icon: typeof Sun;
}[] = [
  { value: "light", label: "浅色", hint: "始终浅色", icon: Sun },
  { value: "dark", label: "暗色", hint: "始终暗色", icon: Moon },
  { value: "auto", label: "自动", hint: "跟随系统", icon: Monitor },
  { value: "custom", label: "自定义", hint: "按时段切换", icon: Clock },
];

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

function selectMode(mode: ThemeMode): void {
  if (mode === "custom") {
    draftSchedule.value = { ...preference.value.schedule };
    panel.value = "schedule";
    return;
  }
  preference.value = { ...preference.value, mode };
}

function backToModes(): void {
  panel.value = "modes";
}

function confirmSchedule(): void {
  preference.value = {
    mode: "custom",
    schedule: { ...draftSchedule.value },
  };
  panel.value = "modes";
}

function onSystemChange(): void {
  if (preference.value.mode === "auto") applyAndAnnounce();
}

onMounted(() => {
  preference.value = readThemePreference();
  draftSchedule.value = { ...preference.value.schedule };
  applyAndAnnounce();
  media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onSystemChange);
});

onUnmounted(() => {
  media?.removeEventListener("change", onSystemChange);
});

watch(
  () => [
    preference.value.mode,
    preference.value.schedule.lightStart,
    preference.value.schedule.lightEnd,
  ],
  () => {
    applyAndAnnounce();
  },
);
</script>

<template>
  <section class="prefs-panel prefs-section" aria-labelledby="theme-settings-heading">
    <template v-if="panel === 'modes'">
      <h2 id="theme-settings-heading" class="prefs-section__title">{{ props.heading }}</h2>

      <div class="prefs-tiles" role="radiogroup" :aria-label="props.heading">
        <button
          v-for="item in modes"
          :key="item.value"
          type="button"
          role="radio"
          class="prefs-tile"
          :aria-checked="preference.mode === item.value"
          @click="selectMode(item.value)"
        >
          <component :is="item.icon" class="prefs-tile__icon" :size="20" :stroke-width="1.6" />
          <span>
            <span class="prefs-tile__label">{{ item.label }}</span>
            <span class="prefs-tile__hint">{{ item.hint }}</span>
          </span>
        </button>
      </div>
    </template>

    <template v-else>
      <div class="prefs-subhead">
        <button type="button" class="prefs-back" :aria-label="props.backLabel" @click="backToModes">
          <ArrowLeft :size="18" :stroke-width="1.75" aria-hidden="true" />
        </button>
        <h2 id="theme-settings-heading" class="prefs-section__title">{{ props.scheduleTitle }}</h2>
      </div>

      <div class="prefs-schedule">
        <label>
          <span>{{ props.lightStartLabel }}</span>
          <input v-model="draftSchedule.lightStart" type="time" name="lightStart" required />
        </label>
        <label>
          <span>{{ props.lightEndLabel }}</span>
          <input v-model="draftSchedule.lightEnd" type="time" name="lightEnd" required />
        </label>
      </div>

      <div class="prefs-actions">
        <button type="button" class="prefs-action prefs-action--ghost" @click="backToModes">
          {{ props.backLabel }}
        </button>
        <button type="button" class="prefs-action prefs-action--solid" @click="confirmSchedule">
          {{ props.confirmLabel }}
        </button>
      </div>
    </template>

    <p class="sr-only" aria-live="polite" aria-atomic="true">{{ liveMessage }}</p>
  </section>
</template>
