import { jsx as _jsx } from "preact/jsx-runtime";
import { useContext, useEffect, useState } from 'preact/hooks';
import classNames from 'classnames';
import Context from './context';
export function Anchor({ children, className, href, }) {
    let [isActive, setIsActive] = useState(false);
    let { setPath } = useContext(Context);
    useEffect(() => setIsActive(location.pathname === href));
    function onClick(event) {
        setPath(href);
        event.preventDefault();
    }
    return (_jsx("a", Object.assign({ className: classNames(className, { active: isActive }), href: href, onClick: onClick }, { children: children }), void 0));
}
//# sourceMappingURL=anchor.js.map