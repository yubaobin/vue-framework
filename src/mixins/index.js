import Vue from 'vue'
import config from '../config'
export default {
  init () {
    Vue.mixin({
      methods: {
        setTitle (title) {
          let meta = this.$route && this.$route.meta ? this.$route.meta : {}
          document.title = title || meta.title || config.appName || ''
        }
      }
    })
  }
}
