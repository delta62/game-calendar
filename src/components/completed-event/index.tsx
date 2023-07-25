import { format } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'

import TimelineItem from '@components/timeline-item'
import { State, actionCreators, selectors } from '@store'
import Time from '@components/time'
import { useCallback } from 'react'

export interface Props {
  game: number
  time?: number
}

export default ({ game, time }: Props) => {
  let dispatch = useDispatch()
  let completeDuration = useSelector<State, number | undefined>(state =>
    selectors.getCompleteDuration(state, game)
  )

  let onUncompleteGame = useCallback(() => {
    dispatch(actionCreators.completeGame(game, false))
  }, [dispatch, game])

  let onSetCompleteDuration = useCallback(
    (duration: number) => {
      dispatch(actionCreators.setCompleteDuration(game, duration))
    },
    [dispatch, game]
  )

  let onCompleteGame = useCallback(() => {
    dispatch(actionCreators.completeGame(game, true))
  }, [dispatch, game])

  if (time) {
    return (
      <TimelineItem
        label={`100% complete on ${format(time, 'LLL do yyyy')}`}
        callToAction="Mark as incomplete"
        callToActionClick={onUncompleteGame}
      >
        <Time value={completeDuration} onChange={onSetCompleteDuration} />
      </TimelineItem>
    )
  }

  return (
    <TimelineItem
      label="Not 100% completed yet"
      callToAction="Mark as 100% complete"
      callToActionClick={onCompleteGame}
    ></TimelineItem>
  )
}
