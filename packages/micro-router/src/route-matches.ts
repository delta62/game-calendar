import { RouteParams } from './context'

let routeMatches = (path: string, currentPath: string) => {
  let parts = path.split('/')
  let currentParts = currentPath.split('/')
  let params: RouteParams = {}

  for (let i = 0; i < parts.length; i++) {
    let part = parts[i]!
    let test = currentParts[i]
    let isParam = part.startsWith(':')
    let isOption = part.startsWith('?')

    if (isOption) {
      let key = part.substring(1)
      if (test) {
        params[key] = test
      }
    } else if (isParam) {
      let key = part.substring(1)
      params[key] = test ?? ''
    } else if (part !== test) {
      return false
    }
  }

  return params
}

export default routeMatches
