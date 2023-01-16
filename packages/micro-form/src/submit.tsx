import { useCallback, useContext } from 'react'
import Context from './context.js'

export interface Props {
  label: string
}

let Submit = ({ label }: Props) => {
  let { fields, onSubmit } = useContext(Context)
  let disabled = Object.values(fields).some(({ error }) => error !== false)
  let onSubmitClick = useCallback(
    (e: React.MouseEvent) => {
      onSubmit()
      e.preventDefault()
    },
    [onSubmit]
  )

  return (
    <input
      type="submit"
      value={label}
      onClick={onSubmitClick}
      disabled={disabled}
    />
  )
}

export default Submit
