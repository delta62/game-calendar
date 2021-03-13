export let json = async (url, init) => {
    let response = await fetch(url, init);
    if (!response.ok) {
        throw new Error(`Received status code ${response.status} for ${url}`);
    }
    return response.json();
};
//# sourceMappingURL=http.js.map