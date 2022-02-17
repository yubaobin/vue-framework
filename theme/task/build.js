var path = require('path')
var fs = require('fs')
var gulp = require('gulp')
var ora = require('ora')
var nop = require('gulp-nop')
var sass = require('gulp-sass')(require('sass'))
var autoprefixer = require('gulp-autoprefixer')
var cssmin = require('gulp-cssmin')
var config = require('../config')

exports.build = function (opts) {
    var stream
    var theme = opts.theme || config.theme || 'normal'
    var spin = ora(opts.message + ': ' + theme).start()
    var varsPath = config.elementPath + '/common/project-var.scss'
    var projectVas = config.themePath + '/' + theme + '/variables.scss'
    // 获取项目用的自定义变量覆盖elementui的变量
    try {
        fs.writeFileSync(varsPath, fs.readFileSync(projectVas), 'utf-8')
        stream = gulp
            .src([projectVas, path.resolve(config.elementPath, 'index.scss'), path.resolve(config.themePath + '/' + theme, 'build.scss')])
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(
                autoprefixer({
                    overrideBrowserslist: config.browsers,
                    cascade: false
                })
            )
            .pipe(config.minimize ? cssmin({ showLog: false }) : nop())
            .pipe(gulp.dest(path.resolve(process.cwd() + '/theme' + config.out + '/' + theme)))
            .on('end', function () {
                spin.succeed()
            })
        return stream
    } catch (e) {
        console.log(e)
        process.exit(0)
    }
}
