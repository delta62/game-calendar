import classnames from 'classnames'
import { useCallback, useContext } from 'react'
import { RouteContext } from '@delta62/micro-router'
import { useSelector } from 'react-redux'
import { Chevron } from '@components/chevron'
import { Game, State, selectors } from '@store'
import Progress from '@components/progress'
import styles from './styles.scss'

export interface Props {
  gameId: number
}

let GameListItem = ({ gameId }: Props) => {
  let game = useSelector<State, Game | null>(state =>
    selectors.getGame(state, gameId)
  )!
  let { setPath } = useContext(RouteContext)
  let active = false

  let onClick = useCallback(() => {
    setPath(`/games/${game.id}`)
  }, [game, setPath])

  return (
    <li
      className={classnames(styles.gameListItem, {
        [styles.active]: active,
      })}
      onClick={onClick}
    >
      <div className={styles.horizontal}>
        <div className={styles.vertical}>
          <span className={styles.gameName} title={game.name}>
            {game.name}
          </span>
          <Progress
            startDate={game.started}
            finishDate={game.finished}
            completeDate={game.completed}
          />
        </div>
        <div className={styles.selector}>
          <Chevron />
        </div>
      </div>
    </li>
  )
}

export default GameListItem
