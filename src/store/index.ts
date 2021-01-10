import { Store, applyMiddleware, createStore } from 'redux'
import persistState from 'redux-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import Action from './actions'
import { State } from './models'

export * from './action-creators'
export * from './models'
export * from './selectors'
import reducer from './reducers'

let enhancer = composeWithDevTools(
  persistState() as any,
  applyMiddleware(thunk)
) as any
let store: Store<State, Action> = createStore(reducer, enhancer)

export default store
