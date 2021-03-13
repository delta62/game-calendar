import { createContext } from 'react';
let Context = createContext({
    params: {},
    path: location.pathname,
    setPath() { },
    setRouteParams() { },
});
Context.displayName = 'Router';
export default Context;
//# sourceMappingURL=context.js.map