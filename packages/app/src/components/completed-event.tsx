import { format } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'

import { State, actionCreators, selectors } from '@store'
import Button from './button'
import Time from './time'
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
      <>
        <p>100% complete on {format(time, 'LLL do yyyy')}</p>
        <Time value={completeDuration} onChange={onSetCompleteDuration} />
        <Button text="Mark as incomplete" onClick={onUncompleteGame} />
      </>
    )
  }

  return (
    <>
      <p>Not 100% completed yet</p>
      <Button text="Mark as 100% complete" onClick={onCompleteGame} />
    </>
  )
}
