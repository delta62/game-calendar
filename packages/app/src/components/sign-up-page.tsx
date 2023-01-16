import { useCallback } from 'react'
import { Form, FormItem } from '@delta62/micro-form'
import { Anchor, Redirect } from '@delta62/micro-router'
import { useDispatch } from 'react-redux'

import { actionCreators } from '@store'
import Page from '@components/page'
import { sameAs, minLength } from '../validators'

import styles from './sign-up-page.scss'

interface Fields {
  email: string
  password: string
}

let confirmValidator = sameAs('password')
let passwordValidator = minLength(8)

let SignUpPage = () => {
  let dispatch = useDispatch()

  let onSubmit = useCallback(
    (fields: Fields) => {
      dispatch(actionCreators.signupRequest(fields.email, fields.password))
    },
    [dispatch]
  )

  return (
    <Page title="Sign Up">
      <Redirect to="/" when={false} />
      <Form<Fields> onSubmit={onSubmit}>
        <FormItem<Fields> name="email" label="Email" type="email" />
        <FormItem<Fields>
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
