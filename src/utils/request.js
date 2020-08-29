/**
 * 封装自己的axios
 */
import axios from 'axios'
// 轻提示组件
import { Toast } from 'antd-mobile'
import { getToken } from '.'

// 创建axios实例
// 请求的基础地址
const BASE_URL = 'http://api-haoke-dev.itheima.net'
const MyAxios = axios.create({
  baseURL: BASE_URL
})

// 请求拦截器
// Add a request interceptor
// 发送请求之前会执行
MyAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log('发送请求之前会执行')
  Toast.loading('请求中...', 0)
  // 根据请求的url判断=》如果是/user开发（排除登录和注册）=》请求头添加token
  let rurl = config.url, whiteName = ['/user/registered', '/user/login']
  if (rurl.startsWith('/user') && !whiteName.includes(rurl)) {
    config.headers.authorization = getToken()
  }
  // console.log(config)

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
// 请求响应之后会执行
MyAxios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log('请求响应式之后会执行', response)
  // 关闭loading提示
  Toast.hide()
  // 保留需要的数据
  const { data: { status, description, body } } = response
  return {
    status,
    description,
    data: body
  }
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export { BASE_URL }

export default MyAxios