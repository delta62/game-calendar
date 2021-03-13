import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import classnames from 'classnames';
import { useCallback, useContext, useRef, useState } from 'preact/hooks';
import { FormContext } from './form';
import './form-item.scss';
const EMAIL_REGEX = /^.+@.+\..{2,}$/;
let defaultValidator = value => !!value;
let validateEmail = email => EMAIL_REGEX.test(email);
let compose = (...validators) => ((value, allValues) => validators.every(v => !v || v(value, allValues)));
let FormItem = ({ label, name, type, validate }) => {
    let { fields, setField } = useContext(FormContext);
    let [isValid, setIsValid] = useState(false);
    let [touched, setTouched] = useState(false);
    let ref = useRef();
    let onChange = useCallback(() => {
        var _a, _b;
        setTouched(true);
        let value = (_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
        let validator;
        switch (type) {
            case 'email':
                validator = compose(validateEmail, validate);
                break;
            default:
                validator = compose(defaultValidator, validate);
        }
        let result = value ? validator(value, fields) : false;
        if (result) {
            setField(name, value);
            setIsValid(true);
        }
        else {
            setField(name, '');
            setIsValid(false);
        }
    }, [fields, ref.current, validate, setField, setTouched]);
    return (_jsxs("label", Object.assign({ class: classnames("form-item", { invalid: !isValid, touched }) }, { children: [_jsx("span", Object.assign({ class: "form-item-label" }, { children: label }), void 0),
            _jsx("input", { class: "form-item-field", ref: ref, type: type, onChange: onChange }, void 0)] }), void 0));
};
export default FormItem;
//# sourceMappingURL=form-item.js.map