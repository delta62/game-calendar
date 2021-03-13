import { connect } from 'react-redux';
import { actionCreators, selectors } from '@store';
import FinishedEvent from '@components/finished-event';
let mapState = (state, { game }) => ({
    finishDuration: selectors.getFinishDuration(state, game),
});
let mapDispatch = (dispatch, ownProps) => ({
    onFinishGame() {
        dispatch(actionCreators.finishGame(ownProps.game, true));
    },
    onUnfinishGame() {
        dispatch(actionCreators.finishGame(ownProps.game, false));
    },
    onSetFinishDuration(duration) {
        dispatch(actionCreators.setFinishDuration(ownProps.game, duration));
    },
});
export default connect(mapState, mapDispatch)(FinishedEvent);
//# sourceMappingURL=finished-event.js.map