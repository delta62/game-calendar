import { RenderableProps } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import FormContext, { Fields, FormItem } from './context.js'
import { Validator } from './validation.js'

interface Props {
  onSubmit(fields: Record<string, string>): void
}

const DEFAULT_VALIDATOR: Validator = () => false

let Form = ({ children, ...props }: RenderableProps<Props>) => {
  let [fields, setFields] = useState<Fields>({ })

  let setField = useCallback((name: string, value: string) => {
    setFields(fields => {
      // First update the new value
      let { validator } = fields[name]
      let error = validator(value, fields)
      let field: FormItem = { error, validator, value }
      let state = {
        ...fields,
        [name]: field,
      }

      // Validate everything else
      Object.entries(state).forEach(([ key, field ]) => {
        state[key].error = field.validator(field.value, state)
      })

      return state
    })
  }, [ setFields ])

  let addField = useCallback((name: string, validator: Validator = DEFAULT_VALIDATOR) => {
    setFields(fields => ({
      ...fields,
      [name]: { error: '', value: '', validator },
    }))
  }, [ setFields ])

  let onSubmit = useCallback(() => {
    let formState = Object.entries(fields).reduce((acc, [key, val]) => {
      acc[key] = val.value
      return acc
    }, { } as Record<string, string>)
    props.onSubmit(formState)
  }, [ fields, props.onSubmit ])

  return (
    <form class="form">
      <FormContext.Provider value={{ addField, fields, onSubmit, setField }}>
        {children}
      </FormContext.Provider>
    </form>
  )
}

export default Form
