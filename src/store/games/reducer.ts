import { Reducer, combineReducers } from 'redux'

import Action, {
  ADD_GAME,
  DELETE_GAME,
  FETCH_SUCCESS,
  REORDER_GAME,
  UPDATE_GAME,
} from './actions'
import { Game, NextPage, State } from './models'

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
      return state.concat(action.games.map(game => game.id))
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
        [action.game.id]: { ...state[action.game.id]!, ...action.game },
      }
    case FETCH_SUCCESS:
      {
        let newState = action.games.reduce((acc, game) => {
          acc[game.id] = game
          return acc
        }, {} as ById)
        return { ...state, ...newState }
      }
    default:
      return state
  }
}

const DEFAULT_NEXT_PAGE: NextPage = { hasNext: true, next: null }

let nextPage = (state: NextPage = DEFAULT_NEXT_PAGE, action: Action): NextPage => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        hasNext: !!action.nextPage,
        next: action.nextPage
      }
    default:
      return state
  }
};

let reducer: Reducer<State, Action> = combineReducers({ byId, allIds, nextPage })

export default reducer
