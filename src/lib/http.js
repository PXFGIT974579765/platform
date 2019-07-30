import axios from 'axios'

const http = axios.create({
  //baseURL: 'http://j24i562194.wicp.vip',
  baseURL: 'http://47.99.78.52:1119/api-wxmp/',
})

export default http
