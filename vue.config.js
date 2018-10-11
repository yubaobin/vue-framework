const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '', dir)
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve('./src/styles/variables.less')
      ]
    })
}

module.exports = {
  baseUrl: process.env.baseUrl, // 项目的根路径, 默认: '/' 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径
  outputDir: process.env.outputDir, // 生成的环境构建文件的目录 在.env.xx 文件配置
  //, assetsDir: '' // 放置生成的静态资源 默认: ''
  filenameHashing: true, // false 来关闭文件名哈希
  //, pages: {} // 多页面配置
  devServer: {
    // host: 'localhost', // ip
    // port: 8080, // 端口
    // https: false,
    // hotOnly: false,
    // open: true,
    // errorOverlay: true,
    // notifyOnErrors: true,
    // proxy: 'http://' // 代理
    // or
    proxy: {
      '/qrcode': {
        target: 'http://apis.juhe.cn/qrcode',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/qrcode': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    // 别名
    config.resolve.alias.set('styles', resolve('src/styles'))
    config.resolve.alias.set('components', resolve('src/components'))
    config.resolve.alias.set('images', resolve('src/assets/images'))
    config.resolve.alias.set('iconfont', resolve('src/iconfont'))

    config.module.rule('svg').exclude.add(resolve('src/assets/svg'))
    config.module
      .rule('inline-svg')
      .test(/\.(svg)(\?.*)?$/)
      .exclude.add([resolve('src/assets/images')])
      .end()
      .include.add([resolve('src/assets/svg')])
      .end()
      .use('svg-inline-loader')
      .loader('svg-inline-loader')

    // less
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
  configureWebpack: (config) => {
    // 压缩时去掉console
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.uglifyOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.uglifyOptions.compress.pure_funcs = ['console.log']
    }
  }
}
