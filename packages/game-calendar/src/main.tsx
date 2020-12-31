import { render } from "preact"
import { Provider } from "react-redux"

import AddGame from './containers/add-game'
import GameList from './containers/game-list'
import Details from './containers/details'
import store, { getGames } from './data/store'
import './components/app.scss'

render(
  <Provider store={store}>
    <section class="sidebar">
      <AddGame />
      <GameList selector={getGames} />
    </section>
    <section class="main-pane">
      <Details />
    </section>
  </Provider>,
  document.body
)
