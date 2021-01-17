import classnames from 'classnames'
import { useCallback } from 'preact/hooks'

import Chevron from '@components/chevron'
import { DraggableDropEvent, useDrag, useDrop } from '@hoc/draggable'
import { Game } from '@store'
import Icon from '@components/icon'
import Progress from '@components/progress'
import { useSelection } from '@context/selection'

import './game-list-item.scss'

export interface Props {
  game: Game
  onReorder(id: number, above: boolean, target: number): void
}

let GameListItem = ({ game, onReorder }: Props) => {
  let [selectedId, setSelectedId] = useSelection()
  let active = selectedId == game.id

  let dragProps = useDrag(`${game.id}`)

  let onClick = useCallback(() => {
    setSelectedId(game.id)
  }, [game, setSelectedId])

  let onDrop = useCallback(
    ({ detail }: DraggableDropEvent) => {
      onReorder(parseInt(detail.key, 10), detail.above, game.id)
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
