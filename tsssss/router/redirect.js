import { useContext, useEffect } from 'react';
import Context from './context';
export function Redirect({ to, when = true }) {
    let { setPath } = useContext(Context);
    useEffect(() => {
        if (when) {
            setPath(to);
        }
    }, [to, when]);
    return null;
}
//# sourceMappingURL=redirect.js.map