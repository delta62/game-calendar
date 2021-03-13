import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useCallback } from 'preact/hooks';
import GameTitle from '@components/game-title';
import Rating from '@components/rating';
import Timeline from '@containers/timeline';
import Trash from '@components/trash';
import Dropdown from '@components/dropdown';
import './details.scss';
let Details = ({ game, hasGames, onDelete, onPlatformSet, onRatingSet, onTitleSet, platforms }) => {
    var _a;
    if (game) {
        let onDeleteClick = useCallback(() => {
            onDelete(game.id);
        }, [onDelete, game]);
        let onRatingChange = useCallback((rating) => {
            onRatingSet(game.id, rating);
        }, [game, onRatingSet]);
        let onTitleChange = useCallback((title) => {
            onTitleSet(game.id, title);
        }, [game, onTitleSet]);
        let onPlatformChange = useCallback((platform) => {
            let plat = parseInt(platform, 10);
            onPlatformSet(game.id, plat);
        }, [game, onPlatformSet]);
        return (_jsxs("div", Object.assign({ class: "details" }, { children: [_jsx(GameTitle, { text: game.name, onChange: onTitleChange }, void 0),
                _jsxs("div", Object.assign({ class: "metadata" }, { children: [_jsx(Rating, { onChange: onRatingChange, rating: (_a = game.rating) !== null && _a !== void 0 ? _a : 0 }, void 0),
                        _jsx("span", { class: "spacer" }, void 0),
                        _jsxs("label", { children: [_jsx("span", Object.assign({ class: "elide" }, { children: "Platform" }), void 0),
                                _jsx(Dropdown, { emptyLabel: "None", onChange: onPlatformChange, options: platforms, selected: game.platform != null ? `${game.platform}` : undefined }, void 0)] }, void 0),
                        _jsx("span", { class: "spacer" }, void 0),
                        _jsxs("div", Object.assign({ class: "delete" }, { children: [_jsx(Trash, { onClick: onDeleteClick }, void 0),
                                _jsx("span", Object.assign({ class: "elide" }, { children: "Delete" }), void 0)] }), void 0)] }), void 0),
                _jsx(Timeline, { id: game.id }, void 0)] }), void 0));
    }
    else {
        let message = hasGames ? 'Select a game' : 'Add some games to your list to get started';
        return _jsx("p", Object.assign({ class: "details-empty" }, { children: message }), void 0);
    }
};
export default Details;
//# sourceMappingURL=details.js.map