import axios from 'axios'
import store from '@/store'
import router from '@/router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
})

http.interceptors.request.use(
  config => {
    const options = {
      sourceType: 4,
      // openKey: process.env.VUE_APP_OPENKEY,
      // openSecret: process.env.VUE_APP_OPENSECRET,
      sign: process.env.VUE_APP_API_SIGN,
      access_token: store.getters.access.access_token,
      openId: store.getters.user.openId,
      userId: store.getters.user.id,
    }

    switch (config.method) {
      case 'get':
        config.params = {
          ...config.params,
          ...options,
        }
        break
      case 'post':
        if (store.getters.access.access_token) {
          config.headers = {
            ...config.headers,
            Authorization: 'bearer' + store.getters.access.access_token,
          }
        }
        config.data = {
          ...config.data,
          ...options,
        }
        break
    }

    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    return response
  },
  function(error) {
    if (error.response.status === 401) {
      store.dispatch('clearUser')
      router.push('/')
    }
  }
)

export default http
