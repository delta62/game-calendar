import { useContext, useEffect } from 'react'
import { RouteContext } from './context'

interface RedirectProps {
  to: string
  when?: boolean
}

export function Redirect({ to, when = true }: RedirectProps) {
  let { setPath } = useContext(RouteContext)

  useEffect(() => {
    if (when) {
      setPath(to)
    }
  }, [to, when])

  return null
}
