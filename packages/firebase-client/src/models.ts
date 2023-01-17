export interface FirebaseToken {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered: boolean
}

interface FieldReference {
  fieldPath: string
}

interface Projection {
  fields: FieldReference[]
}

interface CollectionSelector {
  collectionId: string
  allDescendants?: boolean
}

type CompositeOperator = 'AND'

interface CompositeFilter {
  compositeFilter: {
    op: CompositeOperator
    filters: Filter[]
  }
}

type FieldOperator =
  | 'LESS_THAN'
  | 'LESS_THAN_OR_EQUAL'
  | 'GREATER_THAN'
  | 'GREATER_THAN_OR_EQUAL'
  | 'EQUAL'
  | 'ARRAY_CONTAINS'

interface FieldFilter {
  fieldFilter: {
    field: FieldReference
    op: FieldOperator
    value: Value
  }
}

type UnaryOperator = 'IS_NAN' | 'IS_NULL'

interface UnaryFilter {
  unaryFilter: {
    op: UnaryOperator
    field: FieldReference
  }
}

type Filter = CompositeFilter | FieldFilter | UnaryFilter

type Direction = 'ASCENDING' | 'DESCENDING'

interface Order {
  field: FieldReference
  direction: Direction
}

export interface StructuredQuery {
  select?: Projection
  from?: CollectionSelector[]
  where?: Filter
  orderBy?: Order[]
  offset?: number
  limit?: number
}

interface Document {
  name: string
  fields: Record<string, Value>
}

interface UpdateWriteOperation {
  update: Document
}

export type Write = UpdateWriteOperation

export interface ErrorResponse {
  error: FirebaseError
}

export type FirebaseResponse<T> = ErrorResponse | T

export interface Login {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered: boolean
}

export type Signup = Login

export interface RefreshResponse {
  expires_in: string
  token_type: 'Bearer'
  refresh_token: string
  id_token: string
  user_id: string
  project_id: string
}

export interface ChangeEmail {
  localId: string
  email: string
  passwordHash: string
  providerUserInfo: unknown
  idToken: string
  refreshToken: string
  expiresIn: string
}

export type ChangeEmailResponse = FirebaseResponse<ChangeEmail>

export interface ChangePassword {
  localId: string
  email: string
  passwordHash: string
  providerUserInfo: unknown
  idToken: string
  refreshToken: string
  expiresIn: string
}

export type ChangePasswordResponse = FirebaseResponse<ChangePassword>

interface DeleteAccount {}

export type DeleteAccountResponse = FirebaseResponse<DeleteAccount>

export interface ResetPassword {
  email: string
}

export type ResetPasswordResponse = FirebaseResponse<ResetPassword>

export interface FirebaseError {
  code: number
  message: string
}

export interface FirestoreResponse {
  documents?: FirestoreDocument[]
  nextPageToken?: string
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
