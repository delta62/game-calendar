import { Store, createStore } from 'redux'
import persistState from 'redux-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'

import { State } from './models'

export * from './action-creators'
export * from './models'
export * from './selectors'
import reducer from './reducers'

let enhancer = composeWithDevTools(persistState() as any) as any
let store: Store<State> = createStore(reducer, enhancer)

export default store
