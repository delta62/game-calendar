import { RouteContext, RouteParams } from './context'
import { useContext, useEffect, useState } from 'react'

export type QueryParams = Record<string, string>
export type MaybeQueryParams = Record<string, string | undefined>

export let useParams = (): RouteParams => {
  let { params } = useContext(RouteContext)
  return params
}

let searchToRecord = (search: string): QueryParams => {
  let urlParams = new URLSearchParams(search)
  let entries = Array.from(urlParams.entries())
  return entries.reduce<QueryParams>((acc, [k, v]) => {
    acc[k] = v
    return acc
  }, {})
}

export let useQueryParams = (): MaybeQueryParams => {
  let [params, setParams] = useState<QueryParams>({})

  useEffect(() => {
    let query = searchToRecord(window.location.search)
    setParams(query)
  }, [window.location.search])

  return params
}

export interface RedirectArgs<Q extends QueryParams = {}> {
  query?: Q
  to: string
  when?: boolean
}

export let useRedirect = <Q extends QueryParams = {}>(
  args: RedirectArgs<Q>
) => {
  let { setPath } = useContext(RouteContext)

  useEffect(() => {
    if (!args.when) return

    let path = args.to.startsWith('/') ? args.to : `/${args.to}`
    let { origin } = window.location
    let url = new URL(`${origin}${path}`)
    let params = Object.entries(args.query ?? {})

    for (let [key, value] of params) {
      url.searchParams.append(key, `${value}`)
    }

    setPath(args.to)
  }, [args])
}
