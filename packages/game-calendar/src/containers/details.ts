import { connect } from 'react-redux'

import { State, getGame, completeGame, deleteGame, finishGame, startGame, setDuration, setRating, setTitle } from '../data/store'
import Details from '../components/details'

let mapState = (state: State) => ({
  game: state.selectedGame ? getGame(state, state.selectedGame) : null,
})

let mapDispatch = {
  onComplete: completeGame,
  onDelete: deleteGame,
  onFinish: finishGame,
  onStart: startGame,
  onRatingSet: setRating,
  onDurationSet: setDuration,
  onTitleSet: setTitle,
}

export default connect(mapState, mapDispatch)(Details)
