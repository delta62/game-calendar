import { useRef, useCallback } from 'react'

import './duration.scss'

export interface Props {
  onChange(value: number): void
  value: number
}

const MS_TO_MINUTE = 1000 * 60
const MS_TO_HOUR = MS_TO_MINUTE * 60

let Duration = ({ onChange, value }: Props) => {
  let hoursRef = useRef<HTMLInputElement>(null)
  let minutesRef = useRef<HTMLInputElement>(null)

  let hours = Math.floor(value / MS_TO_HOUR)
  let minutes = Math.floor((value - hours * MS_TO_HOUR) / MS_TO_MINUTE)

  let onValueChange = useCallback(() => {
    let hoursVal = parseInt(hoursRef.current?.value ?? '0', 10)
    let minutesVal = parseInt(minutesRef.current?.value ?? '0', 10)

    let newVal = hoursVal * MS_TO_HOUR + minutesVal * MS_TO_MINUTE

    onChange(newVal)
  }, [onChange, hoursRef, minutesRef])

  return (
    <div className="duration">
      <label className="form-item">
        <input
          className="hours"
          ref={hoursRef}
          type="number"
          value={hours}
          onChange={onValueChange}
        />
        hours
      </label>
      <label className="form-item">
        <input
          className="minutes"
          ref={minutesRef}
          type="number"
          value={minutes}
          onChange={onValueChange}
        />
        minutes
      </label>
    </div>
  )
}

export default Duration
