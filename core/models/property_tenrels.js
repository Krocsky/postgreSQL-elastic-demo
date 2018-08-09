import { INTEGER, DATE, STRING, ENUM } from 'sequelize'
import withDateNoTz from 'sequelize-date-no-tz-postgres'
import { defineModel } from '../../framework/database'

// 自定义字段多租户表
export const PropertyTenrels = defineModel(
  'property_tenrels', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ref_id: {
      type: INTEGER,
      allowNull: false,
      comment: '表外键',
    },
    property_id: {
      type: STRING,
      allowNull: false,
      comment: '自定义字段id',
    },
    value: {
      type: STRING,
      allowNull: false,
      comment: '字段值',
    },
    property_name: {
      type: STRING,
      allowNull: false,
      comment: '表类型',
    },
    created_at: {
      type: DATE,
      allowNull: true,
    },
    updated_at: {
      type: DATE,
      allowNull: true,
    },
    deleted_at: {
      type: DATE,
      allowNull: true,
    },
  }
)
