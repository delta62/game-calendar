import AddGame from '@containers/add-game'
import GameList from '@containers/game-list'
import Details from '@containers/details'
import { useSelection } from '@context/selection'
import { Redirect } from '../router'

import './app.scss'

export interface Props {
  isLoggedIn: boolean
}

let App = ({ isLoggedIn }: Props) => {
  let [selectedId] = useSelection()

  return (
    <>
      <Redirect to="/login" when={!isLoggedIn} />
      <section class="sidebar">
        <AddGame />
        <GameList />
      </section>
      <section class="main-pane">
        <Details game={selectedId} />
      </section>
    </>
  )
}

export default App
