import {createRouter, createWebHistory} from 'vue-router'
import purchaseOrderRoutes from '@/router/purchaseOrderRoutes.js'
import ModalTest from "@/views/sandbox/ModalTest.vue";
import Test from "@/views/sandbox/Test.vue";
import TaskDetailTest from "@/views/sandbox/TaskDetailTest.vue";
import inboundRoutes from "@/router/inboundRoutes.js";

const routes = [
    {
        path: "/modaltest",
        component: ModalTest
    },
    {
        path: "/test",
        component: TaskDetailTest
    },
    ...purchaseOrderRoutes,
    ...inboundRoutes
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
