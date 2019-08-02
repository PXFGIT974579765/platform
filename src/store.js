import Vue from 'vue'
import Vuex from 'vuex'
import local from '@/lib/local'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: local.get('user') || {},
    access: local.get('access') || {},
  },
  getters: {
    user: state => {
      return state.user
    },
    access: state => {
      return state.access
    },
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
  },
})
