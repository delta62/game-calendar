import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { actionCreators, selectors } from '@store'
import GameListItem from '@components/game-list-item'
import { DragProvider } from '@hoc/draggable'

import './game-list.scss'

export interface Props {
  games: number[]
  hasNextPage: boolean
  nextPage: string | null
}

let GameList = () => {
  let dispatch = useDispatch()
  let games = useSelector(selectors.getGames)
  let hasNextPage = useSelector(selectors.hasNextPage)
  let nextPage = useSelector(selectors.getNextPage)

  let fetchGames = useCallback(
    (nextPage: string | null) => {
      dispatch(actionCreators.fetchRequest(nextPage))
    },
    [dispatch]
  )

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
              <GameListItem gameId={id} />
            ))}
          </ol>
        </DragProvider>
      </div>
    </div>
  )
}

export default GameList
