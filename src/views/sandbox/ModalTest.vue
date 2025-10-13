<template>
  <AppPageLayout>
    <div class="space-y-6">
      <h1 class="text-3xl font-bold">Modal 테스트</h1>

      <!-- 테스트 버튼들 -->
      <div class="flex flex-wrap gap-4">
        <ButtonComp @click="modal1 = true" color="primary">
          기본 모달
        </ButtonComp>
        <ButtonComp @click="modal2 = true" color="success">
          아이콘 + 제목 모달
        </ButtonComp>
        <ButtonComp @click="modal3 = true" color="danger">
          확인/취소 버튼 모달
        </ButtonComp>
        <ButtonComp @click="modal4 = true">
          폼 입력 모달
        </ButtonComp>
      </div>

      <!-- 1. 기본 모달 -->
      <ModalComp :open="modal1" @close="modal1 = false">
        <p class="text-gray-700 dark:text-gray-300">
          가장 기본적인 모달입니다. 오버레이 클릭 또는 ESC 키로 닫을 수 있습니다.
        </p>
      </ModalComp>

      <!-- 2. 아이콘 + 제목 모달 -->
      <ModalComp
          :open="modal2"
          title="성공!"
          icon="check_circle"
          @close="modal2 = false"
      >
        <p class="text-center text-gray-700 dark:text-gray-300">
          작업이 성공적으로 완료되었습니다.
        </p>
      </ModalComp>

      <!-- 3. 확인/취소 버튼 모달 -->
      <ModalComp
          :open="modal3"
          title="삭제 확인"
          icon="warning"
          @close="modal3 = false"
      >
        <p class="text-center text-gray-700 dark:text-gray-300 mb-6">
          정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </p>
        <template #footer>
          <div class="flex gap-3 justify-center">
            <ButtonComp @click="modal3 = false" color="secondary">
              취소
            </ButtonComp>
            <ButtonComp @click="handleDelete" color="danger">
              삭제
            </ButtonComp>
          </div>
        </template>
      </ModalComp>

      <!-- 4. 폼 입력 모달 -->
      <ModalComp
          :open="modal4"
          title="새 항목 추가"
          icon="add_circle"
          @close="modal4 = false"
      >
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              이름
            </label>
            <input
                v-model="formData.name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                placeholder="이름을 입력하세요"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              설명
            </label>
            <textarea
                v-model="formData.description"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                rows="3"
                placeholder="설명을 입력하세요"
            ></textarea>
          </div>
        </form>
        <template #footer>
          <div class="flex gap-3 justify-end">
            <ButtonComp @click="modal4 = false" color="secondary">
              취소
            </ButtonComp>
            <ButtonComp @click="handleSubmit" color="primary">
              저장
            </ButtonComp>
          </div>
        </template>
      </ModalComp>
    </div>
  </AppPageLayout>
</template>

<script setup>
import { ref } from 'vue'
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ModalComp from '@/components/common/ModalComp.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'

// 모달 상태
const modal1 = ref(false)
const modal2 = ref(false)
const modal3 = ref(false)
const modal4 = ref(false)

// 폼 데이터
const formData = ref({
  name: '',
  description: '',
})

// 삭제 핸들러
const handleDelete = () => {
  console.log('삭제 실행')
  modal3.value = false
  // 실제 삭제 로직
}

// 폼 제출 핸들러
const handleSubmit = () => {
  console.log('폼 제출:', formData.value)
  modal4.value = false
  // 폼 초기화
  formData.value = { name: '', description: '' }
}
</script>