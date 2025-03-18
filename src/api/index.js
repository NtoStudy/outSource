import axios from 'axios'
import {useUserInfoStore} from '@/store/user.js'

const token = useUserInfoStore()?.token

const instance = axios.create({
  baseURL: 'http://192.168.43.174:8080',
  timeout: 10000,
  headers: {
    token: token || '',
  },
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
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
