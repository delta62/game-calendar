import {
  isArrayValue,
  isDoubleValue,
  isIntegerValue,
  isMapValue,
  isNullValue,
  isStringValue,
  MapValueInternal,
  Value,
} from './models'

export default (response: MapValueInternal) => {
  if (!response.fields) {
    return { }
  }

  return Object.entries(response.fields).reduce((acc, [ key, value ]) => {
    acc[key] = unwrap(value)
    return acc
  }, { } as any)
}

function unwrap(response: Value): any {
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
    return response.arrayValue.values?.map(unwrap) ?? [ ]
  }

  if (isMapValue(response)) {
    if (response.mapValue.fields) {
      return Object.entries(response.mapValue.fields).reduce((acc, [ key, value ]) => {
        acc[key] = unwrap(value)
        return acc
      }, { } as Record<string, Value>)
    }
    return { }
  }

  if (isNullValue(response)) {
    return null
  }

  throw new Error('Unexpected field type')
}
