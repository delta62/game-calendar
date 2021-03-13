import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { format } from 'date-fns';
import './progress.scss';
function getText(props) {
    let date;
    let text;
    if (props.completeDate) {
        date = props.completeDate;
        text = 'Completed';
    }
    else if (props.finishDate) {
        date = props.finishDate;
        text = 'Finished';
    }
    else if (props.startDate) {
        date = props.startDate;
        text = 'Started';
    }
    if (!date || !text) {
        return '';
    }
    return `${text} ${format(date, 'LLL do')}`;
}
function getClass(props) {
    let classes = ['progress'];
    if (props.startDate) {
        classes.push('started');
    }
    if (props.finishDate) {
        classes.push('finished');
    }
    if (props.completeDate) {
        classes.push('completed');
    }
    return classes.join(' ');
}
const Progress = (props) => (_jsxs("div", Object.assign({ class: getClass(props) }, { children: [_jsx("span", Object.assign({ class: "progress-label" }, { children: getText(props) }), void 0),
        _jsxs("div", Object.assign({ class: "bars" }, { children: [_jsx("span", { class: "sliver started" }, void 0),
                _jsx("span", { class: "sliver finished" }, void 0),
                _jsx("span", { class: "sliver completed" }, void 0)] }), void 0)] }), void 0));
export default Progress;
//# sourceMappingURL=progress.js.map