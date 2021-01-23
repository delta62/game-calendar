import { connect } from 'react-redux'

import { State, actionCreators, selectors } from '@store'
import Details from '@components/details'

export interface Props {
  game: number | null
}

let mapState = (state: State, ownProps: Props) => ({
  game: ownProps.game ? selectors.getGame(state, ownProps.game) : null,
  hasGames: selectors.hasGames(state),
  platforms: selectors.getPlatformOptions(state),
})

let mapDispatch = {
  onDelete: actionCreators.deleteGame,
  onRatingSet: actionCreators.setRating,
  onPlatformSet: actionCreators.setPlatform,
  onDurationSet: actionCreators.setDuration,
  onTitleSet: actionCreators.setTitle,
}

export default connect(mapState, mapDispatch)(Details)
