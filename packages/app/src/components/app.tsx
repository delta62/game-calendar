import { useContext, useEffect } from 'react'
import { Context, Redirect } from '@delta62/micro-router'
import { useSelector } from 'react-redux'

import AddGame from '@components/add-game'
import Details from '@components/details'
import Sidebar from '@components/sidebar'
import { selectors } from '@store'

import './app.scss'

let App = () => {
  let isLoggedIn = useSelector(selectors.getIsLoggedIn)

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
      <section className="sidebar">
        <AddGame />
        <Sidebar />
      </section>
      <section className="main-pane">
        <Details gameId={game} />
      </section>
    </>
  )
}

export default App
