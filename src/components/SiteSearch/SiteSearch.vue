<script setup lang="ts">
/**
 * Ctrl/Cmd+K 搜索岛。
 * 墨色 Spotlight 面板（.site-search-panel），叠壁纸不粉笔白；选中用链接蓝淡铺。
 */
import { toRef } from "vue";
import { LoaderCircle, Search, X } from "@lucide/vue";
import type { DevSearchEntry } from "@/lib/search/filter";
import { useSiteSearch } from "./useSiteSearch";

const props = defineProps<{
  openLabel: string;
  title: string;
  placeholder: string;
  empty: string;
  noIndex: string;
  clearLabel: string;
  /** 仅开发态由 SiteHeader 注入（当前语言） */
  devCatalog?: DevSearchEntry[];
}>();

const { open, query, hits, loading, inputRef, activeIndex, statusText, openDialog, closeDialog } =
  useSiteSearch({
    empty: toRef(props, "empty"),
    noIndex: toRef(props, "noIndex"),
    devCatalog: toRef(props, "devCatalog"),
  });

defineExpose({ openDialog });
</script>

<template>
  <div class="site-search">
    <button
      type="button"
      class="site-search__trigger glass-chip inline-flex min-h-10 items-center gap-2 px-3 text-sm text-hl-muted transition hover:text-hl-fg"
      :aria-label="openLabel"
      @click="openDialog"
    >
      <Search class="size-4 shrink-0" :stroke-width="1.75" aria-hidden="true" />
      <kbd class="hidden font-mono text-xs sm:inline">Ctrl K</kbd>
    </button>

    <div
      v-if="open"
      class="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 pt-[min(16vh,6.5rem)] pb-6"
      role="presentation"
      @click.self="closeDialog"
    >
      <div
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        class="site-search-panel w-full max-w-md overflow-hidden rounded-2xl motion-safe:animate-rise"
      >
        <div class="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search
            class="site-search-muted size-4 shrink-0"
            :stroke-width="1.75"
            aria-hidden="true"
          />
          <label class="sr-only" for="site-search-input">{{ placeholder }}</label>
          <input
            id="site-search-input"
            ref="inputRef"
            v-model="query"
            type="search"
            class="min-h-10 w-full border-0 bg-transparent text-base outline-none focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            :placeholder="placeholder"
            autocomplete="off"
            enterkeyhint="search"
          />
          <LoaderCircle
            v-if="loading"
            class="site-search-muted size-4 shrink-0 animate-spin"
            :stroke-width="1.75"
            aria-hidden="true"
          />
          <button
            v-else-if="query.trim()"
            type="button"
            class="site-search-clear motion-safe-icon-spin site-search-muted inline-flex size-9 shrink-0 items-center justify-center rounded-full transition"
            :aria-label="clearLabel"
            @click="query = ''"
          >
            <X class="size-4" :stroke-width="1.75" aria-hidden="true" />
          </button>
        </div>

        <p
          v-if="statusText && (loading || !hits.length)"
          class="site-search-muted m-0 px-4 py-5 text-center text-sm"
          :class="{ 'sr-only': loading }"
          role="status"
        >
          {{ statusText }}
        </p>

        <ul
          v-else-if="hits.length"
          class="m-0 max-h-[min(48vh,20rem)] list-none overflow-auto p-1.5"
          role="listbox"
        >
          <li
            v-for="(hit, i) in hits"
            :key="hit.id"
            role="option"
            :aria-selected="i === activeIndex"
          >
            <a
              class="site-search-hit block rounded-xl px-3 py-2.5 no-underline transition"
              :class="i === activeIndex ? 'is-active' : ''"
              :href="hit.url"
              @mouseenter="activeIndex = i"
            >
              <span class="block text-[0.9375rem] font-medium tracking-tight">{{ hit.title }}</span>
              <!-- eslint-disable-next-line vue/no-v-html -- Pagefind 摘要含 <mark> -->
              <span
                v-if="hit.excerpt"
                class="site-search-excerpt mt-0.5 block text-xs leading-snug"
                v-html="hit.excerpt"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
