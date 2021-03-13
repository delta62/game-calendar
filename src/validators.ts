import { Validator } from '@delta62/micro-form'

export let sameAs = (field: string): Validator => (value, values) => {
  if (values[field].error) {
    return `${field} must be valid`
  }

  if (value !== values[field].value) {
    return `Not the same as ${field}`
  }

  return false
}

export let minLength = (minLength: number): Validator => value => (
  value.length >= minLength
    ? false
    : `Must be at least ${minLength} characters`
)
