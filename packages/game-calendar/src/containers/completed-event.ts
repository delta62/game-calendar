import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { actionCreators } from '@store'
import CompletedEvent from '@components/completed-event'

export interface Props {
  game: number
}

let mapState = () => ({})

let mapDispatch = (dispatch: Dispatch, ownProps: Props) => ({
  onCompleteGame() {
    dispatch(actionCreators.completeGame(ownProps.game, true))
  },
  onUncompleteGame() {
    dispatch(actionCreators.completeGame(ownProps.game, false))
  },
})

export default connect(mapState, mapDispatch)(CompletedEvent)
