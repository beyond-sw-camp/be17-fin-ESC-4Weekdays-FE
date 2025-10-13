import PurchaseOrderList from '@/views/purchase/PurchaseOrderList.vue'
import PurchaseOrderCreate from '@/views/purchase/PurchaseOrderCreate.vue'

const purchaseOrderRoutes = [
  {
    path: '/purchase',
    name: 'purchaseOrder',
    component: PurchaseOrderList,
  },
  {
    path: '/purchase/create',
    name: 'purchaseOrderCreate',
    component: PurchaseOrderCreate,
  },
]

export default purchaseOrderRoutes
