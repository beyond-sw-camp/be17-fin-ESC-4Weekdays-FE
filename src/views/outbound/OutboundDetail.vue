<template>
  <AppPageLayout>
    <!-- 상단 헤더 -->
    <template #header>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">
            {{ detail.outboundCode }}
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            출고일: {{ detail.outboundDate }}
          </p>
        </div>

        <div class="flex gap-2">
          <ButtonComp color="secondary" icon="arrow_back" @click="$router.push('/outbound')">
            뒤로가기
          </ButtonComp>
          <ButtonComp v-if="detail.status === 'PENDING'" color="primary" icon="check_circle" @click="startOutbound">
            출고 시작
          </ButtonComp>
          <ButtonComp v-if="detail.status === 'IN_PROGRESS'" color="primary" icon="done_all" @click="completeOutbound">
            출고 완료
          </ButtonComp>
          <ButtonComp color="secondary" icon="print">인쇄</ButtonComp>
        </div>
      </div>
    </template>

    <!-- 본문 -->
    <section class="space-y-8">
      <!-- 출고 정보 -->
      <div
        class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700
               rounded-xl shadow-sm p-6 backdrop-blur-sm"
      >
        <h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-white">출고 정보</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          <!-- 상태 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">출고 상태</span>
            <BadgeComp :color="getStatusColor(detail.status)">
              {{ getStatusLabel(detail.status) }}
            </BadgeComp>
          </div>

          <!-- 거래처 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">거래처</span>
            <span class="text-sm font-medium">{{ detail.partnerName }}</span>
          </div>

          <!-- 상품명 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">상품명</span>
            <span class="text-sm font-medium">{{ detail.productName }}</span>
          </div>

          <!-- 수량 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">수량</span>
            <span class="text-sm font-medium">{{ detail.quantity }}</span>
          </div>

          <!-- 출고 유형 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">출고 유형</span>
            <span class="text-sm font-medium">{{ typeLabel(detail.type) }}</span>
          </div>

          <!-- 담당자 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">담당자</span>
            <span class="text-sm font-medium">{{ detail.handler }}</span>
          </div>

          <!-- 비고 -->
          <div class="col-span-1 md:col-span-2 lg:col-span-3 pt-2">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">비고</span>
            <div
              class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-700
                     bg-background-light dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300"
            >
              {{ detail.note || '비고 없음' }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppPageLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'
import BadgeComp from '@/components/common/BadgeComp.vue'
// import { getStatusLabel } from '@/utils/statusMapper.js'

const route = useRoute()
const detail = ref({})

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
    note: '배송 시 파손 주의',
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
    note: '',
  },
]

onMounted(() => {
  const id = Number(route.params.id)
  detail.value = mockData.find((item) => item.id === id) || {}
})

const typeLabel = (type) =>
  ({ SALE: '판매', RETURN: '반품', TRANSFER: '이동' }[type] || '-')

const getStatusLabel = (status) =>
  ({
    PENDING: '대기',
    IN_PROGRESS: '진행 중',
    COMPLETED: '완료',
    CANCELED: '취소',
  }[status] || '-')

const getStatusColor = (status) =>
  ({
    PENDING: 'gray',
    IN_PROGRESS: 'warning',
    COMPLETED: 'success',
    CANCELED: 'danger',
  }[status] || 'gray')

const startOutbound = () => {
  if (confirm('출고를 시작하시겠습니까?')) {
    detail.value.status = 'IN_PROGRESS'
    alert('출고가 시작되었습니다.')
  }
}

const completeOutbound = () => {
  if (confirm('출고를 완료하시겠습니까?')) {
    detail.value.status = 'COMPLETED'
    alert('출고가 완료되었습니다.')
  }
}
</script>
