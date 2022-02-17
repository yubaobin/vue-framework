const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const theme = isProduction ? 'normal' : process.env.VUE_APP_theme || 'normal'
function resolve (dir) {
    return path.join(__dirname, '', dir)
}

module.exports = {
    publicPath: process.env.VUE_APP_publicPath,
    outputDir: process.env.VUE_APP_outputDir,
    lintOnSave: 'error',
    filenameHashing: isProduction,
    productionSourceMap: !isProduction,
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:8080', // 接口的域名或ip
                ws: false, // 是否代理websockets
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: false, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    // pathRewrite 来重写地址，将前缀 '/api' 转为 ''
                    '^/': ''
                }
            }
        }
    },
    configureWebpack: {
        devtool: isProduction ? undefined : 'source-map',
        externals: {
            echarts: 'echarts'
        }
    },
    chainWebpack: config => {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        // 别名
        config.resolve.alias.set('styles', resolve('src/styles'))
        config.resolve.alias.set('components', resolve('src/components'))
        config.resolve.alias.set('images', resolve('src/assets/images'))
        // 添加flash模块
        config.module
            .rule('swf')
            .test(/\.(mp4|flv|swf)(\?v=[0-9]\.[0-9]\.[0-9])?$/)
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'swf/[name].[hash:8].[ext]'
            })
        config.when(isProduction, diffConfig => {
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
