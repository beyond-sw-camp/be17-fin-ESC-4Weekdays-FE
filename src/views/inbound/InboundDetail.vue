<template>
  <AppPageLayout>
    <!-- 상단 헤더 -->
    <template #header>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">
            {{ inbound.id }}
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            생성일: {{ inbound.createdAt }}
          </p>
        </div>

        <div class="flex gap-2">
          <ButtonComp color="secondary" icon="arrow_back" @click="$router.back()">
            뒤로가기
          </ButtonComp>
          <ButtonComp v-if="inbound.status === 'draft'" color="primary" icon="check_circle" @click="startInbound">
            입고 시작
          </ButtonComp>
          <ButtonComp v-if="inbound.status === 'in_progress'" color="primary" icon="done_all" @click="completeInbound">
            입고 완료
          </ButtonComp>
          <ButtonComp v-if="inbound.status !== 'completed'" color="secondary" icon="edit">
            수정
          </ButtonComp>
          <ButtonComp color="secondary" icon="print">인쇄</ButtonComp>
        </div>
      </div>
    </template>

    <!-- 본문 -->
    <section class="space-y-8">
      <!-- 입고 정보 -->
      <div class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700
               rounded-xl shadow-sm p-6 backdrop-blur-sm">
        <h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-white">입고 정보</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          <!-- 상태 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">상태</span>
            <BadgeComp :color="getStatusColor(inbound.status)">
              {{ getStatusLabel(inbound.status) }}
            </BadgeComp>
          </div>

          <!-- 연결된 발주서 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">연결된 발주서</span>
            <RouterLink v-if="inbound.purchaseOrderId" to="/purchase/detail"
              class="text-sm font-medium text-primary hover:underline">
              {{ inbound.purchaseOrderId }}
            </RouterLink>
            <span v-else class="text-sm font-medium text-zinc-400">-</span>
          </div>

          <!-- 공급자 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">공급자</span>
            <span class="text-sm font-medium">{{ inbound.supplier }}</span>
          </div>

          <!-- 입고 예정일 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">입고 예정일</span>
            <span class="text-sm font-medium">{{ inbound.expectedDate }}</span>
          </div>

          <!-- 입고 장소 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">입고 장소</span>
            <span class="text-sm font-medium">{{ inbound.location }}</span>
          </div>

          <!-- 배송 방법 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">배송 방법</span>
            <span class="text-sm font-medium">{{ inbound.shippingMethod || '-' }}</span>
          </div>

          <!-- 운송장 번호 -->
          <div class="flex justify-between md:block col-span-1 md:col-span-2 lg:col-span-3">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">운송장 번호</span>
            <span class="text-sm font-medium">{{ inbound.trackingNumber || '-' }}</span>
          </div>

          <!-- 비고 -->
          <div class="col-span-1 md:col-span-2 lg:col-span-3 pt-2">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">비고</span>
            <div class="p-3 rounded-lg border border-zinc-200 dark:border-zinc-700
                     bg-background-light dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300">
              {{ inbound.notes || '비고 없음' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 입고 품목 -->
      <div class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700
               rounded-xl shadow-sm p-6 backdrop-blur-sm">
        <h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-white">입고 품목</h2>

        <!-- 품목 테이블 -->
        <TableComp :columns="itemColumns" :data="inbound.items" empty-text="품목이 없습니다.">
          <template #cell-orderedQuantity="{ row }">
            <span class="block text-right font-mono text-zinc-500">{{ row.orderedQuantity }}</span>
          </template>

          <template #cell-receivedQuantity="{ row }">
            <span class="block text-right font-mono font-semibold">{{ row.receivedQuantity }}</span>
          </template>

          <template #cell-unitPrice="{ row }">
            <span class="block text-right font-mono">{{ formatWon(row.unitPrice) }}</span>
          </template>

          <template #cell-total="{ row }">
            <span class="block text-right font-mono text-primary font-semibold">
              {{ formatWon(row.receivedQuantity * row.unitPrice) }}
            </span>
          </template>

          <template #cell-inspectionStatus="{ row }">
            <BadgeComp :color="getInspectionColor(row.inspectionStatus)">
              {{ getInspectionLabel(row.inspectionStatus) }}
            </BadgeComp>
          </template>
        </TableComp>

        <!-- 총합 -->
        <div class="flex justify-end mt-4 border-t border-zinc-200 dark:border-zinc-800 pt-3">
          <p class="text-right text-lg font-semibold">
            총 입고 금액:
            <span class="text-primary">{{ formatWon(totalAmount) }}</span>
          </p>
        </div>
      </div>

      <!-- 검수 정보 (입고 진행 중이거나 완료된 경우) -->
      <div v-if="inbound.status !== 'draft'" class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700
               rounded-xl shadow-sm p-6 backdrop-blur-sm">
        <h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-white">검수 정보</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          <!-- 검수자 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">검수자</span>
            <span class="text-sm font-medium">{{ inbound.inspector || '-' }}</span>
          </div>

          <!-- 실제 입고일 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">실제 입고일</span>
            <span class="text-sm font-medium">{{ inbound.actualReceivedDate || '-' }}</span>
          </div>

          <!-- 검수 완료일 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">검수 완료일</span>
            <span class="text-sm font-medium">{{ inbound.inspectionCompletedDate || '-' }}</span>
          </div>

          <!-- 검수 결과 -->
          <div class="flex justify-between md:block">
            <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">검수 결과</span>
            <span class="text-sm font-medium">
              정상: {{ inspectionSummary.normal }}개 /
              파손: {{ inspectionSummary.damaged }}개 /
              불량: {{ inspectionSummary.defective }}개
            </span>
          </div>
        </div>
      </div>
    </section>
  </AppPageLayout>
</template>

<script setup>
import { computed } from 'vue'
import { formatWon } from '@/utils/format.js'
import { getStatusLabel, getStatusColor } from '@/utils/statusMapper.js'
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'
import BadgeComp from '@/components/common/BadgeComp.vue'
import TableComp from '@/components/common/TableComp.vue'

// 컬럼 정의
const itemColumns = [
  { key: 'name', label: '품목명' },
  { key: 'orderedQuantity', label: '발주 수량', align: 'right', width: '100px' },
  { key: 'receivedQuantity', label: '입고 수량', align: 'right', width: '100px' },
  { key: 'unitPrice', label: '단가', align: 'right', width: '120px' },
  { key: 'total', label: '합계', align: 'right', width: '120px' },
  { key: 'inspectionStatus', label: '검수 상태', align: 'center', width: '100px' },
]

// 총합 계산
const totalAmount = computed(() =>
  inbound.items.reduce((sum, i) => sum + i.receivedQuantity * i.unitPrice, 0)
)

// 검수 결과 요약
const inspectionSummary = computed(() => {
  return inbound.items.reduce((acc, item) => {
    if (item.inspectionStatus === 'normal') acc.normal++
    else if (item.inspectionStatus === 'damaged') acc.damaged++
    else if (item.inspectionStatus === 'defective') acc.defective++
    return acc
  }, { normal: 0, damaged: 0, defective: 0 })
})

// 검수 상태 라벨
const getInspectionLabel = (status) => {
  const labels = {
    normal: '정상',
    damaged: '파손',
    defective: '불량',
    pending: '대기'
  }
  return labels[status] || status
}

// 검수 상태 색상
const getInspectionColor = (status) => {
  const colors = {
    normal: 'success',
    damaged: 'warning',
    defective: 'danger',
    pending: 'gray'
  }
  return colors[status] || 'gray'
}

// 입고 시작
const startInbound = () => {
  if (confirm('입고를 시작하시겠습니까?')) {
    console.log('입고 시작')
    alert('입고가 시작되었습니다. 검수를 진행해주세요.')
  }
}

// 입고 완료
const completeInbound = () => {
  if (confirm('입고를 완료하시겠습니까?')) {
    console.log('입고 완료')
    alert('입고가 완료되었습니다.')
  }
}

// 더미 데이터
const inbound = {
  id: 'IB-2023001',
  createdAt: '2023-10-27',
  purchaseOrderId: 'PO-2023001',
  supplier: 'Supplier A',
  status: 'in_progress',
  expectedDate: '2023-11-05',
  actualReceivedDate: '2023-11-03',
  location: '중앙창고',
  shippingMethod: '택배',
  trackingNumber: '1234567890',
  inspector: '김철수',
  inspectionCompletedDate: null,
  notes: '배송 시 주의사항: 충격 주의, 습기 주의',
  items: [
    {
      name: '고성능 서버랙',
      orderedQuantity: 5,
      receivedQuantity: 5,
      unitPrice: 1500000,
      inspectionStatus: 'normal'
    },
    {
      name: '기업용 SSD (1TB)',
      orderedQuantity: 10,
      receivedQuantity: 10,
      unitPrice: 300000,
      inspectionStatus: 'normal'
    },
    {
      name: '24포트 네트워크 스위치',
      orderedQuantity: 20,
      receivedQuantity: 18,
      unitPrice: 100000,
      inspectionStatus: 'damaged'
    },
  ],
}
</script>