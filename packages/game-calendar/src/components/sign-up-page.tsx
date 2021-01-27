import { useCallback } from 'preact/hooks'
import { Form, FormItem } from '@delta62/micro-form'

import { Anchor, Redirect } from '../router'
import Page from '@components/page'
import { sameAs, minLength } from '../validators'

import './sign-up-page.scss'

export interface Props {
  onSignUp(username: string, password: string): void
}

let confirmValidator = sameAs('password')
let passwordValidator = minLength(8)

let SignUpPage = ({ onSignUp }: Props) => {
  let onSubmit = useCallback((values: unknown) => {
    console.log('onSubmit', values)
  }, [ onSignUp ])

  return (
    <Page className="sign-up" title="Sign Up">
      <Redirect to="/" when={false} />
      <Form onSubmit={onSubmit}>
        <FormItem name="email" label="Email" type="email" />
        <FormItem name="password"
          label="Password"
          type="password"
          validate={passwordValidator}
        />
        <FormItem
          name="confirm"
          label="Confirm"
          type="password"
          validate={confirmValidator}
        />
        <FormItem label="Sign Up" type="submit" />
      </Form>
      <Anchor className="login" href="/login">Log In</Anchor>
    </Page>
  )
}

export default SignUpPage
