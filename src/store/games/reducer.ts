import { combineReducers } from 'redux'

import Action, {
  ADD_GAME,
  DELETE_GAME,
  FETCH_SUCCESS,
  REORDER_GAME,
  UPDATE_GAME,
} from './actions'
import { Game } from './models'

type AllIds = number[]
type ById = Record<number, Game>

let allIds = (state: AllIds = [], action: Action): AllIds => {
  switch (action.type) {
    case ADD_GAME:
      return [...state, action.id]
    case DELETE_GAME:
      return state.filter(x => x !== action.id)
    case REORDER_GAME:
      let newState = state.filter(x => x !== action.id)
      let targetIdx = newState.findIndex(x => x === action.target)

      if (!action.before) {
        targetIdx += 1
      }

      newState.splice(targetIdx, 0, action.id)

      return newState
    case FETCH_SUCCESS:
      return action.games.map(game => game.id)
    default:
      return state
  }
}

let byId = (state: ById = {}, action: Action): ById => {
  switch (action.type) {
    case ADD_GAME:
      return {
        ...state,
        [action.id]: { id: action.id, name: action.name },
      }
    case DELETE_GAME:
      let newState = { ...state }
      delete newState[action.id]
      return newState
    case UPDATE_GAME:
      return {
        ...state,
        [action.game.id]: { ...state[action.game.id], ...action.game },
      }
    case FETCH_SUCCESS:
      return action.games.reduce((acc, game) => {
        acc[game.id] = game
        return acc
      }, {} as ById)
    default:
      return state
  }
}

export default combineReducers({ byId, allIds })
