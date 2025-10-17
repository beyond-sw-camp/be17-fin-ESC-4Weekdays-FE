<template>
    <AppPageLayout>
        <!-- 헤더 -->
        <template #header>
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                    <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">신규 입고</h1>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">새로운 입고를 등록합니다</p>
                </div>
                <ButtonComp color="secondary" icon="arrow_back" @click="$router.back()">뒤로가기</ButtonComp>
            </div>
        </template>

        <!-- 직원 상세 카드 -->
        <div class="max-w-xl mx-auto mt-8 bg-white border border-gray-200 rounded-lg p-8">
            <div class="space-y-5">
                <!-- 이메일 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                    <div class="border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-gray-800 text-sm">
                        {{ employee.email }}
                    </div>
                </div>

                <!-- 이름 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">이름</label>
                    <div class="border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-gray-800 text-sm">
                        {{ employee.name }}
                    </div>
                </div>

                <!-- 전화번호 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                    <div class="border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-gray-800 text-sm">
                        {{ employee.phone }}
                    </div>
                </div>

                <!-- 권한 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">권한</label>
                    <div class="border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-gray-800 text-sm">
                        {{ employee.roleLabel }}
                    </div>
                </div>

                <!-- 상태 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">상태</label>
                    <div class="border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-sm font-medium" :class="{
                        'text-green-600': employee.status === 'active',
                        'text-yellow-600': employee.status === 'leave',
                        'text-gray-500': employee.status === 'inactive',
                    }">
                        {{ employee.statusLabel }}
                    </div>
                </div>

                <!-- 가입일시 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">가입일시</label>
                    <div class="border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-gray-800 text-sm">
                        {{ formatDate(employee.joinDate) }}
                    </div>
                </div>
            </div>

            <!-- 버튼 영역 -->
            <div class="mt-8 flex justify-end gap-3">
                <ButtonComp color="primary" icon="edit" @click="editEmployee">
                    수정
                </ButtonComp>
                <ButtonComp color="secondary" icon="close" @click="$router.push('/employee')">
                    취소
                </ButtonComp>
            </div>
        </div>
    </AppPageLayout>
</template>

<script setup>
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'

const employee = {
    email: 'kimcs@company.com',
    name: '김철수',
    phone: '010-1234-5678',
    position: '대리',
    role: 'admin',
    roleLabel: 'ADMIN',
    status: 'active',
    statusLabel: '재직',
    joinDate: '2025-10-15T09:30:00Z',
}

const editEmployee = () => {
    console.log('직원 수정 버튼 클릭됨')
    alert('직원 수정 페이지로 이동 예정')
}

const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}
</script>
