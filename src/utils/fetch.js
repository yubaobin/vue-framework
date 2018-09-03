/**
 * 封装请求
 */
import axios from 'axios'
import config from '@/config'
import qs from 'qs'
const env = process.env.NODE_ENV || 'development'

let instance = axios.create({
  method: 'post',
  withCredentials: true,
  timeout: 6000,
  headers: {
    'Accept': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  }
})
// 拦截请求
instance.interceptors.request.use(function (req) {
  return config.requestInterceptor ? config.requestInterceptor(req) : req
}, function (err) {
  return Promise.reject(err)
})
// 拦截返回
instance.interceptors.response.use(function (res) {
  return config.responseInterceptor ? config.responseInterceptor(res) : res.data
}, function (err) {
  return Promise.reject(err)
})

export default async (url = '', params = {}, option = {}) => {
  if (!url) {
    return Promise.reject(`params 'url' not exist！`)
  }
  let method = option.method || 'post'
  let prefixName = option.prefixName || 'default'
  if (url.indexOf('http') !== 0) {
    let prefix = config.apiPath[prefixName]
    if (typeof prefix === 'string') {
      url = prefix + url
    } else if (typeof prefix === 'object') {
      url = prefix[env] + url
    }
  }
  switch (method) {
    case 'get':
      return instance.get(url, {
        params: params
      })
    case 'post':
    case 'put':
    case 'patch':
      return instance.post(url, qs.stringify(params), option)
    default:
      return Promise.reject(`unknown request method '${method}'`)
  }
}
