import { ADD_GAME, DELETE_GAME, FETCH_ERROR, FETCH_REQUEST, FETCH_SUCCESS, REORDER_GAME, SELECT_GAME, UPDATE_ERROR, UPDATE_GAME, } from './actions';
export let addGame = (name) => ({
    type: ADD_GAME,
    id: Date.now(),
    name,
});
export let startGame = (id, state) => ({
    type: UPDATE_GAME,
    game: {
        id,
        started: state ? Date.now() : undefined,
    },
});
export let finishGame = (id, state) => ({
    type: UPDATE_GAME,
    game: {
        id,
        finished: state ? Date.now() : undefined,
    },
});
export let completeGame = (id, state) => ({
    type: UPDATE_GAME,
    game: {
        id,
        completed: state ? Date.now() : undefined,
    },
});
export let selectGame = (id) => ({
    type: SELECT_GAME,
    id,
});
export let deleteGame = (id) => ({
    type: DELETE_GAME,
    id,
});
export let setRating = (id, rating) => ({
    type: UPDATE_GAME,
    game: {
        id,
        rating,
    },
});
export let setTitle = (id, name) => ({
    type: UPDATE_GAME,
    game: {
        id,
        name,
    },
});
export let fetchRequest = (nextPage) => ({
    type: FETCH_REQUEST,
    nextPage,
});
export let fetchSuccess = (games, nextPage) => ({
    type: FETCH_SUCCESS,
    games,
    nextPage,
});
export let fetchError = (error) => ({
    type: FETCH_ERROR,
    error,
});
export let updateError = (error) => ({
    type: UPDATE_ERROR,
    error,
});
export let setPlatform = (id, platform) => ({
    type: UPDATE_GAME,
    game: {
        id,
        platform,
    },
});
export let setFinishDuration = (id, finishDuration) => ({
    type: UPDATE_GAME,
    game: {
        id,
        finishDuration,
    },
});
export let setCompleteDuration = (id, completeDuration) => ({
    type: UPDATE_GAME,
    game: {
        id,
        completeDuration,
    },
});
export let reorderGame = (id, before, target) => ({
    type: REORDER_GAME,
    id,
    before,
    target,
});
//# sourceMappingURL=action-creators.js.map