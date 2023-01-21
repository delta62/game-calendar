import { useCallback } from 'react'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'

import { actionCreators } from '@store'
import Button from '@components/button'

import styles from './styles.scss'

export interface Props {
  game: number
  time?: number
}

export default ({ game, time }: Props) => {
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
      <>
        <p className={styles.label}>Not started yet</p>
        <Button text="Start playing" type="primary" onClick={onStartPlaying} />
      </>
    )
  }

  return (
    <>
      <p className={styles.label}>Started on {format(time, 'LLL do yyyy')}</p>
      <Button text="Stop playing" onClick={onStopPlaying} />
    </>
  )
}
