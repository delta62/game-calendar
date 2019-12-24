import { h, render } from 'preact'
import { Provider } from 'react-redux'

import store from './store'
import App from './containers/app'

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.body
)
