export let json = async <T = unknown>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  let response = await fetch(url, init)

  if (!response.ok) {
    throw new Error(`Received status code ${response.status} for ${url}`)
  }

  return response.json()
}
