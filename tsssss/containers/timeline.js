import { connect } from 'react-redux';
import { selectors } from '@store';
import Timeline from '@components/timeline';
let mapState = (state, ownProps) => ({
    events: selectors.getEvents(state, ownProps.id),
    game: ownProps.id,
});
export default connect(mapState)(Timeline);
//# sourceMappingURL=timeline.js.map