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
import './public-path'
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
import UxUi from 'ux-ui'
import 'ux-ui/packages/theme-chalk/src/index.scss'

Vue.use(UxUi)
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

let instance = null

let originFn = document.body.appendChild.bind(document.body)

function redirectPopup (container) {
    // 子应用中需要挂载到子应用的弹窗的className，用作标记
    // const editPopup = 'el-dialog__wrapper story-para-edit-popup'
    const whiteList = ['el-select-dropdown', 'el-popper', 'el-dialog__wrapper']

    // 保存原有document.body.appendChild方法
    originFn = document.body.appendChild.bind(document.body)

    // 重写appendChild方法
    document.body.appendChild = (dom) => {
        // 根据标记，来区分是否用新的挂载方式
        if (whiteList.some((item) => dom.className.indexOf(item) > -1)) {
            container.querySelector('#app').appendChild(dom)
        } else {
            originFn(dom)
        }
    }
}

function render (props = {}) {
    const { container } = props

    if (window.__POWERED_BY_QIANKUN__) {
        redirectPopup(container)
    }

    instance = new Vue({
        router,
        store,
        render: (h) => h(App),
        mounted () {
            if (window.__POWERED_BY_QIANKUN__) {
                this.$onGlobalStateChange((newVal, oldVal) => {
                    console.log('pc-onGlobalStateChange', newVal.subState?.data?.name)
                })
            }
        }
    }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

export async function bootstrap () {
    console.log('[vue] vue app bootstraped')
}
export async function mount (props) {
    console.log('[vue] props from main framework', props)
    Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange
    Vue.prototype.$setGlobalState = props.setGlobalState
    render(props)
}
export async function unmount () {
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
    document.body.appendChild = originFn
}
export default instance
