import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
})

http.interceptors.request.use(
  config => {
    config.data = {
      ...config.data,
      sourceType: 4,
      sign: process.env.VUE_APP_API_SIGN,
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

export default http
