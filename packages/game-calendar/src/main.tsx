import { h, render } from 'preact'
import { Provider } from 'react-redux'

import store from './store'
import App from './containers/app'

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.bundle.js')
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.body
)
