import { Validator } from 'forms'

export let sameAs = (field: string): Validator => (value, values) => {
  if (values[field].error) {
    //console.log('error in the other field', values[field])
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
