/**
 * 封装请求
 */
import axios from 'axios'
import config from '@/config'
import qs from 'qs'
const env = process.env.NODE_ENV || 'development'

/* eslint-disable prefer-promise-reject-errors */
let instance = axios.create({
  method: 'post',
  withCredentials: true,
  timeout: 6000,
  headers: {
    'Accept': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
    // 'Authorization': ''
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
  let prefixName = process.env.NODE_ENV === 'production' ? 'product' : 'default'
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
      return instance.post(url, qs.stringify(params), option)
    case 'put':
      return instance.put(url, qs.stringify(params), option)
    case 'patch':
      return instance.patch(url, qs.stringify(params), option)
    case 'delete':
      return instance.delete(url, {
        params: params
      })
    default:
      return Promise.reject(`unknown request method '${method}'`)
  }
}
