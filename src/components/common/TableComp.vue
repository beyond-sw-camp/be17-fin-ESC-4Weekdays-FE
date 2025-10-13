<template>
  <div class="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
    <table
      class="min-w-full table-fixed border-collapse divide-y divide-zinc-200 dark:divide-zinc-800"
    >
      <thead class="bg-zinc-50 dark:bg-zinc-900/50">
      <tr>
        <th
          v-for="col in columns"
          :key="col.key"
          :style="{ width: col.width || 'auto' }"
          class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
          :class="{
          'text-right': col.align === 'right',
          'text-center': col.align === 'center'
        }"
        >
          {{ col.label }}
        </th>

        <th
          v-if="$slots.actions && Object.keys($slots.actions).length"
          class="px-6 py-3 text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400"
        >
          Actions
        </th>
      </tr>
      </thead>

      <tbody v-if="data && data.length" class="divide-y divide-zinc-200 dark:divide-zinc-800">
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td
          v-for="col in columns"
          :key="col.key"
          :style="{ width: col.width || 'auto' }"
          class="whitespace-nowrap px-6 py-4 text-sm"
          :class="{
          'text-right': col.align === 'right',
          'text-center': col.align === 'center',
          'text-left': !col.align || col.align === 'left'
        }"
        >
          <slot :name="`cell-${col.key}`" :row="row" :col="col">
            <slot name="cell" :row="row" :col="col">{{ row[col.key] }}</slot>
          </slot>
        </td>

        <td
          v-if="$slots.actions && Object.keys($slots.actions).length"
          class="whitespace-nowrap px-6 py-4 text-sm text-center"
        >
          <slot name="actions" :row="row" :index="rowIndex" />
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
defineProps({
  columns: { type: Array, default: () => [] },
  data: { type: Array, default: () => [] },
  emptyText: { type: String, default: '데이터가 없습니다.' },
})
</script>
