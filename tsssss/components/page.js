import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import classnames from 'classnames';
import './page.scss';
let Page = ({ children, className, title }) => (_jsxs("div", Object.assign({ class: classnames('page', className) }, { children: [_jsx("h1", { children: title }, void 0), children] }), void 0));
export default Page;
//# sourceMappingURL=page.js.map