import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { Route, RouteProvider } from '@delta62/micro-router'

import store from '@store'
import App from '@containers/app'
import LoginPage from '@containers/login-page'
import SignUpPage from '@containers/sign-up-page'

let root = createRoot(document.body)
root.render(
  <RouteProvider>
    <Provider store={store}>
      <Route path={['/games/?game', '/']}>
        <App />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/signup">
        <SignUpPage />
      </Route>
    </Provider>
  </RouteProvider>
)
