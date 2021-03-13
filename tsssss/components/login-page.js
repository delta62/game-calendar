import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useCallback } from 'preact/hooks';
import { Form, FormItem } from '@delta62/micro-form';
import Page from '@components/page';
import { Anchor, Redirect } from '../router';
import { minLength } from '../validators';
import './login-page.scss';
let passwordValidator = minLength(8);
let LoginPage = ({ isLoggedIn, onLogin }) => {
    let onSubmit = useCallback((values) => {
        onLogin(values.email, values.password);
    }, [onLogin]);
    return (_jsxs(Page, Object.assign({ className: "login-page", title: "Log in" }, { children: [_jsx(Redirect, { to: "/", when: isLoggedIn }, void 0),
            _jsxs(Form, Object.assign({ onSubmit: onSubmit }, { children: [_jsx(FormItem, { type: "email", label: "Email", name: "email" }, void 0),
                    _jsx(FormItem, { type: "password", label: "Password", name: "password", validate: passwordValidator }, void 0),
                    _jsx(FormItem, { type: "submit", label: "Log in" }, void 0)] }), void 0),
            _jsx(Anchor, Object.assign({ className: "login", href: "/signup" }, { children: "Sign up" }), void 0)] }), void 0));
};
export default LoginPage;
//# sourceMappingURL=login-page.js.map