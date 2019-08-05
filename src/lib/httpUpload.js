import axios from 'axios'
import store from '@/store'
// import router from '@/router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
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
    return response
  },
  function(error) {
    if (error.response.status === 401) {
      // TODO: remove comment
      // store.dispatch('clearUser')
      // router.push('/')
    }
  }
)

export default http
