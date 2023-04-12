import { RouteContext, RouteParams } from './context'
import { useContext, useEffect, useState } from 'react'

export type QueryParams = Record<string, string>

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

export let useQueryParams = (): QueryParams => {
  let [params, setParams] = useState<QueryParams>()

  useEffect(() => {
    let query = searchToRecord(window.location.search)
    setParams(query)
  }, [window.location.search])

  return params!
}
