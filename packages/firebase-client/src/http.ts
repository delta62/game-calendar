type RequestBuilder = (init: RequestInit) => RequestInit
type RequestMethod = 'DELETE' | 'PATCH' | 'POST'

export let req = async (
  url: string,
  ...params: RequestBuilder[]
): Promise<Response> => {
  let init = params.reduce((acc, param) => param(acc), {})
  let res = await fetch(url, init)

  if (!res.ok) {
    throw new Error(`Received status ${res.status} for request to ${url}`)
  }

  return res
}

export let json = async <T = unknown>(
  url: string,
  ...params: RequestBuilder[]
): Promise<T> => {
  let res = await req(url, ...params)
  return res.json()
}

export let method =
  (method: RequestMethod): RequestBuilder =>
  init => ({
    ...init,
    method,
  })

export let contentType =
  (contentType: string): RequestBuilder =>
  init => ({
    ...init,
    headers: {
      ...init.headers,
      'Content-Type': contentType,
    },
  })

export let formBody =
  (body: Record<string, string>): RequestBuilder =>
  init => {
    let encodedBody = Object.entries(body)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')
    return {
      ...init,
      headers: {
        ...init.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodedBody,
    }
  }

export let jsonBody =
  (body: any): RequestBuilder =>
  init => ({
    ...init,
    headers: {
      ...init.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

export let bearer =
  (token: string): RequestBuilder =>
  init => ({
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    },
  })

export let anonymous: RequestBuilder = init => init

export let post = method('POST')
export let patch = method('PATCH')
export let del = method('DELETE')
