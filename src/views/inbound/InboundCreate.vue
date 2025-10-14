<template>
  <AppPageLayout>
    <!-- 페이지 헤더 -->
    <template #header>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">신규 입고</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">새로운 입고를 등록합니다</p>
        </div>
        <ButtonComp color="secondary" icon="arrow_back" @click="$router.back()">뒤로가기</ButtonComp>
      </div>
    </template>

    <!-- 본문 -->
    <section
        class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700
             rounded-xl shadow-sm p-6 md:p-8 backdrop-blur-sm space-y-8"
    >
      <!-- 기본 정보 -->
      <div class="space-y-5">
        <!-- 발주서 선택 -->
        <label class="flex flex-col gap-1.5">
          <span class="text-xs font-medium text-slate-700 dark:text-slate-200">연결된 발주서</span>
          <select
              v-model="form.purchaseOrderId"
              class="form-select w-full h-10 px-3 text-sm rounded-md
             bg-background-light dark:bg-background-dark
             border border-primary/20 dark:border-primary/30
             focus:ring-2 focus:ring-primary/50 focus:border-primary
             outline-none transition-all text-slate-800 dark:text-white"
          >
            <option disabled value="">발주서 선택 (선택사항)</option>
            <option v-for="po in purchaseOrderList" :key="po.id" :value="po.id">
              {{ po.id }} - {{ po.supplier }}
            </option>
          </select>
        </label>

        <!-- 공급자 / 입고 예정일 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label class="flex flex-col gap-1.5">
            <span class="text-xs font-medium text-slate-700 dark:text-slate-200">공급자</span>
            <input
                v-model="form.supplier"
                type="text"
                placeholder="공급자명"
                class="w-full h-10 px-3 text-sm rounded-md
               bg-background-light dark:bg-background-dark
               border border-primary/20 dark:border-primary/30
               focus:ring-2 focus:ring-primary/50 focus:border-primary
               outline-none transition-all text-slate-800 dark:text-white"
            />
          </label>

          <label class="flex flex-col gap-1.5">
            <span class="text-xs font-medium text-slate-700 dark:text-slate-200">입고 예정일</span>
            <input
                v-model="form.receiveExpectedDate"
                type="date"
                class="w-full h-10 px-3 text-sm rounded-md
               bg-background-light dark:bg-background-dark
               border border-primary/20 dark:border-primary/30
               focus:ring-2 focus:ring-primary/50 focus:border-primary
               outline-none transition-all text-slate-800 dark:text-white"
            />
          </label>
        </div>

        <!-- 운송장 번호 / 배송 방법 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label class="flex flex-col gap-1.5">
            <span class="text-xs font-medium text-slate-700 dark:text-slate-200">운송장 번호</span>
            <input
                v-model="form.trackingNumber"
                type="text"
                placeholder="운송장 번호 입력"
                class="w-full h-10 px-3 text-sm rounded-md
               bg-background-light dark:bg-background-dark
               border border-primary/20 dark:border-primary/30
               focus:ring-2 focus:ring-primary/50 focus:border-primary
               outline-none transition-all text-slate-800 dark:text-white"
            />
          </label>

          <label class="flex flex-col gap-1.5">
            <span class="text-xs font-medium text-slate-700 dark:text-slate-200">배송 방법</span>
            <select
                v-model="form.shippingMethod"
                class="form-select w-full h-10 px-3 text-sm rounded-md
               bg-background-light dark:bg-background-dark
               border border-primary/20 dark:border-primary/30
               focus:ring-2 focus:ring-primary/50 focus:border-primary
               outline-none transition-all text-slate-800 dark:text-white"
            >
              <option disabled value="">배송 방법 선택</option>
              <option value="courier">택배</option>
              <option value="freight">화물</option>
              <option value="direct">직납</option>
            </select>
          </label>
        </div>

        <!-- 입고일 / 입고 장소 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label class="flex flex-col gap-1.5">
            <span class="text-xs font-medium text-slate-700 dark:text-slate-200">입고일</span>
            <input
                v-model="form.receivedDate"
                type="date"
                class="w-full h-10 px-3 text-sm rounded-md
               bg-background-light dark:bg-background-dark
               border border-primary/20 dark:border-primary/30
               focus:ring-2 focus:ring-primary/50 focus:border-primary
               outline-none transition-all text-slate-800 dark:text-white"
            />
          </label>

          <label class="flex flex-col gap-1.5">
            <span class="text-xs font-medium text-slate-700 dark:text-slate-200">입고 장소</span>
            <input
                v-model="form.location"
                type="text"
                placeholder="입고 장소"
                class="w-full h-10 px-3 text-sm rounded-md
               bg-background-light dark:bg-background-dark
               border border-primary/20 dark:border-primary/30
               focus:ring-2 focus:ring-primary/50 focus:border-primary
               outline-none transition-all text-slate-800 dark:text-white"
            />
          </label>
        </div>
      </div>

      <!-- 품목 리스트 -->
      <div>
        <h2 class="text-lg font-semibold mb-3 text-slate-900 dark:text-white">입고 품목</h2>

        <TableComp :columns="itemColumns" :data="form.items" empty-text="등록된 품목이 없습니다.">
          <template #cell-orderedQuantity="{ row }">
            <span class="block text-right font-mono text-zinc-500">{{ row.orderedQuantity }}</span>
          </template>

          <template #cell-receivedQuantity="{ row }">
            <input
                v-model.number="row.receivedQuantity"
                type="number"
                min="0"
                class="w-full px-2 py-1 text-sm text-right font-mono rounded
                       bg-background-light dark:bg-background-dark
                       border border-primary/20 dark:border-primary/30
                       focus:ring-1 focus:ring-primary/50 focus:border-primary
                       outline-none transition-all text-slate-800 dark:text-white"
            />
          </template>

          <template #cell-unitPrice="{ row }">
            <span class="block text-right font-mono">{{ formatWon(row.unitPrice) }}</span>
          </template>

          <template #cell-total="{ row }">
            <span class="block text-right font-mono text-primary font-semibold">
              {{ formatWon(row.receivedQuantity * row.unitPrice) }}
            </span>
          </template>

<!--          <template #cell-status="{ row }">-->
<!--            <select-->
<!--                v-model="row.status"-->
<!--                class="w-full px-2 py-1 text-xs rounded-->
<!--                       bg-background-light dark:bg-background-dark-->
<!--                       border border-primary/20 dark:border-primary/30-->
<!--                       focus:ring-1 focus:ring-primary/50 focus:border-primary-->
<!--                       outline-none transition-all text-slate-800 dark:text-white"-->
<!--            >-->
<!--              <option value="normal">정상</option>-->
<!--              <option value="damaged">파손</option>-->
<!--              <option value="defective">불량</option>-->
<!--            </select>-->
<!--          </template>-->

          <template #actions="{ index }">
            <div class="flex justify-center items-center">
              <ButtonComp
                  color="danger"
                  icon="delete"
                  size="sm"
                  @click="removeItem(index)"
              />
            </div>
          </template>
        </TableComp>

        <!-- 품목 추가 -->
        <div class="mt-4">
          <ButtonComp color="secondary" icon="add" @click="isAddItemModalOpen = true">
            품목 추가
          </ButtonComp>
        </div>
      </div>

      <!-- 비고 -->
      <div class="space-y-2">
        <label class="flex flex-col gap-1.5">
          <span class="text-xs font-medium text-slate-700 dark:text-slate-200">비고</span>
          <textarea
              v-model="form.notes"
              rows="4"
              placeholder="특이사항을 입력하세요"
              class="w-full px-3 py-2 text-sm rounded-md resize-none
                     bg-background-light dark:bg-background-dark
                     border border-primary/20 dark:border-primary/30
                     focus:ring-2 focus:ring-primary/50 focus:border-primary
                     outline-none transition-all text-slate-800 dark:text-white
                     placeholder-zinc-400"
          />
        </label>
      </div>

      <!-- 총합 -->
      <div class="flex justify-end border-t border-zinc-200 dark:border-zinc-700 pt-4">
        <p class="text-lg font-semibold text-slate-900 dark:text-white">
          총 입고 금액:
          <span class="text-primary">{{ formatWon(totalAmount) }}</span>
        </p>
      </div>

      <!-- 하단 버튼 -->
      <div class="flex justify-end gap-3 pt-6">
        <ButtonComp color="secondary" @click="saveDraft">임시저장</ButtonComp>
        <ButtonComp color="secondary" @click="$router.back()">취소</ButtonComp>
        <ButtonComp color="primary" @click="saveInbound">입고 완료</ButtonComp>
      </div>
    </section>
  </AppPageLayout>
</template>

<script setup>
import {ref, computed} from 'vue'
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'
import TableComp from '@/components/common/TableComp.vue'
import {formatWon} from "@/utils/format.js"

// TableComp 컬럼 정의
const itemColumns = [
  {key: 'name', label: '품목명',  width: '10%'},
  {key: 'orderedQuantity', label: '발주 수량', align: 'right', width: '10%'},
  {key: 'receivedQuantity', label: '입고 수량', align: 'right', width: '10%'},
  {key: 'unitPrice', label: '단가', align: 'right', width: '15%'},
  {key: 'total', label: '합계', align: 'right', width: '20%'},
  { key: 'actions', label: ' ', align: 'center', width: '5%' },
]

// 총합 계산
const totalAmount = computed(() =>
    form.value.items.reduce((sum, i) => sum + i.receivedQuantity * i.unitPrice, 0)
)

// 품목 삭제
const removeItem = (index) => form.value.items.splice(index, 1)

// 임시저장
const saveDraft = () => {
  console.log('임시저장:', form.value)
  alert('임시저장되었습니다.')
}

// 입고 완료
const saveInbound = () => {
  // 검증
  if (!form.value.supplier) {
    alert('공급자를 입력해주세요.')
    return
  }
  if (!form.value.inspector) {
    alert('검수자를 선택해주세요.')
    return
  }
  if (!form.value.receivedDate) {
    alert('입고일을 선택해주세요.')
    return
  }
  if (form.value.items.length === 0) {
    alert('입고 품목을 추가해주세요.')
    return
  }

  console.log('입고 완료:', form.value)
  alert('입고가 완료되었습니다.')
}

// 모달 (나중용)
const isAddItemModalOpen = ref(false)

// 테스트 데이터
const purchaseOrderList = ref([
  {id: 'PO-2023001', supplier: 'Supplier A'},
  {id: 'PO-2023002', supplier: 'Supplier B'},
  {id: 'PO-2023003', supplier: 'Supplier C'},
])

const inspectorList = ref(['김철수', '이영희', '박민수', '정수진'])

const form = ref({
  purchaseOrderId: '',
  supplier: '',
  inspector: '',
  receivedDate: '',
  location: '중앙창고',
  notes: '',
  items: [
    {
      name: '위젯 A',
      orderedQuantity: 100,
      receivedQuantity: 100,
      unitPrice: 10000,
      status: 'normal'
    },
    {
      name: '가젯 B',
      orderedQuantity: 50,
      receivedQuantity: 48,
      unitPrice: 25000,
      status: 'damaged'
    },
    {
      name: '툴 C',
      orderedQuantity: 20,
      receivedQuantity: 20,
      unitPrice: 50000,
      status: 'normal'
    },
  ],
})
</script>