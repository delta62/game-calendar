import { useContext, useEffect } from 'react'

import Context from './context'

interface RedirectProps {
  to: string
}

export function Redirect({ to }: RedirectProps) {
  let { setPath } = useContext(Context)
  useEffect(() => setPath(to), [])

  return null
}
