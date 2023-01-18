import classnames from 'classnames'
import { useCallback, useContext } from 'react'
import { RouteContext } from '@delta62/micro-router'
import { useDispatch, useSelector } from 'react-redux'

import Chevron from '@components/chevron'
import { DraggableDropEvent, useDrag, useDrop } from '@hoc/draggable'
import { Game, State, selectors, actionCreators } from '@store'
import Icon from '@components/icon'
import Progress from '@components/progress'

import styles from './styles.scss'

export interface Props {
  gameId: number
}

let GameListItem = ({ gameId }: Props) => {
  let game = useSelector<State, Game | null>(state =>
    selectors.getGame(state, gameId)
  )!
  let dispatch = useDispatch()
  let { setPath } = useContext(RouteContext)
  let dragProps = useDrag(`${game.id}`)
  let active = false

  let onClick = useCallback(() => {
    setPath(`/games/${game.id}`)
  }, [game, setPath])

  let onDrop = useCallback(
    ({ detail }: DraggableDropEvent) => {
      if (detail.key !== `${game.id}`) {
        dispatch(
          actionCreators.reorderGame(
            parseInt(detail.key, 10),
            detail.above,
            game.id
          )
        )
      }
    },
    [game]
  )

  let { forwardRef, forwardClass } = useDrop<HTMLLIElement>({ onDrop })

  return (
    <li
      ref={forwardRef}
      className={classnames(styles.gameListItem, forwardClass, {
        [styles.active]: active,
      })}
      onClick={onClick}
      {...dragProps}
    >
      <div className={styles.horizontal}>
        <Icon type="handle" {...dragProps} />
        <div className={styles.vertical}>
          <span className={styles.gameName} title={game.name}>
            {game.name}
          </span>
          <Progress
            startDate={game.started}
            finishDate={game.finished}
            completeDate={game.completed}
          />
        </div>
        <div className={styles.selector}>
          <Chevron />
        </div>
      </div>
    </li>
  )
}

export default GameListItem
