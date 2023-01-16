import { RenderableProps } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'
import Context from './context'
import routeMatches from './route-matches'

interface RouteProps {
  path: string[] | string
}

console.log('DO')

export function Route(props: RenderableProps<RouteProps>) {
  let { path, setRouteParams } = useContext(Context)
  let [isMatch, setIsMatch] = useState(false)

  useEffect(() => {
    let routeParams = {}
    let routes: string[] = [].concat(props.path as any)

    for (let route of routes) {
      let params = routeMatches(route, path)
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
