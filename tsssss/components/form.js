import { jsx as _jsx } from "preact/jsx-runtime";
import { createContext } from 'preact';
import { useState } from 'preact/hooks';
export let FormContext = createContext({
    fields: {},
    setField() { },
});
FormContext.displayName = 'Form';
let Form = ({ children }) => {
    let [fields, setFields] = useState({});
    let setField = (name, value) => {
        setFields(Object.assign(Object.assign({}, fields), { [name]: value }));
    };
    return (_jsx(FormContext.Provider, Object.assign({ value: { fields, setField } }, { children: _jsx("div", Object.assign({ class: "form" }, { children: children }), void 0) }), void 0));
};
export default Form;
//# sourceMappingURL=form.js.map