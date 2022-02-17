var gulp = require('gulp')
var fs = require('fs')
var series = require('gulp4-run-sequence').use(gulp)
var buildTask = require('./task/build')
var cssTask = require('./task/css')
var config = require('./config/index.js')
var build = function (opts) {
    return function () {
        return buildTask.build(Object.assign({}, opts, { message: 'build theme' }))
    }
}

var cssWrap = function (opts) {
    return function () {
        return cssTask.cssWrap(Object.assign({}, opts, { message: 'css wrap' }))
    }
}

var moveCss = function (opts) {
    return function () {
        return cssTask.moveCss(Object.assign({}, opts, { message: 'css move' }))
    }
}

exports.run = function (opts) {
    var theme = opts.theme
    if (theme) {
        gulp.task('build', build(opts))
        gulp.task('css-wrap', cssWrap(opts))
        gulp.task('move-css', moveCss(opts))
        return series('build', 'css-wrap', 'move-css')
    } else {
        try {
            var fromPath = config.themePath
            var buildList = []
            var cssWrapList = []
            var cssMoveList = []
            fs.readdirSync(fromPath).forEach(function (file, index) {
                var stats = fs.statSync(fromPath + '/' + file)
                if (stats.isDirectory() && file !== 'normal') {
                    var buildName = 'build' + (index + 1)
                    var cssWrapName = 'css-wrap' + (index + 1)
                    var cssMoveName = 'move-css' + (index + 1)
                    var buildOpt = Object.assign({}, opts, { theme: file })
                    gulp.task(buildName, build(buildOpt))
                    gulp.task(cssWrapName, cssWrap(buildOpt))
                    gulp.task(cssMoveName, moveCss(buildOpt))
                    buildList.push(buildName)
                    cssWrapList.push(cssWrapName)
                    cssMoveList.push(cssMoveName)
                }
            })
            gulp.task('build', function (cb) {
                return series(...buildList, cb)
            })
            return series('build', cssWrapList, cssMoveList)
        } catch (e) {
            console.log(e)
            process.exit(0)
        }
    }
}
