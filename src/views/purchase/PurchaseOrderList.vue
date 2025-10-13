<template>
  <AppPageLayout>
    <!-- 상단 제어 영역 -->
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
      <!-- 신규 발주 버튼 -->
      <RouterLink to="/purchase/create">
        <ButtonComp color="primary" icon="add">신규 발주</ButtonComp>
      </RouterLink>

      <!-- 검색창 -->
      <SearchBarComp v-model="query" placeholder="발주서 검색..." @search="handleSearch" />
    </div>

    <!-- 필터 버튼 영역 -->
    <div class="flex flex-wrap items-center gap-3 mb-8">
      <button
        v-for="filter in filters"
        :key="filter"
        class="flex items-center gap-2 rounded border border-zinc-300 dark:border-zinc-700 bg-background-light dark:bg-zinc-900 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <span>{{ filter }}</span>
        <span class="material-symbols-outlined text-base">expand_more</span>
      </button>
    </div>

    <!-- 데이터 테이블 -->
    <TableComp :columns="columns" :data="filteredOrders">
      <!-- 발주 번호 컬럼 -->
      <template #cell-id="{ row }">
        <RouterLink to="/purchase/detail">
          <span class="text-primary font-semibold">
            {{ row.id }}
          </span>
        </RouterLink>
      </template>
      <template #cell-amount="{ row }">
        {{ formatWon(row.amount) }}
      </template>

      <!-- 상태 컬럼 -->
      <template #cell-status="{ row }">
        <BadgeComp :color="getStatusColor(row.status)" :label="getStatusLabel(row.status)" />
      </template>
    </TableComp>
  </AppPageLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getStatusLabel, getStatusColor } from '@/utils/statusMapper.js'
import {formatWon} from "@/utils/format.js";
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'
import BadgeComp from '@/components/common/BadgeComp.vue'
import SearchBarComp from '@/components/common/SearchBarComp.vue'
import TableComp from '@/components/common/TableComp.vue'


// 상태
const query = ref('')
const filters = ['기간', '공급업체', '상태']

// 컬럼
const columns = [
  { key: 'id', label: '발주 번호', width: '1%' },
  { key: 'status', label: '상태', align: 'center' },
  { key: 'supplier', label: '공급 업체' },
  { key: 'amount', label: '총액' },
  { key: 'date', label: '발주 날짜' },
]

// 검색 필터링
const filteredOrders = computed(() => {
  if (!query.value) return orders.value
  return orders.value.filter((order) =>
    Object.values(order).some((val) =>
      String(val).toLowerCase().includes(query.value.toLowerCase()),
    ),
  )
})

// 검색 핸들러
const handleSearch = () => {
  console.log('검색 실행:', query.value)
}

// 샘플 데이터
const orders = ref([
  {
    id: 'PO-2023001',
    supplier: 'Supplier A',
    date: '2023-01-15',
    amount: 1500000,
    status: 'Pending',
  },
  {
    id: 'PO-2023002',
    supplier: 'Supplier B',
    date: '2023-02-20',
    amount: 2200000,
    status: 'Approved',
  },
  {
    id: 'PO-2023003',
    supplier: 'Supplier C',
    date: '2023-03-10',
    amount: 80000000,
    status: 'Shipped',
  },
  {
    id: 'PO-2023004',
    supplier: 'Supplier A',
    date: '2023-04-05',
    amount: 300000000,
    status: 'Received',
  },
])
</script>
