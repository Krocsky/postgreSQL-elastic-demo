import express from 'express'

import { create } from '../../core/scenes/property_tenrels'

const router = express.Router()

/**
 * 创建
 */
router.post('/property_tenrels/create', function ({ body: { personalUserId, propertyId, value } }, { succ, err }, ) {
  try {
    create(personalUserId, propertyId, value)
  } catch (error) {
    err(error.message)
  }
  succ('创建成功')
})

export default router
