import { jsx as _jsx } from "react/jsx-runtime";
import { formatTime, formatTimer } from '../common';
import { useSelector } from 'react-redux';
import { getCurrentTime } from '../../lib/global.app.slice';
/**
 * Timer control is a utility that can be used as a countdown timer or count-up timer based on the countUp prop.
 * The props start, stop, and startReference should all be in milliseconds. startReference should be the time in
 * milliseconds that the timer should begin. This time is used to calculate how much time has transpired.
 * @returns - number of milliseconds
 * @example - `TimerInMilliSeconds ({0, 30000, 12342341235252, true})`
 */
export const TimerInMilliSeconds = ({ start, stop, startReference, countUp, elapsedTimerCallback }) => {
    const globalCurrentTime = useSelector(getCurrentTime);
    const interval = globalCurrentTime - startReference;
    let timeLeftOrElapsed = 0;
    if (countUp) {
        const elapsedTime = start + interval;
        if (elapsedTime < stop && elapsedTime >= 0) {
            timeLeftOrElapsed = elapsedTime;
        }
        else if (elapsedTime >= stop) {
            elapsedTimerCallback && elapsedTimerCallback();
        }
    }
    else {
        timeLeftOrElapsed = stop;
        const timeLeft = start - interval;
        if (timeLeft > stop) {
            timeLeftOrElapsed = timeLeft;
        }
        else if (timeLeft <= stop) {
            elapsedTimerCallback && elapsedTimerCallback();
        }
    }
    return timeLeftOrElapsed;
};
/**
 * Timer control is a utility that can be used as a countdown timer or count-up timer based on the countUp prop.
 * The props start, stop, and startReference should all be in milliseconds. startReference should be the time in
 * milliseconds that the timer should begin. This time is used to calculate how much time has transpired.
 * @returns - formatted time. Default format will be in m:ss or mm min or hh.mm hr. If longTimerFormat is true
 *            the format will be hh:mm:ss or mm:ss
 * @example - `<Timer start={0} stop={30000} startReference={12342341235252} countUp={true}/>`
 */
export const Timer = ({ start, stop, startReference, countUp, longTimerFormat, elapsedTimerCallback }) => {
    let timeLeftOrElapsed = TimerInMilliSeconds({ start, stop, startReference, countUp, elapsedTimerCallback });
    timeLeftOrElapsed = Math.floor(timeLeftOrElapsed / 1000);
    return _jsx("span", { children: longTimerFormat ? formatTimer(timeLeftOrElapsed) : formatTime(timeLeftOrElapsed) });
};
//# sourceMappingURL=timer.js.map