import { h, render } from 'preact'
import { Provider } from 'react-redux'

import { migrate, needsMigration } from './migrations'
import store from './store'
import App from './containers/app'

// Run migrations before setting the store up
if (needsMigration()) {
    migrate()
    // localstorage doesn't take immediately. Re-load the page after updating the data.
    window.location.reload()
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
