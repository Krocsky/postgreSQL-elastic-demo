import { STRING } from 'sequelize'
import sequelize from '../../framework/database'

// 禁止使用
export const SequelizeMeta = sequelize.define(
  'SequelizeMeta',
  {
    name: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    comment: '数据库迁移记录表（业务无关，禁止使用，是 Sequelize ORM 的表）',
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  },
)