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

let unwrap = <T = unknown>(response: Value): T => {
  if (isStringValue(response)) {
    return response.stringValue as T
  }

  if (isIntegerValue(response)) {
    return parseInt(response.integerValue, 10) as T
  }

  if (isDoubleValue(response)) {
    return parseFloat(response.doubleValue) as T
  }

  if (isArrayValue(response)) {
    return response.arrayValue.values?.map(unwrap) as T
  }

  if (isMapValue(response)) {
    if (response.mapValue.fields) {
      return Object.entries(response.mapValue.fields).reduce(
        (acc, [key, value]) => {
          acc[key] = unwrap(value)
          return acc
        },
        {} as Record<string, any>
      ) as T
    }
    return {} as T
  }

  if (isNullValue(response)) {
    return null as T
  }

  throw new Error('Unexpected field type')
}
