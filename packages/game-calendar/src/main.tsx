import { Provider } from "react-redux"
import { render } from "preact"

import store from './data/store'
import { SelectionProvider } from './context/selection'
import App from './components/app'

render(
  <SelectionProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SelectionProvider>,
  document.body,
)
