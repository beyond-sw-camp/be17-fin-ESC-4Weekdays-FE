<template>
  <AppPageLayout>
    <!-- 상단 헤더 -->
    <template #header>
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">출고 관리</h1>
          <p class="text-gray-500 text-sm mt-1">출고 내역을 조회하고 관리합니다.</p>
        </div>

        <!-- 신규 출고 버튼 -->
        <button
          @click="$router.push('/outbound/create')"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + 신규 출고
        </button>
      </div>
    </template>

    <!-- 필터 영역 -->
    <div class="flex flex-wrap gap-3 mb-6">
      <select v-model="filters.type" class="border rounded px-3 py-2">
        <option value="">출고 유형</option>
        <option value="SALE">판매</option>
        <option value="RETURN">반품</option>
        <option value="TRANSFER">이동</option>
      </select>

      <select v-model="filters.status" class="border rounded px-3 py-2">
        <option value="">출고 상태</option>
        <option value="PENDING">대기</option>
        <option value="IN_PROGRESS">진행 중</option>
        <option value="COMPLETED">완료</option>
        <option value="CANCELED">취소</option>
      </select>

      <input
        v-model="filters.search"
        type="text"
        placeholder="거래처 / 상품명 검색..."
        class="border rounded px-3 py-2 flex-1"
      />
    </div>

    <!-- 출고 목록 테이블 -->
    <TableComp :columns="columns" :data="filteredList">
      <!-- ✅ 출고 번호 컬럼 클릭 가능 -->
      <template #cell-outboundCode="{ row }">
        <RouterLink
          :to="`/outbound/${row.id}`"
          class="text-blue-600 hover:underline font-medium"
        >
          {{ row.outboundCode }}
        </RouterLink>
      </template>

      <!-- 상태 컬럼 -->
      <template #cell-status="{ row }">
        <BadgeComp :label="getStatusLabel(row.status)" :type="getStatusColor(row.status)" />
      </template>
    </TableComp>
  </AppPageLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getStatusLabel, getStatusColor } from '@/utils/statusMapper.js'
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import TableComp from '@/components/common/TableComp.vue'
import BadgeComp from '@/components/common/BadgeComp.vue'

const filters = ref({
  type: '',
  status: '',
  search: '',
})

// 테이블 컬럼 정의
const columns = [
  { key: 'outboundCode', label: '출고 번호' },
  { key: 'partnerName', label: '거래처' },
  { key: 'productName', label: '상품명' },
  { key: 'quantity', label: '수량', align: 'right' },
  { key: 'type', label: '유형' },
  { key: 'status', label: '상태' },
  { key: 'handler', label: '담당자' },
  { key: 'outboundDate', label: '출고일' },
]

// 목업 데이터
const outboundList = ref([
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
])

// 필터링
const filteredList = computed(() =>
  outboundList.value.filter(
    (item) =>
      (!filters.value.type || item.type === filters.value.type) &&
      (!filters.value.status || item.status === filters.value.status) &&
      (!filters.value.search ||
        item.partnerName.includes(filters.value.search) ||
        item.productName.includes(filters.value.search))
  )
)

const statusLabel = (status) =>
  ({
    PENDING: '대기',
    IN_PROGRESS: '진행 중',
    COMPLETED: '완료',
    CANCELED: '취소',
  }[status] || '-')

const statusColor = (status) =>
  ({
    PENDING: 'gray',
    IN_PROGRESS: 'yellow',
    COMPLETED: 'green',
    CANCELED: 'red',
  }[status])
</script>
