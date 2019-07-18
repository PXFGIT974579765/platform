import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index'
import Home from './views/Index/components/Home'
import App from './views/Index/components/App'
import News from './views/Index/components/News'
import New from './views/Index/components/New'

// 个人中心
import My from './views/Index/components/My'
import BaseInfo from './views/Index/components/My/components/BaseInfo'
import Score from './views/Index/components/My/components/Score'
import Sign from './views/Index/components/My/components/Sign'
import Level from './views/Index/components/My/components/Level'
import AddressList from './views/Index/components/My/components/AddressList'
import AddressEdit from './views/Index/components/My/components/AddressEdit'
import MyCoupon from './views/Index/components/My/components/MyCoupon'
import Complain from './views/Index/components/My/components/Complain'
import ComplainDetail from './views/Index/components/My/components/ComplainDetail'

// 跑腿
import ErrandLobby from './views/Errand/Lobby'
import ErrandOrder from './views/Errand/Order'
import ErrandDetail from './views/Errand/Detail'
import ErrandOrders from './views/Errand/Orders'

// 拼团
import GroupIndex from './views/Group/Index'
import GroupDetail from './views/Group/Detail'
import GroupSuccess from './views/Group/GroupSuccess'
import GroupFailure from './views/Group/GroupFailure'
import GroupOrder from './views/Group/Order'

// 订单
import OrderIndex from './views/Order/Index'
import GoodsOrder from './views/Order/components/GoodsOrder'
import ActiveOrder from './views/Order/components/ActiveOrder'
import GoodsOrderDetail from './views/Order/components/GoodsOrderDetail'
import ActiveOrderDetail from './views/Order/components/ActiveOrderDetail'
import GroupOrderList from './views/Order/components/GroupOrder'
import GroupOrderDetail from './views/Order/components/GroupOrderDetail'

// 钱包
import WalletIndex from './views/Wallet/Index'
import Recharge from './views/Wallet/components/Recharge'
import RechargeRecord from './views/Wallet/components/RechargeRecord'
import Cash from './views/Wallet/components/Cash'
import CashRecord from './views/Wallet/components/CashRecord'
import CoinLog from './views/Wallet/components/CoinLog'

// 配送中心
import Distribution from './views/Distribution/Index'

// 活动
import ActivityIndex from './views/Activity/Index'
import ActivityList from './views/Activity/List'
import ActivityDetail from './views/Activity/Detail'
import ActivityOrder from './views/Activity/Order'

Vue.use(Router)

// 个人中心
const myRouters = [
  {
    path: '/my/base-info',
    name: 'index/my/base-info',
    component: BaseInfo,
    meta: { title: '个人信息', keepAlive: false },
  },
  {
    path: '/my/score',
    name: 'index/my/score',
    component: Score,
    meta: { title: '个人积分' },
  },
  {
    path: '/my/sign',
    name: 'index/my/sign',
    component: Sign,
    meta: { title: '签到' },
  },
  {
    path: '/my/level',
    name: 'index/my/level',
    component: Level,
    meta: { title: '用户等级' },
  },
  {
    path: '/my/address-list',
    name: 'index/my/address-list',
    component: AddressList,
    meta: { title: '收货地址' },
  },
  {
    path: '/my/address-edit',
    name: 'index/my/address-edit',
    component: AddressEdit,
    meta: { title: '新建收货地址' },
  },
  {
    path: '/my/address-edit/:id',
    name: 'index/my/address-edit',
    component: AddressEdit,
    meta: { title: '修改收货地址' },
  },
  {
    path: '/my/coupon',
    name: 'index/my/coupon',
    component: MyCoupon,
    meta: { title: '我的优惠券' },
  },
  {
    path: '/my/complain',
    name: 'index/my/complain',
    component: Complain,
    meta: { title: '咨询投诉' },
  },
  {
    path: '/my/complain-detail/:id',
    name: 'index/my/complain-detail',
    component: ComplainDetail,
    meta: { title: '咨询投诉详情' },
  },
]

// 订单
const orderRouters = [
  {
    path: '/my/order-first',
    name: 'index/my/order-first',
    component: OrderIndex,
    meta: { title: '我的订单' },
  },
  {
    path: '/order/goods',
    name: '/order/goods',
    component: GoodsOrder,
    meta: { title: '商品订单' },
  },
  {
    path: '/order/goods-detail/:id',
    name: '/order/goods-detail',
    component: GoodsOrderDetail,
    meta: { title: '商品订单详情' },
  },
  {
    path: '/order/active',
    name: '/order/active',
    component: ActiveOrder,
    meta: { title: '活动订单' },
  },
  {
    path: '/order/active-detail/:id',
    name: '/order/active-detail',
    component: ActiveOrderDetail,
    meta: { title: '活动订单详情' },
  },
  {
    path: '/order/group',
    name: '/order/group',
    component: GroupOrderList,
    meta: { title: '拼团订单' },
  },
  {
    path: '/order/group-detail/:id',
    name: '/order/group-detail',
    component: GroupOrderDetail,
    meta: { title: '拼团订单详情' },
  },
]

// 评团
const group = [
  {
    path: '/group',
    name: 'group',
    component: GroupIndex,
  },
  {
    path: '/group/detail/:id',
    name: 'group/detail/:id',
    component: GroupDetail,
  },
  {
    path: '/group/order_success',
    name: 'group/order_success',
    component: GroupSuccess,
  },
  {
    path: '/group/order_failure',
    name: 'group/order_failure',
    component: GroupFailure,
  },
  {
    path: '/group/order/:id',
    name: 'group/order',
    component: GroupOrder,
  },
]

// 跑腿
const errand = [
  {
    path: '/errand',
    name: 'errand',
    redirect: { name: 'errand/lobby' },
  },
  {
    path: '/errand/lobby',
    name: 'errand/lobby',
    component: ErrandLobby,
    meta: { title: '跑腿大厅' },
  },
  {
    path: '/errand/order/:id',
    name: 'errand/order',
    component: ErrandOrder,
  },
  {
    path: '/errand/detail',
    name: 'errand/detail',
    component: ErrandDetail,
  },
  {
    path: '/errand/orders',
    name: 'errand/orders',
    component: ErrandOrders,
  },
]

const activity = [
  {
    path: '/activity',
    name: 'activity',
    component: ActivityIndex,
  },
  {
    path: '/activity/list/:id',
    name: 'activity/list',
    component: ActivityList,
  },
  {
    path: '/activity/detail',
    name: 'activity/detail',
    component: ActivityDetail,
  },
  {
    path: '/activity/order',
    name: 'activity/order',
    component: ActivityOrder,
  },
]

// 钱包
const walletRouters = [
  {
    path: '/my/wallet',
    name: '/my/wallet',
    component: WalletIndex,
    meta: { title: '我的钱包' },
  },
  {
    path: '/my/wallet/recharge',
    name: '/my/wallet/recharge',
    component: Recharge,
    meta: { title: '充值' },
  },
  {
    path: '/my/wallet/cash',
    name: '/my/wallet/cash',
    component: Cash,
    meta: { title: '提现' },
  },
  {
    path: '/my/wallet/recharge/record',
    name: '/my/wallet/recharge/record',
    component: RechargeRecord,
    meta: { title: '充值记录' },
  },
  {
    path: '/my/wallet/cash/record',
    name: '/my/wallet/cash/record',
    component: CashRecord,
    meta: { title: '提现记录' },
  },
  {
    path: '/my/wallet/coin-log',
    name: '/my/wallet/coin-log',
    component: CoinLog,
    meta: { title: '账户明细' },
  },
]

// 配送中心
const distribution = [
  {
    path: '/my/distribution',
    name: '/my/distribution',
    component: Distribution,
    meta: { title: '配送中心' },
  },
]
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'index/home' },
      component: Index,
      children: [
        {
          path: 'home',
          name: 'index/home',
          component: Home,
        },
        {
          path: 'app',
          name: 'index/app',
          component: App,
        },
        {
          path: 'my',
          name: 'index/my',
          component: My,
        },
        {
          path: 'news',
          name: 'index/news',
          component: News,
        },
        {
          path: 'news/:id',
          name: 'index/new',
          component: New,
        },
      ],
    },
    ...errand,
    ...group,
    ...activity,
    // 个人中心
    ...myRouters,
    // 订单
    ...orderRouters,
    // 钱包
    ...walletRouters,
    // 配送中心
    ...distribution,
  ],
})
