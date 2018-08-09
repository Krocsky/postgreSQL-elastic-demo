import { LoanPersonalUsers } from '../models/loan_personal_user'
import { CustomPropertyDefs } from '../models/custom_property_defs'
import { PropertyTenrels } from '../models/property_tenrels'
import sequelize from '../../framework/database'
// import randomName from 'random-name'
import randomSkill from 'chinese-random-skill'
import randomName from 'chinese-random-name'
import { createOrUpdateDocument, searchByCustomProperty } from '@cybereits/lib-es-client'

import Fakerator from 'fakerator'
const fakerator = Fakerator('de-DE')

import nodeEth from 'node-eth-address'

const Op = sequelize.Op

/**
 * 创建用户，前提自定义字段都是string
 * @param { STRING } userName 用户名
 * @param { STRING } phone 手机号
 * @param { STRING } blockAddress 区块地址 
 * @param { STRING } otherName 别名 
 * @param { STRING } salary 薪资 
 */
export function create(bodyArray) {
  sequelize.transaction(async function (rollback) {
    // 首先创建用户
    let user = await LoanPersonalUsers.create({
      user_name: bodyArray.userName,
      phone: bodyArray.phone,
      block_address: bodyArray.blockAddress,
    }, { transaction: rollback })

    let tenrelsArr = []
    for (const key in bodyArray) {
      const element = bodyArray[key]
      if (key.match(/^-{0,1}\d+$/)) {
        let model = { ref_id: null, property_id: null, value: '', property_name: '预留' }
        model.ref_id = user.id
        model.property_id = key
        model.value = element
        tenrelsArr.push(model)
      }
    }

    await PropertyTenrels.bulkCreate(tenrelsArr, { transaction: rollback })
  })
}

/**
 * 获取用户信息
 * @param { INT } userId 用户id
 */
export async function getUserInfo(userId) {

  let user = await LoanPersonalUsers.findOne({
    where: {
      id: userId,
    },
    attributes: ['id', 'user_name', 'phone', 'block_address'],
    raw: true,
  })
  if (!user) {
    throw new Error('用户不存在')
  }

  // 获取自定义字段
  let customerPropertiesIds = await CustomPropertyDefs.findAll({
    where: {
      table_type: LoanPersonalUsers.getTableName(),
    },
    attributes: [
      ['id', 'property_id'],
    ],
    raw: true,
  })

  // 获取自定义字段值
  let customValues = await PropertyTenrels.findAll({
    where: {
      ref_id: user.id,
      [Op.or]: customerPropertiesIds,
    },
    attributes: ['property_id', 'value'],
    raw: true,
  })

  // 将拿到的自定义字段信息【字段==>值】，拼到返回的object中
  for (const row of customValues) {
    user[row.property_id] = row.value
  }

  return user
}

/**
 * 获取所有用户信息
 */
export async function getAllUserInfo() {
  let userResult = []
  let users = await LoanPersonalUsers.findAll({
    offset: 100,
    limit: 50,
    attributes: ['id', 'user_name', 'phone', 'block_address'],
    raw: true,
  })

  // 获取自定义字段
  let customerPropertiesIds = await CustomPropertyDefs.findAll({
    where: {
      table_type: LoanPersonalUsers.getTableName(),
    },
    attributes: [
      ['id', 'property_id'],
    ],
    raw: true,
  })

  for (const user of users) {
    // 获取自定义字段值
    let customValues = await PropertyTenrels.findAll({
      where: {
        ref_id: user.id,
        [Op.or]: customerPropertiesIds,
      },
      attributes: ['property_id', 'value'],
      raw: true,
    })

    // 将拿到的自定义字段信息【字段==>值】，拼到返回的object中
    for (const row of customValues) {
      user[row.property_id] = row.value
    }
    userResult.push(user)
  }

  return userResult
}

/**
 * 9 - 30之间随机获取该整数值的用户
 */
export async function getRandomUserInfo() {
  let userResult = []
    // 从9 - 30之间取一个随机数，作为获取的用户数
  let randomIds = []
  let randomCount = Math.floor(Math.random() * (30 - 9 + 1)) + 9

  for (let index = 0; index < randomCount; index++) {
    let userId = Math.floor(Math.random() * (10000 - 1 + 1)) + 1
    randomIds.push(userId)
  }

  let users = await LoanPersonalUsers.findAll({
    where: {
      id: {
        [Op.or]: randomIds,
      },
    },
    attributes: ['id', 'user_name', 'phone', 'block_address'],
    raw: true,
  })

  // 获取自定义字段
  let customerPropertiesIds = await CustomPropertyDefs.findAll({
    where: {
      table_type: LoanPersonalUsers.getTableName(),
    },
    attributes: [
      ['id', 'property_id'],
    ],
    raw: true,
  })

  for (const user of users) {
    // 获取自定义字段值
    let customValues = await PropertyTenrels.findAll({
      where: {
        ref_id: user.id,
        [Op.or]: customerPropertiesIds,
      },
      attributes: ['property_id', 'value'],
      raw: true,
    })

    // 将拿到的自定义字段信息【字段==>值】，拼到返回的object中
    for (const row of customValues) {
      user[row.property_id] = row.value
    }
    userResult.push(user)
  }

  return true
}

/**
 * 获取用户所需自定义字段
 */
export async function getUserCustomProperties() {
  let customerProperties = await CustomPropertyDefs.findAll({
    where: {
      table_type: LoanPersonalUsers.getTableName(),
    },
    attributes: [
      'id', 'name',
    ],
    raw: true,
  })

  return customerProperties
}

export async function searchLoanUser() {
  return searchByCustomProperty(esClient, 'loan_user', 'personal', '刀法 0.5', 100)
}

/**
 * 插入测试数据
 */
export async function insertTestData() {
  let password = 'justjoke'
  sequelize.transaction(async function (rollback) {
    let loop = 0
    let tenrelsArr = []

    while (loop < 10000) {
      let bodyArray = { '1': Math.random() + '亿', '2': 'all of them are bitches.' }

      // 首先创建用户
      let user = await LoanPersonalUsers.create({
        user_name: randomName(),
        phone: fakerator.phone.number(),
        block_address: nodeEth.getDefaultAddress(password)['address'],
      }, { transaction: rollback })

      for (const key in bodyArray) {
        const element = bodyArray[key]
        if (key.match(/^-{0,1}\d+$/)) {
          let model = { ref_id: null, property_id: null, value: '', property_name: '预留' }
          model.ref_id = user.id
          model.property_id = key
          model.value = element
          tenrelsArr.push(model)
        }
      }

      console.log('loop value:' + loop)
      loop++
    }

    await PropertyTenrels.bulkCreate(tenrelsArr, { transaction: rollback })
  })
}

/**
 * 
 */
export async function insertData() {
  let password = 'justjoke'
  sequelize.transaction(async function (rollback) {
    let loop = 0
    let tenrelsArr = []

    while (loop < 10) {
      let bodyArray = { '1': Math.random() + '亿', '2': 'all of them are bitches.', '3': randomSkill.generate() }
      let userOption = {
        user_name: randomName.generate(),
        phone: fakerator.phone.number(),
        block_address: nodeEth.getDefaultAddress(password)['address'],
      }

      // 首先创建用户
      let user = await LoanPersonalUsers.create(userOption, { transaction: rollback })
      let customProperty = ''

      for (const key in bodyArray) {
        const element = bodyArray[key]
        if (key.match(/^-{0,1}\d+$/)) {
          let model = { ref_id: null, property_id: null, value: '', property_name: '预留' }
          model.ref_id = user.id
          model.property_id = key
          model.value = element
          customProperty = customProperty + ' ' + key + ':' + element
          tenrelsArr.push(model)
        }
      }

      userOption['custom_property'] = customProperty

      createOrUpdateDocument(esClient, 'loan_user', 'personal', user.id, userOption).then((data) => {
        console.log('documentId:' + user.id, data)
      })

      console.log('loop value:' + loop)
      loop++
    }

    await PropertyTenrels.bulkCreate(tenrelsArr, { transaction: rollback })
  })
}
