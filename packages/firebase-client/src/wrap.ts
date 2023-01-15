import { ArrayValue, MapValue, MapValueInternal } from './models'

export default <T extends {}>(document: T): MapValueInternal => {
  let fields = Object.entries(document).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = wrap(value)
    }
    return acc
  }, {} as Record<string, any>)
  return { fields }
}

let wrap = (value: any) => {
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
      arrayValue: {},
    }

    if (value.length > 0) {
      ret.arrayValue.values = value.map(wrap)
    }

    return ret
  }

  if (typeof value === 'object') {
    let ret: MapValue = {
      mapValue: {},
    }

    let fields = Object.entries(value).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = wrap(value)
      }
      return acc
    }, {} as Record<string, any>)

    ret.mapValue.fields = fields
    return ret
  }

  throw new Error('Unable to wrap object')
}
