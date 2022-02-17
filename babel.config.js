const plugins = []
if (['production', 'prod'].includes(process.env.NODE_ENV)) {
    // 去掉conosle
    plugins.push('transform-remove-console')
}
module.exports = {
    presets: [
        [
            '@vue/cli-plugin-babel/preset',
            {
                useBuiltIns: 'entry' // 不支持es6浏览器
            }
        ]
    ],
    plugins: [
        ...plugins,
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ]
    ]
}
