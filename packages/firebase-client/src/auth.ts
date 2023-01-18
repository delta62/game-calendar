import { json, jsonBody, formBody, method } from './http'
import { LoginResponse, RefreshResponse, SignupResponse } from './models'

export interface Login {
  email: string
  localId: string
  idToken: string
  refreshToken: string
  expires: number
}

export type Signup = Login

export interface Refresh {
  refreshToken: string
  idToken: string
  expires: number
}

const ACCOUNTS_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts'

let parseExpires = (expires: string): number => {
  return Date.now() + parseInt(expires, 10) * 1000
}

export let signup =
  (apiKey: string) =>
  async (email: string, password: string): Promise<Signup> => {
    let response = await json<SignupResponse>(
      `${ACCOUNTS_ENDPOINT}:signUp?key=${apiKey}`,
      method('POST'),
      jsonBody({
        email,
        password,
        returnSecureToken: true,
      })
    )

    return { ...response, expires: parseExpires(response.expiresIn) }
  }

export let login =
  (apiKey: string) =>
  async (email: string, password: string): Promise<Login> => {
    let response = await json<LoginResponse>(
      `${ACCOUNTS_ENDPOINT}:signInWithPassword?key=${apiKey}`,
      method('POST'),
      jsonBody({
        email,
        password,
        returnSecureToken: true,
      })
    )

    return { ...response, expires: parseExpires(response.expiresIn) }
  }

export let refreshToken =
  (apiKey: string) =>
  async (refreshToken: string): Promise<Refresh> => {
    let response = await json<RefreshResponse>(
      `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
      method('POST'),
      formBody({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      })
    )

    return {
      refreshToken: response.refresh_token,
      idToken: response.id_token,
      expires: parseExpires(response.expires_in),
    }
  }
