import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useRef, useCallback } from 'preact/hooks';
import './duration.scss';
const MS_TO_MINUTE = 1000 * 60;
const MS_TO_HOUR = MS_TO_MINUTE * 60;
let Duration = ({ onChange, value }) => {
    let hoursRef = useRef();
    let minutesRef = useRef();
    let hours = Math.floor(value / MS_TO_HOUR);
    let minutes = Math.floor((value - hours * MS_TO_HOUR) / MS_TO_MINUTE);
    let onValueChange = useCallback(() => {
        var _a, _b, _c, _d;
        let hoursVal = parseInt((_b = (_a = hoursRef.current) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0, 10);
        let minutesVal = parseInt((_d = (_c = minutesRef.current) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 0, 10);
        let newVal = hoursVal * MS_TO_HOUR + minutesVal * MS_TO_MINUTE;
        onChange(newVal);
    }, [onChange, hoursRef, minutesRef]);
    return (_jsxs("div", Object.assign({ class: "duration" }, { children: [_jsxs("label", Object.assign({ class: "form-item" }, { children: [_jsx("input", { class: "hours", ref: hoursRef, type: "number", value: hours, onChange: onValueChange }, void 0), "hours"] }), void 0),
            _jsxs("label", Object.assign({ class: "form-item" }, { children: [_jsx("input", { class: "minutes", ref: minutesRef, type: "number", value: minutes, onChange: onValueChange }, void 0), "minutes"] }), void 0)] }), void 0));
};
export default Duration;
//# sourceMappingURL=duration.js.map