import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { completeGame } from '../data/store'
import CompletedEvent from '../components/completed-event'

export interface Props {
  game: number
}

let mapState = () => ({ })

let mapDispatch = (dispatch: Dispatch, ownProps: Props) => ({
  onCompleteGame() { dispatch(completeGame(ownProps.game, true)) },
  onUncompleteGame() { dispatch(completeGame(ownProps.game, false)) },
})

export default connect(mapState, mapDispatch)(CompletedEvent)
