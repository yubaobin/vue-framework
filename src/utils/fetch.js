/**
 * 封装请求
 */
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '../store/index'
import config from '@/config'
/* eslint-disable prefer-promise-reject-errors */
const instance = axios.create({
    method: 'post',
    timeout: 20000,
    headers: {
        Accept: '*',
        'Content-Type': 'application/json'
    }
})
// 拦截请求
instance.interceptors.request.use(
    function (req) {
        return req
    },
    function (err) {
        Message({ message: err, type: 'error' })
        return Promise.reject(err)
    }
)
// 拦截返回
instance.interceptors.response.use(
    function (res) {
        return res.data
    },
    function (err) {
        if (err.response) {
            switch (err.response.status) {
                case 401: // 返回 401 清除token信息并跳转到登录页面
                case 403:
                    Message({ message: '请重新登录', type: 'error' })
                    store.dispatch('user/logout').then(() => {
                        this.$router.replace({ name: 'Login' })
                    })
                    break
                case 500:
                    break
                default:
                    break
            }
        } else {
            Message({ message: err, type: 'error' })
        }
        return Promise.reject(err)
    }
)

export default async (url = '', params = {}, option = {}) => {
    if (!url) {
        return Promise.reject('params \'url\' not exist！')
    }
    const method = option.method || 'post'
    if (url.indexOf('http') !== 0) {
        const prefix = option.local ? '' : config.apiPath
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
        case 'download':
            return instance.post(url, params, {
                responseType: 'blob'
            })
        case 'postForm':
            return instance.post(url, qs.stringify(params), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        case 'postQuery':
            return instance.post(url, null, Object.assign(option, { params }))
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
