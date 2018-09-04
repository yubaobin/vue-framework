import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import filter from './filter'
import mixins from './mixins'
import api from './api'
import './plugins/element.js'

Vue.config.productionTip = false

filter.init()
mixins.init()

Vue.use(api)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
