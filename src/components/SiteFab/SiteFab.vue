<script setup lang="ts">
/**
 * 全站悬浮坞：返回顶部、站点设置抽屉。
 * 偏好不占用独立页面，避免「博客像后台」的观感。
 * 空闲后收到右侧只露边；悬停/聚焦再展开。
 * vue / VueUse / composables 由 unplugin-auto-import 注入，勿手写 import。
 */
import { X } from "@lucide/vue";
import { ThemeSettings } from "@/components/ThemeSettings";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";

const props = withDefaults(
  defineProps<{
    locale: Locale;
    /** 首页等短屏：不展示回顶（首屏即品牌区，无需「回到顶部」） */
    hideTop?: boolean;
    prefsTitle: string;
    prefsOpenLabel: string;
    prefsCloseLabel: string;
    topLabel: string;
    themeHeading: string;
    themeScheduleTitle: string;
    themeBackLabel: string;
    themeConfirmLabel: string;
    themeLightStartLabel: string;
    themeLightEndLabel: string;
    langHeading: string;
    langSwitched: string;
    langFilterPlaceholder: string;
    langFilterEmpty: string;
  }>(),
  { hideTop: false },
);

/** 跨岛共享：其它岛也可 openPrefs() 打开设置 */
const { prefsOpen, openPrefs: openPrefsStore, closePrefs } = usePrefsOpen();
const showTop = ref(false);
const prefsBtnRef = ref<HTMLButtonElement | null>(null);
const prefsCloseRef = ref<HTMLButtonElement | null>(null);
/** Escape 等键盘关闭时归还焦点；鼠标点遮罩/关闭则不归还，避免蓝圈 */
const restorePrefsFocus = ref(true);
/** 打开瞬间忽略遮罩点击，避免「同一次 click」穿透把抽屉立刻关掉 */
const ignoreScrimClickUntil = ref(0);
/** 空闲收到右侧；抽屉打开时强制展开 */
const docked = ref(false);

/** 无操作多久后收起（毫秒） */
const FAB_IDLE_MS = 3600;

const { start: armIdleHide, stop: clearIdleHide } = useTimeoutFn(
  () => {
    if (!prefsOpen.value) docked.value = true;
  },
  FAB_IDLE_MS,
  { immediate: false },
);

function revealFab(): void {
  docked.value = false;
  clearIdleHide();
  if (!prefsOpen.value) armIdleHide();
}

function onDockLeave(): void {
  if (prefsOpen.value) return;
  clearIdleHide();
  armIdleHide();
}

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}

function onScroll(): void {
  if (props.hideTop) {
    showTop.value = false;
    return;
  }
  const room = document.documentElement.scrollHeight - window.innerHeight;
  showTop.value = room > 240 && window.scrollY > 480;
}

function scrollTop(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

function openPrefs(): void {
  docked.value = false;
  clearIdleHide();
  ignoreScrimClickUntil.value = Date.now() + 320;
  openPrefsStore();
}

function closePrefsByPointer(): void {
  restorePrefsFocus.value = false;
  closePrefs();
}

function onScrimClick(): void {
  if (Date.now() < ignoreScrimClickUntil.value) return;
  closePrefsByPointer();
}

function onKey(e: KeyboardEvent): void {
  if (isTypingTarget(e.target)) return;
  if (e.key === "Escape" && prefsOpen.value) {
    e.preventDefault();
    restorePrefsFocus.value = true;
    closePrefs();
  }
}

watch(prefsOpen, async (open) => {
  document.body.style.overflow = open ? "hidden" : "";
  if (open) {
    docked.value = false;
    clearIdleHide();
  } else {
    armIdleHide();
  }
  await nextTick();
  if (open) {
    prefsCloseRef.value?.focus();
    return;
  }
  if (restorePrefsFocus.value) {
    prefsBtnRef.value?.focus({ preventScroll: true });
  }
  restorePrefsFocus.value = true;
});

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKey);
  armIdleHide();
});

onUnmounted(() => {
  clearIdleHide();
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKey);
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="site-fab" data-pagefind-ignore>
    <div
      v-show="!prefsOpen"
      class="site-fab__dock fixed right-4 bottom-4 z-50 flex flex-col-reverse items-center gap-2"
      :class="{ 'is-docked': docked }"
      @pointerenter="revealFab"
      @pointerleave="onDockLeave"
      @focusin="revealFab"
    >
      <button
        ref="prefsBtnRef"
        type="button"
        class="site-fab__prefs inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-transparent bg-[var(--hl-cta-bg)] text-sm font-semibold text-[var(--hl-cta-fg)] shadow-lg"
        :aria-label="props.prefsOpenLabel"
        :aria-expanded="prefsOpen"
        @click="openPrefs"
      >
        <span aria-hidden="true" class="site-fab__gear-wrap">
          <span class="site-fab__gear text-base leading-none">⚙</span>
        </span>
      </button>
      <button
        v-show="!props.hideTop && showTop"
        type="button"
        class="glass-chip inline-flex min-h-11 min-w-11 items-center justify-center text-sm font-semibold text-hl-fg transition hover:text-hl-accent"
        :aria-label="props.topLabel"
        @click="scrollTop"
      >
        <span aria-hidden="true" class="text-base leading-none">↑</span>
      </button>
    </div>

    <div
      v-if="prefsOpen"
      class="prefs-drawer-scrim fixed inset-0 z-[60] flex justify-end"
      role="presentation"
      @click.self="onScrimClick"
    >
      <aside
        role="dialog"
        aria-modal="true"
        :aria-label="props.prefsTitle"
        class="prefs-drawer flex h-full w-full max-w-md flex-col"
      >
        <header
          class="prefs-drawer__header flex shrink-0 items-center justify-between gap-3 px-6 py-4"
        >
          <h2 class="m-0 font-display text-lg font-semibold tracking-tight text-hl-fg">
            {{ props.prefsTitle }}
          </h2>
          <button
            ref="prefsCloseRef"
            type="button"
            class="prefs-drawer__close motion-safe-icon-spin"
            :aria-label="props.prefsCloseLabel"
            @click="closePrefsByPointer"
          >
            <X :size="18" :stroke-width="1.75" aria-hidden="true" />
          </button>
        </header>
        <div class="flex-1 overflow-y-auto px-6 py-3 pb-8">
          <ThemeSettings
            :heading="props.themeHeading"
            :schedule-title="props.themeScheduleTitle"
            :back-label="props.themeBackLabel"
            :confirm-label="props.themeConfirmLabel"
            :light-start-label="props.themeLightStartLabel"
            :light-end-label="props.themeLightEndLabel"
          />
          <LanguageSwitcher
            :locale="props.locale"
            :heading="props.langHeading"
            :switched-template="props.langSwitched"
            :filter-placeholder="props.langFilterPlaceholder"
            :filter-empty="props.langFilterEmpty"
          />
        </div>
      </aside>
    </div>
  </div>
</template>
