import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import { useCallback, useContext, useEffect, useRef, useState } from 'preact/hooks';
import { Edit } from 'react-feather';
import Chevron from '@components/chevron';
import { Context } from '../router';
import './game-title.scss';
let GameTitle = ({ text, onChange }) => {
    let [editing, setEditing] = useState(false);
    let { setPath } = useContext(Context);
    let ref = useRef();
    let onBodyClick = useCallback(() => {
        setEditing(false);
    }, [ref, setEditing]);
    useEffect(() => {
        document.addEventListener('click', onBodyClick);
        return () => document.removeEventListener('click', onBodyClick);
    }, []);
    let onTitleClick = useCallback((event) => {
        if (!editing) {
            setEditing(true);
            setTimeout(() => { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.select(); });
        }
        event.stopPropagation();
    }, [editing, setEditing]);
    let onKeyUp = useCallback((event) => {
        var _a, _b;
        switch (event.key) {
            case 'Enter':
                onChange((_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '');
                setEditing(false);
                break;
            case 'Escape':
                setEditing(false);
                break;
        }
    }, [ref, onChange]);
    let onBackClick = useCallback(() => {
        setPath('/');
    }, [setPath]);
    if (!editing) {
        return (_jsxs("div", Object.assign({ class: "game-title", onClick: onTitleClick }, { children: [_jsx(Chevron, { onClick: onBackClick }, void 0),
                _jsx("h1", Object.assign({ class: "text" }, { children: text }), void 0),
                _jsx(Edit, { className: "icon" }, void 0)] }), void 0));
    }
    else {
        return (_jsxs(_Fragment, { children: [_jsx(Chevron, { onClick: onBackClick }, void 0),
                _jsx("input", { type: "text", ref: ref, onClick: onTitleClick, value: text, onKeyUp: onKeyUp }, void 0)] }, void 0));
    }
};
export default GameTitle;
//# sourceMappingURL=game-title.js.map