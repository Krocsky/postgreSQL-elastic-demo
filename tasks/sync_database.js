require('babel-register')
const path = require('path')
const dirReader = require('../framework/dir_reader')
const sequelize = require('../framework/database').default

dirReader(path.resolve(__dirname, '../core/models/'))
  // 扫描模型定义并加载 以同步其 schema 至数据库
  // eslint-disable-next-line
  .map(_path => require(_path))

sequelize
  .sync()
  // .sync({ force: false })
  .then(() => {
    console.log('finished')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(-1)
  })
