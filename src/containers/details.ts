import { connect } from 'react-redux'

import {
  State,
  getGame,
  deleteGame,
  setDuration,
  setRating,
  setTitle,
} from '@store'
import Details from '@components/details'

export interface Props {
  game: number | null
}

let mapState = (state: State, ownProps: Props) => ({
  game: ownProps.game ? getGame(state, ownProps.game) : null,
})

let mapDispatch = {
  onDelete: deleteGame,
  onRatingSet: setRating,
  onDurationSet: setDuration,
  onTitleSet: setTitle,
}

export default connect(mapState, mapDispatch)(Details)
