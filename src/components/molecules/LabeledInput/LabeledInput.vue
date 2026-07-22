<script setup lang="ts">
/**
 * 分子：Label + Input，统一表单项纵向节奏。
 */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const props = defineProps<{
  label: string;
  hint?: string;
  modelValue?: string | number;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();

const inputId = useId();
</script>

<template>
  <div class="grid w-full gap-1.5">
    <Label :for="inputId">{{ props.label }}</Label>
    <Input
      :id="inputId"
      :type="type ?? 'text'"
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      @update:model-value="emit('update:modelValue', $event)"
    />
    <p v-if="hint" class="text-xs text-muted-foreground">{{ hint }}</p>
  </div>
</template>
