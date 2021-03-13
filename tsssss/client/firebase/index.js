import { json } from '../http';
import unwrap from './unwrap';
import wrap from './wrap';
const ID_API_ROOT = 'https://identitytoolkit.googleapis.com/v1';
const API_ROOT = 'https://firestore.googleapis.com/v1';
export let login = async (userEmail, password) => {
    let url = `${ID_API_ROOT}/accounts:signInWithPassword?key=${__API_KEY__}`;
    let init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userEmail,
            password,
            returnSecureToken: true,
        }),
    };
    let { email, localId, idToken, refreshToken, expiresIn, } = await json(url, init);
    let tokenExpires = Date.now() + parseInt(expiresIn, 10) * 1000;
    return { email, id: localId, idToken, refreshToken, tokenExpires };
};
export let getGames = async (userId, authToken, nextPageToken) => {
    var _a, _b, _c;
    let query = new URLSearchParams();
    query.append('orderBy', 'created');
    if (nextPageToken) {
        query.append('pageToken', nextPageToken);
    }
    let url = `${API_ROOT}/projects/${__PROJECT_ID__}/databases/(default)/documents/users/${userId}/games?${query.toString()}`;
    let init = {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    };
    let response = await json(url, init);
    let games = (_b = (_a = response.documents) === null || _a === void 0 ? void 0 : _a.map(unwrap)) !== null && _b !== void 0 ? _b : [];
    let nextPage = (_c = response.nextPageToken) !== null && _c !== void 0 ? _c : null;
    return { games, nextPage };
};
export let saveGame = async (userId, game) => {
    let path = `projects/${__PROJECT_ID__}/databases/(default)/documents/users/${userId}/games/${game.id}`;
    let url = `${API_ROOT}/${path}`;
    let init = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({ name: path }, wrap(game))),
    };
    let res = await fetch(url, init);
    if (!res.ok) {
        throw new Error(`Got status code ${res.status} from ${url}`);
    }
};
export let create = async (path, documentId, authToken, document) => {
    path = `projects/${__PROJECT_ID__}/databases/(default)/documents/${path}?documentId=${documentId}`;
    let url = `${API_ROOT}/${path}`;
    let init = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({}, wrap(document))),
    };
    await fetch(url, init);
};
export let drop = async (path, authToken) => {
    path = `projects/${__PROJECT_ID__}/databases/(default)/documents/${path}`;
    let url = `${API_ROOT}/${path}`;
    let init = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    };
    await fetch(url, init);
};
export let patch = async (path, authToken, document) => {
    let updateMask = Object
        .keys(document)
        .map(x => `updateMask.fieldPaths=${encodeURIComponent(x)}`)
        .join('&');
    path = `projects/${__PROJECT_ID__}/databases/(default)/documents/${path}?${updateMask}`;
    let url = `${API_ROOT}/${path}`;
    let init = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.assign({ name: path }, wrap(document))),
    };
    await fetch(url, init);
};
export let refreshToken = async (refreshToken) => {
    let url = `https://securetoken.googleapis.com/v1/token?key=${__API_KEY__}`;
    let init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`,
    };
    let res = await json(url, init);
    let tokenExpires = Date.now() + parseInt(res.expires_in, 10) * 1000;
    return {
        refreshToken: res.refresh_token,
        idToken: res.id_token,
        tokenExpires,
    };
};
//# sourceMappingURL=index.js.map