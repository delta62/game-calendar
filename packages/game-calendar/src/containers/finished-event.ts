import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { State, actionCreators, selectors } from '@store'
import FinishedEvent from '@components/finished-event'

export interface Props {
  game: number
}

let mapState = (state: State, { game }: Props) => ({
  finishDuration: selectors.getFinishDuration(state, game),
})

let mapDispatch = (dispatch: Dispatch, ownProps: Props) => ({
  onFinishGame() {
    dispatch(actionCreators.finishGame(ownProps.game, true))
  },
  onUnfinishGame() {
    dispatch(actionCreators.finishGame(ownProps.game, false))
  },
  onSetFinishDuration(duration: number) {
    dispatch(actionCreators.setFinishDuration(ownProps.game, duration))
  },
})

export default connect(mapState, mapDispatch)(FinishedEvent)
