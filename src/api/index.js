import axios from 'axios'
import {useUserInfoStore} from '@/store/user.js'


const instance = axios.create({
  baseURL: 'http://192.168.43.174:8080',
  timeout: 100000,

})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const userStore = useUserInfoStore()
    if (userStore?.token) {
      config.headers.token = userStore.token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default instance
