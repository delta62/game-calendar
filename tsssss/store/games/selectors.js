export let getGame = (state, id) => state.games.byId[id];
export let getGames = (state) => state.games.allIds;
export let getEvents = (state, id) => {
    let game = state.games.byId[id];
    let started = { type: 'started' };
    let ret = [started];
    if (game.started) {
        started.time = game.started;
        ret.push({
            type: 'finished',
            time: game.finished,
        });
    }
    if (game.finished) {
        ret.push({
            type: 'completed',
            time: game.completed,
        });
    }
    return ret;
};
export let hasGames = (state) => state.games.allIds.length > 0;
export let getFinishDuration = (state, game) => (state.games.byId[game].finishDuration);
export let getCompleteDuration = (state, game) => (state.games.byId[game].completeDuration);
export let getNextPage = (state) => state.games.nextPage;
//# sourceMappingURL=selectors.js.map