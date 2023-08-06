import { Provider as StoreProvider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { Route, RouteProvider } from '@delta62/micro-router'
import store from '@store'
import { App, LoginPage, SignUpPage, ForgotPasswordPage } from '@components'
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
    <StoreProvider store={store}>
      <Route path={['/games/:game', '/']}>
        <App />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/signup">
        <SignUpPage />
      </Route>
      <Route path="/forgot">
        <ForgotPasswordPage />
      </Route>
    </StoreProvider>
  </RouteProvider>
)
