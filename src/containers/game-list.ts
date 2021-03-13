import { connect } from 'react-redux'

import GameList from '@components/game-list'
import { State, actionCreators, selectors } from '@store'

let mapState = (state: State) => ({
  games: selectors.getGames(state),
  nextPage: selectors.getNextPage(state),
  userId: selectors.getUserId(state),
})

let mapDispatch = {
  fetchGames: actionCreators.fetchRequest,
}

export default connect(mapState, mapDispatch)(GameList)
