/**
 * 封装请求
 */
import axios from 'axios'
import config from '@/config'
import utils from './index'
/* eslint-disable prefer-promise-reject-errors */
let instance = axios.create({
  method: 'post',
  withCredentials: true,
  timeout: 20000,
  headers: {
    'Accept': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
    // 'Authorization': ''
  }
})
// 拦截请求
instance.interceptors.request.use(function (req) {
  const token = utils.getAccessToken()
  if (token) {
    req.headers.token = token
  }
  return config.requestInterceptor ? config.requestInterceptor(req) : req
}, function (err) {
  return Promise.reject(err)
})
// 拦截返回
instance.interceptors.response.use(function (res) {
  return config.responseInterceptor ? config.responseInterceptor(res) : res.data
}, function (err) {
  if (err.response) {
    switch (err.response.status) {
      case 401: // 返回 401 清除token信息并跳转到登录页面
      case 403:
        break
      case 500:
        break
      default:
        break
    }
  } else {
    return Promise.reject(err)
  }
})

export default async (url = '', params = {}, option = {}) => {
  if (!url) {
    return Promise.reject(`params 'url' not exist！`)
  }
  let method = option.method || 'post'
  if (url.indexOf('http') !== 0) {
    let prefix = config.apiPath
    if (typeof prefix === 'string') {
      url = prefix + url
    }
  }
  switch (method) {
    case 'get':
      return instance.get(url, {
        params: params
      })
    case 'upload':
      return instance.post(url, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    case 'post':
      return instance.post(url, params, option)
    case 'put':
      return instance.put(url, params, option)
    case 'patch':
      return instance.patch(url, params, option)
    case 'delete':
      return instance.delete(url, {
        params: params
      })
    default:
      return Promise.reject(`unknown request method '${method}'`)
  }
}
