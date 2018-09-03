const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '', dir)
}

module.exports = {
  baseUrl: '/', // 项目的根路径, 默认: '/' 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径
  outputDir: 'dist', // 生成的生产环境构建文件的目录
  //, assetsDir: '' // 放置生成的静态资源 默认: ''
  filenameHashing: true, // false 来关闭文件名哈希
  //, pages: {} // 多页面配置
  devServer: {
  // host: 'localhost', // ip
  // port: 8080, // 端口
  // https: false,
  // hotOnly: false,
  // autoOpenBrowser: false,
  // errorOverlay: true,
  // notifyOnErrors: true,
  // proxy: 'http://' // 代理
  // or
  // proxy: {
  //  '/api': {
  //    target: '<url>',
  //    ws: true,
  //    changeOrigin: true
  //  },
  //  '/foo': {
  //    target: '<other_url>'
  //  }
  // }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('styles', resolve('src/styles'))
    config.module.rule('eslint').uses.clear()
    config.module.rule('js').exclude.add(resolve('src/assets/map'))

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
  }
}
