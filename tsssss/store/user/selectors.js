export let getIsLoggedIn = (state) => !!state.user.data;
export let getUser = (state) => state.user.data;
export let getUserId = (state) => { var _a, _b; return (_b = (_a = state.user.data) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null; };
export let getExpiresAt = (state) => { var _a, _b; return (_b = (_a = state.user.data) === null || _a === void 0 ? void 0 : _a.tokenExpires) !== null && _b !== void 0 ? _b : 0; };
export let getRefreshToken = (state) => { var _a, _b; return (_b = (_a = state.user.data) === null || _a === void 0 ? void 0 : _a.refreshToken) !== null && _b !== void 0 ? _b : ''; };
export let getAuthToken = (state) => { var _a, _b; return (_b = (_a = state.user.data) === null || _a === void 0 ? void 0 : _a.idToken) !== null && _b !== void 0 ? _b : ''; };
//# sourceMappingURL=selectors.js.map