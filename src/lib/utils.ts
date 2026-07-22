/**
 * 类名工具：clsx + tailwind-merge，供 shadcn-vue 原子组件使用。
 */
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
