import { jsx as _jsx } from "preact/jsx-runtime";
import classnames from 'classnames';
import './button.scss';
let Button = ({ onClick, text, type }) => (_jsx("input", { type: "button", class: classnames('button', type), value: text, onClick: onClick }, void 0));
export default Button;
//# sourceMappingURL=button.js.map