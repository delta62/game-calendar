import { connect } from 'react-redux'

import { State, addGame } from '@store'
import AddGame from '@components/add-game'

let mapState = (_state: State) => ({ })

let mapDispatch = {
  addGame,
}

export default connect(mapState, mapDispatch)(AddGame)
