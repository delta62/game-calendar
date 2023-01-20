# micro-router

A tiny router for React apps

This library aims to provide the most useful high-level features of client-side
routing without extra bells or whistles. It's about 3kb after minification, and
has no dependencies. If you are looking for a Cadillac router with nested routes
and other more complex features, something such as
[`react-router`](https://www.npmjs.com/package/react-router) may be what you're
looking for.

## Usage

```tsx
import { Route, RouteProvider } from '@delta62/micro-router'

let RouteExample = () => (
  <RouteProvider>
    <Route path={['/games/:game', '/']}>
      <App />
    </Route>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/signup">
      <SignUpPage />
    </Route>
  </RouteProvider>
)
```

Routes are added in the component tree under a `RouteProvider`, which takes
care of synchronizing the browser's location state with your components. This
library is fully integrated with the history API, so pressing the back button
after switching routes will invoke previous routes rather than exiting your
app.

You can change the current location either programatically via a React context
which `RouteProvider` provides, or declaratively with embedded components.

### `<RouteProvider>`, `RouteContext`

This context holds navigation data which can be used in your application. The
context object holds the following properties:

```ts
{
    params: Record<string, string>,
    path: string,
    setPath(newPath: string): void,
    setRouteParams(newParams: Record<string, string>): void
}
```

It's recommended that you use the included components to update the context,
but of course it's possible to access directly for programmatic changes via
`React.useContext()`.

### `<Route path={string | string[]}>`

This component only renders its children when the given path is currently
active. If one component should match multiple URLs, you can provide an
array of paths to match.

The route matching syntax is very minimal - you can include either hard-
coded strings or route parameters, which are prefixed with a `:`.

```
/path/to/resource
/person/:name
```

Leading and trailing slashes are optional in both the route definition and the
path given from the browser at runtime.

### `<Anchor href={string}>`

Renders an HTML `<a>` tag which is implicitly hooked up to the router's
context, invoking `micro-router` instead of the browser's default navigation
behavior. Anchors that are currently active (their destination matches the
current location) have an `active` class added to them.

### `<Redirect to={string} when={boolean?}>`

Redirects the user to a different location (`to`) when a given condition
(`when`) is met. The condition is optional, and defaults to true (if the
component is rendered, by default it will always redirect). This component does
not generate any markup.
