import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import classnames from 'classnames';
import { useCallback, useContext } from 'preact/hooks';
import Chevron from '@components/chevron';
import { useDrag, useDrop } from '@hoc/draggable';
import Icon from '@components/icon';
import Progress from '@components/progress';
import { Context } from '../router';
import './game-list-item.scss';
let GameListItem = ({ game, onReorder }) => {
    let { setPath } = useContext(Context);
    let active = false; // selectedId == game.id
    let dragProps = useDrag(`${game.id}`);
    let onClick = useCallback(() => {
        setPath(`/games/${game.id}`);
    }, [game, setPath]);
    let onDrop = useCallback(({ detail }) => {
        if (detail.key !== `${game.id}`) {
            onReorder(parseInt(detail.key, 10), detail.above, game.id);
        }
    }, [onReorder, game]);
    let { forwardRef, forwardClass } = useDrop({ onDrop });
    return (_jsx("li", Object.assign({ ref: forwardRef, class: classnames('game-list-item', forwardClass, { active }), onClick: onClick }, dragProps, { children: _jsxs("div", Object.assign({ class: "horizontal" }, { children: [_jsx(Icon, Object.assign({ type: "handle" }, dragProps), void 0),
                _jsxs("div", Object.assign({ class: "vertical" }, { children: [_jsx("span", Object.assign({ class: "game-name" }, { children: game.name }), void 0),
                        _jsx(Progress, { startDate: game.started, finishDate: game.finished, completeDate: game.completed }, void 0)] }), void 0),
                _jsx("div", Object.assign({ class: "selector" }, { children: _jsx(Chevron, {}, void 0) }), void 0)] }), void 0) }), void 0));
};
export default GameListItem;
//# sourceMappingURL=game-list-item.js.map