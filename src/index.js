/* eslint-disable global-require */
/* 使用扫描路径加载的方式挂载路由所以移除了 global-require 检查 */
import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import {
  resExtension,
  paramLogger,
  // singValidation,
} from '@cybereits/express-middlewares'

import {
  initClient,
} from '@cybereits/lib-es-client'

import env from '../config/env.json'

import dirReader from '../framework/dir_reader'

// ELK日志
import { sysLogger, logicLogger } from '../framework/logger'

global.sysLogger = sysLogger
global.logicLogger = logicLogger

// 索引数据库
const esClient = initClient('localhost')

global.esClient = esClient

const app = new Express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(resExtension)

app.use('/', cors({ origin: env.cors, optionsSuccessStatus: 200 }))

// api 文档
app.use('/', Express.static(path.resolve(__dirname, '../doc')))

// 记录日志
app.use('/', paramLogger(sysLogger))

// 加载路由文件
/* eslint-disable-next-line */
app.use('/http', dirReader(path.resolve(__dirname, './routes_public/')).map(filepath => require(filepath).default))

// 加载静态资源
app.use('/static', Express.static(path.resolve(__dirname, '../static')))

// 404 Not Found
app.use('*', (req, res) => res.sendStatus(404))

app.listen(env.port, () => {
  sysLogger.info(`server start on port: ${env.port}`)
})
