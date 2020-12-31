import { useCallback } from 'preact/hooks'

import GameTitle from './game-title'
import Progress from './progress'
import { Game } from '../data/store'
import Duration from './duration'
import Rating from './rating'
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
  onComplete,
  onDelete,
  onFinish,
  onStart,
  onRatingSet,
  onDurationSet,
  onTitleSet,
}: Props) => {
  if (game) {
    let onDeleteClick = useCallback(() => {
      onDelete(game.id)
    }, [ onDelete, game ])

    let startDisabled = !!game.finished
    let finishDisabled = !game.started || !!game.completed
    let completeDisabled = !game.finished

    let onStartClick = useCallback(() => {
      onStart(game.id, !game.started)
    }, [ onStart, game ])

    let onFinishClick = useCallback(() => {
      onFinish(game.id, !game.finished)
    }, [ onFinish, game ])

    let onCompleteClick = useCallback(() => {
      onComplete(game.id, !game.completed)
    }, [ onComplete, game ])

    let onDurationChange = useCallback((duration: number) => {
      onDurationSet(game.id, duration)
    }, [ onDurationSet, game ])

    let onRatingChange = useCallback((rating: number) => {
      onRatingSet(game.id, rating)
    }, [ game, onRatingSet ])

    let onTitleChange = useCallback((title: string) => {
      onTitleSet(game.id, title)
    }, [ game, onTitleSet ])

    return (
      <div class="details">
        <GameTitle text={game.name} onChange={onTitleChange} />

        <Rating onChange={onRatingChange} rating={game.rating ?? 0} />

        <Progress
          startDate={game.started}
          finishDate={game.finished}
          completeDate={game.completed}
        />

        <input type="button" value="Delete" onClick={onDeleteClick} />

        <input
          type="button"
          disabled={startDisabled}
          value="Start playing"
          onClick={onStartClick}
        />

        <input
          type="button"
          disabled={finishDisabled}
          value="Finished"
          onClick={onFinishClick}
        />

        <input
          type="button"
          disabled={completeDisabled}
          value="100% Complete"
          onClick={onCompleteClick}
        />

        <Duration onChange={onDurationChange} value={game.duration ?? 0} />
      </div>
    )
  } else {
    return (
      <p>Select a game</p>
    )
  }
}

export default Details
