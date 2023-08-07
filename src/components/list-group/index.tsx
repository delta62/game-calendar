import { PropsWithChildren, useCallback } from 'react'
import classNames from 'classnames'
import { Chevron } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators, selectors, State, View } from '@store'
import styles from './styles.scss'

export interface Props {
  name: string
  view: View
  count: number
}

export let ListGroup = ({
  name,
  count,
  children,
  view,
}: PropsWithChildren<Props>) => {
  let dispatch = useDispatch()
  let expanded = useSelector<State, boolean>(state =>
    selectors.getIsExpanded(state, view)
  )

  let onTitleClick = useCallback(() => {
    dispatch(actionCreators.toggleView(view, !expanded))
  }, [dispatch, actionCreators.toggleView, expanded])

  return (
    <>
      <div className={styles.title} onClick={onTitleClick}>
        <Chevron
          className={classNames(styles.chevron, {
            [styles.expanded]: expanded,
          })}
        />
        {name}
        <span className={styles.count}>{count}</span>
      </div>
      <div
        className={classNames(styles.content, { [styles.expanded]: expanded })}
      >
        {children}
      </div>
    </>
  )
}
