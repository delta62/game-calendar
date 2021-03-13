import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, REFRESH_ERROR, REFRESH_REQUEST, REFRESH_SUCCESS, } from './actions';
export let loginRequest = (email, password) => ({
    type: LOGIN_REQUEST,
    email,
    password,
});
export let loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    user,
});
export let loginError = (error) => ({
    type: LOGIN_ERROR,
    error,
});
export let refreshTokenRequest = (refreshToken) => ({
    type: REFRESH_REQUEST,
    refreshToken,
});
export let refreshTokenSuccess = (user) => ({
    type: REFRESH_SUCCESS,
    user,
});
export let refreshTokenError = (error) => ({
    type: REFRESH_ERROR,
    error,
});
//# sourceMappingURL=action-creators.js.map