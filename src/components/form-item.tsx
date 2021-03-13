import classnames from 'classnames'
import { RenderableProps } from 'preact'
import { useCallback, useContext, useRef, useState } from 'preact/hooks'

import { FormContext } from './form'

import './form-item.scss'

export type Validator = (value: string, allValues: Record<string, string>) => boolean
export type ItemType = 'email' | 'password' | 'submit'

export interface Props {
  name: string
  label: string
  type: ItemType
  validate?: Validator
}

const EMAIL_REGEX = /^.+@.+\..{2,}$/

let defaultValidator: Validator = value => !!value
let validateEmail: Validator = email => EMAIL_REGEX.test(email)

let compose = (...validators: (Validator | undefined)[]): Validator => (
  (value, allValues) => validators.every(v => !v || v(value, allValues))
)

let FormItem = ({ label, name, type, validate }: RenderableProps<Props>) => {
  let { fields, setField } = useContext(FormContext)
  let [isValid, setIsValid] = useState(false)
  let [touched, setTouched] = useState(false)
  let ref = useRef<HTMLInputElement>()

  let onChange = useCallback(() => {
    setTouched(true)
    let value = ref.current?.value ?? ''
    let validator: Validator

    switch (type) {
      case 'email':
        validator = compose(validateEmail, validate)
        break
      default:
        validator = compose(defaultValidator, validate)
    }

    let result = value ? validator(value, fields) : false

    if (result) {
      setField(name, value)
      setIsValid(true)
    } else {
      setField(name, '')
      setIsValid(false)
    }
  }, [ fields, ref.current, validate, setField, setTouched ])

  return (
    <label class={classnames("form-item", { invalid: !isValid, touched })}>
      <span class="form-item-label">{label}</span>
      <input class="form-item-field" ref={ref} type={type} onChange={onChange} />
    </label>
  )
}

export default FormItem
