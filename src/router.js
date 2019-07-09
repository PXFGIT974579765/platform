import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Home from './views/Index/components/Home'
import App from './views/Index/components/App'
import My from './views/Index/components/My'
import BaseInfo from './views/Index/components/My/BaseInfo'

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
      ],
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
      // 个人信息
      path: '/my/base-info',
      name: 'index/my/base-info',
      component: BaseInfo,
    },
  ],
})
