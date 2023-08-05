import { PropsWithChildren, useCallback } from 'react'
import classNames from 'classnames'
import { Chevron } from '@components/chevron'
import styles from './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators, selectors, State, View } from '@store'

export interface Props {
  name: string
  view: View
}

export let ListGroup = ({ name, children, view }: PropsWithChildren<Props>) => {
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
      </div>
      <div
        className={classNames(styles.content, { [styles.expanded]: expanded })}
      >
        {children}
      </div>
    </>
  )
}
