import { useRedirect, RedirectArgs, QueryParams } from './hooks'

export let Redirect = <T extends QueryParams = {}>({
  to,
  when = true,
  query,
}: RedirectArgs<T>) => {
  useRedirect({ to, when, query })

  return null
}
