import { call, fork, put, select, takeEvery, takeLeading } from 'redux-saga/effects'

import { fetchSuccess, fetchError, updateError } from './action-creators'
import { ADD_GAME, DELETE_GAME, FETCH_REQUEST, UPDATE_GAME, AddGame, DeleteGame, FetchRequest, UpdateGame } from './actions'
import {
  sagas as userSagas,
  selectors as userSelectors,
} from '../user'
import apiClient from '@client'

function* fetchGames(action: FetchRequest) {
  try {
    let userId = yield select(userSelectors.getUserId)!
    let idToken = yield userSagas.idToken()
    let { games, nextPage } = yield call(apiClient.getGames, userId, idToken, action.nextPage)

    yield put(fetchSuccess(games, nextPage))
  } catch (error) {
    yield put(fetchError(error))
  }
}

function* updateGame({ game }: UpdateGame) {
  try {
    let userId = yield select(userSelectors.getUserId)!
    let idToken = yield userSagas.idToken()
    let path = `users/${userId}/games/${game.id}`

    yield call(apiClient.patch, path, idToken, game)
  } catch (error) {
    yield put(updateError(error))
  }
}

function* addGame({ id, name }: AddGame) {
  try {
    let userId = yield select(userSelectors.getUserId)!
    let idToken = yield userSagas.idToken()
    let path = `users/${userId}/games/`

    yield call(apiClient.create, path, `${id}`, idToken, { id, name })
  } catch (error) {
    console.error(error)
  }
}

function* deleteGame({ id }: DeleteGame) {
  try {
    let userId = yield select(userSelectors.getUserId)!
    let idToken = yield userSagas.idToken()
    let path = `users/${userId}/games/${id}`

    yield call(apiClient.drop, path, idToken)
  } catch (error) {
    console.error(error)
  }
}

function* watchLogin() {
  yield takeLeading(FETCH_REQUEST, fetchGames)
}

function* watchUpdate() {
  yield takeEvery(UPDATE_GAME, updateGame)
}

function* watchAdd() {
  yield takeEvery(ADD_GAME, addGame)
}

function* watchDelete() {
  yield takeEvery(DELETE_GAME, deleteGame)
}

function* gamesSaga() {
  yield fork(watchLogin)
  yield fork(watchUpdate)
  yield fork(watchAdd)
  yield fork(watchDelete)
}

export default gamesSaga
