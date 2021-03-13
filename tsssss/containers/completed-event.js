import { connect } from 'react-redux';
import { actionCreators, selectors } from '@store';
import CompletedEvent from '@components/completed-event';
let mapState = (state, { game }) => ({
    completeDuration: selectors.getCompleteDuration(state, game)
});
let mapDispatch = (dispatch, ownProps) => ({
    onCompleteGame() {
        dispatch(actionCreators.completeGame(ownProps.game, true));
    },
    onSetCompleteDuration(duration) {
        dispatch(actionCreators.setCompleteDuration(ownProps.game, duration));
    },
    onUncompleteGame() {
        dispatch(actionCreators.completeGame(ownProps.game, false));
    },
});
export default connect(mapState, mapDispatch)(CompletedEvent);
//# sourceMappingURL=completed-event.js.map