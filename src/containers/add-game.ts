import { connect } from 'react-redux'

import { AsyncAction, State, addGame, getUserId } from '@store'
import AddGame from '@components/add-game'

export interface Props {
  userId: string
}

let mapState = (state: State) => ({
  userId: getUserId(state),
})

let mapDispatch = {
  addGame: (name: string): AsyncAction => (dispatch, getState) => {
    let userId = getUserId(getState())
    if (userId) {
      dispatch(addGame(userId, name))
    }
  },
}

export default connect(mapState, mapDispatch)(AddGame)
