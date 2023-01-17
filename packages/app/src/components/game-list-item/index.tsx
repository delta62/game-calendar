import classnames from 'classnames'
import { useCallback, useContext } from 'react'
import { Context } from '@delta62/micro-router'
import { useDispatch, useSelector } from 'react-redux'

import Chevron from '@components/chevron'
import { DraggableDropEvent, useDrag, useDrop } from '@hoc/draggable'
import { Game, State, selectors, actionCreators } from '@store'
import Icon from '@components/icon'
import Progress from '@components/progress'

import './styles.scss'

export interface Props {
  gameId: number
}

let GameListItem = ({ gameId }: Props) => {
  let game = useSelector<State, Game | null>(state =>
    selectors.getGame(state, gameId)
  )!
  let dispatch = useDispatch()
  let { setPath } = useContext(Context)
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
      className={classnames('game-list-item', forwardClass, { active })}
      onClick={onClick}
      {...dragProps}
    >
      <div className="horizontal">
        <Icon type="handle" {...dragProps} />
        <div className="vertical">
          <span className="game-name">{game.name}</span>
          <Progress
            startDate={game.started}
            finishDate={game.finished}
            completeDate={game.completed}
          />
        </div>
        <div className="selector">
          <Chevron />
        </div>
      </div>
    </li>
  )
}

export default GameListItem
