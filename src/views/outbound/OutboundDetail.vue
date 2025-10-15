<template>
  <AppPageLayout>
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-800">
          {{ detail?.outboundCode || '출고 상세' }}
        </h1>
        <button
          @click="$router.push('/outbound')"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          목록으로
        </button>
      </div>
    </template>

    <div v-if="detail" class="space-y-6">
      <section class="p-6 bg-white shadow rounded-lg">
        <h2 class="text-lg font-semibold mb-4">출고 정보</h2>
        <div class="grid grid-cols-2 gap-4 text-gray-700">
          <p><strong>거래처:</strong> {{ detail.partnerName }}</p>
          <p><strong>상품명:</strong> {{ detail.productName }}</p>
          <p><strong>수량:</strong> {{ detail.quantity }}</p>
          <p><strong>출고 유형:</strong> {{ typeLabel(detail.type) }}</p>
          <p><strong>출고 상태:</strong> {{ statusLabel(detail.status) }}</p>
          <p><strong>담당자:</strong> {{ detail.handler }}</p>
          <p><strong>출고일:</strong> {{ detail.outboundDate }}</p>
        </div>
      </section>
    </div>

    <div v-else class="text-center text-gray-400 mt-20">출고 정보를 불러오는 중...</div>
  </AppPageLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppPageLayout from '@/layouts/AppPageLayout.vue'

const route = useRoute()
const detail = ref(null)

const mockData = [
  {
    id: 1,
    outboundCode: 'OB-20250101',
    partnerName: '거래처 A',
    productName: '제주 감귤 5kg',
    quantity: 10,
    type: 'SALE',
    status: 'PENDING',
    handler: '김하늘',
    outboundDate: '2025-01-10',
  },
  {
    id: 2,
    outboundCode: 'OB-20250102',
    partnerName: '거래처 B',
    productName: '청포도 3kg',
    quantity: 5,
    type: 'TRANSFER',
    status: 'COMPLETED',
    handler: '이민아',
    outboundDate: '2025-01-12',
  },
]

onMounted(() => {
  const id = Number(route.params.id)
  detail.value = mockData.find((item) => item.id === id)
})

const typeLabel = (type) =>
  ({ SALE: '판매', RETURN: '반품', TRANSFER: '이동' }[type] || '-')

const statusLabel = (status) =>
  ({ PENDING: '대기', IN_PROGRESS: '진행 중', COMPLETED: '완료', CANCELED: '취소' }[status] || '-')
</script>
