export default (fields) => {
    let wrappedFields = Object.entries(fields).reduce((acc, [key, value]) => {
        if (value !== undefined) {
            acc[key] = wrap(value);
        }
        return acc;
    }, {});
    return {
        fields: wrappedFields,
    };
};
function wrap(value) {
    if (typeof value === 'string') {
        return { stringValue: value };
    }
    if (Number.isInteger(value)) {
        return { integerValue: `${value}` };
    }
    if (typeof value === 'number') {
        return { doubleValue: `${value}` };
    }
    if (value === null) {
        return { nullValue: null };
    }
    if (Array.isArray(value)) {
        let ret = {
            arrayValue: {},
        };
        if (value.length > 0) {
            ret.arrayValue.values = value.map(wrap);
        }
        return ret;
    }
    if (typeof value === 'object') {
        let ret = {
            mapValue: {},
        };
        let fields = Object.entries(value).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = wrap(value);
            }
            return acc;
        }, {});
        ret.mapValue.fields = fields;
        return ret;
    }
    throw new Error('Unable to wrap object');
}
//# sourceMappingURL=wrap.js.map