import { RenderableProps } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'

import GameListItem from '@containers/game-list-item'
import { DragProvider } from '@hoc/draggable.tsx'

import './game-list.scss'

export interface Props {
  fetchGames(userId: string, nextPage: string | null): void
  games: number[]
  userId: string | null
  nextPage: string | null
}

let GameList = ({ fetchGames, games, userId, nextPage }: RenderableProps<Props>) => {
  useEffect(() => {
    if (userId) {
      fetchGames(userId, null)
    }
  }, [fetchGames, userId])

  let onScroll = useCallback((event: Event) => {
    let el = event.target as HTMLElement
    let remainingScroll = el.scrollHeight - el.scrollTop - el.offsetHeight

    if (remainingScroll === 0) {
      fetchGames(userId!, nextPage)
    }
  }, [ fetchGames, userId, nextPage ]);

  return (
    <div class="scroll-wrapper" onScroll={onScroll}>
      <div class="game-list">
        <DragProvider>
          <ol>
            {games.map(id => (
              <GameListItem id={id} />
            ))}
          </ol>
        </DragProvider>
      </div>
    </div>
  )
}

export default GameList
