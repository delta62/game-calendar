export let sameAs = (field) => (value, values) => {
    if (values[field].error) {
        return `${field} must be valid`;
    }
    if (value !== values[field].value) {
        return `Not the same as ${field}`;
    }
    return false;
};
export let minLength = (minLength) => value => (value.length >= minLength
    ? false
    : `Must be at least ${minLength} characters`);
//# sourceMappingURL=validators.js.map