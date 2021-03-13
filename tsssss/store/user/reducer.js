import { combineReducers } from 'redux';
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, REFRESH_SUCCESS, } from './actions';
let data = (state = null, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.user;
        case REFRESH_SUCCESS:
            return Object.assign(Object.assign({}, state), action.user);
        default:
            return state;
    }
};
let request = (state = false, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return false;
        case LOGIN_ERROR:
            return false;
        case LOGIN_REQUEST:
            return true;
        default:
            return state;
    }
};
let error = (state = null, action) => {
    switch (action.type) {
        case LOGIN_ERROR:
            return action.error;
        case LOGIN_SUCCESS:
            return null;
        default:
            return state;
    }
};
export default combineReducers({ request, error, data });
//# sourceMappingURL=reducer.js.map