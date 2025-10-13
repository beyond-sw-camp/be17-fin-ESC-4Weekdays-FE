<template>
  <div
      class="flex flex-col h-full w-full font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 px-16 py-12"
  >
    <!-- 상단 헤더 -->
    <header v-if="$slots.header" class="border-b border-zinc-200 dark:border-zinc-800 mb-8 pb-4">
      <slot name="header" />
    </header>

    <!-- 본문 -->
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>

    <!-- 하단 영역 -->
    <footer v-if="$slots.footer" class="border-t border-zinc-200 dark:border-zinc-800 mt-8 pt-4">
      <slot name="footer" />
    </footer>

  </div>
</template>

<script setup>
</script>
