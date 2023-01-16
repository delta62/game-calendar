import { createContext, PropsWithChildren, useState } from 'react'

export interface Props {
  onSubmit(values: unknown): void
}

interface Context {
  fields: Record<string, string>
  setField(name: string, value: string): void
}

export let FormContext = createContext<Context>({
  fields: {},
  setField() {},
})
FormContext.displayName = 'Form'

let Form = ({ children }: PropsWithChildren<Props>) => {
  let [fields, setFields] = useState<Record<string, string>>({})

  let setField = (name: string, value: string) => {
    setFields({
      ...fields,
      [name]: value,
    })
  }

  return (
    <FormContext.Provider value={{ fields, setField }}>
      <div className="form">{children}</div>
    </FormContext.Provider>
  )
}

export default Form
