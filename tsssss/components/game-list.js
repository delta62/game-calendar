import { jsx as _jsx } from "preact/jsx-runtime";
import { useCallback, useEffect } from 'preact/hooks';
import GameListItem from '@containers/game-list-item';
import { DragProvider } from '@hoc/draggable.tsx';
import './game-list.scss';
let GameList = ({ fetchGames, games, userId, nextPage }) => {
    useEffect(() => {
        if (userId) {
            fetchGames(userId, null);
        }
    }, [fetchGames, userId]);
    let onScroll = useCallback((event) => {
        let el = event.target;
        let remainingScroll = el.scrollHeight - el.scrollTop - el.offsetHeight;
        if (remainingScroll === 0) {
            fetchGames(userId, nextPage);
        }
    }, [fetchGames, userId, nextPage]);
    return (_jsx("div", Object.assign({ class: "scroll-wrapper", onScroll: onScroll }, { children: _jsx("div", Object.assign({ class: "game-list" }, { children: _jsx(DragProvider, { children: _jsx("ol", { children: games.map(id => (_jsx(GameListItem, { id: id }, void 0))) }, void 0) }, void 0) }), void 0) }), void 0));
};
export default GameList;
//# sourceMappingURL=game-list.js.map