import apiClient from '../client';
const LS_KEY = 'migrationLevel';
const CURRENT_MIGRATION = 1;
export let migrate = () => {
    var _a, _b, _c;
    if (true) {
        console.log('would migrate');
        return;
    }
    let stateStr = (_a = localStorage.getItem('redux')) !== null && _a !== void 0 ? _a : '{}';
    let state = JSON.parse(stateStr);
    let games = (_b = state.games) !== null && _b !== void 0 ? _b : { byId: {}, allIds: [] };
    let userId = (_c = state.user) === null || _c === void 0 ? void 0 : _c.id;
    if (!userId) {
        console.warn("Can't migrate because nobody is logged in");
        return;
    }
    Object.entries(games.byId).forEach(([id, game]) => {
        console.log('migrate', id, game);
        apiClient.saveGame(userId, game);
    });
    localStorage.setItem(LS_KEY, `${CURRENT_MIGRATION}`);
};
export let needsMigration = () => {
    var _a;
    let storageLevel = (_a = localStorage.getItem(LS_KEY)) !== null && _a !== void 0 ? _a : '0';
    let migrationLevel = parseInt(storageLevel, 10);
    return migrationLevel < CURRENT_MIGRATION;
};
//# sourceMappingURL=migrations.js.map