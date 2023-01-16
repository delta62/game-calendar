import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import Context from './context'
import routeMatches from './route-matches'

interface RouteProps {
  path: string[] | string
}

export function Route(props: PropsWithChildren<RouteProps>) {
  let { path, setRouteParams } = useContext(Context)
  let [isMatch, setIsMatch] = useState(false)

  useEffect(() => {
    let routeParams = null
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
