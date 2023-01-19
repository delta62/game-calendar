import routeMatches from '../lib/route-matches'

describe('does not match', () => {
  test('when the given path is too long', () => {
    let result = routeMatches('/', '/really/long/path')
    expect(result).toBe(false)
  })

  test('when the given path is too short', () => {
    let result = routeMatches('/expected/long/path', '/expected')
    expect(result).toBe(false)
  })

  test('when missing a route parameter', () => {
    let result = routeMatches('/expected/:long/path', '/expected')
    expect(result).toBe(false)
  })

  test('when params are empty', () => {
    let result = routeMatches('/root/:param1/:param2', '/root//param2')
    expect(result).toBe(false)
  })
})

describe('matches', () => {
  test('/', () => {
    let result = routeMatches('/', '/')
    expect(result).toEqual({})
  })

  test('/ with an empty route', () => {
    let result = routeMatches('/', '')
    expect(result).toEqual({})
  })

  test('an empty route with /', () => {
    let result = routeMatches('', '/')
    expect(result).toEqual({})
  })

  test('a literal route', () => {
    let result = routeMatches('/route/to/page', '/route/to/page')
    expect(result).toEqual({})
  })

  test('when a trailing slash is present', () => {
    let result = routeMatches('/route/to/page', '/route/to/page/')
    expect(result).toEqual({})
  })

  test('when a trailing slash is missing', () => {
    let result = routeMatches('/route/to/page/', '/route/to/page')
    expect(result).toEqual({})
  })

  test('a route parameter', () => {
    let result = routeMatches('/page/:pageId', '/page/account')
    expect(result).toEqual({ pageId: 'account' })
  })

  test('many route parameters', () => {
    let result = routeMatches('/:root/:nested/:leaf', '/foo/bar/baz')
    expect(result).toEqual({ root: 'foo', nested: 'bar', leaf: 'baz' })
  })
})
