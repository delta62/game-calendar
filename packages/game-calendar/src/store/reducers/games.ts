import { combineReducers } from 'redux'

import Action from '../actions'
import { Game } from '../models'

type AllIds = number[]
type ByIdState = Record<number, Game>

let allIds = (state: AllIds = [ ], action: Action): AllIds => {
  switch (action.type) {
    case 'ADD_GAME':
      return [ ...state, action.id ]
    case 'DELETE_GAME':
      return state.filter(x => x !== action.id)
    case 'REORDER_GAME':
      let newState = state.filter(x => x !== action.id)
      let targetIdx = newState.findIndex(x => x === action.target)

      if (!action.before) {
        targetIdx += 1
      }

      newState.splice(targetIdx, 0, action.id)

      return newState
    default:
      return state
  }
}

let byId = (state: ByIdState = { }, action: Action): ByIdState => {
  switch (action.type) {
    case 'ADD_GAME':
      return {
        ...state,
        [action.id]: { id: action.id, name: action.name }
      }
    case 'START_GAME':
      return {
        ...state,
        [action.id]: { ...state[action.id], started: action.time },
      }
    case 'FINISH_GAME':
      return {
        ...state,
        [action.id]: { ...state[action.id], finished: action.time },
      }
    case 'COMPLETE_GAME':
      return {
        ...state,
        [action.id]: { ...state[action.id], completed: action.time },
      }
    case 'DELETE_GAME':
      let newState = { ...state }
      delete newState[action.id]
      return newState
    case 'SET_RATING':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          rating: action.rating,
        }
      }
    case 'SET_DURATION':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          duration: action.duration,
        }
      }
    case 'SET_TITLE':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          name: action.title,
        }
      }
    default:
      return state
  }
}

export default combineReducers({ byId, allIds })
