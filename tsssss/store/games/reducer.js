import { combineReducers } from 'redux';
import { ADD_GAME, DELETE_GAME, FETCH_SUCCESS, REORDER_GAME, UPDATE_GAME, } from './actions';
let allIds = (state = [], action) => {
    switch (action.type) {
        case ADD_GAME:
            return [...state, action.id];
        case DELETE_GAME:
            return state.filter(x => x !== action.id);
        case REORDER_GAME:
            let newState = state.filter(x => x !== action.id);
            let targetIdx = newState.findIndex(x => x === action.target);
            if (!action.before) {
                targetIdx += 1;
            }
            newState.splice(targetIdx, 0, action.id);
            return newState;
        case FETCH_SUCCESS:
            return action.games.map(game => game.id);
        default:
            return state;
    }
};
let byId = (state = {}, action) => {
    switch (action.type) {
        case ADD_GAME:
            return Object.assign(Object.assign({}, state), { [action.id]: { id: action.id, name: action.name } });
        case DELETE_GAME:
            let newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;
        case UPDATE_GAME:
            return Object.assign(Object.assign({}, state), { [action.game.id]: Object.assign(Object.assign({}, state[action.game.id]), action.game) });
        case FETCH_SUCCESS:
            return action.games.reduce((acc, game) => {
                acc[game.id] = game;
                return acc;
            }, {});
        default:
            return state;
    }
};
let nextPage = (state = null, action) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            return action.nextPage;
        default:
            return state;
    }
};
let reducer = combineReducers({ byId, allIds, nextPage });
export default reducer;
//# sourceMappingURL=reducer.js.map