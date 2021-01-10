import { Store, applyMiddleware, createStore } from 'redux'
import persistState from 'redux-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkDispatch } from 'redux-thunk'

import Action from './actions'
import { State } from './models'

export { AsyncAction } from './actions'
export * from './action-creators'
export * from './models'
export * from './selectors'
import reducer from './reducers'
import { migrate, needsMigration } from './migrations'

export type Dispatch = ThunkDispatch<State, never, Action>

if (needsMigration()) {
  migrate()
  window.location.reload()
}

let enhancer = composeWithDevTools(
  (persistState as any)('user', { key: 'reduxx' }) as any,
  applyMiddleware(thunk)
) as any
let store: Store<State, Action> = createStore(reducer, enhancer)

export default store
