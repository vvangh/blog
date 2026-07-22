<script setup lang="ts">
/**
 * 分子：可过滤单选 Combobox（主流 UI 库同款：在触发框内直接录入筛选）。
 * 禁止业务岛再私写一套「长列表 + 面板内另开搜索条」。
 * vue / VueUse 由 unplugin-auto-import 注入。
 */
import { Check, ChevronDown } from "@lucide/vue";
import type { FilterableSelectOption } from "./types";

export type { FilterableSelectOption };

const props = defineProps<{
  modelValue: string;
  options: FilterableSelectOption[];
  /** listbox 可访问名 */
  listLabel: string;
  filterPlaceholder: string;
  filterEmpty: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const open = ref(false);
const filterQuery = ref("");
const rootRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const fieldId = useId();

const selectedLabel = computed(() => {
  return props.options.find((o) => o.value === props.modelValue)?.label ?? props.modelValue;
});

/** 关闭时展示当前选中；打开时展示正在输入的筛选词 */
const inputText = computed({
  get: () => (open.value ? filterQuery.value : selectedLabel.value),
  set: (value: string) => {
    filterQuery.value = value;
    if (!open.value) open.value = true;
  },
});

const inputPlaceholder = computed(() =>
  open.value ? selectedLabel.value || props.filterPlaceholder : props.filterPlaceholder,
);

const filteredOptions = computed(() => {
  const q = filterQuery.value.trim().toLowerCase();
  if (!q) return props.options;
  return props.options.filter(
    (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
  );
});

onClickOutside(rootRef, () => {
  closeMenu();
});

function closeMenu(): void {
  open.value = false;
  filterQuery.value = "";
}

async function openMenu(): Promise<void> {
  if (open.value) return;
  open.value = true;
  filterQuery.value = "";
  await nextTick();
  inputRef.value?.focus();
}

async function toggleChevron(): Promise<void> {
  if (open.value) {
    closeMenu();
    return;
  }
  await openMenu();
}

function select(value: string): void {
  const changed = value !== props.modelValue;
  closeMenu();
  if (changed) emit("update:modelValue", value);
}

function onInputFocus(): void {
  void openMenu();
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === "Escape") {
    e.preventDefault();
    closeMenu();
    inputRef.value?.blur();
    return;
  }
  if (e.key === "Enter") {
    const only = filteredOptions.value;
    if (only.length === 1) {
      e.preventDefault();
      select(only[0]!.value);
      return;
    }
    const exact = only.find(
      (o) => o.label.toLowerCase() === filterQuery.value.trim().toLowerCase(),
    );
    if (exact) {
      e.preventDefault();
      select(exact.value);
    }
  }
  if (e.key === "ArrowDown" && !open.value) {
    e.preventDefault();
    void openMenu();
  }
}
</script>

<template>
  <div ref="rootRef" class="filterable-select">
    <div class="filterable-select__trigger" :class="{ 'filterable-select__trigger--open': open }">
      <label class="sr-only" :for="`${fieldId}-input`">{{ listLabel }}</label>
      <input
        :id="`${fieldId}-input`"
        ref="inputRef"
        v-model="inputText"
        type="text"
        class="filterable-select__input"
        role="combobox"
        :aria-expanded="open"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        :aria-controls="`${fieldId}-list`"
        :placeholder="inputPlaceholder"
        autocomplete="off"
        @focus="onInputFocus"
        @keydown="onKeydown"
      />
      <button
        type="button"
        class="filterable-select__chevron-btn"
        tabindex="-1"
        :aria-label="listLabel"
        :aria-expanded="open"
        @click="toggleChevron"
      >
        <ChevronDown
          class="filterable-select__chevron"
          :class="{ 'filterable-select__chevron--open': open }"
          :size="16"
          :stroke-width="1.75"
          aria-hidden="true"
        />
      </button>
    </div>

    <div v-show="open" class="filterable-select__panel" role="presentation">
      <ul
        :id="`${fieldId}-list`"
        class="filterable-select__list"
        role="listbox"
        :aria-label="listLabel"
      >
        <li
          v-if="filteredOptions.length === 0"
          class="filterable-select__empty"
          role="presentation"
        >
          {{ filterEmpty }}
        </li>
        <li v-for="opt in filteredOptions" :key="opt.value" role="presentation">
          <button
            type="button"
            class="filterable-select__option"
            role="option"
            :aria-selected="opt.value === modelValue"
            @mousedown.prevent="select(opt.value)"
          >
            <span>{{ opt.label }}</span>
            <Check
              v-if="opt.value === modelValue"
              class="filterable-select__check"
              :size="16"
              :stroke-width="2"
              aria-hidden="true"
            />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
