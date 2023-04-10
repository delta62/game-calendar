import { json, jsonBody, formBody, method } from './http'
import {
  LoginResponse as ModelLoginResponse,
  RefreshResponse as ModelRefreshResponse,
  SignupResponse as ModelSignupResponse,
} from './models'

export interface LoginResponse {
  email: string
  localId: string
  idToken: string
  refreshToken: string
  expires: number
}

export type SignupResponse = LoginResponse

export type RefreshResponse = Pick<
  LoginResponse,
  'refreshToken' | 'idToken' | 'expires'
>

const ACCOUNTS_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts'

let parseExpires = (expires: string): number => {
  return Date.now() + parseInt(expires, 10) * 1000
}

export let signup =
  (apiKey: string) =>
  async (email: string, password: string): Promise<SignupResponse> => {
    let response = await json<ModelSignupResponse>(
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
  async (email: string, password: string): Promise<LoginResponse> => {
    let response = await json<ModelLoginResponse>(
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
  async (refreshToken: string): Promise<RefreshResponse> => {
    let response = await json<ModelRefreshResponse>(
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
