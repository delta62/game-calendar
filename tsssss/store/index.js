import { applyMiddleware, createStore, combineReducers } from 'redux';
import persistState from 'redux-localstorage';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
export * from './models';
import { reducer as user, actionCreators as userActionCreators, selectors as userSelectors, } from './user';
import { reducer as games, actionCreators as gamesActionCreators, selectors as gamesSelectors, } from './games';
import { reducer as platforms, selectors as platformSelectors, } from './platforms';
let actionCreators = Object.assign(Object.assign({}, userActionCreators), gamesActionCreators);
let selectors = Object.assign(Object.assign(Object.assign({}, userSelectors), gamesSelectors), platformSelectors);
export { actionCreators, selectors };
let reducer = combineReducers({ games, platforms, user });
// -- MIGRATION CODE -------------------------------------
import { migrate, needsMigration } from './migrations';
if (needsMigration()) {
    migrate();
    window.location.reload();
}
// -------------------------------------------------------
let sagaMiddleware = createSagaMiddleware();
let enhancer = composeWithDevTools(persistState('user', { key: 'reduxx' }), applyMiddleware(sagaMiddleware));
let store = createStore(reducer, enhancer);
sagaMiddleware.run(rootSaga);
export default store;
//# sourceMappingURL=index.js.map