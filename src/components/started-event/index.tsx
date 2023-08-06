import { useCallback } from 'react'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { actionCreators } from '@store'
import { TimelineItem } from '@components'

export interface Props {
  game: number
  time?: number
}

export let StartedEvent = ({ game, time }: Props) => {
  let dispatch = useDispatch()

  let onStartPlaying = useCallback(() => {
    dispatch(actionCreators.startGame(game, true))
  }, [dispatch, game])

  let onStopPlaying = useCallback(
    () => dispatch(actionCreators.startGame(game, false)),
    [dispatch, game]
  )

  if (!time) {
    return (
      <TimelineItem
        label="Not started yet"
        buttonType="primary"
        callToAction="Start playing"
        callToActionClick={onStartPlaying}
        past={false}
      />
    )
  }

  return (
    <TimelineItem
      label={`Started on ${format(time, 'LLL do yyyy')}`}
      callToAction="Stop playing"
      callToActionClick={onStopPlaying}
      past={true}
    />
  )
}
