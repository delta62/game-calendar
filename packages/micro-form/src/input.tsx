import { DEFAULT_VALIDATOR, Validator } from './validation.js'
import { useCallback, useContext, useEffect, useState } from 'react'
import classnames from 'classnames'
import { compose, email, required } from './validation.js'
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

  validate ??= DEFAULT_VALIDATOR

  useEffect(() => {
    switch (type) {
      case 'email':
        validate = compose(email, validate!)
        break
      case 'password':
        validate = compose(required, validate!)
        break
    }
    addField(name, validate)
  }, [addField, name, type, validate])

  let onChange = useCallback(
    (event: React.ChangeEvent) => {
      let value = (event.currentTarget as HTMLInputElement).value
      setField(name, value)
      setTouched(true)
    },
    [name, setField]
  )

  let onBlur = useCallback(() => {
    setTouched(true)
  }, [setTouched])

  let error = fields[name]?.error
  let invalid = !!error

  return (
    <div className={classnames('form-item', { touched, invalid })}>
      <label>
        <span className="form-item-label">{label}</span>
      </label>
      <input
        className="form-item-field"
        type={type}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="validation-error">{error || '\u00A0'}</div>
    </div>
  )
}

export default Input
