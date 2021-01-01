import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import StartedEvent from '../components/started-event'
import { State, startGame } from '../data/store'

export interface Props {
  game: number
}

let mapState = (_state: State) => ({ })

let mapDispatch = (dispatch: Dispatch, ownProps: Props) => ({
  onStartPlaying: () => dispatch(startGame(ownProps.game, true)),
  onStopPlaying: () => dispatch(startGame(ownProps.game, false)),
})

export default connect(mapState, mapDispatch)(StartedEvent)
