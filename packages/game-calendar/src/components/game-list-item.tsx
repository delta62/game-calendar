import classnames from 'classnames'
import { useCallback } from 'preact/hooks'

import { Game } from '../data/store'
import Progress from './progress'
import './game-list-item.scss'

export interface Props {
  active: boolean
  game: Game
  onSelect(id: number): void
}

let GameListItem = ({ active, game, onSelect }: Props) => {
  let onClick = useCallback(() => {
    onSelect(game.id)
  }, [ game, onSelect ])

  return (
    <li class={classnames('game-list-item', { active })} onClick={onClick}>
      <div class="layout">
        <span class="game-name">{game.name}</span>
        <Progress
          startDate={game.started}
          finishDate={game.finished}
          completeDate={game.completed}
        />
        </div>
    </li>
  )
}

export default GameListItem
