import { createContext } from 'react'

export type RouteParams = Record<string, string>

interface RouteContextState {
  params: RouteParams
  path: string
  setPath(newLocation: string): void
  setRouteParams(routeParams: Record<string, string>): void
}

let Context = createContext<RouteContextState>({
  params: {},
  path: location.pathname,
  setPath() {},
  setRouteParams() {},
})
Context.displayName = 'Router'

export default Context
