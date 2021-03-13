import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "preact/jsx-runtime";
import { format } from 'date-fns';
import Button from './button';
import Time from './time';
export default ({ completeDuration, onCompleteGame, onSetCompleteDuration, onUncompleteGame, time }) => {
    if (time) {
        return (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["100% complete on ", format(time, 'LLL do yyyy')] }, void 0),
                _jsx(Time, { value: completeDuration, onChange: onSetCompleteDuration }, void 0),
                _jsx(Button, { text: "Mark as incomplete", onClick: onUncompleteGame }, void 0)] }, void 0));
    }
    return (_jsxs(_Fragment, { children: [_jsx("p", { children: "Not 100% completed yet" }, void 0),
            _jsx(Button, { text: "Mark as 100% complete", onClick: onCompleteGame }, void 0)] }, void 0));
};
//# sourceMappingURL=completed-event.js.map