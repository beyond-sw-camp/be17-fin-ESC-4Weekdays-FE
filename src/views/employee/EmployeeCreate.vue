<template>
    <AppPageLayout>
        <!-- 헤더 -->
        <template #header>
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-semibold text-gray-800">신규 직원 등록</h1>
                <button @click="$router.push('/employee')"
                    class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">
                    목록으로
                </button>
            </div>
        </template>

        <!-- 회원 등록 폼 -->
        <form @submit.prevent="registerUser" class="space-y-6 max-w-3xl mx-auto mt-8">

            <!-- 🔹 주요 항목 (한 줄씩) -->
            <div class="grid grid-cols-1 gap-6">
                <!-- 이메일 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                    <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2"
                        placeholder="이메일 주소를 입력하세요" />
                </div>

                <!-- 비밀번호 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                    <input v-model="form.password" type="password" class="w-full border rounded px-3 py-2"
                        placeholder="비밀번호를 입력하세요" />
                </div>

                <!-- 이름 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">이름</label>
                    <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2"
                        placeholder="이름을 입력하세요" />
                </div>

                <!-- 전화번호 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                    <input v-model="form.phone" type="text" class="w-full border rounded px-3 py-2"
                        placeholder="010-0000-0000" />
                </div>
            </div>

            <!-- 🔹 부 항목 (두 줄 나란히) -->
            <div class="grid grid-cols-2 gap-6">
                <!-- 직책 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">직책</label>
                    <input v-model="form.position" type="text" class="w-full border rounded px-3 py-2"
                        placeholder="예: 사원, 대리, 과장" />
                </div>

                <!-- 권한 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">권한</label>
                    <select v-model="form.role" class="w-full border rounded px-3 py-2">
                        <option value="master">MASTER</option>
                        <option value="admin">ADMIN</option>
                        <option value="staff">WORKER</option>
                    </select>
                </div>

                <!-- 상태 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <select v-model="form.status" class="w-full border rounded px-3 py-2">
                        <option value="active">재직</option>
                        <option value="leave">휴직</option>
                        <option value="inactive">퇴사</option>
                    </select>
                </div>
            </div>

            <!-- 등록 버튼 -->
            <div class="flex justify-end mt-6">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
                    등록
                </button>
            </div>
        </form>
    </AppPageLayout>
</template>

<script setup>
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import { ref } from 'vue'

// ✅ 기본 폼 데이터
const form = ref({
    email: '',
    password: '',
    name: '',
    phone: '',
    position: '',
    role: 'staff',
    joinDate: '',
    status: 'active',
})

// ✅ 등록 함수
const registerUser = () => {
    // 가입일시 자동 등록
    form.value.joinDate = new Date().toISOString()

    console.log('등록된 사용자 데이터:', form.value)
    alert('회원 등록이 완료되었습니다!')
}
</script>
