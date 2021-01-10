import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { actionCreators } from '@store'
import FinishedEvent from '@components/finished-event'

export interface Props {
  game: number
}

let mapState = () => ({})

let mapDispatch = (dispatch: Dispatch, ownProps: Props) => ({
  onFinishGame() {
    dispatch(actionCreators.finishGame(ownProps.game, true))
  },
  onUnfinishGame() {
    dispatch(actionCreators.finishGame(ownProps.game, false))
  },
})

export default connect(mapState, mapDispatch)(FinishedEvent)
