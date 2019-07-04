import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import App from './views/Index/components/App'
import My from './views/Index/components/My'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'app',
          component: App,
        },
        {
          path: 'my',
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
  ],
})
