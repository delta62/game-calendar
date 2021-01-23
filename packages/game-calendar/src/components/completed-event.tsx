import { format } from 'date-fns'

import Button from './button'
import Time from './time'

export interface Props {
  completeDuration?: number
  onCompleteGame(): void
  onSetCompleteDuration(duration: number): void
  onUncompleteGame(): void
  time?: number
}

export default ({
  completeDuration,
  onCompleteGame,
  onSetCompleteDuration,
  onUncompleteGame,
  time
}: Props) => {
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
