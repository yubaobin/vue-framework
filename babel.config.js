module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'entry' // 不支持es6浏览器
    }]
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
