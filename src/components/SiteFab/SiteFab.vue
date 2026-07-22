<script setup lang="ts">
/**
 * 全站悬浮坞：返回顶部、站点设置抽屉、快捷键帮助。
 * 偏好不再占用独立页面，避免「博客像后台」的观感。
 */
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useStore } from "@nanostores/vue";
import { ThemeSettings } from "@/components/ThemeSettings";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { A11ySettings } from "@/components/A11ySettings";
import type { Locale } from "@/lib/i18n";
import { closePrefs, openPrefs as openPrefsStore, prefsOpenStore } from "@/lib/stores";

const props = withDefaults(
  defineProps<{
    locale: Locale;
    /** 首页等短屏：不展示回顶（首屏即品牌区，无需「回到顶部」） */
    hideTop?: boolean;
    prefsTitle: string;
    prefsHint: string;
    prefsOpenLabel: string;
    prefsCloseLabel: string;
    topLabel: string;
    helpTitle: string;
    helpOpenLabel: string;
    helpCloseLabel: string;
    helpBody: string;
    themeHeading: string;
    themeHint: string;
    langHeading: string;
    langHint: string;
    langSwitched: string;
    densityHeading: string;
    densityHint: string;
    comfortableLabel: string;
    defaultLabel: string;
    contrastHeading: string;
    contrastOn: string;
    contrastOff: string;
  }>(),
  { hideTop: false },
);

/** 跨岛共享：其它岛也可 openPrefsStore() 打开设置 */
const prefsOpen = useStore(prefsOpenStore);
const helpOpen = ref(false);
const showTop = ref(false);

const anyPanelOpen = computed(() => prefsOpen.value || helpOpen.value);

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
  // 页面几乎不可滚时也不露回顶，避免短页误显
  const room = document.documentElement.scrollHeight - window.innerHeight;
  showTop.value = room > 240 && window.scrollY > 480;
}

function scrollTop(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

function openPrefs(): void {
  helpOpen.value = false;
  openPrefsStore();
}

function openHelp(): void {
  closePrefs();
  helpOpen.value = true;
}

function closeAll(): void {
  closePrefs();
  helpOpen.value = false;
}

function onKey(e: KeyboardEvent): void {
  if (isTypingTarget(e.target)) return;
  if (e.key === "Escape" && anyPanelOpen.value) {
    e.preventDefault();
    closeAll();
    return;
  }
  if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
    e.preventDefault();
    if (helpOpen.value) helpOpen.value = false;
    else openHelp();
  }
}

watch(prefsOpen, (open) => {
  document.body.style.overflow = open || helpOpen.value ? "hidden" : "";
});
watch(helpOpen, (open) => {
  document.body.style.overflow = open || prefsOpen.value ? "hidden" : "";
});

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKey);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKey);
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="site-fab" data-pagefind-ignore>
    <!-- 右下角按钮柱：回顶 / 设置 / 帮助 -->
    <div class="fixed right-4 bottom-4 z-50 flex flex-col-reverse items-center gap-2">
      <button
        type="button"
        class="glass-chip inline-flex min-h-11 min-w-11 items-center justify-center text-sm font-semibold text-hl-fg transition hover:text-hl-accent"
        :aria-label="props.helpOpenLabel"
        :aria-expanded="helpOpen"
        @click="openHelp"
      >
        ?
      </button>
      <button
        type="button"
        class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-transparent bg-[var(--hl-cta-bg)] text-sm font-semibold text-[var(--hl-cta-fg)] shadow-lg transition hover:opacity-90"
        :aria-label="props.prefsOpenLabel"
        :aria-expanded="prefsOpen"
        @click="openPrefs"
      >
        <span aria-hidden="true" class="text-base leading-none">⚙</span>
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

    <!-- 设置抽屉 -->
    <div
      v-if="prefsOpen"
      class="fixed inset-0 z-[60] flex justify-end bg-black/40"
      role="presentation"
      @click.self="closePrefs"
    >
      <aside
        role="dialog"
        aria-modal="true"
        :aria-label="props.prefsTitle"
        class="flex h-full w-full max-w-md flex-col border-l border-hl-border bg-hl-bg shadow-2xl"
      >
        <header
          class="flex shrink-0 items-start justify-between gap-3 border-b border-hl-border px-5 py-4"
        >
          <div>
            <h2 class="m-0 font-display text-xl font-bold tracking-tight">
              {{ props.prefsTitle }}
            </h2>
            <p class="mt-1 text-sm text-hl-muted">{{ props.prefsHint }}</p>
          </div>
          <button
            type="button"
            class="inline-flex min-h-10 shrink-0 items-center rounded-full border border-hl-border px-3 text-sm hover:border-hl-accent hover:text-hl-accent"
            @click="closePrefs"
          >
            {{ props.prefsCloseLabel }}
          </button>
        </header>
        <div class="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <ThemeSettings :heading="props.themeHeading" :hint="props.themeHint" />
          <LanguageSwitcher
            :locale="props.locale"
            :heading="props.langHeading"
            :hint="props.langHint"
            :switched-template="props.langSwitched"
          />
          <A11ySettings
            :density-heading="props.densityHeading"
            :density-hint="props.densityHint"
            :comfortable-label="props.comfortableLabel"
            :default-label="props.defaultLabel"
            :contrast-heading="props.contrastHeading"
            :contrast-on="props.contrastOn"
            :contrast-off="props.contrastOff"
          />
        </div>
      </aside>
    </div>

    <!-- 快捷键帮助 -->
    <div
      v-if="helpOpen"
      class="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      :aria-label="props.helpTitle"
      @click.self="helpOpen = false"
    >
      <div class="w-full max-w-md rounded-2xl border border-hl-border bg-hl-bg p-5 shadow-lg">
        <div class="flex items-start justify-between gap-3">
          <h2 class="m-0 text-lg font-semibold">{{ props.helpTitle }}</h2>
          <button
            type="button"
            class="min-h-9 rounded-full border border-hl-border px-3 text-sm"
            @click="helpOpen = false"
          >
            {{ props.helpCloseLabel }}
          </button>
        </div>
        <p class="mt-3 text-sm leading-relaxed text-hl-muted">{{ props.helpBody }}</p>
      </div>
    </div>
  </div>
</template>
