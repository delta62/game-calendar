import { connect } from 'react-redux';
import { selectors } from '@store';
import App from '@components/app';
let mapState = (state) => ({
    isLoggedIn: selectors.getIsLoggedIn(state),
});
export default connect(mapState)(App);
//# sourceMappingURL=app.js.map