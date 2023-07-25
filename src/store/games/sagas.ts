import { SagaIterator } from 'redux-saga'
import {
  call,
  fork,
  put,
  select,
  takeEvery,
  takeLeading,
} from 'redux-saga/effects'
import {
  CreateRequest,
  ListRequest,
  create,
  drop,
  list,
  update,
} from '@delta62/firebase-client'

import { fetchSuccess, fetchError, updateError } from './action-creators'
import {
  ADD_GAME,
  DELETE_GAME,
  FETCH_REQUEST,
  UPDATE_GAME,
  AddGame,
  DeleteGame,
  FetchRequest,
  UpdateGame,
} from './actions'
import { Game } from './models'
import { sagas as userSagas, selectors as userSelectors } from '../user'

function* fetchGames(action: FetchRequest): SagaIterator {
  try {
    let userId = yield select(userSelectors.getUserId)!
    let authToken = yield userSagas.idToken() as any
    let path = `users/${userId}/games`
    let listRequest: ListRequest = { path, authToken }

    if (action.nextPage) {
      listRequest.nextPageToken = action.nextPage
    }

    let fn = list(__PROJECT_ID__)
    let { documents, nextPage } = yield call(fn, listRequest)

    yield put(fetchSuccess(documents, nextPage))
  } catch (error) {
    yield put(fetchError(error))
  }
}

function* updateGame({ game }: UpdateGame): SagaIterator {
  try {
    let userId = yield select(userSelectors.getUserId)!
    let authToken = yield userSagas.idToken() as any
    let path = `users/${userId}/games/${game.id}`
    let up = update(__PROJECT_ID__)

    yield call(up, { path, authToken, document: game })
  } catch (error) {
    yield put(updateError(error))
  }
}

function* addGame({ id, name }: AddGame): SagaIterator {
  let userId = yield select(userSelectors.getUserId)!
  let authToken = yield userSagas.idToken() as any
  let path = `users/${userId}/games/`
  let cr = create(__PROJECT_ID__)
  let documentId = `${id}`
  let document = { id, name }
  let createRequest: CreateRequest<Game> = {
    path,
    authToken,
    documentId,
    document,
  }

  yield call(cr, createRequest)
}

function* deleteGame({ id }: DeleteGame): SagaIterator {
  let userId = yield select(userSelectors.getUserId)!
  let authToken = yield userSagas.idToken() as any
  let path = `users/${userId}/games/${id}`
  let dr = drop(__PROJECT_ID__)

  yield call(dr, { path, authToken })
}

function* watchLogin(): SagaIterator {
  yield takeLeading(FETCH_REQUEST, fetchGames)
}

function* watchUpdate(): SagaIterator {
  yield takeEvery(UPDATE_GAME, updateGame)
}

function* watchAdd(): SagaIterator {
  yield takeEvery(ADD_GAME, addGame)
}

function* watchDelete(): SagaIterator {
  yield takeEvery(DELETE_GAME, deleteGame)
}

function* gamesSaga(): SagaIterator {
  yield fork(watchLogin)
  yield fork(watchUpdate)
  yield fork(watchAdd)
  yield fork(watchDelete)
}

export default gamesSaga
