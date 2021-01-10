import { Provider } from 'react-redux'
import { render } from 'preact'

import store from '@store'
import { SelectionProvider } from '@context/selection'
import App from '@components/app'

store.dispatch({ type: 'FETCH_GAMES' })

render(
  <SelectionProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SelectionProvider>,
  document.body
)
