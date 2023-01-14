import { format } from 'date-fns'

import Button from './button'
import Time from './time'

export interface Props {
  finishDuration?: number
  onFinishGame(): void
  onSetFinishDuration(duration: number): void
  onUnfinishGame(): void
  time?: number
}

export default ({
  finishDuration,
  onFinishGame,
  onSetFinishDuration,
  onUnfinishGame,
  time,
}: Props) => {
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
