<template>
  <AppPageLayout>
    <!-- 상단 헤더 -->
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-800">상품 등록</h1>
        <button
          @click="openCategoryModal"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + 카테고리 추가
        </button>
      </div>
    </template>

    <!-- 본문 콘텐츠 -->
    <div class="w-full max-w-5xl mx-auto bg-white dark:bg-zinc-900 shadow rounded-2xl p-8 relative">
      <form @submit.prevent="registerProduct" class="space-y-6">
        <!-- 상품 코드 + 상품명 + 원가 -->
        <div class="grid grid-cols-3 gap-6">
          <div>
            <label class="block text-gray-700 font-medium mb-2">상품 코드</label>
            <input
              v-model="form.productCode"
              type="text"
              placeholder="상품 코드를 입력하세요"
              class="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-2">상품명</label>
            <input
              v-model="form.productName"
              type="text"
              placeholder="상품명을 입력하세요"
              class="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-2">가격 정보</label>
            <input
              v-model="form.costPrice"
              type="number"
              placeholder="가격을 입력하세요"
              class="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <!-- 카테고리 -->
        <div>
          <label class="block text-gray-700 font-medium mb-2">상품 카테고리</label>
          <div class="grid grid-cols-3 gap-3">
            <select v-model="form.categoryLarge" @change="loadMedium" class="border rounded px-3 py-2">
              <option value="">대분류 선택</option>
              <option v-for="opt in categories.large" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <select v-model="form.categoryMedium" @change="loadSmall" class="border rounded px-3 py-2">
              <option value="">중분류 선택</option>
              <option v-for="opt in mediumOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <select v-model="form.categorySmall" class="border rounded px-3 py-2">
              <option value="">소분류 선택</option>
              <option v-for="opt in smallOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
        </div>

        <!-- 규격 & 유통기한 -->
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-medium mb-2">규격</label>
            <input
              v-model="form.specification"
              type="text"
              placeholder="예: 500ml, Box 20개입"
              class="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-2">유통기한</label>
            <input v-model="form.expirationAt" type="date" class="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <!-- 원산지 & 통화 -->
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-medium mb-2">원산지</label>
            <input
              v-model="form.originCountry"
              type="text"
              placeholder="예: 대한민국"
              class="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-2">통화</label>
            <select v-model="form.currency" class="w-full border rounded px-3 py-2">
              <option>KRW</option>
              <option>USD</option>
              <option>JPY</option>
            </select>
          </div>
        </div>

        <!-- 버튼 -->
        <div class="flex justify-end space-x-3 mt-8">
          <button type="button" @click="resetForm" class="bg-gray-200 px-5 py-2 rounded">
            취소
          </button>
          <button type="submit" class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
            등록
          </button>
        </div>
      </form>
    </div>

    <!-- 하단 푸터 -->
    <template #footer>
      <div class="text-center text-sm text-gray-500">© 2025 4Weekdays WMS Platform</div>
    </template>

    <!-- 카테고리 추가 모달 -->
    <ModalComp v-if="showModal" title="카테고리 추가" @close="showModal = false">
      <div class="p-4 space-y-4">
        <input v-model="newCategory.large" type="text" class="w-full border rounded px-3 py-2" placeholder="대분류 이름" />
        <input v-model="newCategory.medium" type="text" class="w-full border rounded px-3 py-2" placeholder="중분류 이름" />
        <input v-model="newCategory.small" type="text" class="w-full border rounded px-3 py-2" placeholder="소분류 이름" />
        <div class="flex justify-end space-x-2 mt-4">
          <button @click="showModal = false" class="bg-gray-200 px-4 py-2 rounded">취소</button>
          <button @click="addCategory" class="bg-blue-600 text-white px-4 py-2 rounded">추가</button>
        </div>
      </div>
    </ModalComp>
  </AppPageLayout>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import ModalComp from '@/components/common/ModalComp.vue'

const form = ref({
  productCode: '',
  productName: '',
  categoryLarge: '',
  categoryMedium: '',
  categorySmall: '',
  costPrice: '',
  currency: 'KRW',
  specification: '',
  expirationAt: '',
  originCountry: '',
})

const categories = ref({
  large: ['식품', '생활용품', '전자제품'],
  medium: {
    식품: ['음료', '과자'],
    생활용품: ['세제', '청소용품'],
    전자제품: ['TV', '휴대폰'],
  },
  small: {
    음료: ['탄산음료', '주스'],
    과자: ['스낵', '비스킷'],
    세제: ['세탁세제', '주방세제'],
    청소용품: ['걸레'],
    TV: ['LED', 'OLED'],
    휴대폰: ['안드로이드', '아이폰'],
  },
})

const mediumOptions = ref([])
const smallOptions = ref([])

const loadMedium = () => {
  form.value.categoryMedium = ''
  form.value.categorySmall = ''
  mediumOptions.value = categories.value.medium[form.value.categoryLarge] || []
  smallOptions.value = []
}

const loadSmall = () => {
  form.value.categorySmall = ''
  smallOptions.value = categories.value.small[form.value.categoryMedium] || []
}

const showModal = ref(false)
const newCategory = ref({ large: '', medium: '', small: '' })

const openCategoryModal = () => (showModal.value = true)

const addCategory = () => {
  const { large, medium, small } = newCategory.value
  if (!large) return alert('대분류를 입력하세요.')

  if (!categories.value.large.includes(large)) {
    categories.value.large.push(large)
    categories.value.medium[large] = []
  }
  if (medium) {
    categories.value.medium[large] = categories.value.medium[large] || []
    if (!categories.value.medium[large].includes(medium)) {
      categories.value.medium[large].push(medium)
      categories.value.small[medium] = []
    }
  }
  if (small) {
    categories.value.small[medium] = categories.value.small[medium] || []
    if (!categories.value.small[medium].includes(small)) {
      categories.value.small[medium].push(small)
    }
  }
  newCategory.value = { large: '', medium: '', small: '' }
  showModal.value = false
}

const registerProduct = async () => {
  try {
    await axios.post('/api/product', form.value)
    alert('상품 등록 완료!')
    resetForm()
  } catch (e) {
    console.error(e)
    alert('상품 등록 중 오류가 발생했습니다.')
  }
}

const resetForm = () => {
  form.value = {
    productCode: '',
    productName: '',
    categoryLarge: '',
    categoryMedium: '',
    categorySmall: '',
    costPrice: '',
    currency: 'KRW',
    specification: '',
    expirationAt: '',
    originCountry: '',
  }
}
</script>
