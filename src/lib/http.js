import axios from 'axios'
import store from '@/store'
import router from '@/router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  headers: { Authorization: process.env.VUE_APP_AUTHORIZATION },
})

http.interceptors.request.use(
  config => {
    const options = {
      sourceType: 4,
      // openKey: process.env.VUE_APP_OPENKEY,
      // openSecret: process.env.VUE_APP_OPENSECRET,
      sign: process.env.VUE_APP_API_SIGN,
      access_token: store.getters.access.access_token,
    }

    config.data = {
      ...config.data,
      ...options,
    }
    config.params = {
      ...config.params,
      ...options,
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
