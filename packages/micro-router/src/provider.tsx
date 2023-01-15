import { RenderableProps } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import Context, { RouteParams } from './context'

export function RouteProvider({ children }: RenderableProps<{}>) {
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

  useEffect(() => (onpopstate = onPopState), [])

  return (
    <Context.Provider value={{ path: href, setPath, setRouteParams, params }}>
      {children}
    </Context.Provider>
  )
}
