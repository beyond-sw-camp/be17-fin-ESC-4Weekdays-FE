import InboundList from "@/views/inbound/InboundList.vue";
import InboundCreate from "@/views/inbound/InboundCreate.vue";

const inboundRoutes = [
    {
        path: '/inbound',
        name: 'inboundList',
        component: InboundList,
    },
    {
        path: '/inbound/create',
        name: 'inboundCreate',
        component: InboundCreate,
    },
    {
        path: '/inbound/detail',
        name: 'inboundDetail',
        component: null,
    },
]

export default inboundRoutes
