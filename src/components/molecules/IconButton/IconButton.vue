<script setup lang="ts">
/**
 * 分子：图标按钮 = Button(icon) + 必填可访问名。
 */
import type { Component } from "vue";
import type { ButtonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

withDefaults(
  defineProps<{
    /** 可访问名称（必填；图标按钮无可见文字时靠它） */
    label: string;
    icon: Component;
    variant?: ButtonVariants["variant"];
    size?: Extract<ButtonVariants["size"], "icon" | "icon-xs" | "icon-sm" | "icon-lg">;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    variant: "ghost",
    size: "icon",
    type: "button",
  },
);
</script>

<template>
  <Button :type="type" :variant="variant" :size="size" :disabled="disabled" :aria-label="label">
    <component :is="icon" aria-hidden="true" />
  </Button>
</template>
