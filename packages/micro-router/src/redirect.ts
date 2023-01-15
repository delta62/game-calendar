import { useContext, useEffect } from 'preact/hooks'
import Context from './context.js'

interface RedirectProps {
  to: string
  when?: boolean
}

export function Redirect({ to, when = true }: RedirectProps) {
  let { setPath } = useContext(Context)

  useEffect(() => {
    if (when) {
      setPath(to)
    }
  }, [to, when])

  return null
}
