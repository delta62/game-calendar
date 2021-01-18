import { RenderableProps } from 'preact'
import { useContext } from 'preact/hooks'

import Context from './context'

interface RouteProps {
  path: string
}

export function Route(props: RenderableProps<RouteProps>) {
  let { path } = useContext(Context)
  return path === props.path ? <>{props.children}</> : null
}
