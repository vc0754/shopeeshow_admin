import axios from 'axios'
import promise from 'es6-promise'

promise.polyfill()

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
// axios.defaults.baseURL = (process.env.NODE_ENV === 'development' ? 'http://localhost:7001/' : 'http://net.taoke8.cn:8080/')

axios.defaults.baseURL = 'http://service.shopeeshow.com'
// axios.defaults.baseURL = 'http://servicetest.shopeeshow.com'

axios.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(res => {
  if (res.data.ErrorCode !== 200) return Promise.reject(res)
  if (res.status !== 200 && res.status !== 201 && res.status !== 204) return Promise.reject(res)
  return res.data
}, error => {
  return Promise.reject(error.response.data ? error.response.data : error)
})

export const Axios = axios

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: axios })
  }
}