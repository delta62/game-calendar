import { useCallback, useRef } from 'react'

import './dropdown.scss'

export interface Option {
  name: string
  value: string
}

export interface Props {
  emptyLabel: string
  onChange(value: string): void
  options: Option[]
  selected?: string
}

let Dropdown = ({ emptyLabel, onChange, options, selected }: Props) => {
  let ref = useRef<HTMLSelectElement>(null)

  let onChangeCb = useCallback(() => {
    if (!ref.current?.value) {
      return
    }

    onChange(ref.current?.value)
  }, [onChange, ref.current])

  return (
    <select ref={ref} className="dropdown" onChange={onChangeCb}>
      <option selected={selected === undefined}>{emptyLabel}</option>
      {options.map(({ name, value }: Option) => (
        <option value={value} selected={value === selected}>
          {name}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
