import { PropsWithChildren, useCallback, useState } from 'react'
import classNames from 'classnames'
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
    <>
      <div className={styles.title} onClick={onTitleClick}>
        <Chevron
          className={classNames(styles.chevron, {
            [styles.expanded]: expanded,
          })}
        />
        {name}
      </div>
      <div
        className={classNames(styles.content, { [styles.expanded]: expanded })}
      >
        {children}
      </div>
    </>
  )
}
