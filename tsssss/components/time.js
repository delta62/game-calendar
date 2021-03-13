import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useCallback, useRef } from 'preact/hooks';
import './time.scss';
let Time = ({ onChange, value }) => {
    let hoursRef = useRef();
    let minutesRef = useRef();
    let onFieldChanged = useCallback(() => {
        var _a, _b, _c;
        let hours = parseInt((_b = (_a = hoursRef.current) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '0', 10);
        let minutes = parseInt((_c = minutesRef.current.value) !== null && _c !== void 0 ? _c : '0', 10);
        hours = hours * 60 * 60 * 1000;
        minutes = minutes * 60 * 1000;
        onChange(hours + minutes);
    }, [hoursRef.current, minutesRef.current, onChange]);
    let hoursVal = (value !== null && value !== void 0 ? value : 0) / (60 * 60 * 1000);
    hoursVal = Math.floor(hoursVal);
    let minutesVal = ((value !== null && value !== void 0 ? value : 0) - (hoursVal * 60 * 60 * 1000)) / (60 * 1000);
    minutesVal = Math.floor(minutesVal);
    return (_jsxs("div", Object.assign({ class: "time" }, { children: [_jsx("input", { type: "number", class: "hours", onChange: onFieldChanged, ref: hoursRef, value: hoursVal }, void 0), ":", _jsx("input", { type: "number", class: "minutes", onChange: onFieldChanged, ref: minutesRef, value: minutesVal }, void 0)] }), void 0));
};
export default Time;
//# sourceMappingURL=time.js.map