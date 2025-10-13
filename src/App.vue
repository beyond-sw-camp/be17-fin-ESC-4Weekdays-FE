<template>
  <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
    <AppHeader/>
    <!-- Main (Sidebar + Contents) -->
    <div class="flex flex-1 min-h-0">
      <AppSidebar />
      <RouterView class="flex-1 overflow-y-auto"/>
    </div>
  </div>
  <!-- Footer -->
  <AppFooter />

</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
import AppSidebar from '@/components/common/AppSideBar.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>