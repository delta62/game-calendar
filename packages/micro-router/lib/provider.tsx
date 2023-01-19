import { PropsWithChildren, useState, useEffect } from 'react'
import { RouteContext, RouteParams } from './context'

export function RouteProvider({ children }: PropsWithChildren<{}>) {
  let [href, setHref] = useState(location.pathname)
  let [params, setParams] = useState({})

  let onPopState = () => {
    setHref(location.pathname)
  }

  let setPath = (href: string) => {
    history.pushState(null, '', href)
    setHref(href)
  }

  let setRouteParams = (params: RouteParams) => {
    setParams(params)
  }

  useEffect(() => {
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return (
    <RouteContext.Provider
      value={{ path: href, setPath, setRouteParams, params }}
    >
      {children}
    </RouteContext.Provider>
  )
}
