import 'babel-polyfill'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
// 引入vuex
import store from './store'
// 引入mint ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// filter
import filter from './filter'
// mixins
import mixins from './mixins'

// 引入移动端适配
import 'lib-flexible/flexible.js'

Vue.config.productionTip = false

// 配置axios
Vue.use(VueAxios, axios);

// 引入Mint ui
Vue.use(Mint);


filter.init()
mixins.init()



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

