import { Fragment as _Fragment, jsx as _jsx } from "preact/jsx-runtime";
import { useContext, useEffect, useState } from 'preact/hooks';
import Context from './context';
let match = (path, currentPath) => {
    let parts = path.split('/');
    let currentParts = currentPath.split('/');
    let params = {};
    for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        let test = currentParts[i];
        let isParam = part.startsWith(':');
        let isOption = part.startsWith('?');
        if (isOption) {
            let key = part.substr(1);
            if (test) {
                params[key] = test;
            }
        }
        else if (isParam) {
            let key = part.substr(1);
            params[key] = test;
        }
        else if (part !== test) {
            return false;
        }
    }
    return params;
};
export function Route(props) {
    let { path, setRouteParams } = useContext(Context);
    let [isMatch, setIsMatch] = useState(false);
    useEffect(() => {
        let routeParams = false;
        let routes = [].concat(props.path);
        for (let route of routes) {
            let params = match(route, path);
            if (params) {
                routeParams = params;
                break;
            }
        }
        if (routeParams) {
            setRouteParams(routeParams);
            setIsMatch(true);
        }
        else {
            setIsMatch(false);
        }
    }, [path, props.path]);
    return isMatch ? _jsx(_Fragment, { children: props.children }, void 0) : null;
}
//# sourceMappingURL=route.js.map