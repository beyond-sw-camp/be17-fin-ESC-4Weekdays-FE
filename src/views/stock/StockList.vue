<template>
    <AppPageLayout>
        <!-- Header -->
        <template #header>
            <div class="flex items-center justify-between w-full">
                <div>
                    <h1 class="text-2xl font-semibold">재고 관리</h1>
                    <p class="text-gray-500 text-sm mt-1">
                        현재 보유 중인 상품 재고 내역을 확인할 수 있습니다.
                    </p>
                </div>

                <div class="flex items-center gap-3">
                    <RouterLink to="/stock/create" class="w-40">
                        <ButtonComp color="primary" icon="add">신규 재고</ButtonComp>
                    </RouterLink>

                    <SearchBarComp v-model="searchQuery" placeholder="재고 검색..." />
                </div>
            </div>
        </template>

        <!-- 필터 버튼 영역 -->
        <div class="flex flex-wrap items-center gap-3 mb-8">
            <button v-for="filter in filters" :key="filter"
                class="flex items-center gap-2 rounded border border-zinc-300 dark:border-zinc-700 bg-background-light dark:bg-zinc-900 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <span>{{ filter }}</span>
                <span class="material-symbols-outlined text-base">expand_more</span>
            </button>

            <!-- ✅ 기간 필터 -->
            <div class="flex items-center gap-2 text-sm">
                <label class="text-zinc-700 dark:text-zinc-300">입고일</label>
                <input type="date" v-model="filterStartDate"
                    class="border border-zinc-300 dark:border-zinc-700 rounded-md px-2 py-1 bg-background-light dark:bg-zinc-900 focus:ring-1 focus:ring-primary/50 outline-none" />
                <span class="text-zinc-500">~</span>
                <input type="date" v-model="filterEndDate"
                    class="border border-zinc-300 dark:border-zinc-700 rounded-md px-2 py-1 bg-background-light dark:bg-zinc-900 focus:ring-1 focus:ring-primary/50 outline-none" />
            </div>
        </div>

        <!-- 데이터 테이블 -->
        <TableComp :columns="columns" :data="filteredStock">
            <template #cell-id="{ row }">
                <RouterLink to="/stock/detail">
                    <span class="text-primary font-semibold">
                        {{ row.id }}
                    </span>
                </RouterLink>
            </template>

            <template #cell-productCode="{ row }">
                <RouterLink v-if="row.productCode" :to="`/product/detail`"
                    class="text-blue-600 dark:text-blue-400 hover:underline">
                    {{ row.productCode }}
                </RouterLink>
                <span v-else class="text-zinc-400">-</span>
            </template>

            <template #cell-name="{ row }">
                <span>{{ row.name }}</span>
            </template>

            <!-- 재고 수량 먼저 -->
            <template #cell-quantity="{ row }">
                <span>{{ row.quantity }}</span>
            </template>

            <!-- 물류센터 -->
            <template #cell-center="{ row }">
                <span>{{ row.center }}</span>
            </template>

            <template #cell-location="{ row }">
                <span>{{ row.location }}</span>
            </template>
        </TableComp>
    </AppPageLayout>
</template>

<script setup>
import ButtonComp from "@/components/common/ButtonComp.vue";
import SearchBarComp from "@/components/common/SearchBarComp.vue";
import TableComp from "@/components/common/TableComp.vue";
import AppPageLayout from "@/layouts/AppPageLayout.vue";
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";

const filters = ["카테고리", "보관 위치", "수량 상태", "물류센터"];

const columns = [
    { key: "id", label: "재고 번호" },
    { key: "productCode", label: "상품 코드" },
    { key: "name", label: "상품명" },
    { key: "quantity", label: "재고 수량" },
    { key: "center", label: "물류센터" },
    { key: "location", label: "보관 위치" },
];

const stockData = ref([
    {
        id: "STK-001",
        productCode: "PRD-1001",
        name: "무선 마우스",
        center: "서울 물류센터",
        quantity: 35,
        location: "A-12",
        inboundDate: "2025-10-10",
    },
    {
        id: "STK-002",
        productCode: "PRD-1002",
        name: "기계식 키보드",
        center: "부산 물류센터",
        quantity: 18,
        location: "B-07",
        inboundDate: "2025-09-28",
    },
    {
        id: "STK-003",
        productCode: "PRD-1003",
        name: "27인치 모니터",
        center: "서울 물류센터",
        quantity: 9,
        location: "C-02",
        inboundDate: "2025-10-02",
    },
    {
        id: "STK-004",
        productCode: "PRD-1004",
        name: "USB-C 케이블",
        center: "대전 물류센터",
        quantity: 120,
        location: "A-03",
        inboundDate: "2025-10-13",
    },
]);

const searchQuery = ref("");
const filterStartDate = ref("");
const filterEndDate = ref("");

// ✅ 필터 적용 로직
const filteredStock = computed(() => {
    return stockData.value.filter((item) => {
        const nameMatch = item.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());

        const inbound = new Date(item.inboundDate);
        const start = filterStartDate.value ? new Date(filterStartDate.value) : null;
        const end = filterEndDate.value ? new Date(filterEndDate.value) : null;

        const dateMatch =
            (!start || inbound >= start) && (!end || inbound <= end);

        return nameMatch && dateMatch;
    });
});
</script>

<style scoped>
.material-symbols-outlined {
    font-size: 18px;
    vertical-align: middle;
}
</style>
