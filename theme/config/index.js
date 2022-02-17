var path = require('path')
var pkg = {}
try {
    pkg = require(path.resolve(process.cwd(), 'package.json'))
} catch (err) {}

var config = Object.assign(
    {
        theme: 'normal',
        browsers: ['ie > 10', 'last 2 versions'],
        out: '/out',
        minimize: false
    },
    pkg['normal-theme']
)
// element入口文件
exports.elementPath = path.resolve(process.cwd() + '/theme/element-chalk/src')
// 需要编译样式的路径入口
exports.themePath = path.resolve(process.cwd() + '/src/styles/theme/')
// 样式输出
exports.out = config.out
exports.minimize = config.minimize
exports.browsers = config.browsers
exports.components = config.components
exports.theme = config.theme
exports.name = config.name
exports.saveThemePath = path.resolve(process.cwd() + '/public/theme')
