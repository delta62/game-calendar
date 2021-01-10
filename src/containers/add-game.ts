import { connect } from 'react-redux'

import { State, selectors, actionCreators } from '@store'
import AddGame from '@components/add-game'

export interface Props {
  userId: string
}

let mapState = (state: State) => ({
  userId: selectors.getUserId(state),
})

let mapDispatch = {
  addGame: actionCreators.addGame,
}

export default connect(mapState, mapDispatch)(AddGame)
