export interface FirebaseError {
  code: number
  message: string
}

export interface ErrorResponse {
  error: FirebaseError
}

export type FirebaseResponse<T> = ErrorResponse | T

export interface FirestoreResponse {
  documents?: FirestoreDocument[]
  nextPageToken?: string
}

export interface LoginResponse {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered: boolean
}

export type SignupResponse = LoginResponse

export interface RefreshResponse {
  expires_in: string
  token_type: 'Bearer'
  refresh_token: string
  id_token: string
  user_id: string
  project_id: string
}

export interface FirestoreDocument extends MapValueInternal {
  name: string
  createTime: string
  updateTime: string
}

export interface ArrayValue {
  arrayValue: ArrayValueInternal
}

export interface ArrayValueInternal {
  values?: Value[]
}

export interface MapValue {
  mapValue: MapValueInternal
}

export interface MapValueInternal {
  fields?: Record<string, Value>
}

export interface DoubleValue {
  doubleValue: string
}

export interface IntegerValue {
  integerValue: string
}

export interface NullValue {
  nullValue: null
}

export interface StringValue {
  stringValue: string
}

export type Value =
  | ArrayValue
  | DoubleValue
  | IntegerValue
  | MapValue
  | NullValue
  | StringValue

export function isStringValue(obj: Value): obj is StringValue {
  return obj.hasOwnProperty('stringValue')
}

export function isMapValue(obj: Value): obj is MapValue {
  return obj.hasOwnProperty('mapValue')
}

export function isIntegerValue(obj: Value): obj is IntegerValue {
  return obj.hasOwnProperty('integerValue')
}

export function isDoubleValue(obj: Value): obj is DoubleValue {
  return obj.hasOwnProperty('doubleValue')
}

export function isArrayValue(obj: Value): obj is ArrayValue {
  return obj.hasOwnProperty('arrayValue')
}

export function isNullValue(obj: Value): obj is NullValue {
  return obj.hasOwnProperty('nullValue')
}
