import { useCallback, useContext } from 'preact/hooks'

import Context from './context'

export interface Props {
  label: string
}

let Submit = ({ label }: Props) => {
  let { fields, onSubmit } = useContext(Context)
  let disabled = Object.values(fields).some(({ error }) => error !== false)

  let onSubmitClick = useCallback((e: Event) => {
    onSubmit()
    e.preventDefault()
  }, [ onSubmit ])

  return (
    <input type="submit" value={label} onClick={onSubmitClick} disabled={disabled} />
  )
}

export default Submit
