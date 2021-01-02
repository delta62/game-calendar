import { format } from 'date-fns'

import Button from './button'

export interface Props {
  onFinishGame(): void
  onUnfinishGame(): void
  time?: number
}

export default ({ onFinishGame, onUnfinishGame, time }: Props) => {
  if (time) {
    return (
      <>
        <p>Finished on {format(time, 'LLL do yyyy')}</p>
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
