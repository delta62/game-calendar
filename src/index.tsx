import { Provider } from 'react-redux'
import { render } from 'preact'

import store from '@store'
import { SelectionProvider } from '@context/selection'
import { Route, RouteProvider } from './router'
import App from '@components/app'
import LoginPage from '@containers/login-page'

store.dispatch({ type: 'FETCH_GAMES' })

render(
  <RouteProvider>
    <SelectionProvider>
      <Provider store={store}>
        <Route path="/">
          <App />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Provider>
      </SelectionProvider>
  </RouteProvider>,
  document.body
)
