import { RenderableProps } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'

import GameListItem from '@containers/game-list-item'
import { DragProvider } from '@hoc/draggable.tsx'

import './game-list.scss'

export interface Props {
  fetchGames(nextPage: string | null): void
  games: number[]
  hasNextPage: boolean
  nextPage: string | null
}

let GameList = ({ fetchGames, hasNextPage, games, nextPage }: RenderableProps<Props>) => {
  useEffect(() => fetchGames(null), [fetchGames])

  let onScroll = useCallback((event: Event) => {
    if (!hasNextPage) {
      return
    }

    let el = event.target as HTMLElement
    let remainingScroll = el.scrollHeight - el.scrollTop - el.offsetHeight

    if (remainingScroll === 0) {
      fetchGames(nextPage)
    }
  }, [ fetchGames, nextPage, hasNextPage ]);

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
