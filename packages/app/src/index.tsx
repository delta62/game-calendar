import { Provider } from 'react-redux'
import { render } from 'preact'
import { Route, RouteProvider } from '@delta62/micro-router'

import store from '@store'
import App from '@containers/app'
import LoginPage from '@containers/login-page'
import SignUpPage from '@containers/sign-up-page'

let XProvider = Provider as any

render(
  <RouteProvider>
    <XProvider store={store}>
      <>
        <Route path={['/games/?game', '/']}>
          <App />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
      </>
    </XProvider>
  </RouteProvider>,
  document.body
)
