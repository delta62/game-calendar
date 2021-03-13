import { connect } from 'react-redux';
import { selectors, actionCreators } from '@store';
import AddGame from '@components/add-game';
let mapState = (state) => ({
    userId: selectors.getUserId(state),
});
let mapDispatch = {
    addGame: actionCreators.addGame,
};
export default connect(mapState, mapDispatch)(AddGame);
//# sourceMappingURL=add-game.js.map