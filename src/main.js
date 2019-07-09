import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'

import '@/assets/styles/base.less'

import App from './App.vue'
import router from './router'
import store from './store'
import VueWechatTitle from 'vue-wechat-title'

Vue.use(Vant)
Vue.use(VueWechatTitle)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
