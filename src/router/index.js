import {createRouter, createWebHistory} from 'vue-router'
import purchaseOrderRoutes from '@/router/purchaseOrderRoutes.js'
import ModalTest from "@/views/sandbox/ModalTest.vue";
import inboundRoutes from "@/router/inboundRoutes.js";
import dashboardRoutes from './dashboardRoutes';

const routes = [
    {
        path: "/modaltest",
        component: ModalTest
    },
    {
        path: "/test",
        component: ModalTest
    },
    ...purchaseOrderRoutes,
    ...inboundRoutes,
    ...dashboardRoutes
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
