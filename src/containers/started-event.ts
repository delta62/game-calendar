import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import StartedEvent from '@components/started-event'
import { State, actionCreators } from '@store'

export interface Props {
  game: number
}

let mapState = (_state: State) => ({})

let mapDispatch = (dispatch: Dispatch, ownProps: Props) => ({
  onStartPlaying: () => dispatch(actionCreators.startGame(ownProps.game, true)),
  onStopPlaying: () => dispatch(actionCreators.startGame(ownProps.game, false)),
})

export default connect(mapState, mapDispatch)(StartedEvent)
