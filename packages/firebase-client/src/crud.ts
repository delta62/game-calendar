import {
  anonymous,
  bearer,
  req,
  post,
  del,
  patch,
  jsonBody,
  json,
} from './http'
import unwrap from './unwrap'
import wrap from './wrap'

const API_ROOT = 'https://firestore.googleapis.com/v1'

export interface FirebaseRequest {
  path: string
  authToken?: string
}

export interface ListRequest extends FirebaseRequest {
  nextPageToken?: string
  orderBy?: string
  pageSize?: number
}

export interface ListResponse<T> {
  documents: T[]
  nextPage?: string
}

export interface CreateRequest<T extends {}> extends FirebaseRequest {
  documentId: string
  document: T
}

export interface UpdateRequest<T extends {}> extends FirebaseRequest {
  document: T
}

let buildUrl = (projectId: string, path: string, query?: URLSearchParams) => {
  let q = query ? `?${query}` : ''
  return `${API_ROOT}/projects/${projectId}/databases/(default)/documents/${path}${q}`
}

export let list =
  (projectId: string) =>
  async <T>({
    path,
    authToken,
    nextPageToken,
    orderBy,
    pageSize,
  }: ListRequest): Promise<ListResponse<T>> => {
    let query = new URLSearchParams()
    orderBy != null && query.append('orderBy', orderBy)
    pageSize != null && query.append('pageSize', `${pageSize}`)

    if (nextPageToken) {
      query.append('pageToken', nextPageToken)
    }

    let url = buildUrl(projectId, path, query)
    let auth = authToken ? bearer(authToken) : anonymous
    let response: any = await json(url, auth)
    let documents = (response.documents ?? []).map(unwrap)
    let nextPage = response.nextPageToken

    return { documents, nextPage }
  }

export let create =
  (projectId: string) =>
  async <T extends {}>({
    path,
    documentId,
    authToken,
    document,
  }: CreateRequest<T>): Promise<void> => {
    let query = new URLSearchParams({ documentId })
    let url = buildUrl(projectId, path, query)
    let auth = authToken ? bearer(authToken) : anonymous
    await req(url, post, auth, jsonBody(wrap(document)))
  }

export let drop =
  (projectId: string) =>
  async ({ path, authToken }: FirebaseRequest): Promise<void> => {
    let url = buildUrl(projectId, path)
    let auth = authToken ? bearer(authToken) : anonymous
    await req(url, del, auth)
  }

export let update =
  (projectId: string) =>
  async <T extends {}>({
    path,
    authToken,
    document,
  }: UpdateRequest<T>): Promise<void> => {
    let updateMask = Object.keys(document).map(key => [
      'updateMask.fieldPaths',
      key,
    ])
    let query = new URLSearchParams(updateMask)
    let url = buildUrl(projectId, path, query)
    let body = {
      name: path,
      ...wrap(document),
    }
    let auth = authToken ? bearer(authToken) : anonymous
    await req(url, patch, auth, jsonBody(body))
  }
