import { combineReducers } from 'redux'

import games from './games'
import selectedGame from './selected-game'

export default combineReducers({
  games,
  selectedGame,
})
