import Sequelize, { INTEGER } from 'sequelize'
export { Op }
from 'sequelize'
import env from '../../config/env'

const sequelize = new Sequelize(env.db.database, env.db.user, env.db.pwd, {
  host: env.db.host,
  port: env.db.port,
  dialect: 'postgres',
  logging: false,
  freezeTableName: true,
  operatorsAliases: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

/**
 * 定义模型
 * @param {string} table_name 表名
 * @param {object} schema 表定义
 * @param {object} options 配置
 */
export function defineModel(table_name, schema, options) {
  let basicModel = {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  }

  let basicOptions = {
    underscore: true,
    timestamps: false,
    tableName: table_name,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true, // 保留 createAt deleteAt updateAt
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true, // 逻辑删除
  }

  return sequelize.define(table_name, Object.assign(basicModel, schema), Object.assign(basicOptions, options))
}

export default sequelize
