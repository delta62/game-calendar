import { RenderableProps } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import Context from './context'

export function RouteProvider(props: RenderableProps<{}>) {
  let [href, setHref] = useState(location.pathname)
  let [params, setParams] = useState({ })

  function onPopState() {
    setHref(location.pathname)
  }

  function setPath(href: string) {
    history.pushState(null, '', href)
    setHref(href)
  }

  function setRouteParams(params: Record<string, string>) {
    setParams(params)
  }

  useEffect(() => (onpopstate = onPopState), [])

  return (
    <Context.Provider value={{ path: href, setPath, setRouteParams, params }}>
      {props.children}
    </Context.Provider>
  )
}
