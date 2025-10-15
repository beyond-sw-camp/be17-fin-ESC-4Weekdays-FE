export default [
  {
    path: '/task/list',
    name: 'TaskList',
    component: () => import('@/views/task/TaskList.vue')
  },
  {
    path: '/task/detail/:id',
    name: 'TaskDetail',
    component: () => import('@/views/task/TaskDetail.vue')
  },
]
