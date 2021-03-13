import { call, put, take, fork, select, takeLeading } from 'redux-saga/effects';
import { getUser } from './selectors';
import { loginSuccess, loginError, refreshTokenRequest, refreshTokenError, refreshTokenSuccess, } from './action-creators';
import { LOGIN_REQUEST, LOGIN_ERROR, REFRESH_REQUEST, REFRESH_SUCCESS, } from './actions';
import apiClient from '@client';
function* login(email, password) {
    try {
        let response = yield call(apiClient.login, email, password);
        yield put(loginSuccess(response));
    }
    catch (error) {
        yield put(loginError(error));
    }
}
function* refreshAuthToken({ refreshToken }) {
    try {
        let response = yield call(apiClient.refreshToken, refreshToken);
        yield put(refreshTokenSuccess(response));
    }
    catch (error) {
        yield put(refreshTokenError(error));
    }
}
function* watchLogin() {
    while (true) {
        let { email, password } = yield take(LOGIN_REQUEST);
        yield fork(login, email, password);
        yield take(LOGIN_ERROR);
    }
}
function* watchRefresh() {
    yield takeLeading(REFRESH_REQUEST, refreshAuthToken);
}
export function* idToken() {
    let { tokenExpires, idToken, refreshToken } = yield select(getUser);
    if (tokenExpires < Date.now() - 60000) {
        yield put(refreshTokenRequest(refreshToken));
        yield take(REFRESH_SUCCESS);
        let user = yield select(getUser);
        idToken = user.idToken;
    }
    return idToken;
}
function* userSaga() {
    yield fork(watchRefresh);
    yield fork(watchLogin);
}
export default userSaga;
//# sourceMappingURL=sagas.js.map