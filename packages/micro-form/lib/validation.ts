import { FormItem } from './context.js'

export type Validator = (
  field: string,
  fields: Record<string, FormItem>
) => string | false

const EMAIL_REGEX = /^.+@.+\..{3,}$/

export let email: Validator = email => (
  EMAIL_REGEX.test(email) ? false : 'Invalid email address'
)

export let required: Validator = value => !!value ? false : 'Required'

export let compose = (v1: Validator, v2: Validator | undefined): Validator => {
  v2 ||= () => false
  return (field, fields) => v1(field, fields) || v2!(field, fields)
}
