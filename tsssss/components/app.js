import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { useContext, useEffect } from 'preact/hooks';
import AddGame from '@containers/add-game';
import Details from '@containers/details';
import Sidebar from '@components/sidebar';
import { Context, Redirect } from '../router';
import './app.scss';
let App = ({ isLoggedIn }) => {
    let { params } = useContext(Context);
    let game = parseInt(params.game, 10);
    useEffect(() => {
        if (game) {
            document.body.classList.add('game-selected');
        }
        else {
            document.body.classList.remove('game-selected');
        }
    }, [game]);
    return (_jsxs(_Fragment, { children: [_jsx(Redirect, { to: "/login", when: !isLoggedIn }, void 0),
            _jsxs("section", Object.assign({ class: "sidebar" }, { children: [_jsx(AddGame, {}, void 0),
                    _jsx(Sidebar, {}, void 0)] }), void 0),
            _jsx("section", Object.assign({ class: "main-pane" }, { children: _jsx(Details, { game: game }, void 0) }), void 0)] }, void 0));
};
export default App;
//# sourceMappingURL=app.js.map