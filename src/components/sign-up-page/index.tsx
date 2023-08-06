import { useCallback } from 'react'
import { TypedForm } from '@delta62/micro-form'
import { Anchor, Redirect } from '@delta62/micro-router'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators, selectors } from '@store'
import { Page } from '@components'
import { sameAs, minLength } from '../../validators'
import { useFormTheme } from 'hooks/form-theme'
import styles from './styles.scss'

interface FormValues {
  email: string
  password: string
  confirm: string
}

let { Form, FormItem: Field } = TypedForm<FormValues>()
let confirmValidator = sameAs('password')
let passwordValidator = minLength(8)

export let SignUpPage = () => {
  let classNames = useFormTheme()
  let isLoggedIn = useSelector(selectors.getIsLoggedIn)
  let dispatch = useDispatch()

  let onSubmit = useCallback(
    ({ email, password }: FormValues) => {
      dispatch(actionCreators.signupRequest(email, password))
    },
    [dispatch]
  )

  return (
    <Page title="Sign Up">
      <Redirect to="/" when={isLoggedIn} />
      <Form onSubmit={onSubmit} classNames={classNames}>
        <Field name="email" label="Email" type="email" />
        <Field
          name="password"
          label="Password"
          type="password"
          validate={passwordValidator}
        />
        <Field
          name="confirm"
          label="Confirm"
          type="password"
          validate={confirmValidator}
        />
        <Field label="Sign Up" type="submit" />
      </Form>
      <Anchor className={styles.login} href="/login">
        Log In
      </Anchor>
    </Page>
  )
}
