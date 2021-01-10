import { combineReducers } from 'redux'

import { State } from '../models'
import games from './games'
import user from './user'

export default combineReducers<State>({ games, user })
