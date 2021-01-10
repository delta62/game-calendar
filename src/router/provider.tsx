import React, {
  PropsWithChildren,
  useState,
  useEffect
} from 'react'

import Context from './context'

export function RouteProvider(props: PropsWithChildren<unknown>) {
  let [ href, setHref ] = useState(location.pathname)

  function onPopState() {
    setHref(location.pathname)
  }

  function setPath(href: string) {
    history.pushState(null, '', href)
    setHref(href)
  }

  useEffect(() => onpopstate = onPopState, [ ])

  return (
    <Context.Provider value={{ path: href, setPath }}>
      {props.children}
    </Context.Provider>
  )
}
