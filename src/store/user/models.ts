export interface State {
  data: User | null
  error: Error | null
  request: boolean
}

export interface User {
  email: string
  id: string
  idToken: string
  refreshToken: string
  tokenExpires: number
}

export interface Error {
  message: string
}
