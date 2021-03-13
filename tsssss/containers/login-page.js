import { connect } from 'react-redux';
import { actionCreators, selectors } from '@store';
import LoginPage from '@components/login-page';
let mapState = (state) => ({
    isLoggedIn: selectors.getIsLoggedIn(state),
});
let mapDispatch = {
    onLogin: actionCreators.loginRequest,
};
export default connect(mapState, mapDispatch)(LoginPage);
//# sourceMappingURL=login-page.js.map