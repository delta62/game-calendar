import { format } from "date-fns"

import Button from './button'

export interface Props {
  onStartPlaying(): void
  onStopPlaying(): void
  time?: number
}

export default ({ onStartPlaying, onStopPlaying, time }: Props) => {
  if (!time) {
    return (
      <>
        <p>Not started yet</p>
        <Button text="Start playing" type="primary" onClick={onStartPlaying} />
      </>
    )
  }

  return (
    <>
      <p>Started on {format(time, 'LLL do yyyy')}</p>
      <Button text="Stop playing" onClick={onStopPlaying} />
    </>
  )
}
