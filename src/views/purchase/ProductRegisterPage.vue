<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <main class="flex-1 flex justify-center p-10">
      <div class="w-full max-w-5xl bg-white shadow rounded-2xl p-8 relative">
        <!-- 우상단 카테고리 추가 버튼 -->
        <button
          @click="openCategoryModal"
          class="absolute top-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + 카테고리 추가
        </button>

        <h1 class="text-2xl font-semibold mb-8 text-gray-800">상품 등록</h1>

        <!-- 상품 등록 폼 -->
        <form @submit.prevent="registerProduct" class="space-y-6">
          <div>
            <label class="block text-gray-700 font-medium mb-2">상품명</label>
            <input
              v-model="form.productName"
              type="text"
              class="w-full border rounded px-3 py-2"
              placeholder="상품명을 입력하세요"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-2">상품 카테고리</label>
            <div class="grid grid-cols-3 gap-3">
              <select
                v-model="form.categoryLarge"
                @change="loadMedium"
                class="border rounded px-3 py-2"
              >
                <option value="">대분류 선택</option>
                <option v-for="opt in categories.large" :key="opt" :value="opt">{{ opt }}</option>
              </select>
              <select
                v-model="form.categoryMedium"
                @change="loadSmall"
                class="border rounded px-3 py-2"
              >
                <option value="">중분류 선택</option>
                <option v-for="opt in mediumOptions" :key="opt" :value="opt">{{ opt }}</option>
              </select>
              <select v-model="form.categorySmall" class="border rounded px-3 py-2">
                <option value="">소분류 선택</option>
                <option v-for="opt in smallOptions" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-2">가격 정보</label>
            <div class="grid grid-cols-4 gap-3">
              <input
                v-model="form.costPrice"
                type="number"
                placeholder="원가"
                class="border rounded px-3 py-2"
              />
              <input
                v-model="form.listPrice"
                type="number"
                placeholder="정가"
                class="border rounded px-3 py-2"
              />
              <input
                v-model="form.wholesalePrice"
                type="number"
                placeholder="도매가"
                class="border rounded px-3 py-2"
              />
              <input
                v-model="form.marginRate"
                type="number"
                placeholder="이익률(%)"
                class="border rounded px-3 py-2"
              />
            </div>
          </div>

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
              <input
                v-model="form.expirationAt"
                type="date"
                class="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

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

          <div class="flex justify-end space-x-3 mt-8">
            <button type="button" @click="resetForm" class="bg-gray-200 px-5 py-2 rounded">
              취소
            </button>
            <button
              type="submit"
              class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </main>

    <!-- 카테고리 추가 모달 -->
    <ModalComp v-if="showModal" title="카테고리 추가" @close="showModal = false">
      <div class="p-4 space-y-4">
        <input
          v-model="newCategory.large"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="대분류 이름"
        />
        <input
          v-model="newCategory.medium"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="중분류 이름"
        />
        <input
          v-model="newCategory.small"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="소분류 이름"
        />
        <div class="flex justify-end space-x-2 mt-4">
          <button @click="showModal = false" class="bg-gray-200 px-4 py-2 rounded">취소</button>
          <button @click="addCategory" class="bg-blue-600 text-white px-4 py-2 rounded">
            추가
          </button>
        </div>
      </div>
    </ModalComp>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import ModalComp from '@/components/common/ModalComp.vue'

// form
const form = ref({
  productName: '',
  categoryLarge: '',
  categoryMedium: '',
  categorySmall: '',
  costPrice: '',
  listPrice: '',
  wholesalePrice: '',
  marginRate: '',
  currency: 'KRW',
  specification: '',
  expirationAt: '',
  originCountry: '',
})

// 카테고리 mock
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

// 카테고리 추가 모달 관련
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

// 등록 API
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
    productName: '',
    categoryLarge: '',
    categoryMedium: '',
    categorySmall: '',
    costPrice: '',
    listPrice: '',
    wholesalePrice: '',
    marginRate: '',
    currency: 'KRW',
    specification: '',
    expirationAt: '',
    originCountry: '',
  }
}
</script>

<style scoped>
main {
  min-height: calc(100vh - 100px);
}
</style>
