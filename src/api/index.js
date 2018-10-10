import fetch from '@/utils/fetch'
import './mock'

export default {
  install (Vue) {
    Vue.prototype.api = {
      qrcode (params = {}) {
        Object.assign(params, { key: '69b57aca41f61fac9e18b22971d5fdc8' })
        return fetch('/qrcode/api', params, { method: 'get' })
      },
      test (params = {}) {
        console.log(params)
        return fetch('/test1', params, { method: 'post' })
      }
    }
  }
}
