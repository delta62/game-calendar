import { createContext } from 'react'

interface RouteContextState {
  params: Record<string, string>
  path: string
  setPath(newLocation: string): void
  setRouteParams(routeParams: Record<string, string>): void
}

let Context = createContext<RouteContextState>({
  params: { },
  path: location.pathname,
  setPath() {},
  setRouteParams() { },
})
Context.displayName = 'Router'

export default Context
