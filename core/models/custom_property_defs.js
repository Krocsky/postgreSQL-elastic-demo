import { INTEGER, DATE, BOOLEAN, ENUM, STRING } from 'sequelize'
import { defineModel } from '../../framework/database'

// 字段定义表
export const CustomPropertyDefs = defineModel(
  'custom_property_defs', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      comment: '字段名称',
    },
    table_type: {
      type: ENUM('loan_personal_users'),
      allowNull: false,
      comment: '表类型',
    },
    allow_null: {
      type: BOOLEAN,
      allowNull: false,
      comment: '是否可空',
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
