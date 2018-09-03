import fetch from "@/utils/fetch"

export default  {
  install(Vue) {
    Vue.prototype.api = {
      about(params) {
        return fetch('/about', params, {method: 'post'})
      }
    }
  }
}
