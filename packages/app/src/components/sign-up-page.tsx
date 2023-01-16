import { useCallback } from 'react'
import { Form, FormItem } from '@delta62/micro-form'
import { Anchor, Redirect } from '@delta62/micro-router'
import { useDispatch } from 'react-redux'

import Page from '@components/page'
import { sameAs, minLength } from '../validators'

import './sign-up-page.scss'

let confirmValidator = sameAs('password')
let passwordValidator = minLength(8)

let SignUpPage = () => {
  let dispatch = useDispatch()

  let onSubmit = useCallback(
    (values: unknown) => {
      console.log('onSubmit', values)
    },
    [dispatch]
  )

  return (
    <Page className="sign-up" title="Sign Up">
      <Redirect to="/" when={false} />
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
      <Anchor className="login" href="/login">
        Log In
      </Anchor>
    </Page>
  )
}

export default SignUpPage
