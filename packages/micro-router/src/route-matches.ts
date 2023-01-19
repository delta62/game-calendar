import { RouteParams } from './context'

let routeMatches = (routePath: string, currentPath: string) => {
  let routeParts = routePath.split('/').filter(x => !!x)
  let currentParts = currentPath.split('/').filter(x => !!x)
  let params: RouteParams = {}

  if (routeParts.length !== currentParts.length) {
    return false
  }

  for (let i = 0; i < routeParts.length; i++) {
    let part = routeParts[i]!
    let test = currentParts[i]
    let isParam = part.startsWith(':')

    if (isParam) {
      let key = part.substring(1)
      params[key] = test ?? ''
    } else if (part !== test) {
      return false
    }
  }

  return params
}

export default routeMatches
