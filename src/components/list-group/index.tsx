import { PropsWithChildren, useCallback, useState } from 'react'
import { Chevron } from '@components/chevron'
import styles from './styles.scss'

export interface Props {
  name: string
}

export let ListGroup = ({ name, children }: PropsWithChildren<Props>) => {
  let [expanded, setExpanded] = useState(true)

  let onTitleClick = useCallback(() => {
    setExpanded(state => !state)
  }, [setExpanded])

  return (
    <div className={expanded ? styles.expanded : ''}>
      <div className={styles.title} onClick={onTitleClick}>
        <Chevron className={styles.chevron} />
        {name}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
