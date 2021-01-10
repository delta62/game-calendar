import { RenderableProps } from 'preact'
import { useEffect } from 'preact/hooks'

import GameListItem from '@containers/game-list-item'
import { DragProvider } from '@hoc/draggable.tsx'

import './game-list.scss'

export interface Props {
  fetchGames(userId: string): void
  games: number[]
  userId: string | null
}

let GameList = ({ fetchGames, games, userId }: RenderableProps<Props>) => {
  useEffect(() => {
    if (userId) {
      fetchGames(userId)
    }
  }, [ fetchGames, userId ])

  return (
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
}

export default GameList
