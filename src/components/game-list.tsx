import { RenderableProps } from 'preact'

import GameListItem from '@containers/game-list-item'
import { DragProvider } from '@hoc/draggable.tsx'

import './game-list.scss'

export interface Props {
  games: number[]
}

let GameList = ({ games }: RenderableProps<Props>) => (
  <div class="game-list">
    <DragProvider>
      <ol>
        {games.map(id => (
          <GameListItem id={id} />
        ))}
      </ol>
    </DragProvider>
  </div>
)

export default GameList
