import { bearer, req, post, del, patch, jsonBody, json } from './http'
import unwrap from './unwrap'
import wrap from './wrap'

const API_ROOT = 'https://firestore.googleapis.com/v1'

export interface FirebaseRequest {
  path: string
  authToken: string
}

export interface ListRequest extends FirebaseRequest {
  nextPageToken?: string
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
  let q = query ? `?${query.toString()}` : ''
  return `${API_ROOT}/projects/${projectId}/databases/(default)/documents/${path}${q}`
}

export let list =
  (projectId: string) =>
  async <T>({
    path,
    authToken,
    nextPageToken,
  }: ListRequest): Promise<ListResponse<T>> => {
    let query = new URLSearchParams({ orderBy: 'id' })

    if (nextPageToken) {
      query.append('pageToken', nextPageToken)
    }

    let url = buildUrl(projectId, path, query)
    let response: any = await json(url, bearer(authToken))
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
    await req(url, post, bearer(authToken), jsonBody(wrap(document)))
  }

export let drop =
  (projectId: string) =>
  async ({ path, authToken }: FirebaseRequest): Promise<void> => {
    let url = buildUrl(projectId, path)
    await req(url, del, bearer(authToken))
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
    await req(url, patch, bearer(authToken), jsonBody(body))
  }
