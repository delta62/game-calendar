import { useContext, useEffect } from 'react'
import { RouteContext, Redirect } from '@delta62/micro-router'
import { useSelector } from 'react-redux'

import AddGame from '@components/add-game'
import Details from '@components/details'
import { AllGamesList } from '@components/game-list'
import { selectors } from '@store'

import styles from './styles.scss'
import { Splash } from '@components/splash'

let App = () => {
  let isLoggedIn = useSelector(selectors.getIsLoggedIn)
  let isLoading = useSelector(selectors.getIsLoading)
  let { params } = useContext(RouteContext)
  let game = params.game ? parseInt(params.game, 10) : null

  useEffect(() => {
    if (game) {
      document.getElementById('app')!.classList.add('game-selected')
    } else {
      document.getElementById('app')!.classList.remove('game-selected')
    }
  }, [game])

  return (
    <>
      <Redirect to="/login" when={!isLoggedIn} />
      <section className={styles.sidebar}>
        <AddGame />
        <AllGamesList />
      </section>
      <section className={styles.mainPane}>
        <Details gameId={game} />
      </section>
      <Splash isLoading={isLoading} />
    </>
  )
}

export default App
