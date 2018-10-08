/**
 *  由于某些组件不兼容ie9
 *  element UI 按需加载
 *  在README.md 或者 官网可以看到
 */
import Vue from 'vue'
import { Form, FormItem, Input, Button, ButtonGroup } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(ButtonGroup)
