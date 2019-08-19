import axios from 'axios'
import store from '@/store'
import router from '@/router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  // withCredentials: true,
})

http.interceptors.request.use(
  config => {
    config.headers = {
      ...config.headers,
      Authorization: 'bearer' + store.getters.access.access_token,
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    if (!response.data) {
      throw new Error('网络开小差了')
    }
    return response
  },
  error => {
    if (error.response && error.response.status === 401) {
      store.dispatch('clearUser')
      router.push('/')
    }
  }
)

export default http
