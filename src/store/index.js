import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
Vue.use(Vuex)

const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

export default new Vuex.Store({
    modules,
    getters
})
