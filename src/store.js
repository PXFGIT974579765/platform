import Vue from 'vue'
import Vuex from 'vuex'
import local from '@/lib/local'
import { isIos } from '@/lib/agent'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: local.get('user') || {},
    access: local.get('access') || {},
    wechatSignUrl: '', // 微信签名Url，ios 和 android 不一样
  },
  getters: {
    user: state => {
      return state.user
    },
    access: state => {
      return state.access
    },
    wechatSignUrl: state => state.wechatSignUrl,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      local.set('user', payload)
    },
    setAccess(state, payload) {
      state.access = payload
      local.set('access', payload)
    },
    clearUser(state) {
      state.user = {}
      state.access = {}
      local.remove('user')
      local.remove('access')
    },
    setWechatSignUrl(state, wechatSignUrl) {
      // 关键点
      // IOS仅记录第一次进入页面时的URL
      // IOS微信切换路由实际URL不变，只能使用第一进入页面的URL进行签名
      if (isIos() && state.wechatSignUrl !== '') {
        return
      }
      state.wechatSignUrl = wechatSignUrl
    },
  },
  actions: {
    setUser(context, data) {
      context.commit('setUser', data)
    },
    setAccess(context, data) {
      context.commit('setAccess', data)
    },
    clearUser(context) {
      context.commit('clearUser')
    },
    setWechatSignUrl(context, data) {
      context.commit('setWechatSignUrl', data)
    },
  },
})
