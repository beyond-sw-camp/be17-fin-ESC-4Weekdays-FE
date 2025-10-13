<template>
  <div class="relative w-full max-w-md">
    <!-- 아이콘 -->
    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">
      {{ icon }}
    </span>

    <!-- 입력 필드 -->
    <input
      v-model="keyword"
      :placeholder="placeholder"
      @keyup.enter="emitSearch"
      class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700
             bg-background-light dark:bg-background-dark
             py-2 pl-10 pr-4 text-sm
             text-zinc-900 dark:text-zinc-100
             placeholder-zinc-400
             focus:border-primary focus:ring-1 focus:ring-primary
             transition-colors"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// props 정의
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '검색어를 입력하세요...' },
  icon: { type: String, default: 'search' },
})

// emit 정의
const emit = defineEmits(['update:modelValue', 'search'])

// 내부 값 (keyword)
const keyword = ref(props.modelValue || '')

// props → 내부 동기화
watch(
  () => props.modelValue,
  (val) => {
    if (val !== keyword.value) keyword.value = val
  }
)

// 내부 변경 → 부모 업데이트
watch(keyword, (val) => emit('update:modelValue', val))

// Enter 키 → 부모로 search 이벤트
const emitSearch = () => {
  emit('search', keyword.value)
}
</script>
