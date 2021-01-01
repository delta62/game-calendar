import classnames from 'classnames'
import { useCallback } from 'preact/hooks'

import Chevron from './chevron'
import Progress from './progress'
import { Game } from '../data/store'
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
      <div class="horizontal">
        <div class="vertical">
          <span class="game-name">{game.name}</span>
          <Progress
            startDate={game.started}
            finishDate={game.finished}
            completeDate={game.completed}
          />
        </div>
        <Chevron />
      </div>
    </li>
  )
}

export default GameListItem
