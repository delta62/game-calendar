import { json, jsonBody, formBody, method } from './http'
import { Login, RefreshResponse as ModelRefreshResponse } from './models'

export interface LoginResponse {
  email: string
  localId: string
  idToken: string
  refreshToken: string
  expires: number
}

export interface RefreshResponse {
  refreshToken: string
  idToken: string
  expires: number
}

export let login =
  (apiKey: string) =>
  async (email: string, password: string): Promise<LoginResponse> => {
    let res: Login = await json(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      method('POST'),
      jsonBody({
        email,
        password,
        returnSecureToken: true,
      })
    )
    let expires = Date.now() + parseInt(res.expiresIn, 10) * 1000
    return { ...res, expires }
  }

export let refreshToken =
  (apiKey: string) =>
  async (refreshToken: string): Promise<RefreshResponse> => {
    let res: ModelRefreshResponse = await json(
      `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
      method('POST'),
      formBody({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      })
    )

    let expires = Date.now() + parseInt(res.expires_in, 10) * 1000

    return {
      refreshToken: res.refresh_token,
      idToken: res.id_token,
      expires,
    }
  }
