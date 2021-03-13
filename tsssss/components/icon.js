var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "preact/jsx-runtime";
import './icon.scss';
let Icon = (_a) => {
    var { type } = _a, props = __rest(_a, ["type"]);
    return (_jsx("span", Object.assign({ class: "icon" }, props, { children: _jsx("span", { class: type }, void 0) }), void 0));
};
export default Icon;
//# sourceMappingURL=icon.js.map