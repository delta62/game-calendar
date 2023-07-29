import { useCallback } from 'react'
import { Form, FormItem } from '@delta62/micro-form'
import { Anchor, Redirect } from '@delta62/micro-router'
import Page from '@components/page'
import { minLength } from '../../validators'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators, selectors } from '@store'
import { useFormTheme } from 'hooks/form-theme'

import styles from './styles.scss'

interface FormValues {
  email: string
  password: string
}

let passwordValidator = minLength(8)

let LoginPage = () => {
  let classNames = useFormTheme()
  let isLoggedIn = useSelector(selectors.getIsLoggedIn)
  let dispatch = useDispatch()

  let onSubmit = useCallback(
    ({ email, password }: FormValues) => {
      dispatch(actionCreators.loginRequest(email, password))
    },
    [dispatch]
  )

  return (
    <Page title="Log in">
      <Redirect to="/" when={isLoggedIn} />
      <Form onSubmit={onSubmit} classNames={classNames}>
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
