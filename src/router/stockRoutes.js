import StockList from "@/views/stock/StockList.vue";
import StockDetail from "@/views/stock/StockDetail.vue";

const stockList = [
    {
        path: '/2',
        name: 'stockList',
        component: StockList,
    },
    {
        path: '/stock/detail',
        name: 'stockDetail',
        component: StockDetail,
    },
]

export default stockList
