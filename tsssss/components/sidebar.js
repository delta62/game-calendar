import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Tab, Tabs } from 'tabs';
import GameList from '@containers/game-list';
import './sidebar.scss';
let Sidebar = () => (_jsxs(Tabs, { children: [_jsx(Tab, Object.assign({ id: "todo" }, { children: _jsx(GameList, {}, void 0) }), void 0),
        _jsx(Tab, { id: "completed" }, void 0)] }, void 0));
export default Sidebar;
//# sourceMappingURL=sidebar.js.map