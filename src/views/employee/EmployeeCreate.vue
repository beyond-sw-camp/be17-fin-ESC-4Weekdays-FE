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

        <!-- 회원 등록 폼 -->
        <form @submit.prevent="registerUser" class="max-w-xl mx-auto mt-8">
            <div class="bg-white rounded-lg border border-gray-200 p-8">
                <div class="space-y-5">
                    <!-- 이메일 -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                        <div class="flex gap-2">
                            <input v-model="form.email" type="email" required
                                class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                placeholder="example@company.com" />
                            <ButtonComp color="primary" size="sm" type="button" @click="checkEmailDuplicate">
                                중복확인
                            </ButtonComp>
                        </div>
                    </div>

                    <!-- 비밀번호 -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
                        <input v-model="form.password" type="password" required
                            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="8자 이상 입력하세요" />
                    </div>

                    <!-- 비밀번호 확인 -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">비밀번호 확인</label>
                        <input v-model="form.passwordConfirm" type="password" required
                            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="비밀번호를 다시 입력하세요" />
                    </div>

                    <!-- 이름 -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">이름</label>
                        <input v-model="form.name" type="text" required
                            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="홍길동" />
                    </div>

                    <!-- 전화번호 -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                        <input v-model="form.phone" type="text" required
                            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="010-1234-5678" />
                    </div>

                    <!-- 권한 -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">권한</label>
                        <select v-model="form.role" required
                            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
                            <option value="">선택하세요</option>
                            <option value="master">MASTER</option>
                            <option value="admin">ADMIN</option>
                            <option value="staff">WORKER</option>
                        </select>
                    </div>

                    <!-- 상태 -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">상태</label>
                        <select v-model="form.status" required
                            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
                            <option value="">선택하세요</option>
                            <option value="active">재직</option>
                            <option value="leave">휴직</option>
                            <option value="inactive">퇴사</option>
                        </select>
                    </div>
                </div>

                <!-- 버튼 영역 -->
                <div class="mt-8">
                    <ButtonComp color="primary" size="lg" type="submit" class="w-full justify-center">
                        직원 등록
                    </ButtonComp>
                </div>
            </div>
        </form>
    </AppPageLayout>
</template>

<script setup>
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'
import { ref } from 'vue'

const form = ref({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    position: '',
    role: '',
    joinDate: '',
    status: '',
})

const checkEmailDuplicate = () => {
    console.log('이메일 중복 확인:', form.value.email)
    alert('사용 가능한 이메일입니다.')
}

const registerUser = () => {
    form.value.joinDate = new Date().toISOString()
    console.log('등록된 사용자 데이터:', form.value)
    alert('회원 등록이 완료되었습니다!')
}
</script>
