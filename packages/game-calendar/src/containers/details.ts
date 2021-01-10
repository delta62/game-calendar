import { connect } from 'react-redux'

import {
  State,
  deleteGame,
  getGame,
  hasGames,
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
  hasGames: hasGames(state),
})

let mapDispatch = {
  onDelete: deleteGame,
  onRatingSet: setRating,
  onDurationSet: setDuration,
  onTitleSet: setTitle,
}

export default connect(mapState, mapDispatch)(Details)
