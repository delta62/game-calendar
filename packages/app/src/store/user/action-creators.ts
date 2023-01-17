import { Error, User } from './models'
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REFRESH_ERROR,
  REFRESH_REQUEST,
  REFRESH_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  LoginError,
  LoginRequest,
  LoginSuccess,
  RefreshError,
  RefreshRequest,
  RefreshSuccess,
  SignupError,
  SignupRequest,
  SignupSuccess,
} from './actions'

export let signupRequest = (
  email: string,
  password: string
): SignupRequest => ({
  type: SIGNUP_REQUEST,
  email,
  password,
})

export let signupSuccess = (user: User): SignupSuccess => ({
  type: SIGNUP_SUCCESS,
  user,
})

export let loginRequest = (email: string, password: string): LoginRequest => ({
  type: LOGIN_REQUEST,
  email,
  password,
})

export let loginSuccess = (user: User): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  user,
})

export let loginError = (error: Error): LoginError => ({
  type: LOGIN_ERROR,
  error,
})

export let signupError = (error: Error): SignupError => ({
  type: SIGNUP_ERROR,
  error,
})

export let refreshTokenRequest = (refreshToken: string): RefreshRequest => ({
  type: REFRESH_REQUEST,
  refreshToken,
})

export let refreshTokenSuccess = (user: Partial<User>): RefreshSuccess => ({
  type: REFRESH_SUCCESS,
  user,
})

export let refreshTokenError = (error: Error): RefreshError => ({
  type: REFRESH_ERROR,
  error,
})
