import { RenderableProps } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'
import Context from './context'

interface AnchorProps {
  className?: string
  href: string
}

export function Anchor({
  children,
  className,
  href,
}: RenderableProps<AnchorProps>) {
  let [isActive, setIsActive] = useState(false)
  let { setPath } = useContext(Context)

  useEffect(() => setIsActive(location.pathname === href))

  let onClick = (event: MouseEvent) => {
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
