import { call, put, take, fork } from 'redux-saga/effects'

import { loginSuccess, loginError } from './action-creators'
import { LOGIN_REQUEST, LOGIN_ERROR } from './actions'
import apiClient from '@client'

function* login(email: string, password: string) {
  try {
    let response = yield call(apiClient.login, email, password)
    yield put(loginSuccess(response))
  } catch (error) {
    yield put(loginError(error))
  }
}

function* watchLogin() {
  while (true) {
    let { email, password } = yield take(LOGIN_REQUEST)
    yield fork(login, email, password)
    yield take(LOGIN_ERROR)
  }
}

export default watchLogin
