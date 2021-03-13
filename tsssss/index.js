import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import 'preact/debug';
import { Provider } from 'react-redux';
import { render } from 'preact';
import store from '@store';
import { Route, RouteProvider } from './router';
import App from '@containers/app';
import LoginPage from '@containers/login-page';
import SignUpPage from '@containers/sign-up-page';
render(_jsx(RouteProvider, { children: _jsxs(Provider, Object.assign({ store: store }, { children: [_jsx(Route, Object.assign({ path: ['/games/?game', '/'] }, { children: _jsx(App, {}, void 0) }), void 0),
            _jsx(Route, Object.assign({ path: "/login" }, { children: _jsx(LoginPage, {}, void 0) }), void 0),
            _jsx(Route, Object.assign({ path: "/signup" }, { children: _jsx(SignUpPage, {}, void 0) }), void 0)] }), void 0) }, void 0), document.body);
//# sourceMappingURL=index.js.map