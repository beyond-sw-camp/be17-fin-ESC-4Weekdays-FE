<template>
    <AppPageLayout>
        <!-- 헤더 -->
        <template #header>
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-semibold text-gray-800">직원 상세 정보</h1>

                <div class="flex gap-3">
                    <!-- 수정 버튼 -->
                    <ButtonComp color="primary" icon="edit" @click="editEmployee">
                        수정
                    </ButtonComp>

                    <!-- 목록으로 버튼 -->
                    <ButtonComp color="secondary" icon="arrow_back" @click="$router.push('/employee')">
                        목록으로
                    </ButtonComp>
                </div>
            </div>
        </template>

        <!-- 직원 정보 카드 -->
        <div class="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mt-8 space-y-6">
            <div class="grid grid-cols-2 gap-6">
                <div>
                    <p class="text-sm text-gray-500">이메일</p>
                    <p class="text-base font-medium text-gray-800">{{ employee.email }}</p>
                </div>

                <div>
                    <p class="text-sm text-gray-500">이름</p>
                    <p class="text-base font-medium text-gray-800">{{ employee.name }}</p>
                </div>

                <div>
                    <p class="text-sm text-gray-500">전화번호</p>
                    <p class="text-base font-medium text-gray-800">{{ employee.phone }}</p>
                </div>

                <div>
                    <p class="text-sm text-gray-500">직책</p>
                    <p class="text-base font-medium text-gray-800">{{ employee.position }}</p>
                </div>

                <div>
                    <p class="text-sm text-gray-500">권한</p>
                    <p class="text-base font-medium text-gray-800">{{ employee.roleLabel }}</p>
                </div>

                <div>
                    <p class="text-sm text-gray-500">상태</p>
                    <p class="text-base font-medium" :class="{
                        'text-green-600': employee.status === 'active',
                        'text-yellow-600': employee.status === 'leave',
                        'text-gray-500': employee.status === 'inactive',
                    }">
                        {{ employee.statusLabel }}
                    </p>
                </div>

                <div class="col-span-2">
                    <p class="text-sm text-gray-500">가입일시</p>
                    <p class="text-base font-medium text-gray-800">{{ formatDate(employee.joinDate) }}</p>
                </div>
            </div>
        </div>
    </AppPageLayout>
</template>

<script setup>
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'

// ✅ 직원 목업 데이터
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

// ✅ 수정 버튼 (지금은 단순 클릭 로그)
const editEmployee = () => {
    console.log('직원 수정 버튼 클릭됨')
    alert('직원 수정 페이지로 이동 예정')
}

// ✅ 날짜 포맷 함수
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
