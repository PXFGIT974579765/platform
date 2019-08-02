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
      // openId: store.getters.user.openId,
      // userId: store.getters.user.id,
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
            headers: { Authorization: store.getters.access.access_token },
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

axios.interceptors.response.use(
  response => {
    if (response.data.resp_code === 401) {
      store.dispatch('clearUser')
      router.push('/')
      throw Error('401: unauthorized')
    }
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)

export default http
