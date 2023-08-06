import { useCallback, useContext } from 'react'
import { TypedForm } from '@delta62/micro-form'
import { Anchor, Redirect, RouteContext } from '@delta62/micro-router'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators, selectors } from '@store'
import { Page } from '@components'
import { useFormTheme } from 'hooks/form-theme'
import styles from './styles.scss'

interface FormValues {
  email: string
}

let { Form, FormItem: Field } = TypedForm<FormValues>()

export let ForgotPasswordPage = () => {
  let classNames = useFormTheme()
  let isLoggedIn = useSelector(selectors.getIsLoggedIn)
  let dispatch = useDispatch()
  let { setPath } = useContext(RouteContext)

  let onSubmit = useCallback(
    ({ email }: FormValues) => {
      dispatch(actionCreators.forgotPassword(email))
      setPath('/login')
    },
    [dispatch]
  )

  return (
    <Page title="Forgot Password">
      <Redirect to="/" when={isLoggedIn} />
      <Form onSubmit={onSubmit} classNames={classNames}>
        <Field name="email" label="Email" type="email" />
        <Field label="Recover Password" type="submit" />
      </Form>
      <Anchor className={styles.login} href="/login">
        Back to login
      </Anchor>
    </Page>
  )
}
