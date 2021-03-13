import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useCallback, useRef } from 'preact/hooks';
import './dropdown.scss';
let Dropdown = ({ emptyLabel, onChange, options, selected }) => {
    let ref = useRef();
    let onChangeCb = useCallback(() => {
        var _a;
        onChange((_a = ref.current) === null || _a === void 0 ? void 0 : _a.value);
    }, [onChange, ref.current]);
    return (_jsxs("select", Object.assign({ ref: ref, class: "dropdown", onChange: onChangeCb }, { children: [_jsx("option", Object.assign({ selected: selected === undefined }, { children: emptyLabel }), void 0),
            options.map(({ name, value }) => (_jsx("option", Object.assign({ value: value, selected: value === selected }, { children: name }), void 0)))] }), void 0));
};
export default Dropdown;
//# sourceMappingURL=dropdown.js.map