import { JSX } from 'preact'
import { useCallback, useContext, useEffect, useState } from 'preact/hooks'
import classnames from 'classnames'

import { Validator, compose, email, required } from './validation.js'
import Context from './context.js'

export interface Props {
  label: string
  name: string
  type: 'email' | 'password'
  validate?: Validator
}

let Input = ({ label, name, type, validate }: Props) => {
  let { addField, fields, setField } = useContext(Context)
  let [touched, setTouched] = useState(false)

  useEffect(() => {
    switch (type) {
      case 'email':
        validate = compose(email, validate)
        break
      case 'password':
        validate = compose(required, validate)
        break
    }

    addField(name, validate)
  }, [ addField, name, type, validate ])

  let onChange = useCallback((event: JSX.TargetedEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value
    setField(name, value)
    setTouched(true)
  }, [ name, setField ])

  let onBlur = useCallback(() => {
    setTouched(true)
  }, [ setTouched ])

  let error = fields[name]?.error
  let invalid = !!error

  return (
    <div class={classnames('form-item', { touched, invalid })}>
      <label>
        <span class="form-item-label">{label}</span>
        <input
          class="form-item-field"
          type={type}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
      <div class="validation-error">{error || '\u00A0'}</div>
    </div>
  )
}

export default Input
