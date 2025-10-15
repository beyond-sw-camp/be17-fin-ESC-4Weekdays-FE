<template>
  <AppPageLayout>
    <!-- 페이지 헤더 -->
    <template #header>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">발주</h1>
        </div>
        <ButtonComp color="secondary" icon="arrow_back" @click="$router.back()"
          >뒤로가기</ButtonComp
        >
      </div>
    </template>

    <!-- 본문 -->
    <section
      class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm p-6 md:p-8 backdrop-blur-sm space-y-8"
    >
      <!-- 공급자 / 날짜 -->
      <div class="space-y-5">
        <!-- 공급자 -->
        <label class="flex flex-col gap-1.5">
          <span class="text-xs font-medium text-slate-700 dark:text-slate-200">공급자</span>
          <select
            v-model="form.supplier"
            class="form-select w-full h-10 px-3 text-sm rounded-md bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-slate-800 dark:text-white"
          >
            <option disabled value="">공급자 선택</option>
            <option v-for="s in supplierList" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
        </label>

        <!-- 날짜 두 개 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label class="flex flex-col gap-1.5">
            <span class="text-xs font-medium text-slate-700 dark:text-slate-200">발주일</span>
            <input
              v-model="form.orderDate"
              type="date"
              class="w-full h-10 px-3 text-sm rounded-md bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-slate-800 dark:text-white"
            />
          </label>

          <label class="flex flex-col gap-1.5">
            <span class="text-xs font-medium text-slate-700 dark:text-slate-200">입고 예정일</span>
            <input
              v-model="form.expectedDate"
              type="date"
              class="w-full h-10 px-3 text-sm rounded-md bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-slate-800 dark:text-white"
            />
          </label>
        </div>
      </div>

      <!-- 품목 리스트 -->
      <div>
        <h2 class="text-lg font-semibold mb-3 text-slate-900 dark:text-white">품목 목록</h2>

        <TableComp :columns="itemColumns"
                   :data="form.items" empty-text="등록된 품목이 없습니다.">
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

          <template #actions="{ index }">
            <ButtonComp
              color="danger"
              icon="delete"
              class="!px-2 !py-1"
              @click="removeItem(index)"
            />
          </template>
        </TableComp>

        <!-- 품목 추가 -->
        <div class="mt-4">
          <ButtonComp color="secondary" icon="add" @click="isAddItemModalOpen = true">
            품목 추가
          </ButtonComp>
        </div>
      </div>

      <!-- 총합 -->
      <div class="flex justify-end border-t border-zinc-200 dark:border-zinc-700 pt-4">
        <p class="text-lg font-semibold text-slate-900 dark:text-white">
          총 합계:
          <span class="text-primary">{{ formatWon(totalAmount) }}</span>
        </p>
      </div>

      <!-- 하단 버튼 -->
      <div class="flex justify-end gap-3 pt-6 rounded-b-xl">
        <ButtonComp color="secondary" @click="$router.back()">취소</ButtonComp>
        <ButtonComp color="primary" @click="savePurchase">저장</ButtonComp>
      </div>
    </section>
  </AppPageLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'
import TableComp from '@/components/common/TableComp.vue'
import { formatWon } from '@/utils/format.js'

// TableComp 컬럼 정의
const itemColumns = [
  { key: 'name', label: '품목명' },
  { key: 'quantity', label: '수량', align: 'right' },
  { key: 'unitPrice', label: '단가', align: 'right' },
  { key: 'total', label: '합계', align: 'right' },
  { key: 'actions', label: '', width: '60px', align: 'center' },
]

// 총합 계산
const totalAmount = computed(() =>
  form.value.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0),
)

// 품목 삭제
const removeItem = (index) => form.value.items.splice(index, 1)

// 저장
const savePurchase = () => {
  console.log('발주 저장:', form.value)
  alert('발주 정보가 저장되었습니다.')
}

// 모달 (나중용)
const isAddItemModalOpen = ref(false)
const addItem = (item) => {
  form.value.items.push(item)
  isAddItemModalOpen.value = false
}

// 테스트 데이터
const supplierList = ref([
  { id: 1, name: '지리는 회사' },
  { id: 2, name: '조금 덜 지리는 Corp.' },
  { id: 3, name: 'mz 오피스' },
])

const form = ref({
  supplier: '',
  orderDate: '',
  expectedDate: '',
  items: [
    { name: '위젯 A', quantity: 100, unitPrice: 10000 },
    { name: '가젯 B', quantity: 50, unitPrice: 25000 },
    { name: '툴 C', quantity: 20, unitPrice: 50000 },
  ],
})
</script>
