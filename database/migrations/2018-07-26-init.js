'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      //loan_personal_users
      queryInterface.createTable('loan_personal_users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_name: {
          type: Sequelize.STRING(30),
          allowNull: false,
          comment: '用户名',
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: '手机号',
        },
        block_address: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: '手机号',
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        },
        deleted_at: {
          type: Sequelize.DATE
        },
      }, {
        comment: '贷款个人用户',
      }),
      //custom_property_defs
      queryInterface.createTable('custom_property_defs', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: '字段名',
        },
        table_type: {
          type: Sequelize.ENUM('loan_personal_users'),
          allowNull: false,
          comment: '角色id',
        },
        allow_null: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          comment: '是否为空',
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        },
        deleted_at: {
          type: Sequelize.DATE
        },
      }, {
        comment: '自定义字段定义表',
      }),
      //property_tenrels
      queryInterface.createTable('property_tenrels', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        ref_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: '外键id',
        },
        property_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: '字段id',
        },
        value: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: '字段值',
        },
        property_name: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: '字段名【冗余字段方便查询】',
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        },
        deleted_at: {
          type: Sequelize.DATE
        },
      }, {
        comment: '自定义字段多租户表',
      }),
    ]
  },
  down: (queryInterface, Sequelize) => {}
}
