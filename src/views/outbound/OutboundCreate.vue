<template>
  <AppPageLayout>
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-800">신규 출고 등록</h1>
        <button
          @click="$router.push('/outbound')"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          목록으로
        </button>
      </div>
    </template>

    <form @submit.prevent="registerOutbound" class="space-y-6 max-w-3xl mx-auto mt-8">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">출고 번호</label>
          <input v-model="form.outboundCode" type="text" class="w-full border rounded px-3 py-2" placeholder="OB-YYYYMMDD" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">거래처</label>
          <input v-model="form.partnerName" type="text" class="w-full border rounded px-3 py-2" placeholder="거래처명을 입력하세요" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">상품명</label>
          <input v-model="form.productName" type="text" class="w-full border rounded px-3 py-2" placeholder="상품명을 입력하세요" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">출고 수량</label>
          <input v-model="form.quantity" type="number" class="w-full border rounded px-3 py-2" placeholder="수량 입력" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">출고 유형</label>
          <select v-model="form.type" class="w-full border rounded px-3 py-2">
            <option value="SALE">판매</option>
            <option value="RETURN">반품</option>
            <option value="TRANSFER">이동</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">담당자</label>
          <input v-model="form.handler" type="text" class="w-full border rounded px-3 py-2" placeholder="담당자명 입력" />
        </div>
      </div>

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

const form = ref({
  outboundCode: '',
  partnerName: '',
  productName: '',
  quantity: '',
  type: 'SALE',
  handler: '',
})

const registerOutbound = () => {
  console.log('등록 데이터:', form.value)
  alert('출고 등록 완료!')
}
</script>
