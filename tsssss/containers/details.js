import { connect } from 'react-redux';
import { actionCreators, selectors } from '@store';
import Details from '@components/details';
let mapState = (state, ownProps) => ({
    game: ownProps.game ? selectors.getGame(state, ownProps.game) : null,
    hasGames: selectors.hasGames(state),
    platforms: selectors.getPlatformOptions(state),
});
let mapDispatch = {
    onDelete: actionCreators.deleteGame,
    onRatingSet: actionCreators.setRating,
    onPlatformSet: actionCreators.setPlatform,
    onFinishDurationSet: actionCreators.setFinishDuration,
    onCompleteDurationSet: actionCreators.setCompleteDuration,
    onTitleSet: actionCreators.setTitle,
};
export default connect(mapState, mapDispatch)(Details);
//# sourceMappingURL=details.js.map