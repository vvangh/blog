<script setup lang="ts">
/**
 * Ctrl/Cmd+K 全局搜索（Pagefind）。
 * 玻璃弹层 + Lucide 图标；生产构建后索引位于 BASE_URL/pagefind/。
 */
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { LoaderCircle, Search, X } from "@lucide/vue";

const props = defineProps<{
  openLabel: string;
  title: string;
  placeholder: string;
  empty: string;
  noIndex: string;
  closeLabel: string;
}>();

type SearchHit = {
  id: string;
  url: string;
  title: string;
  excerpt: string;
};

const open = ref(false);
const query = ref("");
const hits = ref<SearchHit[]>([]);
const loading = ref(false);
const ready = ref(false);
const unavailable = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const activeIndex = ref(0);

let pagefindApi: {
  init?: () => Promise<void>;
  search: (q: string) => Promise<{
    results: Array<{
      id: string;
      data: () => Promise<{
        url: string;
        meta?: { title?: string };
        excerpt?: string;
      }>;
    }>;
  }>;
} | null = null;

const base = import.meta.env.BASE_URL;

async function ensurePagefind() {
  if (pagefindApi || unavailable.value) return;
  try {
    const mod = await import(/* @vite-ignore */ `${base}pagefind/pagefind.js`);
    if (typeof mod.init === "function") {
      await mod.init();
    }
    pagefindApi = mod;
    ready.value = true;
  } catch {
    unavailable.value = true;
  }
}

async function runSearch(q: string) {
  const trimmed = q.trim();
  if (!trimmed) {
    hits.value = [];
    return;
  }
  await ensurePagefind();
  if (!pagefindApi) {
    hits.value = [];
    return;
  }
  loading.value = true;
  try {
    const res = await pagefindApi.search(trimmed);
    const top = res.results.slice(0, 8);
    const mapped: SearchHit[] = [];
    for (const r of top) {
      const data = await r.data();
      mapped.push({
        id: r.id,
        url: data.url,
        title: data.meta?.title ?? data.url,
        excerpt: data.excerpt ?? "",
      });
    }
    hits.value = mapped;
    activeIndex.value = 0;
  } finally {
    loading.value = false;
  }
}

let debounceTimer: ReturnType<typeof setTimeout> | undefined;
watch(query, (q) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    void runSearch(q);
  }, 160);
});

function syncHeaderSearchState(isOpen: boolean) {
  // 透明顶栏默认 z-index:auto 以便 ink-invert；开搜时抬高，避免弹层被 main 盖住
  document
    .querySelector<HTMLElement>("[data-site-header]")
    ?.classList.toggle("is-search-open", isOpen);
}

async function openDialog() {
  open.value = true;
  syncHeaderSearchState(true);
  await ensurePagefind();
  await nextTick();
  inputRef.value?.focus();
}

function closeDialog() {
  open.value = false;
  query.value = "";
  hits.value = [];
  syncHeaderSearchState(false);
}

function onGlobalKey(e: KeyboardEvent) {
  const isK = e.key === "k" || e.key === "K";
  if (isK && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    if (open.value) closeDialog();
    else void openDialog();
    return;
  }
  if (e.key === "Escape" && open.value) {
    e.preventDefault();
    closeDialog();
  }
}

function onResultKey(e: KeyboardEvent) {
  if (!open.value || hits.value.length === 0) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIndex.value = (activeIndex.value + 1) % hits.value.length;
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIndex.value = (activeIndex.value - 1 + hits.value.length) % hits.value.length;
  } else if (e.key === "Enter") {
    const hit = hits.value[activeIndex.value];
    if (hit) {
      window.location.assign(hit.url);
    }
  }
}

const statusText = computed(() => {
  if (unavailable.value) return props.noIndex;
  if (loading.value) return "…";
  if (query.value.trim() && hits.value.length === 0 && ready.value) return props.empty;
  return "";
});

onMounted(() => {
  window.addEventListener("keydown", onGlobalKey);
  window.addEventListener("keydown", onResultKey);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onGlobalKey);
  window.removeEventListener("keydown", onResultKey);
  clearTimeout(debounceTimer);
  syncHeaderSearchState(false);
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
      <Search class="site-search__glyph" :size="16" :stroke-width="1.75" aria-hidden="true" />
      <kbd class="hidden font-mono text-xs sm:inline">Ctrl K</kbd>
    </button>

    <div v-if="open" class="site-search__backdrop" role="presentation" @click.self="closeDialog">
      <div role="dialog" aria-modal="true" :aria-label="title" class="site-search__dialog">
        <div class="site-search__field">
          <Search
            class="site-search__glyph site-search__field-icon"
            :size="18"
            :stroke-width="1.75"
            aria-hidden="true"
          />
          <label class="sr-only" for="site-search-input">{{ placeholder }}</label>
          <input
            id="site-search-input"
            ref="inputRef"
            v-model="query"
            type="search"
            class="site-search__input"
            :placeholder="placeholder"
            autocomplete="off"
            enterkeyhint="search"
          />
          <LoaderCircle
            v-if="loading"
            class="site-search__glyph site-search__spin"
            :size="16"
            :stroke-width="1.75"
            aria-hidden="true"
          />
          <kbd v-else class="site-search__esc" aria-hidden="true">Esc</kbd>
          <button
            type="button"
            class="site-search__close"
            :aria-label="closeLabel"
            @click="closeDialog"
          >
            <X :size="18" :stroke-width="1.75" aria-hidden="true" />
          </button>
        </div>

        <p
          v-if="statusText && (loading || !hits.length)"
          class="site-search__status"
          :class="{ 'sr-only': loading }"
          role="status"
        >
          {{ statusText }}
        </p>
        <ul v-else-if="hits.length" class="site-search__list" role="listbox">
          <li
            v-for="(hit, i) in hits"
            :key="hit.id"
            role="option"
            :aria-selected="i === activeIndex"
          >
            <a
              class="site-search__hit"
              :class="{ 'is-active': i === activeIndex }"
              :href="hit.url"
              @mouseenter="activeIndex = i"
            >
              <span class="site-search__hit-title">{{ hit.title }}</span>
              <!-- eslint-disable-next-line vue/no-v-html -- Pagefind 提供带 <mark> 的摘要 -->
              <span class="site-search__hit-excerpt" v-html="hit.excerpt" />
            </a>
          </li>
        </ul>
        <p v-else-if="!query.trim() && !unavailable" class="site-search__hint" role="status">
          {{ placeholder }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.site-search__glyph {
  display: block;
  flex-shrink: 0;
}

.site-search__backdrop {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 12vh 1rem 1rem;
  background: color-mix(in oklab, #000 36%, transparent);
  backdrop-filter: blur(10px) saturate(1.2);
  -webkit-backdrop-filter: blur(10px) saturate(1.2);
}

.site-search__dialog {
  width: min(100%, 34rem);
  overflow: hidden;
  border: 1px solid color-mix(in oklab, var(--hl-fg) 10%, transparent);
  border-radius: 1.25rem;
  background: color-mix(in oklab, var(--hl-panel) 82%, transparent);
  box-shadow:
    inset 0 1px 0 color-mix(in oklab, #fff 48%, transparent),
    0 24px 64px -28px color-mix(in oklab, var(--hl-fg) 42%, transparent);
  backdrop-filter: saturate(180%) blur(28px);
  -webkit-backdrop-filter: saturate(180%) blur(28px);
}

.site-search__field {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  border-bottom: 1px solid color-mix(in oklab, var(--hl-fg) 8%, transparent);
  padding: 0.85rem 0.85rem 0.85rem 1.1rem;
}

.site-search__field-icon {
  color: var(--hl-muted);
}

.site-search__input {
  min-height: 2.5rem;
  width: 100%;
  border: none;
  background: transparent;
  color: var(--hl-fg);
  font-size: 1.05rem;
  outline: none;
}

.site-search__input::placeholder {
  color: var(--hl-muted);
}

.site-search__input::-webkit-search-cancel-button {
  display: none;
}

.site-search__esc {
  display: none;
  border: 1px solid color-mix(in oklab, var(--hl-fg) 12%, transparent);
  border-radius: 0.4rem;
  padding: 0.15rem 0.4rem;
  color: var(--hl-muted);
  font-family: ui-monospace, monospace;
  font-size: 0.7rem;
  line-height: 1.2;
}

@media (min-width: 640px) {
  .site-search__esc {
    display: inline-block;
  }
}

.site-search__close {
  display: inline-flex;
  min-height: 2.25rem;
  min-width: 2.25rem;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 9999px;
  background: color-mix(in oklab, var(--hl-fg) 6%, transparent);
  color: var(--hl-muted);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.site-search__close:hover {
  background: color-mix(in oklab, var(--hl-fg) 12%, transparent);
  color: var(--hl-fg);
}

.site-search__spin {
  color: var(--hl-muted);
  animation: site-search-spin 0.8s linear infinite;
}

.site-search__status,
.site-search__hint {
  margin: 0;
  padding: 1.25rem 1.25rem 1.4rem;
  color: var(--hl-muted);
  font-size: 0.9rem;
  line-height: 1.55;
}

.site-search__list {
  max-height: min(50vh, 22rem);
  margin: 0;
  padding: 0.4rem;
  list-style: none;
  overflow: auto;
}

.site-search__hit {
  display: block;
  border-radius: 0.85rem;
  padding: 0.8rem 0.95rem;
  color: var(--hl-fg);
  text-decoration: none;
  transition: background-color 0.18s ease;
}

.site-search__hit:hover,
.site-search__hit.is-active {
  background: color-mix(in oklab, var(--hl-accent) 10%, transparent);
}

.site-search__hit-title {
  display: block;
  font-weight: 560;
  letter-spacing: -0.01em;
}

.site-search__hit-excerpt {
  display: block;
  margin-top: 0.3rem;
  color: var(--hl-muted);
  font-size: 0.875rem;
  line-height: 1.45;
}

.site-search__hit-excerpt :deep(mark) {
  border-radius: 0.2rem;
  background: color-mix(in oklab, var(--hl-accent) 22%, transparent);
  color: inherit;
  padding: 0 0.15em;
}

@keyframes site-search-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-search__spin {
    animation: none;
  }

  .site-search__hit,
  .site-search__close {
    transition: none;
  }
}
</style>
