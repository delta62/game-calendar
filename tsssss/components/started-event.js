import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { format } from 'date-fns';
import Button from '@components/button';
export default ({ onStartPlaying, onStopPlaying, time }) => {
    if (!time) {
        return (_jsxs(_Fragment, { children: [_jsx("p", { children: "Not started yet" }, void 0),
                _jsx(Button, { text: "Start playing", type: "primary", onClick: onStartPlaying }, void 0)] }, void 0));
    }
    return (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Started on ", format(time, 'LLL do yyyy')] }, void 0),
            _jsx(Button, { text: "Stop playing", onClick: onStopPlaying }, void 0)] }, void 0));
};
//# sourceMappingURL=started-event.js.map