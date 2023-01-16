import { useCallback, useEffect, PropsWithChildren } from 'react'

import GameListItem from '@containers/game-list-item'
import { DragProvider } from '@hoc/draggable'

import './game-list.scss'

export interface Props {
  fetchGames(nextPage: string | null): void
  games: number[]
  hasNextPage: boolean
  nextPage: string | null
}

let GameList = ({
  fetchGames,
  hasNextPage,
  games,
  nextPage,
}: PropsWithChildren<Props>) => {
  useEffect(() => {
    fetchGames(null)
  }, [fetchGames])

  let onScroll = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!hasNextPage) {
        return
      }

      let el = event.currentTarget
      let remainingScroll = el.scrollHeight - el.scrollTop - el.offsetHeight

      if (remainingScroll === 0) {
        fetchGames(nextPage)
      }
    },
    [fetchGames, nextPage, hasNextPage]
  )

  return (
    <div className="scroll-wrapper" onScroll={onScroll}>
      <div className="game-list">
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
