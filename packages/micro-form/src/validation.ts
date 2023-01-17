import { FormItem } from './context.js'

export type Validator = (
  field: string,
  fields: Record<string, FormItem>
) => string | false

const EMAIL_REGEX = /^.+@.+\..{2,}$/
export const DEFAULT_VALIDATOR: Validator = () => false

export let email = (email: string) =>
  EMAIL_REGEX.test(email) ? false : 'Invalid email address'

export let required = (value: string) => (!!value ? false : 'Required')

export let compose = (v1: Validator, v2: Validator): Validator => {
  return (field, fields) => v1(field, fields) || v2(field, fields)
}
