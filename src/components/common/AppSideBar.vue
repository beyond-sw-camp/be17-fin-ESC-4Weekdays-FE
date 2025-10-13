<template>
  <aside
      class="w-64 flex flex-col shadow-xl border-r transition-colors duration-300
           bg-white dark:bg-[#0f172a] border-gray-100 dark:border-gray-800"
  >
    <!-- 메뉴 -->
    <nav class="flex-1 px-3 py-5 space-y-1">
      <RouterLink
          v-for="menu in munus"
          :key="menu.label"
          :to="menu.route"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group"
          :class="[
          isActive(menu.route)
            ? 'bg-primary/10 text-primary dark:bg-primary/20'
            : 'text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary',
        ]"
      >
        <span
            class="material-symbols-outlined text-[21px] transition-transform group-hover:scale-110"
            :class="[
            isActive(menu.route)
              ? 'text-primary'
              : 'text-gray-500 dark:text-gray-400 group-hover:text-primary',
          ]"
        >
          {{ menu.icon }}
        </span>
        <span class="font-medium">{{ menu.label }}</span>
      </RouterLink>
    </nav>

    <!-- 하단: Settings + 다크모드 -->
    <div
        class="mt-auto p-5 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between"
    >
      <RouterLink
          to="/"
          class="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-all"
      >
        <span class="material-symbols-outlined text-[20px]">settings</span>
        <span class="text-sm font-medium">Settings</span>
      </RouterLink>

      <button
          class="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all shadow-[0_0_8px_0_rgba(17,115,212,0.1)] hover:shadow-[0_0_10px_2px_rgba(17,115,212,0.25)]"
          @click="toggleDarkMode"
          title="Toggle dark mode"
      >
        <span class="material-symbols-outlined text-[22px] text-gray-700 dark:text-gray-300">
          {{ isDarkMode ? 'light_mode' : 'dark_mode' }}
        </span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isDarkMode = ref(false)

const munus = [
  { label: 'Dashboard', icon: 'dashboard', route: '/' },
  { label: '발주', icon: 'assignment', route: '/purchase' },
  { label: '입고', icon: 'inventory', route: '/inbound' },
  { label: '출고', icon: 'local_shipping', route: '/1' },
  { label: '재고', icon: 'inventory_2', route: '/2' },
  { label: '리포트', icon: 'bar_chart', route: '/3' },
  { label: '직원 관리', icon: 'assignment_ind', route: '/employees' },
  { label: '테스트 페이지', icon: 'frame_bug', route: '/test' },
]

const isActive = (path) => route.path === path

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
  isDarkMode.value = document.documentElement.classList.contains('dark')
}
</script>
