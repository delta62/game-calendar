import { isArrayValue, isDoubleValue, isIntegerValue, isMapValue, isNullValue, isStringValue, } from './models';
export default (response) => {
    if (!response.fields) {
        return {};
    }
    return Object.entries(response.fields).reduce((acc, [key, value]) => {
        acc[key] = unwrap(value);
        return acc;
    }, {});
};
function unwrap(response) {
    var _a, _b;
    if (isStringValue(response)) {
        return response.stringValue;
    }
    if (isIntegerValue(response)) {
        return parseInt(response.integerValue, 10);
    }
    if (isDoubleValue(response)) {
        return parseFloat(response.doubleValue);
    }
    if (isArrayValue(response)) {
        return (_b = (_a = response.arrayValue.values) === null || _a === void 0 ? void 0 : _a.map(unwrap)) !== null && _b !== void 0 ? _b : [];
    }
    if (isMapValue(response)) {
        if (response.mapValue.fields) {
            return Object.entries(response.mapValue.fields).reduce((acc, [key, value]) => {
                acc[key] = unwrap(value);
                return acc;
            }, {});
        }
        return {};
    }
    if (isNullValue(response)) {
        return null;
    }
    throw new Error('Unexpected field type');
}
//# sourceMappingURL=unwrap.js.map