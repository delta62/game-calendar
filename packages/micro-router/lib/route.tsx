import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { RouteContext } from './context'
import routeMatches from './route-matches'

interface RouteProps {
  path: string[] | string
}

export function Route(props: PropsWithChildren<RouteProps>) {
  let { path, setRouteParams } = useContext(RouteContext)
  let [isMatch, setIsMatch] = useState(false)

  useEffect(() => {
    let routes = ([] as string[]).concat(props.path)
    let routeParams = routes
      .map(route => routeMatches(route, path))
      .find(x => !!x)

    if (routeParams) {
      setRouteParams(routeParams)
    }

    setIsMatch(!!routeParams)
  }, [path, props.path])

  return isMatch ? <>{props.children}</> : null
}
