const DEFAULT_STATE = {
    0: { id: 0, name: 'Gamecube' },
    1: { id: 1, name: 'PC' },
    2: { id: 2, name: 'Playstation' },
    3: { id: 3, name: 'Playstation 2' },
    4: { id: 4, name: 'Playstation 3' },
    5: { id: 5, name: 'Playstation 4' },
    6: { id: 6, name: 'Super Nintendo' },
    7: { id: 7, name: 'Playstation 5' },
    8: { id: 8, name: 'Wii' },
};
let platforms = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
export default platforms;
//# sourceMappingURL=reducer.js.map