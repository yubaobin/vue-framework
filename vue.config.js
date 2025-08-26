const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const theme = isProduction ? 'normal' : process.env.VUE_APP_theme || 'normal'
const { name } = require('./package.json')
function resolve (dir) {
    return path.join(__dirname, '', dir)
}

// const publicPath = (process.env.NODE_ENV === 'production' ? 'https://qiankun.umijs.org/' : 'http://localhost:8081') + process.env.VUE_APP_publicPath

const publicPath = process.env.VUE_APP_publicPath

module.exports = {
    publicPath: process.env.VUE_APP_publicPath,
    outputDir: process.env.VUE_APP_outputDir,
    lintOnSave: false,
    filenameHashing: isProduction,
    productionSourceMap: !isProduction,
    transpileDependencies: [/ux-ui/],
    devServer: {
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
        // proxy: {
        //     '/': {
        //         target: 'http://localhost:8080', // 接口的域名或ip
        //         ws: false, // 是否代理websockets
        //         secure: false, // 如果是https接口，需要配置这个参数
        //         changeOrigin: false, // 如果接口跨域，需要进行这个参数配置
        //         pathRewrite: {
        //             // pathRewrite 来重写地址，将前缀 '/api' 转为 ''
        //             '^/': ''
        //         }
        //     }
        // }
    },
    configureWebpack: {
        devtool: isProduction ? undefined : 'source-map',
        externals: {
            echarts: 'echarts'
        },
        output: {
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`
        }
    },
    chainWebpack: (config) => {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        const fontRule = config.module.rule('fonts')
        fontRule.uses.clear()
        fontRule
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'fonts/[name].[hash:8].[ext]',
                publicPath
            })
            .end()
        const imgRule = config.module.rule('images')
        imgRule.uses.clear()
        imgRule
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'img/[name].[hash:8].[ext]',
                publicPath
            })
            .end()
        // 别名
        config.resolve.alias.set('styles', resolve('src/styles'))
        config.resolve.alias.set('components', resolve('src/components'))
        config.resolve.alias.set('images', resolve('src/assets/images'))
        config.when(isProduction, (diffConfig) => {
            diffConfig
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [
                    {
                        inline: /runtime\..*\.js$/
                    }
                ])
                .end()
            diffConfig.optimization.splitChunks({
                // 提取公共代码并合并
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial'
                    },
                    elementUI: {
                        name: 'chunk-elementUI',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'),
                        minChunks: 3,
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            })
        })
    },
    css: {
        extract: isProduction ? { ignoreOrder: true } : false,
        sourceMap: !isProduction,
        loaderOptions: {
            sass: {
                prependData: `@import "~styles/theme/${theme}/variables.scss";`
            }
        }
    }
}
