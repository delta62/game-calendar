import { useCallback, useRef } from 'preact/hooks'

import './time.scss'

export interface Props {
  onChange(time: number): void
  value?: number
}

let Time = ({ onChange, value }: Props) => {
  let hoursRef = useRef<HTMLInputElement>(null)
  let minutesRef = useRef<HTMLInputElement>(null)

  let onFieldChanged = useCallback(() => {
    let hours = parseInt(hoursRef.current?.value ?? '0', 10)
    let minutes = parseInt(minutesRef.current?.value ?? '0', 10)

    hours = hours * 60 * 60 * 1000
    minutes = minutes * 60 * 1000

    onChange(hours + minutes)
  }, [hoursRef.current, minutesRef.current, onChange])

  let hoursVal = (value ?? 0) / (60 * 60 * 1000)
  hoursVal = Math.floor(hoursVal)

  let minutesVal = ((value ?? 0) - hoursVal * 60 * 60 * 1000) / (60 * 1000)
  minutesVal = Math.floor(minutesVal)

  return (
    <div class="time">
      <input
        type="number"
        class="hours"
        onChange={onFieldChanged}
        ref={hoursRef}
        value={hoursVal}
      />
      :
      <input
        type="number"
        class="minutes"
        onChange={onFieldChanged}
        ref={minutesRef}
        value={minutesVal}
      />
    </div>
  )
}

export default Time
