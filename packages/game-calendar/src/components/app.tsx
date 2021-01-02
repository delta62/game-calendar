import AddGame from '@containers/add-game'
import GameList from '@containers/game-list'
import Details from '@containers/details'
import { getGames } from '@store'
import { useSelection } from '@context/selection'

import './app.scss'

let App = () => {
  let [selectedId] = useSelection()

  return (
    <>
      <section class="sidebar">
        <AddGame />
        <GameList selector={getGames} />
      </section>
      <section class="main-pane">
        <Details game={selectedId} />
      </section>
    </>
  )
}

export default App
