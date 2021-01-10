import { combineReducers } from 'redux'

import Action, { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from './actions'
import { Error, User } from './models'

type DataState = User | null
type RequestState = boolean
type ErrorState = Error | null

let data = (state: DataState = null, action: Action): DataState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.user
    default:
      return state
  }
}

let request = (state: RequestState = false, action: Action): RequestState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return false
    case LOGIN_ERROR:
      return false
    case LOGIN_REQUEST:
      return true
    default:
      return state
  }
}

let error = (state: ErrorState = null, action: Action): ErrorState => {
  switch (action.type) {
    case LOGIN_ERROR:
      return action.error
    case LOGIN_SUCCESS:
      return null
    default:
      return state
  }
}

export default combineReducers({ request, error, data })
