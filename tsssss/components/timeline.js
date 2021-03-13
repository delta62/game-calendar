import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import classnames from 'classnames';
import StartedEvent from '@containers/started-event';
import FinishedEvent from '@containers/finished-event';
import CompletedEvent from '@containers/completed-event';
import './timeline.scss';
let Timeline = ({ events, game }) => (_jsx("div", Object.assign({ class: "timeline" }, { children: events.map(event => (_jsxs(_Fragment, { children: [_jsxs("div", Object.assign({ class: classnames('event', { finished: !!event.time }) }, { children: [event.type === 'started' && (_jsx(StartedEvent, { game: game, time: event.time }, void 0)),
                    event.type === 'finished' && (_jsx(FinishedEvent, { game: game, time: event.time }, void 0)),
                    event.type === 'completed' && (_jsx(CompletedEvent, { game: game, time: event.time }, void 0))] }), void 0),
            _jsx("span", { class: "line" }, void 0)] }, void 0))) }), void 0));
export default Timeline;
//# sourceMappingURL=timeline.js.map