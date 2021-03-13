import { connect } from 'react-redux';
import SignUpPage from '@components/sign-up-page';
let mapState = () => ({});
let mapDispatch = {
    onSignUp: (username, password) => {
        console.log('onSignUp', username, password);
    },
};
export default connect(mapState, mapDispatch)(SignUpPage);
//# sourceMappingURL=sign-up-page.js.map