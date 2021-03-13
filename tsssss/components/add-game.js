import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useRef, useCallback } from 'preact/hooks';
import './add-game.scss';
let AddGame = ({ addGame }) => {
    let ref = useRef();
    let onClick = useCallback(() => {
        var _a;
        let value = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.value.trim();
        if (value) {
            addGame(value);
            ref.current.value = '';
        }
    }, [addGame]);
    let onKeyUp = useCallback((event) => {
        if (event.key === 'Enter') {
            onClick();
        }
    }, [onClick, addGame]);
    return (_jsxs("div", Object.assign({ class: "add-game" }, { children: [_jsx("input", { class: "text-input", type: "text", ref: ref, placeholder: "Add a game", onKeyUp: onKeyUp }, void 0),
            _jsx("input", { class: "add-button", type: "button", value: "+", onClick: onClick }, void 0)] }), void 0));
};
export default AddGame;
//# sourceMappingURL=add-game.js.map