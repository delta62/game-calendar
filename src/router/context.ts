import { createContext } from 'react'

interface RouteContextState {
  path: string
  setPath(newLocation: string): void
}

let Context = createContext<RouteContextState>({
  path: location.pathname,
  setPath() {},
})
Context.displayName = 'Router'

export default Context
