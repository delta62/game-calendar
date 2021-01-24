import { useCallback } from 'preact/hooks'

import { Anchor, Redirect } from '../router'
import Page from '@components/page'
import Form from '@components/form'
import FormItem from '@components/form-item'

import './sign-up-page.scss'

export interface Props {
  onSignUp(username: string, password: string): void
}

let sameAs = (field: string) => (value: string, values: Record<string, string>): boolean => (
  value === values[field]
)

let minLength = (minLength: number) => (value: string): boolean => (
  value.length >= minLength
)

let SignUpPage = ({ onSignUp }: Props) => {
  let onSubmit = useCallback((values: unknown) => {
    console.log('onSubmit', values)
  }, [ onSignUp ])

  return (
    <Page title="Sign Up">
      <Redirect to="/" when={false} />
      <Form onSubmit={onSubmit}>
        <FormItem name="email" label="Email" type="email" />
        <FormItem name="password" label="Password" type="password" validate={minLength(8)} />
        <FormItem name="confirm" label="Confirm" type="password" validate={sameAs('password')} />
        <FormItem name="submit" label="Sign Up" type="submit" />
      </Form>
      <Anchor className="login" href="/login">Log In</Anchor>
    </Page>
  )
}

export default SignUpPage
