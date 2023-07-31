import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { Route, RouteProvider } from '@delta62/micro-router'

import store from '@store'
import App from '@components/app'
import LoginPage from '@components/login-page'
import { SignUpPage } from '@components/sign-up-page'

import '../global.scss'

if (DEVELOPMENT) {
  new EventSource('/esbuild').addEventListener('change', () =>
    location.reload()
  )
}

let appNode = document.getElementById('app')!
let root = createRoot(appNode)

root.render(
  <RouteProvider>
    <Provider store={store}>
      <Route path={['/games/:game', '/']}>
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
