import { useCallback } from 'preact/hooks'

import GameTitle from '@components/game-title'
import { Game } from '@store'
import Rating from '@components/rating'
import Timeline from '@containers/timeline'
import Trash from '@components/trash'

import './details.scss'

export interface Props {
  game: Game | null
  hasGames: boolean
  onDelete(id: number): void
  onDurationSet(id: number, duration: number): void
  onRatingSet(id: number, rating: number): void
  onTitleSet(id: number, title: string): void
}

let Details = ({ game, hasGames, onDelete, onRatingSet, onTitleSet }: Props) => {
  if (game) {
    let onDeleteClick = useCallback(() => {
      onDelete(game.id)
    }, [onDelete, game])

    let onRatingChange = useCallback(
      (rating: number) => {
        onRatingSet(game.id, rating)
      },
      [game, onRatingSet]
    )

    let onTitleChange = useCallback(
      (title: string) => {
        onTitleSet(game.id, title)
      },
      [game, onTitleSet]
    )

    return (
      <div class="details">
        <GameTitle text={game.name} onChange={onTitleChange} />
        <div class="metadata">
          <Rating onChange={onRatingChange} rating={game.rating ?? 0} />
          <span class="spacer"></span>
          <div class="delete">
            <Trash onClick={onDeleteClick} />
            Delete
          </div>
        </div>
        <Timeline id={game.id} />
      </div>
    )
  } else {
    let message = hasGames? 'Select a game' : 'Add some games to your list to get started'
    return <p class="details-empty">{message}</p>
  }
}

export default Details
