import { useCallback, useRef } from 'preact/hooks'

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
  let ref = useRef<HTMLSelectElement>()

  let onChangeCb = useCallback(() => {
    onChange(ref.current?.value)
  }, [ onChange, ref.current ])

  return (
    <select ref={ref} class="dropdown" onChange={onChangeCb}>
      <option selected={selected === undefined}>{emptyLabel}</option>
      {options.map(({ name, value }: Option) => (
        <option value={value} selected={value === selected}>{name}</option>
      ))}
    </select>
  )
}

export default Dropdown
