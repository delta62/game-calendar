import { useCallback } from 'react'
import { Form, FormItem } from '@delta62/micro-form'
import { Anchor, Redirect } from '@delta62/micro-router'
import Page from '@components/page'
import { minLength } from '../validators'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators, selectors } from '@store'

import styles from './login-page.scss'

let passwordValidator = minLength(8)

let LoginPage = () => {
  let isLoggedIn = useSelector(selectors.getIsLoggedIn)
  let onLogin = useDispatch()

  let onSubmit = useCallback(
    (values: Record<string, string>) => {
      onLogin(actionCreators.loginRequest(values.email!, values.password!))
    },
    [onLogin]
  )

  return (
    <Page title="Log in">
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
      <Anchor className={styles.login} href="/signup">
        Sign up
      </Anchor>
    </Page>
  )
}

export default LoginPage
