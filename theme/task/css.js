var path = require('path')
var gulp = require('gulp')
var ora = require('ora')
var fs = require('fs')
var del = require('del')
var cleanCSS = require('gulp-clean-css')
var cssWrap = require('gulp-css-wrap')
var concat = require('gulp-concat')
var urlAdjuster = require('gulp-css-url-adjuster')
var config = require('../config')

function moveCss (fromPath, toPath, theme) {
    var spin = ora('move css : ' + theme).start()
    del.sync(toPath)
    return gulp
        .src([fromPath])
        .pipe(gulp.dest(toPath))
        .on('end', function () {
            try {
                createJson(theme)
                generateFile()
            } catch (e) {
                console.log(e)
            }
            spin.succeed()
        })
}

function createJson (theme) {
    var savePath = config.saveThemePath + '/' + theme + '/config.json'
    var configPath = config.themePath + '/' + theme + '/config.json'
    var themeName = '未命名主题'
    var themeObj = {}
    try {
        var configTheme = fs.readFileSync(configPath, 'utf-8') // 获取主题配置
        themeObj = JSON.parse(configTheme)
        if (themeObj.name) {
            themeName = themeObj.name
        }
    } catch (e) {
        themeName = '未命名主题'
    }
    var saveJson = Object.assign({}, themeObj, { name: themeName, value: theme })
    try {
        fs.statSync(savePath)
        var file = fs.readFileSync(savePath, 'utf-8')
        var data = file ? JSON.parse(file) : ''
        if (data && typeof data === 'object') {
            data = Object.assign({}, data, saveJson)
        } else {
            data = saveJson
        }
        fs.writeFileSync(savePath, JSON.stringify(data, null, '\t'), function (err) {
            if (err) {
                throw err
            }
        })
    } catch (e) {
        fs.writeFileSync(savePath, JSON.stringify(saveJson, null, '\t'), function (err) {
            if (err) {
                throw err
            }
        })
    }
}

function generateFile () {
    var formPath = config.saveThemePath
    var files = fs.readdirSync(formPath)
    var resultJson = []
    files.forEach(function (file) {
        var stats = fs.statSync(formPath + '/' + file)
        if (stats.isDirectory()) {
            var jsonConfig = formPath + '/' + file + '/config.json'
            try {
                var readData = fs.readFileSync(jsonConfig)
                resultJson.push(JSON.parse(readData))
            } catch (e) {}
        }
    })
    fs.writeFileSync(formPath + '/theme.json', JSON.stringify(resultJson, null, '\t'), function (err) {
        if (err) {
            throw err
        }
    })
}

exports.cssWrap = function (opts) {
    var theme = opts.theme || config.theme || 'normal'
    var spin = ora(opts.message + ': ' + theme).start()
    var buildCssPath = path.resolve(process.cwd() + '/theme' + config.out + '/' + theme + '/build.css')
    var indexCssPath = path.resolve(process.cwd() + '/theme' + config.out + '/' + theme + '/index.css')
    return gulp
        .src([buildCssPath, indexCssPath])
        .pipe(
            urlAdjuster({
                replace: ['fonts/element-icons', '../../fonts/element-icons']
            })
        )
        .pipe(cssWrap({ selector: '.' + theme + '-theme' }))
        .pipe(concat('index.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.resolve(process.cwd() + '/theme/dist/' + theme)))
        .on('end', function () {
            spin.succeed()
        })
}

exports.moveCss = function (opts) {
    var theme = opts.theme || config.theme || 'normal'
    var fromPath = path.resolve(process.cwd() + '/theme/dist/' + theme + '/**')
    var toPath = path.resolve(process.cwd() + '/public/theme/' + theme)
    fs.access(toPath, function (err) {
        if (err) {
            // 不存在
            fs.mkdir(toPath, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    return moveCss(fromPath, toPath, theme)
                }
            })
        } else {
            // 存在
            return moveCss(fromPath, toPath, theme)
        }
    })
}
