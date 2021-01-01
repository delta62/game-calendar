import { format } from "date-fns"

export interface Props {
  time?: number
}

export default ({ time }: Props) => {
  if (!time) {
    return (
      <h3>Not started yet</h3>
    )
  }

  return (
    <h3>Started on {format(time, 'LLL do yyyy')}</h3>
  )
}
