import config from '@/config'
import { camelCase, firstLowerCase } from '@/utils'
if (config.useMock) {
    require('./mock')
}
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\/index\.\w+$/, '$1')
    const changeName = firstLowerCase(camelCase(moduleName))
    const value = modulesFiles(modulePath)
    if (value.default) {
        modules[changeName] = value.default
    }
    return modules
}, {})
export default modules
