import { ArrayValue, MapValue, MapValueInternal, Value } from './models'

export default (fields: any): MapValueInternal => {
  let wrappedFields = Object.entries(fields).reduce((acc, [ key, value ]) => {
    if (value !== undefined) {
      acc[key] = wrap(value)
    }
    return acc
  }, { } as Record<string, Value>)

  return {
    fields: wrappedFields,
  }
}

function wrap(value: any): Value {
  if (typeof value === 'string') {
    return { stringValue: value }
  }

  if (Number.isInteger(value)) {
    return { integerValue: `${value}` }
  }

  if (typeof value === 'number') {
    return { doubleValue: `${value}` }
  }

  if (value === null) {
    return { nullValue: null }
  }

  if (Array.isArray(value)) {
    let ret: ArrayValue = {
      arrayValue: { }
    }

    if (value.length > 0) {
      ret.arrayValue.values = value.map(wrap)
    }

    return ret
  }

  if (typeof value === 'object') {
    let ret: MapValue = {
      mapValue: {  }
    }

    let fields = Object.entries(value).reduce((acc, [ key, value ]) => {
      if (value !== undefined) {
        acc[key] = wrap(value)
      }
      return acc
    }, { } as Record<string, Value>)

    ret.mapValue.fields = fields

    return ret
  }

  throw new Error('Unable to wrap object')
}
