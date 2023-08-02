import { SagaIterator } from 'redux-saga'
import { call, put, take, fork, select, takeLeading } from 'redux-saga/effects'
import {
  login,
  refreshToken as refresh,
  resetPassword as fbResetPassword,
  signup as fbSignup,
} from '@delta62/firebase-client'

import { getUser } from './selectors'
import {
  loginSuccess,
  loginError,
  refreshTokenRequest,
  refreshTokenError,
  refreshTokenSuccess,
  signupError,
  signupSuccess,
} from './action-creators'
import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  REFRESH_REQUEST,
  REFRESH_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  FORGOT_PASSWORD,
  RefreshRequest,
  ResetPasswordRequest,
} from './actions'

function* auth(email: string, password: string): SagaIterator {
  try {
    let response = yield call(login(__API_KEY__), email, password)
    yield put(loginSuccess(response))
  } catch (error) {
    yield put(loginError(error as Error))
  }
}

function* signup(email: string, password: string): SagaIterator {
  try {
    let response = yield call(fbSignup(__API_KEY__), email, password)
    yield put(signupSuccess(response))
  } catch (error) {
    yield put(signupError(error as Error))
  }
}

function* forgotPassword({ email }: ResetPasswordRequest): SagaIterator {
  try {
    let response = yield call(fbResetPassword(__API_KEY__), email)
    console.log({ message: 'reset email sent', response })
  } catch (error) {
    console.error(error)
  }
}

function* refreshAuthToken({ refreshToken }: RefreshRequest): SagaIterator {
  try {
    let response = yield call(refresh(__API_KEY__), refreshToken)
    yield put(refreshTokenSuccess(response))
  } catch (error) {
    yield put(refreshTokenError(error as Error))
  }
}

function* watchSignup(): SagaIterator {
  while (true) {
    let { email, password } = yield take(SIGNUP_REQUEST)
    yield fork(signup, email, password)
    yield take(SIGNUP_ERROR)
  }
}

function* watchLogin(): SagaIterator {
  while (true) {
    let { email, password } = yield take(LOGIN_REQUEST)
    yield fork(auth, email, password)
    yield take(LOGIN_ERROR)
  }
}

function* watchResetPassword(): SagaIterator {
  yield takeLeading(FORGOT_PASSWORD, forgotPassword)
}

function* watchRefresh(): SagaIterator {
  yield takeLeading(REFRESH_REQUEST, refreshAuthToken)
}

export function* idToken(): SagaIterator {
  let { expires, idToken, refreshToken } = yield select(getUser)

  if (expires < Date.now() - 60_000) {
    yield put(refreshTokenRequest(refreshToken))
    yield take(REFRESH_SUCCESS)
    let user = yield select(getUser)
    idToken = user.idToken
  }

  return idToken
}

export function* saga(): SagaIterator {
  yield fork(watchSignup)
  yield fork(watchRefresh)
  yield fork(watchLogin)
  yield fork(watchResetPassword)
}
