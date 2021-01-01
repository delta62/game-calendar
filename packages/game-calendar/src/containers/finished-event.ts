import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { finishGame } from '../data/store'
import FinishedEvent from '../components/finished-event'

export interface Props {
  game: number
}

let mapState = () => ({ })

let mapDispatch = (dispatch: Dispatch, ownProps: Props) => ({
  onFinishGame() { dispatch(finishGame(ownProps.game, true)) },
  onUnfinishGame() { dispatch(finishGame(ownProps.game, false)) },
})

export default connect(mapState, mapDispatch)(FinishedEvent)
