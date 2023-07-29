import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from 'redux'
import persistState from 'redux-localstorage'
import { composeWithDevTools } from '@redux-devtools/extension'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './saga'
import {
  reducer as user,
  actionCreators as userActionCreators,
  selectors as userSelectors,
} from './user'
import {
  reducer as games,
  actionCreators as gamesActionCreators,
  selectors as gamesSelectors,
} from './games'
import {
  reducer as platforms,
  selectors as platformSelectors,
} from './platforms'

let actionCreators = {
  ...userActionCreators,
  ...gamesActionCreators,
}

let selectors = {
  ...userSelectors,
  ...gamesSelectors,
  ...platformSelectors,
}

let reducer = combineReducers({ games, platforms, user })

// -- MIGRATION CODE -------------------------------------
import { migrate, needsMigration } from './migrations'
if (needsMigration()) {
  migrate()
  window.location.reload()
}
// -------------------------------------------------------

let sagaMiddleware = createSagaMiddleware()
let enhancer = composeWithDevTools(
  (persistState as any)('user', { key: 'reduxx' }),
  applyMiddleware(sagaMiddleware)
)

let store = createStore(reducer, enhancer)
sagaMiddleware.run(rootSaga)

export * from './models'
export { actionCreators, selectors }
export { Event, Game } from './games'
export { User } from './user'
export default store
