import {createRouter, createWebHistory} from 'vue-router'
import purchaseOrderRoutes from '@/router/purchaseOrderRoutes.js'
import ModalTest from "@/views/sandbox/ModalTest.vue";
import inboundRoutes from "@/router/inboundRoutes.js";
import stockList from '@/router/stockRoutes.js';
import productRoutes from '@/router/productRoutes.js';

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
    ...stockList
    ...productRoutes
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
