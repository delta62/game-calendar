import { useCallback, useRef } from 'react'
import styles from './styles.scss'

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

export let Dropdown = ({ emptyLabel, onChange, options, selected }: Props) => {
  let ref = useRef<HTMLSelectElement>(null)

  let onChangeCb = useCallback(() => {
    if (!ref.current?.value) {
      return
    }

    onChange(ref.current?.value)
  }, [onChange, ref.current])

  return (
    <select
      ref={ref}
      className={styles.dropdown}
      onChange={onChangeCb}
      value={selected ?? ''}
    >
      <option value="">{emptyLabel}</option>
      {options.map(({ name, value }: Option) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  )
}
