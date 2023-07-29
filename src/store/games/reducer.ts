import { combineReducers } from 'redux'
import Action, {
  ADD_GAME,
  DELETE_GAME,
  FETCH_SUCCESS,
  FETCH_ERROR,
  UPDATE_GAME,
  UNRATE_GAME,
  FETCH_REQUEST,
} from './actions'
import { Game, NextPage } from './models'

type AllIds = number[]
type ById = Record<number, Game>

let allIds = (state: AllIds = [], action: Action): AllIds => {
  switch (action.type) {
    case ADD_GAME:
      return [...state, action.id]
    case DELETE_GAME:
      return state.filter(x => x !== action.id)
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
    case UNRATE_GAME:
      return {
        ...state,
        [action.id]: { ...state[action.id]!, rating: undefined },
      }
    case FETCH_SUCCESS: {
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

let nextPage = (
  state: NextPage = DEFAULT_NEXT_PAGE,
  action: Action
): NextPage => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        hasNext: !!action.nextPage,
        next: action.nextPage,
      }
    default:
      return state
  }
}

let isLoading = (state: boolean = false, action: Action): boolean => {
  switch (action.type) {
    case FETCH_SUCCESS:
    case FETCH_ERROR:
      return false
    case FETCH_REQUEST:
      return true
    default:
      return state
  }
}

let error = (state: unknown | null = null, action: Action): unknown | null => {
  switch (action.type) {
    case FETCH_ERROR:
      return action.error
    case FETCH_SUCCESS:
      return null
    default:
      return state
  }
}

export let reducer = combineReducers({
  byId,
  allIds,
  nextPage,
  isLoading,
  error,
})

export type State = ReturnType<typeof reducer>
