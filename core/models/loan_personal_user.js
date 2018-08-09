import { INTEGER, DATE, STRING } from 'sequelize'
import { defineModel } from '../../framework/database'

// 个人用户
export const LoanPersonalUsers = defineModel(
  'loan_personal_users', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: STRING,
      allowNull: false,
      comment: '用户名',
    },
    phone: {
      type: STRING,
      allowNull: false,
      comment: '手机号',
    },
    block_address: {
      type: STRING,
      allowNull: false,
      comment: '区块地址',
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
