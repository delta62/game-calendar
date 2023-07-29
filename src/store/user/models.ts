export interface User {
  email: string
  localId: string
  idToken: string
  refreshToken: string
  expires: number
}

export interface Error {
  message: string
}
