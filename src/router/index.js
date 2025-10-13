import {createRouter, createWebHistory} from 'vue-router'
import purchaseOrderRoutes from '@/router/purchaseOrderRoutes.js'
import ModalTest from "@/views/sandbox/ModalTest.vue";

const routes = [
  {
    path: "/modaltest",
    component: ModalTest
  },
  ...purchaseOrderRoutes,
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
