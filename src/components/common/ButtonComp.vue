<template>
  <button
    :class="[
      'flex items-center justify-center gap-2 rounded-lg font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1',
      sizeClasses,
      colorClasses,
    ]"
    :disabled="disabled"
  >
    <!-- 아이콘 -->
    <span
      v-if="icon"
      class="material-symbols-outlined text-base"
      :class="{ 'opacity-70': disabled }"
    >
      {{ icon }}
    </span>

    <!-- 버튼 내용 -->
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: { type: String, default: 'primary' }, // primary, secondary, success, danger
  size: { type: String, default: 'md' },       // sm, md, lg
  icon: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})

const colorClasses = computed(() => {
  const base = 'focus-visible:ring-1 disabled:opacity-60 disabled:cursor-not-allowed'

  switch (props.color) {
    case 'primary':
      return `${base} bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary`
    case 'secondary':
      return `${base} bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600 focus-visible:ring-zinc-400`
    case 'success':
      return `${base} bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-400`
    case 'danger':
      return `${base} bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400`
    default:
      return `${base} bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary`
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-xs'
    case 'lg':
      return 'px-6 py-3 text-base'
    default:
      return 'px-4 py-2 text-sm'
  }
})
</script>
