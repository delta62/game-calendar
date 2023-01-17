import { actionCreators, selectors, State } from '@store'
import { format } from 'date-fns'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@components/button'
import Time from '@components/time'

export interface Props {
  game: number
  time?: number
}

export default ({ game, time }: Props) => {
  let dispatch = useDispatch()
  let finishDuration = useSelector<State, number | undefined>(state =>
    selectors.getFinishDuration(state, game)
  )

  let onSetFinishDuration = useCallback(
    (duration: number) => {
      dispatch(actionCreators.setFinishDuration(game, duration))
    },
    [dispatch, game]
  )

  let onFinishGame = useCallback(() => {
    dispatch(actionCreators.finishGame(game, true))
  }, [dispatch, game])

  let onUnfinishGame = useCallback(() => {
    dispatch(actionCreators.finishGame(game, false))
  }, [dispatch, game])

  if (time) {
    return (
      <>
        <p>Finished on {format(time, 'LLL do yyyy')}</p>
        <Time value={finishDuration} onChange={onSetFinishDuration} />
        <Button text="Mark as unfinished" onClick={onUnfinishGame} />
      </>
    )
  }

  return (
    <>
      <p>Not finished yet</p>
      <Button text="Game cleared" type="primary" onClick={onFinishGame} />
    </>
  )
}
