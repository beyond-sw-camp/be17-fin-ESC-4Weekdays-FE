<template>
  <AppPageLayout>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-blue-500 text-white p-8 rounded-lg shadow-xl">
        <h1 class="text-4xl font-bold mb-4">Tailwind 테스트</h1>
        <p class="text-xl">파란 배경에 흰 글씨면 성공!</p>
        <button class="mt-4 bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
          버튼 테스트
        </button>
      </div>
    </div>
  </AppPageLayout>
</template>

<script setup>
import AppPageLayout from '@/layouts/AppPageLayout.vue'
</script>