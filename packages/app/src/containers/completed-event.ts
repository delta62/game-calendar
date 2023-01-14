import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { State, actionCreators, selectors } from '@store'
import CompletedEvent from '@components/completed-event'

export interface Props {
  game: number
}

let mapState = (state: State, { game }: Props) => ({
  completeDuration: selectors.getCompleteDuration(state, game)
})

let mapDispatch = (dispatch: Dispatch, ownProps: Props) => ({
  onCompleteGame() {
    dispatch(actionCreators.completeGame(ownProps.game, true))
  },
  onSetCompleteDuration(duration: number) {
    dispatch(actionCreators.setCompleteDuration(ownProps.game, duration))
  },
  onUncompleteGame() {
    dispatch(actionCreators.completeGame(ownProps.game, false))
  },
})

export default connect(mapState, mapDispatch)(CompletedEvent)
