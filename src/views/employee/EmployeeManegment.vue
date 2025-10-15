<template>
    <AppPageLayout>
        <template #header>
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                    <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">직원 관리</h1>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">직원 목록을 조회하고 관리합니다.</p>
                </div>

                <div class="flex items-center gap-3">
                    <!-- 신규 직원 등록 -->
                    <RouterLink to="/employee/create" class="w-40">
                        <ButtonComp color="primary" icon="add">직원 등록</ButtonComp>
                    </RouterLink>

                    <!-- 검색창 -->
                    <SearchBarComp v-model="query" placeholder="직원 검색..." @search="handleSearch" />
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
        </div>

        <!-- 데이터 테이블 -->
        <TableComp :columns="columns" :data="filteredEmployees">
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
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'
import BadgeComp from '@/components/common/BadgeComp.vue'
import SearchBarComp from '@/components/common/SearchBarComp.vue'
import TableComp from '@/components/common/TableComp.vue'

// 검색어 상태
const query = ref('')

// 필터 버튼
const filters = ['부서', '직책', '권한', '상태']

// 테이블 컬럼
const columns = [
    { key: 'email', label: '이메일', width: '20%' },
    { key: 'name', label: '이름', width: '10%' },
    { key: 'phone', label: '전화번호', width: '15%', align: 'center' },
    { key: 'position', label: '직책', width: '10%', align: 'center' },
    { key: 'role', label: '권한', width: '10%', align: 'center' },
    { key: 'status', label: '상태', width: '10%', align: 'center' },
]

// ✅ 직원 목업 데이터
const employees = ref([
    {
        email: 'kimcs@company.com',
        name: '김철수',
        phone: '010-1234-5678',
        position: '사원',
        role: '일반직원',
        status: 'active', // ✅ 재직
    },
    {
        email: 'leeyh@company.com',
        name: '이영희',
        phone: '010-2345-6789',
        position: '대리',
        role: '관리자',
        status: 'active', // ✅ 재직
    },
    {
        email: 'parkms@company.com',
        name: '박민수',
        phone: '010-3456-7890',
        position: '과장',
        role: '일반직원',
        status: 'leave', // ✅ 휴직
    },
    {
        email: 'jungsj@company.com',
        name: '정수진',
        phone: '010-4567-8901',
        position: '차장',
        role: '관리자',
        status: 'inactive', // ✅ 퇴사
    },
    {
        email: 'kimcs2@company.com',
        name: '김철수',
        phone: '010-9876-5432',
        position: '부장',
        role: '관리자',
        status: 'active', // ✅ 재직
    },
])


// ✅ 검색 결과 필터링
const filteredEmployees = computed(() => {
    if (!query.value) return employees.value
    return employees.value.filter((emp) =>
        Object.values(emp).some((val) =>
            String(val).toLowerCase().includes(query.value.toLowerCase())
        )
    )
})

// 검색 실행
const handleSearch = () => {
    console.log('검색 실행:', query.value)
}
</script>
