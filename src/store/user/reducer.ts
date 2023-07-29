import { combineReducers } from 'redux'

import Action, {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REFRESH_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_ERROR,
} from './actions'
import { Error, User } from './models'

type DataState = User | null
type RequestState = boolean
type ErrorState = Error | null

let data = (state: DataState = null, action: Action): DataState => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return action.user
    case REFRESH_SUCCESS:
      return {
        ...state,
        ...action.user,
      } as User
    default:
      return state
  }
}

let request = (state: RequestState = false, action: Action): RequestState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOGIN_ERROR:
    case SIGNUP_SUCCESS:
    case SIGNUP_ERROR:
      return false
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
      return true
    default:
      return state
  }
}

let error = (state: ErrorState = null, action: Action): ErrorState => {
  switch (action.type) {
    case SIGNUP_ERROR:
    case LOGIN_ERROR:
      return action.error
    case LOGIN_SUCCESS:
      return null
    default:
      return state
  }
}

export let reducer = combineReducers({ request, error, data })

export type State = ReturnType<typeof reducer>
