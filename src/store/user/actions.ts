import { Action } from 'redux'

import { Error, User } from './models'

export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const REFRESH_ERROR = 'REFRESH_ERROR'
export const REFRESH_REQUEST = 'REFRESH_REQUEST'
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS'

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

export interface RefreshError extends Action<typeof REFRESH_ERROR> {
  error: Error
}

export interface RefreshRequest extends Action<typeof REFRESH_REQUEST> {
  refreshToken: string
}

export interface RefreshSuccess extends Action<typeof REFRESH_SUCCESS> {
  user: Partial<User>
}

type UserAction =
  | LoginError
  | LoginRequest
  | LoginSuccess
  | RefreshError
  | RefreshRequest
  | RefreshSuccess

export default UserAction
