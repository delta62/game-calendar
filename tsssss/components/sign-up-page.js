import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useCallback } from 'preact/hooks';
import { Form, FormItem } from '@delta62/micro-form';
import { Anchor, Redirect } from '../router';
import Page from '@components/page';
import { sameAs, minLength } from '../validators';
import './sign-up-page.scss';
let confirmValidator = sameAs('password');
let passwordValidator = minLength(8);
let SignUpPage = ({ onSignUp }) => {
    let onSubmit = useCallback((values) => {
        console.log('onSubmit', values);
    }, [onSignUp]);
    return (_jsxs(Page, Object.assign({ className: "sign-up", title: "Sign Up" }, { children: [_jsx(Redirect, { to: "/", when: false }, void 0),
            _jsxs(Form, Object.assign({ onSubmit: onSubmit }, { children: [_jsx(FormItem, { name: "email", label: "Email", type: "email" }, void 0),
                    _jsx(FormItem, { name: "password", label: "Password", type: "password", validate: passwordValidator }, void 0),
                    _jsx(FormItem, { name: "confirm", label: "Confirm", type: "password", validate: confirmValidator }, void 0),
                    _jsx(FormItem, { label: "Sign Up", type: "submit" }, void 0)] }), void 0),
            _jsx(Anchor, Object.assign({ className: "login", href: "/login" }, { children: "Log In" }), void 0)] }), void 0));
};
export default SignUpPage;
//# sourceMappingURL=sign-up-page.js.map