import { CustomPropertyDefs } from '../models/custom_property_defs'
import { PropertyType } from '../const'

export async function propertyCreate(name, allowNull) {
  await CustomPropertyDefs.create({
    name: name,
    table_type: PropertyType.loan_personal_users,
    allow_null: allowNull,
  })
}
