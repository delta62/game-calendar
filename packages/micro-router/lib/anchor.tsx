import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { RouteContext } from './context'

interface AnchorProps {
  className?: string
  href: string
  query?: Record<string, string | number | undefined>
}

export function Anchor({
  children,
  className,
  href,
  query,
}: PropsWithChildren<AnchorProps>) {
  let [isActive, setIsActive] = useState(false)
  let { setPath } = useContext(RouteContext)
  let klass = `${className}${isActive ? 'active' : ''}`

  useEffect(() => setIsActive(location.pathname === href))

  let onClick = useCallback(
    (event: React.MouseEvent) => {
      let params = Object.entries(query ?? {})
      let url = new URL(href)

      for (let [key, value] of params) {
        url.searchParams.append(key, `${value}`)
      }

      setPath(url.toString())
      event.preventDefault()
    },
    [query, href, setPath]
  )

  return (
    <a className={klass} href={href} onClick={onClick}>
      {children}
    </a>
  )
}
