import { PropertyTenrels } from '../models/property_tenrels'
import { CustomPropertyDefs } from '../models/custom_property_defs'
import { LoanPersonalUsers } from '../models/loan_personal_user'

/**
 * 创建
 * @param {*} personalUserId 个人用户id
 * @param {*} propertyId 自定义字段id
 * @param {*} value 字段值
 */
export async function create(personalUserId, propertyId, value) {
  let propertyEntity = await CustomPropertyDefs.findById(propertyId)
  if (!propertyEntity) {
    throw new Error('此自定义字段不存在')
  }

  let personalUser = await LoanPersonalUsers.findById(personalUserId)
  if (!personalUser) {
    throw new Error('此个人用户不存在老铁')
  }

  await PropertyTenrels.create({
    ref_id: personalUserId,
    property_id: propertyId,
    value: value,
  })
}
