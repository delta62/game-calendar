import { connect } from 'react-redux'

import {
  State,
  getGame,
  getIsActive,
  startGame,
  finishGame,
  completeGame,
  selectGame
} from '../data/store'
import GameListItem from '../components/game-list-item'

export interface Props {
  id: number
}

let mapState = (state: State, { id }: Props) => ({
  active: getIsActive(state, id),
  game: getGame(state, id),
})

let mapDispatch = {
  onSelect: selectGame,
  onStarted: startGame,
  onFinished: finishGame,
  onCompleted: completeGame,
}

export default connect(mapState, mapDispatch)(GameListItem)
