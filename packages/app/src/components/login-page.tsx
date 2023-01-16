import { useCallback } from 'react'
import { Form, FormItem } from '@delta62/micro-form'
import { Anchor, Redirect } from '@delta62/micro-router'

import Page from '@components/page'
import { minLength } from '../validators'

import './login-page.scss'

export interface Props {
  isLoggedIn: boolean
  onLogin(email: string, password: string): void
}

let passwordValidator = minLength(8)

let LoginPage = ({ isLoggedIn, onLogin }: Props) => {
  let onSubmit = useCallback(
    (values: Record<string, string>) => {
      onLogin(values.email!, values.password!)
    },
    [onLogin]
  )

  return (
    <Page className="login-page" title="Log in">
      <Redirect to="/" when={isLoggedIn} />
      <Form onSubmit={onSubmit}>
        <FormItem type="email" label="Email" name="email" />
        <FormItem
          type="password"
          label="Password"
          name="password"
          validate={passwordValidator}
        />
        <FormItem type="submit" label="Log in" />
      </Form>
      <Anchor className="login" href="/signup">
        Sign up
      </Anchor>
    </Page>
  )
}

export default LoginPage
