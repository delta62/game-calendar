import { Error, User } from './models'
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LoginError,
  LoginRequest,
  LoginSuccess,
} from './actions'

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
