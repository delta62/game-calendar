import { Action } from 'redux'

import { Error, User } from './models'

export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export interface LoginRequest extends Action<typeof LOGIN_REQUEST> {
  email: string
  password: string
}

export interface LoginError extends Action<typeof LOGIN_ERROR> {
  error: Error
}

export interface LoginSuccess extends Action<typeof LOGIN_SUCCESS> {
  user: User
}

type UserAction = LoginError | LoginRequest | LoginSuccess

export default UserAction
