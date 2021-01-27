import Submit from './submit'
import Input from './input'
import { Validator } from './validation'

export interface SubmitProps {
  label: string
  type: 'submit'
}

interface NonSubmitProps {
  label: string
  name: string
  type: 'email' | 'password'
  validate?: Validator
}

export type Props = SubmitProps | NonSubmitProps

let FormItem = ({ label, type, ...props }: Props) => {
  switch (type) {
    case 'submit':
      return <Submit label={label} />
    default:
      return <Input
        label={label}
        name={(props as NonSubmitProps).name}
        type={type}
        validate={(props as NonSubmitProps).validate}
      />
  }
}

export default FormItem
