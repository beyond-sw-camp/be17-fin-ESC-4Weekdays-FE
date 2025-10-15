<template>
  <AppPageLayout>
    <!-- 헤더 -->
    <template #header>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">
            PO-{{ purchase.id }}
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            생성일: {{ purchase.createdAt }}
          </p>
        </div>

        <div class="flex gap-2">
          <ButtonComp color="secondary" icon="print">인쇄</ButtonComp>
          <ButtonComp color="primary" icon="check_circle">발주 승인</ButtonComp>
        </div>
      </div>
    </template>

    <!-- 본문 -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 좌측: 품목 카드 -->
      <div class="lg:col-span-2 space-y-8">
        <div
          class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700
                 rounded-xl shadow-sm p-6 backdrop-blur-sm"
        >
          <h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-white">발주 품목</h2>

          <!-- 품목 테이블 -->
          <TableComp :columns="itemColumns" :data="purchase.items" empty-text="품목이 없습니다.">
            <template #cell-quantity="{ row }">
              <span class="block text-right font-mono">{{ row.quantity }}</span>
            </template>

            <template #cell-unitPrice="{ row }">
              <span class="block text-right font-mono">{{ formatWon(row.unitPrice) }}</span>
            </template>

            <template #cell-total="{ row }">
              <span class="block text-right font-mono text-primary font-semibold">
                {{ formatWon(row.quantity * row.unitPrice) }}
              </span>
            </template>
          </TableComp>

          <!-- 총합 -->
          <div class="flex justify-end mt-4 border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <p class="text-right text-lg font-semibold">
              총 합계:
              <span class="text-primary">{{ formatWon(totalAmount) }}</span>
            </p>
          </div>

          <!-- 하단 버튼 -->
          <div class="mt-6 flex gap-2">
            <ButtonComp color="secondary" icon="add">품목 추가</ButtonComp>
            <ButtonComp color="secondary" icon="edit">발주 수정</ButtonComp>
          </div>
        </div>
      </div>

      <!-- 우측: 상세 정보 카드 -->
      <div class="space-y-6">
        <div
          class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700
                 rounded-xl shadow-sm p-6 backdrop-blur-sm"
        >
          <h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-white">발주 정보</h2>

          <div class="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
            <div class="flex justify-between py-2">
              <span class="text-slate-500 dark:text-slate-400">공급자</span>
              <span class="font-medium">{{ purchase.supplier }}</span>
            </div>

            <div class="flex justify-between py-2 items-center">
              <span class="text-slate-500 dark:text-slate-400">상태</span>
              <BadgeComp :color="purchase.statusColor">{{ purchase.status }}</BadgeComp>
            </div>

            <div class="flex justify-between py-2">
              <span class="text-slate-500 dark:text-slate-400">결제 조건</span>
              <span class="font-medium">{{ purchase.paymentTerms }}</span>
            </div>

            <div class="flex justify-between py-2">
              <span class="text-slate-500 dark:text-slate-400">배송 방법</span>
              <span class="font-medium">{{ purchase.shippingMethod }}</span>
            </div>

            <div class="flex justify-between py-2">
              <span class="text-slate-500 dark:text-slate-400">운송장 번호</span>
              <span class="font-medium">{{ purchase.trackingNumber || 'N/A' }}</span>
            </div>
          </div>
        </div>

        <!-- 비고 카드 -->
        <div
          class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700
                 rounded-xl shadow-sm p-6 backdrop-blur-sm"
        >
          <h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-white">비고</h2>
          <div
            class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700
                   bg-background-light dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300"
          >
            {{ purchase.notes || '비고 없음' }}
          </div>
        </div>
      </div>
    </section>
  </AppPageLayout>
</template>

<script setup>
import { computed } from 'vue'
import { formatWon } from "@/utils/format.js";
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'
import BadgeComp from '@/components/common/BadgeComp.vue'
import TableComp from '@/components/common/TableComp.vue'



// 컬럼 정의
const itemColumns = [
  { key: 'name', label: '품목명' },
  { key: 'quantity', label: '수량', align: 'right' },
  { key: 'unitPrice', label: '단가', align: 'right' },
  { key: 'total', label: '합계', align: 'right' },
]

// 총합 계산
const totalAmount = computed(() =>
  purchase.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0)
)

// 더미 데이터
const purchase = {
  id: '20231027-001',
  createdAt: '2023-10-27',
  supplier: '조금 덜 지리는 Corp.',
  status: '승인 대기',
  statusColor: 'warning',
  paymentTerms: 'Net 30',
  shippingMethod: 'Express Shipping',
  trackingNumber: '',
  notes: '배송 요청 사항: 주말 제외, 오전 10시 이전 납품.',
  items: [
    { name: '고성능 서버랙', quantity: 5, unitPrice: 1500000 },
    { name: '기업용 SSD (1TB)', quantity: 10, unitPrice: 300000 },
    { name: '24포트 네트워크 스위치', quantity: 20, unitPrice: 100000 },
  ],
}

</script>
