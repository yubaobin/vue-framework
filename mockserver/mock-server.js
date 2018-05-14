const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const config = require('../config')
const loadModule = require('./load-module')
const mockPort = 10086
const mockServer =  function () {
  let router = express.Router()
  let app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(cookieParser())

  router.all('*', function (req, res, next) {
    let urlInfo = req._parsedUrl
    let pathName = urlInfo.pathname
    let lastIndex = pathName.lastIndexOf('/') + 1
    let dirPath = pathName.substring(0, lastIndex).replace(/\/.*api/, '')
    let moduleName = pathName.substring(lastIndex).replace('&', '')
    let modules = loadModule(path.join(__dirname, '../src/api/mock' + dirPath))
    let module = modules[moduleName]
    res.header("Content-Type", "application/json; charset=utf-8");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.cookie('TestCookie', 1, {maxAge: 30 * 60 * 1000})
    if (module && typeof module === 'function') {
      res.end(JSON.stringify(module(req, res, next)))
    } else {
      res.end('{"ret":"error","code":"-1","msg":"模块' + moduleName + '不存在,","data":""}')
    }
  })

  app.use('/', router)
  app.listen(mockPort, function () {
    console.log('Mock服务启动成功...')
  })
}

mockServer()

