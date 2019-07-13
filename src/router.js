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
import OrderFirst from './views/Index/components/My/components/OrderFirst'
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

Vue.use(Router)

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
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About'),
    },
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
      path: '/my/order-first',
      name: 'index/my/order-first',
      component: OrderFirst,
      meta: { title: '我的订单' },
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
  ],
})
