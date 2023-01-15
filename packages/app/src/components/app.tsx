import { useContext, useEffect } from 'preact/hooks'
import { Context, Redirect } from '@delta62/micro-router'

import AddGame from '@containers/add-game'
import Details from '@containers/details'
import Sidebar from '@components/sidebar'

import './app.scss'

export interface Props {
  isLoggedIn: boolean
}

let App = ({ isLoggedIn }: Props) => {
  let { params } = useContext(Context)
  let game = params.game ? parseInt(params.game, 10) : null

  useEffect(() => {
    if (game) {
      document.body.classList.add('game-selected')
    } else {
      document.body.classList.remove('game-selected')
    }
  }, [game])

  return (
    <>
      <Redirect to="/login" when={!isLoggedIn} />
      <section class="sidebar">
        <AddGame />
        <Sidebar />
      </section>
      <section class="main-pane">
        <Details game={game} />
      </section>
    </>
  )
}

export default App
