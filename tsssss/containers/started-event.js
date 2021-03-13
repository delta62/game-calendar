import { connect } from 'react-redux';
import StartedEvent from '@components/started-event';
import { actionCreators } from '@store';
let mapState = (_state) => ({});
let mapDispatch = (dispatch, ownProps) => ({
    onStartPlaying: () => dispatch(actionCreators.startGame(ownProps.game, true)),
    onStopPlaying: () => dispatch(actionCreators.startGame(ownProps.game, false)),
});
export default connect(mapState, mapDispatch)(StartedEvent);
//# sourceMappingURL=started-event.js.map