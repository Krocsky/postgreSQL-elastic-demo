import express from 'express'

import { create, getUserInfo, getUserCustomProperties, insertTestData, getAllUserInfo, getRandomUserInfo, insertData, searchLoanUser } from '../../core/scenes/loan_personal_users'

const router = express.Router()

/**
 * 创建
 */
router.post('/personalUser/create', function (req, { succ, err }, ) {
  try {
    create(req.body)
  } catch (error) {
    err(error.message)
  }
  succ('创建成功')
})

/**
 * 获取用户信息
 */
router.get('/personalUser/getUser', function (req, { succ, err }, ) {
  console.log(req.query.userId)
  getUserInfo(req.query.userId)
    .then(succ)
    .catch((ex) => { err(ex) })
})

/**
 * 获取所有用户信息
 */
router.get('/personalUser/getAllUser', function (_, { succ, err }, ) {
  getAllUserInfo()
    .then(succ)
    .catch((ex) => { err(ex) })
})

/**
 * 随机获取所有用户信息
 */
router.get('/personalUser/getRandomUser', function (_, { succ, err }, ) {
  getRandomUserInfo()
    .then(succ)
    .catch((ex) => { err(ex) })
})

/**
 * 获取用户所需自定义字段
 */
router.get('/personalUser/getCustomProperties', function (_, { succ, err }, ) {
  getUserCustomProperties()
    .then(succ)
    .catch((ex) => { err(ex) })
})

/**
 * 生成测试数据
 */
router.get('/generateTestData', function (_, { succ, err }, ) {
  insertData()
    .then(succ)
    .catch((ex) => { err(ex) })
})

router.get('/personalUser/search', function (_, { succ, err }, ) {
  searchLoanUser()
    .then(succ)
    .catch((ex) => { err(ex) })
})

export default router
