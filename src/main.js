// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import './mobile'
import Icon from 'vue-awesome/components/Icon.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// import the main css file
require('./main.css')

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
// user global component
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
