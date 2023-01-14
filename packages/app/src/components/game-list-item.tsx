import classnames from 'classnames'
import { useCallback, useContext } from 'preact/hooks'
import { Context } from '@delta62/micro-router'

import Chevron from '@components/chevron'
import { DraggableDropEvent, useDrag, useDrop } from '@hoc/draggable'
import { Game } from '@store'
import Icon from '@components/icon'
import Progress from '@components/progress'

import './game-list-item.scss'

export interface Props {
  game: Game
  onReorder(id: number, above: boolean, target: number): void
}

let GameListItem = ({ game , onReorder }: Props) => {
  let { setPath } = useContext(Context)

  let active = false;

  let dragProps = useDrag(`${game.id}`)

  let onClick = useCallback(() => {
    setPath(`/games/${game.id}`)
  }, [game, setPath])

  let onDrop = useCallback(
    ({ detail }: DraggableDropEvent) => {
      if (detail.key !== `${game.id}`) {
        onReorder(parseInt(detail.key, 10), detail.above, game.id)
      }
    },
    [onReorder, game]
  )

  let { forwardRef, forwardClass } = useDrop<HTMLLIElement>({ onDrop })

  return (
    <li
      ref={forwardRef}
      class={classnames('game-list-item', forwardClass, { active })}
      onClick={onClick}
      {...dragProps}
    >
      <div class="horizontal">
        <Icon type="handle" {...dragProps} />
        <div class="vertical">
          <span class="game-name">{game.name}</span>
          <Progress
            startDate={game.started}
            finishDate={game.finished}
            completeDate={game.completed}
          />
        </div>
        <div class="selector">
          <Chevron />
        </div>
      </div>
    </li>
  )
}

export default GameListItem
