import { useCallback } from 'react'
import { FieldValues, Form, FormItem } from '@delta62/micro-form'
import { Anchor, Redirect } from '@delta62/micro-router'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators, selectors } from '@store'
import Page from '@components/page'
import { sameAs, minLength } from '../../validators'

import styles from './styles.scss'

let confirmValidator = sameAs('password')
let passwordValidator = minLength(8)

let SignUpPage = () => {
  let isLoggedIn = useSelector(selectors.getIsLoggedIn)
  let dispatch = useDispatch()

  let onSubmit = useCallback(
    (fields: FieldValues) => {
      dispatch(actionCreators.signupRequest(fields.email!, fields.password!))
    },
    [dispatch]
  )

  return (
    <Page title="Sign Up">
      <Redirect to="/" when={isLoggedIn} />
      <Form onSubmit={onSubmit}>
        <FormItem name="email" label="Email" type="email" />
        <FormItem
          name="password"
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
      <Anchor className={styles.login} href="/login">
        Log In
      </Anchor>
    </Page>
  )
}

export default SignUpPage