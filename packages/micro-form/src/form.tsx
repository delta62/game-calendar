import { PropsWithChildren, useCallback, useState } from 'react'
import FormContext, { FormItem } from './context.js'
import { Validator } from './validation'

export interface Props {
  onSubmit(fields: Record<string, string>): void
}

type Fields = Record<string, FormItem>

const DEFAULT_VALIDATOR: Validator = () => false

let Form = ({ children, ...props }: PropsWithChildren<Props>) => {
  let [fields, setFields] = useState<Fields>({})

  let setField = useCallback(
    (name: string, value: string) => {
      setFields((fields: Fields) => {
        // First update the new value
        let { validator } = fields[name]!
        let error = validator(value, fields)
        let field: FormItem = { error, validator, value }
        let state = Object.assign(Object.assign({}, fields), { [name]: field })

        // Validate everything else
        Object.entries(state).forEach(([key, field]) => {
          state[key]!.error = field.validator(field.value, state)
        })
        return state
      })
    },
    [setFields]
  )

  let addField = useCallback(
    (name: string, validator: Validator = DEFAULT_VALIDATOR) => {
      setFields(fields => ({
        [name]: { error: false, value: '', validator },
        ...fields,
      }))
    },
    [setFields]
  )

  let onSubmit = useCallback(() => {
    let formState = Object.entries(fields).reduce((acc, [key, val]) => {
      acc[key] = val.value
      return acc
    }, {} as Record<string, string>)
    props.onSubmit(formState)
  }, [fields, props.onSubmit])

  return (
    <form className="form">
      <FormContext.Provider value={{ addField, fields, onSubmit, setField }}>
        {children}
      </FormContext.Provider>
    </form>
  )
}

export default Form
