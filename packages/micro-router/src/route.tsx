import { RenderableProps } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'
import Context, { RouteParams } from './context.js'

interface RouteProps {
  path: string[] | string
}

let match = (path: string, currentPath: string) => {
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

export function Route(props: RenderableProps<RouteProps>) {
  let { path, setRouteParams } = useContext(Context)
  let [isMatch, setIsMatch] = useState(false)

  useEffect(() => {
    let routeParams = {}
    let routes: string[] = [].concat(props.path as any)

    for (let route of routes) {
      let params = match(route, path)
      if (params) {
        routeParams = params
        break
      }
    }

    if (routeParams) {
      setRouteParams(routeParams)
      setIsMatch(true)
    } else {
      setIsMatch(false)
    }
  }, [path, props.path])

  return isMatch ? <>{props.children}</> : null
}
