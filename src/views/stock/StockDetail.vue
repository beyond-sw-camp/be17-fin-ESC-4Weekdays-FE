<template>
    <AppPageLayout>
        <!-- 상단 헤더 -->
        <template #header>
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                    <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">
                        {{ stock.id }}
                    </h1>
                    <p class="text-sm text-slate-500 dark:text-slate-400">
                        등록일: {{ stock.createdAt }}
                    </p>
                </div>

                <div class="flex gap-2">
                    <ButtonComp color="secondary" icon="arrow_back" @click="$router.back()">
                        뒤로가기
                    </ButtonComp>
                    <ButtonComp color="secondary" icon="edit">
                        수정
                    </ButtonComp>
                    <ButtonComp color="secondary" icon="print">인쇄</ButtonComp>
                </div>
            </div>
        </template>

        <!-- 본문 -->
        <section class="space-y-8">
            <!-- 재고 정보 -->
            <div class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700
               rounded-xl shadow-sm p-6 backdrop-blur-sm">
                <h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-white">재고 정보</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    <!-- 물류센터 -->
                    <div class="flex justify-between md:block">
                        <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">물류센터</span>
                        <span class="text-sm font-medium">{{ stock.center }}</span>
                    </div>

                    <!-- 재고 위치 -->
                    <div class="flex justify-between md:block">
                        <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">재고 위치</span>
                        <span class="text-sm font-medium">{{ stock.location }}</span>
                    </div>

                    <!-- 적치 작업자 -->
                    <div class="flex justify-between md:block">
                        <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">적치 작업자</span>
                        <span class="text-sm font-medium">{{ stock.worker }}</span>
                    </div>

                    <!-- 입고일 -->
                    <div class="flex justify-between md:block">
                        <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">입고일</span>
                        <span class="text-sm font-medium">{{ stock.inboundDate }}</span>
                    </div>

                    <!-- 출고일 -->
                    <div class="flex justify-between md:block">
                        <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">출고일</span>
                        <span class="text-sm font-medium">
                            <span v-if="stock.outboundDate">{{ stock.outboundDate }}</span>
                            <span v-else class="text-zinc-400">-</span>
                        </span>
                    </div>
                </div>
            </div>

            <!-- 상품 정보 -->
            <div class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700
               rounded-xl shadow-sm p-6 backdrop-blur-sm">
                <h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-white">상품 정보</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    <!-- 상품 코드 -->
                    <div class="flex justify-between md:block">
                        <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">상품 코드</span>
                        <RouterLink :to="`/product/detail/${stock.productCode}`"
                            class="text-sm font-medium text-primary hover:underline">
                            {{ stock.productCode }}
                        </RouterLink>
                    </div>

                    <!-- 상품 이름 -->
                    <div class="flex justify-between md:block">
                        <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">상품 이름</span>
                        <span class="text-sm font-medium">{{ stock.productName }}</span>
                    </div>

                    <!-- 재고 수량 -->
                    <div class="flex justify-between md:block">
                        <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">재고 수량</span>
                        <span class="text-sm font-medium">{{ stock.quantity }} EA</span>
                    </div>

                    <!-- 단가 -->
                    <div class="flex justify-between md:block">
                        <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">단가</span>
                        <span class="text-sm font-medium">{{ formatWon(stock.unitPrice) }}</span>
                    </div>

                    <!-- 총 금액 -->
                    <div class="flex justify-between md:block">
                        <span class="text-xs text-slate-500 dark:text-slate-400 mb-1 block">총 금액</span>
                        <span class="text-sm font-medium">{{
                            formatWon(stock.totalAmount) }}</span>
                    </div>
                </div>
            </div>
        </section>
    </AppPageLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { formatWon } from '@/utils/format.js'
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'

// 더미 데이터 (출고일 없음)
const stock = {
    id: 'STK-001',
    createdAt: '2025-10-15',
    center: '서울 물류센터',
    worker: '김현수',
    inboundDate: '2025-10-10',
    outboundDate: null,
    productCode: 'PRD-1001',
    productName: '무선 마우스',
    unitPrice: 25000,
    totalAmount: 875000,
    quantity: 35,
    location: 'A-12',
}
</script>
