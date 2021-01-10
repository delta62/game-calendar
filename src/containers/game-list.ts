import { connect } from 'react-redux'

import GameList from '@components/game-list'
import { Dispatch, State, fetchGames, getGames, getUserId } from '@store'

let mapState = (state: State) => ({
  games: getGames(state),
  userId: getUserId(state),
})

let mapDispatch = (dispatch: Dispatch) => ({
  fetchGames: (userId: string | null) => userId && dispatch(fetchGames(userId)),
})

export default connect(mapState, mapDispatch)(GameList)
