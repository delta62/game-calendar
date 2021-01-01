import { format } from "date-fns"

import Button from './button'

export interface Props {
  onCompleteGame(): void
  onUncompleteGame(): void
  time?: number
}

export default ({ onCompleteGame, onUncompleteGame, time }: Props) => {
  if (time) {
    return (
      <>
        <p>100% complete on {format(time, 'LLL do yyyy')}</p>
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
