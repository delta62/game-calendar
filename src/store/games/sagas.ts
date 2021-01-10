import { call, put, select, take } from 'redux-saga/effects'

import { fetchSuccess, fetchError } from './action-creators'
import { FETCH_REQUEST } from './actions'
import { selectors as userSelectors } from '../user'
import apiClient from '@client'

function* fetchGames() {
  try {
    let userId = yield select(userSelectors.getUserId)

    if (!userId) {
      throw new Error(`Attempted to fetch games with no user id`)
    }

    let response = yield call(apiClient.getGames, userId)
    yield put(fetchSuccess(response))
  } catch (error) {
    yield put(fetchError(error))
  }
}

function* watchLogin() {
  while (true) {
    yield take(FETCH_REQUEST)
    yield call(fetchGames)
  }
}

export default watchLogin
