import { connect } from 'react-redux';
import { selectors, actionCreators } from '@store';
import GameListItem from '@components/game-list-item';
let mapState = (state, { id }) => ({
    game: selectors.getGame(state, id),
});
let mapDispatch = {
    onReorder: actionCreators.reorderGame,
    onSelect: actionCreators.selectGame,
};
export default connect(mapState, mapDispatch)(GameListItem);
//# sourceMappingURL=game-list-item.js.map