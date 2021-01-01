import { useCallback } from 'preact/hooks'

import GameTitle from './game-title'
import { Game } from '../data/store'
import Rating from './rating'
import Timeline from '../containers/timeline'
import Trash from './trash'
import './details.scss'

export interface Props {
  game: Game | null
  onComplete(id: number, state: boolean): void
  onDelete(id: number): void
  onDurationSet(id: number, duration: number): void
  onRatingSet(id: number, rating: number): void
  onFinish(id: number, state: boolean): void
  onStart(id: number, state: boolean): void
  onTitleSet(id: number, title: string): void
}

let Details = ({
  game,
  onDelete,
  onRatingSet,
  onTitleSet,
}: Props) => {
  if (game) {
    let onDeleteClick = useCallback(() => {
      onDelete(game.id)
    }, [ onDelete, game ])

    let onRatingChange = useCallback((rating: number) => {
      onRatingSet(game.id, rating)
    }, [ game, onRatingSet ])

    let onTitleChange = useCallback((title: string) => {
      onTitleSet(game.id, title)
    }, [ game, onTitleSet ])

    return (
      <div class="details">
        <GameTitle text={game.name} onChange={onTitleChange} />
        <div class="metadata">
          <Rating onChange={onRatingChange} rating={game.rating ?? 0} />
          <span class="spacer"></span>
          <Trash onClick={onDeleteClick} />
        </div>
        <Timeline id={game.id} />
      </div>
    )
  } else {
    return (
      <p>Select a game</p>
    )
  }
}

export default Details