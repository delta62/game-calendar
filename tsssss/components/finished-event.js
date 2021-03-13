import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "preact/jsx-runtime";
import { format } from 'date-fns';
import Button from './button';
import Time from './time';
export default ({ finishDuration, onFinishGame, onSetFinishDuration, onUnfinishGame, time, }) => {
    if (time) {
        return (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Finished on ", format(time, 'LLL do yyyy')] }, void 0),
                _jsx(Time, { value: finishDuration, onChange: onSetFinishDuration }, void 0),
                _jsx(Button, { text: "Mark as unfinished", onClick: onUnfinishGame }, void 0)] }, void 0));
    }
    return (_jsxs(_Fragment, { children: [_jsx("p", { children: "Not finished yet" }, void 0),
            _jsx(Button, { text: "Game cleared", type: "primary", onClick: onFinishGame }, void 0)] }, void 0));
};
//# sourceMappingURL=finished-event.js.map