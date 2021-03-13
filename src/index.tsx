import 'preact/debug'
import { Provider } from 'react-redux'
import { render } from 'preact'

import store from '@store'
import { Route, RouteProvider } from './router'
import App from '@containers/app'
import LoginPage from '@containers/login-page'
import SignUpPage from '@containers/sign-up-page'

render(
  <RouteProvider>
    <Provider store={store}>
      <Route path={[ '/games/?game', '/' ]}>
        <App />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/signup">
        <SignUpPage />
      </Route>
    </Provider>
  </RouteProvider>,
  document.body,
)
