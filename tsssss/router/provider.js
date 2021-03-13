import { jsx as _jsx } from "preact/jsx-runtime";
import { useState, useEffect } from 'react';
import Context from './context';
export function RouteProvider(props) {
    let [href, setHref] = useState(location.pathname);
    let [params, setParams] = useState({});
    function onPopState() {
        setHref(location.pathname);
    }
    function setPath(href) {
        history.pushState(null, '', href);
        setHref(href);
    }
    function setRouteParams(params) {
        setParams(params);
    }
    useEffect(() => (onpopstate = onPopState), []);
    return (_jsx(Context.Provider, Object.assign({ value: { path: href, setPath, setRouteParams, params } }, { children: props.children }), void 0));
}
//# sourceMappingURL=provider.js.map