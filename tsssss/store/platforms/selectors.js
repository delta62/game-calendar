export let getPlatformOptions = (state) => {
    return Object.values(state.platforms)
        .sort((a, b) => a.name < b.name ? -1 : 1)
        .map(platform => ({
        value: `${platform.id}`,
        name: platform.name,
    }));
};
//# sourceMappingURL=selectors.js.map