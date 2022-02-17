import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store/index'
import directive from './directive'
import filter from './filter'
import mixins from './mixins'
import api from './api'
import fetch from '@/utils/fetch'
// iconfont
import '@/assets/iconfont/iconfont'
// svg组件
import SvgIcon from 'components/svg-icon'
import VueBus from 'vue-bus'
// 监控组件
import MonitorCom from 'components/monitor-com'
import ImgCell from 'components/img-cell/index'
import FileUpload from 'components/file-upload'
import ImgUpload from 'components/img-upload'
// moment插件
import moment from 'vue-moment'
import SystemDict from '@/plugins/system-dict/index.js'
import StaticDict from '@/utils/dict/index'
import RemoteDict from '@/utils/dict/remote'
import './plugins/element-ui/index.js'

// css
import './styles/lib/transition.scss'
import './reset-css'
import './styles/header-search.scss'
import './styles/layout.scss'
import './styles/tags-view.scss'
import './styles/common.scss'
import './styles/login.scss'
import './styles/view.scss'
import './styles/width-img/index.scss'

// 认证
import './auth'
Vue.config.productionTip = false

directive.init()
filter.init()
mixins.init()

Vue.component(SvgIcon.name, SvgIcon)
Vue.component(MonitorCom.name, MonitorCom)
Vue.component(ImgCell.name, ImgCell)
Vue.component(FileUpload.name, FileUpload)
Vue.component(ImgUpload.name, ImgUpload)
Vue.use(moment)
Vue.use(VueBus)
Vue.use(SystemDict, {
    staticDict: StaticDict,
    remote: RemoteDict
})

// 全局引入api
Vue.prototype.api = api
Vue.prototype.$fetch = fetch

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
