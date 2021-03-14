import { SagaIterator } from 'redux-saga'
import { call, put, take, fork, select, takeLeading } from 'redux-saga/effects'

import { getUser } from './selectors'
import {
  loginSuccess,
  loginError,
  refreshTokenRequest,
  refreshTokenError,
  refreshTokenSuccess,
} from './action-creators'
import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  REFRESH_REQUEST,
  REFRESH_SUCCESS,
  RefreshRequest,
} from './actions'
import apiClient from '@client'

function* login(email: string, password: string): SagaIterator {
  try {
    let response = yield call(apiClient.login, email, password)
    yield put(loginSuccess(response))
  } catch (error) {
    yield put(loginError(error))
  }
}

function* refreshAuthToken({ refreshToken }: RefreshRequest): SagaIterator {
  try {
    let response = yield call(apiClient.refreshToken, refreshToken)
    yield put(refreshTokenSuccess(response))
  } catch (error) {
    yield put(refreshTokenError(error))
  }
}

function* watchLogin(): SagaIterator {
  while (true) {
    let { email, password } = yield take(LOGIN_REQUEST)
    yield fork(login, email, password)
    yield take(LOGIN_ERROR)
  }
}

function* watchRefresh(): SagaIterator {
  yield takeLeading(REFRESH_REQUEST, refreshAuthToken)
}

export function* idToken(): SagaIterator {
  let { tokenExpires, idToken, refreshToken } = yield select(getUser)

  if (tokenExpires < Date.now() - 60_000) {
    yield put(refreshTokenRequest(refreshToken))
    yield take(REFRESH_SUCCESS)
    let user = yield select(getUser)
    idToken = user.idToken
  }

  return idToken
}

function* userSaga(): SagaIterator {
  yield fork(watchRefresh)
  yield fork(watchLogin)
}

export default userSaga