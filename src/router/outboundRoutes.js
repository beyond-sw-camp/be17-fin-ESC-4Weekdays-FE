import OutboundList from '@/views/outbound/OutboundList.vue'
import OutboundDetail from '@/views/outbound/OutboundDetail.vue'
import OutboundCreate from '@/views/outbound/OutboundCreate.vue'

export default [
  {
    path: '/outbound',
    name: 'OutboundList',
    component: OutboundList,
  },
  {
    path: '/outbound/create',
    name: 'OutboundCreate',
    component: OutboundCreate,
  },
  {
    path: '/outbound/:id',
    name: 'OutboundDetail',
    component: OutboundDetail,
    props: true, // id를 props로 전달 (inbound 구조 동일)
  },
]
