import express from 'express'

import { propertyCreate } from '../../core/scenes/property_defs'

const router = express.Router()

/**
 * 创建
 */
router.post('/property_defs/create', function ({ body: { name, allowNull } }, { succ, err }, ) {
  try {
    propertyCreate(name, allowNull)
  } catch (error) {
    err(error.message)
  }
  succ('创建成功')
})

export default router
