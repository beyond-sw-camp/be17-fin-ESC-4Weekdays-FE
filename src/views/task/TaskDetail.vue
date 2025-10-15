<template>
  <AppPageLayout>
    <template #header>
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">작업 상세 정보</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          할당된 작업의 세부 정보를 확인하고 관리합니다.
        </p>
      </div>
    </template>

    <!-- 본문 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <!-- 좌측 정보 -->
      <div class="md:col-span-2 flex flex-col gap-6">
        <!-- 작업 지시사항 -->
        <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">작업 지시사항</h3>

          <div class="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p><strong class="inline-block w-16 text-slate-600 dark:text-slate-400">지시 사항:</strong> {{ task.instructions }}</p>
            <p><strong class="inline-block w-16 text-slate-600 dark:text-slate-400">품목:</strong> {{ task.items }}</p>
            <p><strong class="inline-block w-16 text-slate-600 dark:text-slate-400">위치:</strong>
              <span class="px-2 py-1 bg-gray-50 dark:bg-zinc-800 rounded-md font-mono">{{ task.location }}</span>
            </p>
          </div>
        </div>

        <!-- 작업 메모 -->
        <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-3">작업 메모</h3>

          <textarea
            v-model="task.memo"
            placeholder="작업 진행 상황이나 특이사항에 대한 메모를 추가하세요."
            class="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 resize-none h-28
                   text-sm text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary focus:outline-none"
          />

          <!-- 저장 버튼 -->
          <div class="flex justify-end mt-3">
            <ButtonComp color="primary" icon="save" @click="saveMemo">메모 저장</ButtonComp>
          </div>
        </div>
      </div>

      <!-- 우측 정보 -->
      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-6 shadow-sm flex flex-col justify-between">
        <div class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <p><strong>작업 번호:</strong> {{ task.code }}</p>
          <p><strong>작업 유형:</strong> {{ task.type }}</p>
          <p>
            <strong>상태:</strong>
            <BadgeComp :color="getStatusColor(task.status)" :label="getStatusLabel(task.status)" />
          </p>
          <p><strong>담당자:</strong> {{ task.assignee }}</p>
        </div>

        <div class="pt-6 flex flex-col gap-2">
          <ButtonComp
            v-if="task.status === 'assigned'"
            color="secondary"
            @click="changeStatus('in_progress')"
          >
            진행중으로 표시
          </ButtonComp>
          <ButtonComp
            v-if="task.status === 'in_progress'"
            color="primary"
            @click="changeStatus('completed')"
          >
            완료로 표시
          </ButtonComp>
        </div>
      </div>
    </div>
  </AppPageLayout>
</template>

<script setup>
import { ref } from 'vue'
import AppPageLayout from '@/layouts/AppPageLayout.vue'
import BadgeComp from '@/components/common/BadgeComp.vue'
import ButtonComp from '@/components/common/ButtonComp.vue'

const task = ref({
  code: 'T-20240715-001',
  type: '피킹 (Picking)',
  status: 'assigned',
  assignee: 'Emily Carter',
  instructions: '지정된 위치에서 품목을 피킹하여 배송 준비를 하세요.',
  items: '상품 A (10개), 상품 B (5개)',
  location: 'Zone A, Shelf 12, Bin 3',
  memo: '',
})

const getStatusLabel = (status) => {
  switch (status) {
    case 'assigned':
      return '할당됨'
    case 'in_progress':
      return '진행중'
    case 'completed':
      return '완료'
    default:
      return '알 수 없음'
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'assigned':
      return 'warning'
    case 'in_progress':
      return 'info'
    case 'completed':
      return 'success'
    default:
      return 'default'
  }
}

const changeStatus = (next) => {
  task.value.status = next
}

const saveMemo = () => {
  console.log('메모 저장됨:', task.value.memo)
  // TODO: axios.patch(`/task/${task.value.code}/memo`, { memo: task.value.memo })
  alert('작업 메모가 저장되었습니다.')
}
</script>
