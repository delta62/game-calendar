import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { RouteContext } from './context'

interface AnchorProps {
  className?: string
  href: string
}

export function Anchor({
  children,
  className,
  href,
}: PropsWithChildren<AnchorProps>) {
  let [isActive, setIsActive] = useState(false)
  let { setPath } = useContext(RouteContext)

  useEffect(() => setIsActive(location.pathname === href))

  let onClick = (event: React.MouseEvent) => {
    setPath(href)
    event.preventDefault()
  }

  let klass = `${className}${isActive ? 'active' : ''}`

  return (
    <a className={klass} href={href} onClick={onClick}>
      {children}
    </a>
  )
}
