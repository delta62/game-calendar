import { useRef, useCallback } from 'preact/hooks'

export interface Props {
  onLogin(email: string, password: string): void
}

let LoginPage = ({ onLogin }: Props) => {
  let email = useRef<HTMLInputElement>(null)
  let password = useRef<HTMLInputElement>(null)

  let onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== 'Enter') {
        return
      }

      let em = email.current?.value.trim()
      let pw = password.current?.value

      if (em && pw) {
        onLogin(em, pw)
        email.current!.value = ''
        password.current!.value = ''
      }
    },
    [onLogin]
  )

  return (
    <div>
      <h1>Log in</h1>
      <input
        ref={email}
        type="email"
        placeholder="Email"
        onKeyDown={onKeyDown}
      />
      <input ref={password} type="password" onKeyDown={onKeyDown} />
    </div>
  )
}

export default LoginPage
