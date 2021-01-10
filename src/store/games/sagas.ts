import { call, put, select, take } from 'redux-saga/effects'

import { fetchSuccess, fetchError } from './action-creators'
import { FETCH_REQUEST } from './actions'
import {
  actionCreators as userActionCreators,
  selectors as userSelectors,
} from '../user'
import apiClient from '@client'

function* refreshAuthToken(refreshToken: string) {
  try {
    let user = yield call(apiClient.refreshToken, refreshToken)
    yield put(userActionCreators.updateUser(user))
    return user.idToken
  } catch (error) {
    console.error('Unable to refresh auth token', error)
    throw error
  }
}

function* fetchGames() {
  try {
    let userId = yield select(userSelectors.getUserId)

    if (!userId) {
      throw new Error(`Attempted to fetch games with no user id`)
    }

    let expiresAt = yield select(userSelectors.getExpiresAt)
    let authToken

    if (expiresAt < Date.now() - 60_000) {
      // Refresh the token
      let refreshToken = yield select(userSelectors.getRefreshToken)
      authToken = yield call(refreshAuthToken, refreshToken)
    } else {
      authToken = yield select(userSelectors.getAuthToken)
    }

    let response = yield call(apiClient.getGames, userId, authToken)
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
