import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Game, State, actionCreators, selectors } from '@store'
import GameTitle from '@components/game-title'
import Rating from '@components/rating'
import Timeline from '@components/timeline'
import Trash from '@components/trash'
import Dropdown from '@components/dropdown'

import styles from './styles.scss'

export interface Props {
  gameId: number | null
}

let Details = ({ gameId }: Props) => {
  let game = useSelector<State, Game | null>(state =>
    selectors.getGame(state, gameId)
  )
  let hasGames = useSelector(selectors.hasGames)
  let platforms = useSelector(selectors.getPlatformOptions)
  let dispatch = useDispatch()

  let onDelete = useCallback(() => {
    if (!game) return

    dispatch(actionCreators.deleteGame(game.id))
  }, [dispatch, game])

  let onRatingChange = useCallback(
    (rating: number) => {
      if (!game) return
      if (rating === game.rating) {
        dispatch(actionCreators.unrateGame(game.id))
      } else {
        dispatch(actionCreators.setRating(game.id, rating))
      }
    },
    [game, dispatch]
  )

  let onTitleChange = useCallback(
    (title: string) => {
      if (!game) return
      dispatch(actionCreators.setTitle(game.id, title))
    },
    [game, dispatch]
  )

  let onPlatformChange = useCallback(
    (platform: string) => {
      if (!game) return
      let plat = parseInt(platform, 10)
      dispatch(actionCreators.setPlatform(game.id, plat))
    },
    [game, dispatch]
  )

  if (game) {
    return (
      <div className={styles.details}>
        <GameTitle text={game.name} onChange={onTitleChange} />
        <div className={styles.metadata}>
          <Rating onChange={onRatingChange} rating={game.rating} />
          <span className={styles.spacer}></span>
          <label>
            <span className={`${styles.elide} ${styles.label}`}>Platform</span>
            <Dropdown
              emptyLabel="None"
              onChange={onPlatformChange}
              options={platforms}
              selected={game.platform != null ? `${game.platform}` : undefined}
            />
          </label>
          <span className={styles.spacer}></span>
          <div className={styles.delete}>
            <Trash onClick={onDelete} />
            <span className={styles.elide}>Delete</span>
          </div>
        </div>
        <Timeline game={game.id} />
      </div>
    )
  } else {
    let message = hasGames
      ? 'Select a game'
      : 'Add some games to your list to get started'
    return <p className={styles.detailsEmpty}>{message}</p>
  }
}

export default Details
