import { createContext } from 'react'

export type RouteParams = Record<string, string>

interface RouteContextState {
  params: RouteParams
  path: string
  setPath(newLocation: string): void
  setRouteParams(routeParams: RouteParams): void
}

export let RouteContext = createContext<RouteContextState>({
  params: {},
  path: location.pathname,
  setPath() {},
  setRouteParams() {},
})

RouteContext.displayName = 'Router'
