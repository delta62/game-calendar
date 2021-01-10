import { RenderableProps } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'
import classNames from 'classnames'

import Context from './context'

interface AnchorProps {
  className?: string
  href: string
}

export function Anchor({
  children,
  className,
  href
}: RenderableProps<AnchorProps>) {
  let [ isActive, setIsActive ] = useState(false)
  let { setPath } = useContext(Context)
  useEffect(() => setIsActive(location.pathname === href))

  function onClick(event: MouseEvent) {
    setPath(href)
    event.preventDefault()
  }

  return (
    <a
      className={classNames(className, { active: isActive })}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
