import { MapValueInternal, Value } from './models.js'
import {
  isArrayValue,
  isDoubleValue,
  isIntegerValue,
  isMapValue,
  isNullValue,
  isStringValue,
} from './models.js'

export default (response: MapValueInternal): any => {
  if (!response.fields) {
    return {}
  }

  return Object.entries(response.fields).reduce((acc, [key, value]) => {
    acc[key] = unwrap(value)
    return acc
  }, {} as Record<string, any>)
}

let unwrap = (response: Value) => {
  if (isStringValue(response)) {
    return response.stringValue
  }

  if (isIntegerValue(response)) {
    return parseInt(response.integerValue, 10)
  }

  if (isDoubleValue(response)) {
    return parseFloat(response.doubleValue)
  }

  if (isArrayValue(response)) {
    response.arrayValue.values?.map(unwrap) ?? []
  }

  if (isMapValue(response)) {
    if (response.mapValue.fields) {
      return Object.entries(response.mapValue.fields).reduce(
        (acc, [key, value]) => {
          acc[key] = unwrap(value)
          return acc
        },
        {} as Record<string, any>
      )
    }
    return {}
  }

  if (isNullValue(response)) {
    return null
  }

  throw new Error('Unexpected field type')
}
