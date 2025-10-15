<template>
    <AppPageLayout>
        <div class="p-6 space-y-8">
            <!-- 헤더 -->
            <div class="flex items-center justify-between border-b pb-4">
                <div>
                    <h1 class="text-2xl font-semibold text-gray-800">입출고 및 반품 현황</h1>
                    <p class="text-sm text-gray-500 mt-1">
                        기간별 입출고, 반품, 취소 현황 조회
                    </p>
                </div>
                <p class="text-xs text-gray-400">업데이트: {{ lastUpdate }}</p>
            </div>

            <!-- 🔍 조회 조건 (기간 + 조회 버튼만) -->
            <div class="flex flex-wrap items-center gap-3 mb-8">
                <button v-for="filter in filters" :key="filter"
                    class="flex items-center gap-2 rounded border border-zinc-300 dark:border-zinc-700 bg-background-light dark:bg-zinc-900 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <span>{{ filter }}</span>
                    <span class="material-symbols-outlined text-base">expand_more</span>
                </button>
            </div>

            <!-- 요약 카드 -->
            <div class="grid grid-cols-3 gap-6">
                <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow p-6 text-center">
                    <h2 class="text-gray-700 text-sm font-medium mb-2">입고 건수</h2>
                    <p class="text-4xl font-bold text-blue-700">4,280건</p>
                    <p class="text-sm text-green-600 mt-1">▲ +3.8% (전일 대비)</p>
                </div>

                <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow p-6 text-center">
                    <h2 class="text-gray-700 text-sm font-medium mb-2">출고 건수</h2>
                    <p class="text-4xl font-bold text-green-700">3,960건</p>
                    <p class="text-sm text-red-600 mt-1">▼ -1.5% (전일 대비)</p>
                </div>

                <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl shadow p-6 text-center">
                    <h2 class="text-gray-700 text-sm font-medium mb-2">총 발주 금액</h2>
                    <p class="text-4xl font-bold text-yellow-700">₩9,450,000,000</p>
                    <p class="text-sm text-green-600 mt-1">▲ +5.2% (전일 대비)</p>
                </div>
            </div>

            <!-- 입출고 그래프 -->
            <div class="grid grid-cols-2 gap-6">
                <!-- 거래처별 발주 비율 -->
                <div
                    class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-inner p-6 hover:shadow-lg transition-all">
                    <h2 class="text-lg font-semibold text-gray-700 mb-2 text-center">거래처별 발주 비율</h2>
                    <p class="text-sm text-gray-500 text-center mb-4">
                        총 발주량 11,600건 기준
                    </p>
                    <div class="relative flex items-center justify-center h-[300px]">
                        <Doughnut ref="pieChart" :data="pieData" :options="pieOptions" />
                    </div>
                </div>

                <!-- 입출고 추이 -->
                <div
                    class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-inner p-6 hover:shadow-lg transition-all">
                    <h2 class="text-lg font-semibold text-gray-700 mb-2 text-center">
                        최근 입출고 추이
                    </h2>
                    <p class="text-sm text-gray-500 text-center mb-4">
                        기간: {{ filter.startDate || '오늘' }} ~ {{ filter.endDate || '오늘' }}
                    </p>
                    <div class="h-[300px]">
                        <Bar ref="barChart" :data="barData" :options="barOptions" />
                    </div>
                </div>
            </div>

            <!-- 반품 및 취소 현황 -->
            <div class="mt-10 space-y-6">
                <div class="flex items-center justify-between border-b pb-3">
                    <h2 class="text-xl font-semibold text-gray-800">반품 및 취소 현황</h2>
                </div>

                <!-- 요약 카드 -->
                <div class="grid grid-cols-3 gap-6">
                    <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl shadow p-5 text-center">
                        <h3 class="text-gray-700 text-sm font-medium mb-1">전체 반품률</h3>
                        <p class="text-3xl font-bold text-red-600">4.2%</p>
                    </div>
                    <div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl shadow p-5 text-center">
                        <h3 class="text-gray-700 text-sm font-medium mb-1">총 반품 건수</h3>
                        <p class="text-3xl font-bold text-orange-600">312건</p>
                    </div>
                    <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl shadow p-5 text-center">
                        <h3 class="text-gray-700 text-sm font-medium mb-1">총 취소 건수</h3>
                        <p class="text-3xl font-bold text-yellow-600">158건</p>
                    </div>
                </div>

                <!-- 그래프 2:1 비율 -->
                <div class="grid grid-cols-[2fr_1fr] gap-6">
                    <!-- 상품별 반품률 -->
                    <div
                        class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-inner p-6 hover:shadow-lg transition-all">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2 text-center">상품별 반품률</h3>
                        <p class="text-sm text-gray-500 text-center mb-4">최근 일주일 기준</p>
                        <div class="h-[320px]">
                            <Bar ref="productReturnChart" :data="productReturnData" :options="productReturnOptions" />
                        </div>
                    </div>

                    <!-- 거래처별 반품률 -->
                    <div
                        class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-inner p-6 hover:shadow-lg transition-all">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2 text-center">거래처별 반품률</h3>
                        <p class="text-sm text-gray-500 text-center mb-4">최근 일주일 기준</p>
                        <div class="h-[320px]">
                            <Bar ref="vendorReturnChart" :data="vendorReturnData" :options="vendorReturnOptions" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 하단 3섹션 추가 -->
            <div class="grid grid-cols-3 gap-6 mt-6">
                <!-- 거래처별 TOP5 -->
                <div class="bg-white rounded-xl shadow p-4">
                    <h3 class="text-sm font-semibold text-gray-700 mb-3">입고 상위 거래처 TOP 5</h3>
                    <ul class="space-y-3">
                        <li v-for="(client, idx) in topClients" :key="idx">
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-sm text-gray-700">{{ client.name }}</span>
                                <span class="text-sm font-semibold text-gray-800">{{ client.count.toLocaleString()
                                }}건</span>
                            </div>
                            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                    :style="{ width: (client.percent * 3) + '%' }"></div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- 재고 부족 품목 -->
                <div class="bg-white rounded-xl shadow p-4">
                    <h3 class="text-sm font-semibold text-gray-700 mb-3">재고 부족 품목</h3>
                    <ul class="space-y-3">
                        <li v-for="(item, idx) in stockItems" :key="idx">
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-sm text-gray-700">{{ item.name }}</span>
                                <div class="flex items-center gap-2">
                                    <span class="text-xs text-gray-500">{{ item.stock }}개</span>
                                    <span class="text-xs font-semibold"
                                        :class="item.color === 'red' ? 'text-red-500' : 'text-yellow-500'">
                                        {{ item.status }}
                                    </span>
                                </div>
                            </div>
                            <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div class="h-full rounded-full"
                                    :class="item.color === 'red' ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-yellow-400 to-yellow-600'"
                                    :style="{ width: item.stock + '%' }"></div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- 실시간 로그 -->
                <div class="bg-white rounded-xl shadow p-4">
                    <h3 class="text-sm font-semibold text-gray-700 mb-3">실시간 작업 로그</h3>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li v-for="(log, idx) in logs" :key="idx">
                            {{ log.icon }} {{ log.time }} - {{ log.text }}
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 알림 위젯 -->
            <div class="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 mt-4">
                <div>
                    <p class="text-red-700 font-semibold">
                        ⚠️ 주의: 재고 부족 상품 8건, 출고 지연 3건 감지됨
                    </p>
                    <p class="text-sm text-gray-500">재고 보충 또는 출고 일정 조정이 필요합니다.</p>
                </div>
            </div>
        </div>
    </AppPageLayout>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import { Doughnut, Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, } from 'chart.js'
const filters = ['기간']
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)

// 🕒 기본값: 오늘 날짜
const today = new Date().toISOString().split('T')[0]
const filter = ref({
    startDate: today,
    endDate: today,
})

// 조회 버튼 클릭
const applyFilter = () => {
    console.log('조회 기간:', filter.value.startDate, '~', filter.value.endDate)
}

const lastUpdate = new Date().toLocaleString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
})

// 거래처 데이터
const topClients = [
    { name: 'A상사', count: 1240, percent: 29 },
    { name: 'B무역', count: 1120, percent: 26 },
    { name: 'C전자', count: 980, percent: 23 },
    { name: 'D리테일', count: 860, percent: 20 },
    { name: 'E유통', count: 740, percent: 17 },
]

// 재고 부족 품목
const stockItems = [
    { name: '스위치 12V', status: '임박', stock: 12, color: 'red' },
    { name: '포장박스 L', status: '부족', stock: 28, color: 'red' },
    { name: '케이블 2M', status: '주의', stock: 45, color: 'yellow' },
    { name: '라벨 스티커', status: '주의', stock: 62, color: 'yellow' },
]

// 실시간 로그
const logs = ref([
    { time: '10:45', text: '입고 완료 (A상사)', icon: '🟢' },
    { time: '10:38', text: '출고 준비 중 (B무역)', icon: '🟠' },
    { time: '10:33', text: '발주 생성 (C전자)', icon: '🔵' },
    { time: '10:30', text: '입고 완료 (D리테일)', icon: '🟢' },
])

// 📊 입출고 차트
const pieData = {
    labels: ['A상사', 'B유통', 'C전자', 'D무역', 'E리테일'],
    datasets: [
        {
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
            data: [3800, 2900, 2100, 1600, 1200],
            borderWidth: 0,
        },
    ],
}
const barData = {
    labels: ['10/13', '10/14', '10/15'],
    datasets: [
        { label: '입고', backgroundColor: '#3b82f6', borderRadius: 8, data: [4200, 4380, 4280], barThickness: 40 },
        { label: '출고', backgroundColor: '#10b981', borderRadius: 8, data: [3950, 3840, 3960], barThickness: 40 },
    ],
}

// 📦 반품 현황
const productReturnData = {
    labels: ['상품A', '상품B', '상품C', '상품D', '상품E'],
    datasets: [{ label: '반품률(%)', backgroundColor: '#ef4444', borderRadius: 6, data: [5.2, 3.8, 4.5, 2.1, 3.3], barThickness: 40 }],
}
const vendorReturnData = {
    labels: ['A상사', 'B유통', 'C전자', 'D무역', 'E리테일'],
    datasets: [{ label: '반품률(%)', backgroundColor: '#fb923c', borderRadius: 6, data: [4.2, 3.1, 2.8, 3.7, 2.4], barThickness: 20 }],
}

// 📈 옵션
const pieOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom', labels: { padding: 15, font: { size: 12 } } },
        tooltip: { backgroundColor: 'rgba(0,0,0,0.85)', titleColor: '#fff', bodyColor: '#fff', cornerRadius: 8 },
    },
    animation: { duration: 1500, easing: 'easeOutQuart', animateRotate: true, animateScale: true },
})
const barOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom', labels: { padding: 15, font: { size: 12 } } },
        tooltip: { backgroundColor: 'rgba(0,0,0,0.85)', titleColor: '#fff', bodyColor: '#fff', cornerRadius: 8 },
    },
    scales: {
        x: { grid: { display: false }, ticks: { color: '#666', font: { size: 11 } } },
        y: { grid: { color: '#e5e7eb' }, ticks: { color: '#666', stepSize: 1000, font: { size: 11 } } },
    },
    animation: { duration: 1500, easing: 'easeOutQuart' },
})
const productReturnOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        x: { grid: { display: false }, ticks: { color: '#666' } },
        y: { grid: { color: '#e5e7eb' }, ticks: { color: '#666', callback: (v) => v + '%' } },
    },
    animation: { duration: 1200, easing: 'easeOutQuart' },
})
const vendorReturnOptions = ref({
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        x: { grid: { color: '#e5e7eb' }, ticks: { color: '#666', callback: (v) => v + '%' } },
        y: { grid: { display: false }, ticks: { color: '#666' } },
    },
    animation: { duration: 1200, easing: 'easeOutQuart' },
})

const pieChart = ref(null)
const barChart = ref(null)

onMounted(async () => {
    await nextTick()
    pieChart.value?.chart.reset()
    pieChart.value?.chart.update()
    barChart.value?.chart.reset()
    barChart.value?.chart.update()
})
</script>