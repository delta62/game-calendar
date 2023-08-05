import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators, Game, selectors } from '@store'
import { ListGroup } from '@components/list-group'
import GameListItem from '@components/game-list-item'
import styles from './styles.scss'

export let AllGamesList = () => {
  let startedGames = useSelector(selectors.startedGames)
  let backlogGames = useSelector(selectors.backlogGames)
  let finishedGames = useSelector(selectors.finishedGames)

  return (
    <div className={styles.allGames}>
      <ListGroup name="In Progress" view="inprogress">
        <GameList games={startedGames} />
      </ListGroup>
      <ListGroup name="Backlog" view="backlog">
        <GameList games={backlogGames} />
      </ListGroup>
      <ListGroup name="Finished" view="finished">
        <GameList games={finishedGames} />
      </ListGroup>
    </div>
  )
}

export interface GameListProps {
  games: Game[]
}

let GameList = ({ games }: GameListProps) => {
  let dispatch = useDispatch()
  let hasNextPage = useSelector(selectors.hasNextPage)
  let nextPage = useSelector(selectors.getNextPage)

  let fetchGames = useCallback(
    (nextPage: string | null) => {
      dispatch(actionCreators.fetchRequest(nextPage))
    },
    [dispatch]
  )

  useEffect(() => fetchGames(null), [fetchGames])

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
    <div className={styles.gameList} onScroll={onScroll}>
      <ol>
        {games.map(game => (
          <GameListItem key={game.id} gameId={game.id} />
        ))}
      </ol>
    </div>
  )
}

export default GameList
