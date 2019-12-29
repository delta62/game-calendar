import { h, render } from 'preact'
import { Provider } from 'react-redux'


import store from './store'
import App from './containers/app'
import { migrate, needsMigration } from './migrations'

if (needsMigration()) {
    migrate()
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.bundle.js')
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.body
)
