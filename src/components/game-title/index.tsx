import { useCallback, useContext } from 'react'
import { RouteContext } from '@delta62/micro-router'
import { Chevron } from '@components'
import styles from './styles.scss'

export interface Props {
  onChange(title: string): void
  text: string
}

export let GameTitle = ({ text, onChange }: Props) => {
  let { setPath } = useContext(RouteContext)

  let onBackClick = useCallback(() => {
    setPath('/')
  }, [setPath])

  let onBlur = useCallback(
    (event: React.FormEvent) => {
      let content = event.currentTarget.textContent || ''
      if (content === text) return
      onChange(content)
    },
    [text, onChange]
  )

  let onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLHeadingElement>) => {
      if (event.key !== 'Enter') return
      event.currentTarget.blur()
      event.preventDefault()
    },
    []
  )

  return (
    <div className={styles.gameTitle}>
      <Chevron direction="back" onClick={onBackClick} />
      <h1
        contentEditable
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        suppressContentEditableWarning={true}
        className={styles.text}
      >
        {text}
      </h1>
    </div>
  )
}
