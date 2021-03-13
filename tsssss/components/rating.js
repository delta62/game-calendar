import { jsx as _jsx } from "preact/jsx-runtime";
import classnames from 'classnames';
import { useCallback } from 'preact/hooks';
import { Star } from 'react-feather';
import './rating.scss';
let Rating = ({ onChange, rating }) => {
    let onChangeClick = useCallback((i) => {
        return () => {
            onChange((i + 1) * 2);
        };
    }, [onChange, rating]);
    return (_jsx("div", Object.assign({ class: "rating" }, { children: new Array(5).fill(0).map((_, i) => {
            let filled = (i + 1) * 2 <= rating;
            return (_jsx(Star, { className: classnames('icon', { filled }), onClick: onChangeClick(i) }, void 0));
        }) }), void 0));
};
export default Rating;
//# sourceMappingURL=rating.js.map