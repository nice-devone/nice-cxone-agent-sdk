export interface TimerProps {
    start: number;
    stop: number;
    startReference: number;
    countUp?: boolean;
    longTimerFormat?: boolean;
    elapsedTimerCallback?: () => void;
}
/**
 * Timer control is a utility that can be used as a countdown timer or count-up timer based on the countUp prop.
 * The props start, stop, and startReference should all be in milliseconds. startReference should be the time in
 * milliseconds that the timer should begin. This time is used to calculate how much time has transpired.
 * @returns - number of milliseconds
 * @example - `TimerInMilliSeconds ({0, 30000, 12342341235252, true})`
 */
export declare const TimerInMilliSeconds: ({ start, stop, startReference, countUp, elapsedTimerCallback }: TimerProps) => number;
/**
 * Timer control is a utility that can be used as a countdown timer or count-up timer based on the countUp prop.
 * The props start, stop, and startReference should all be in milliseconds. startReference should be the time in
 * milliseconds that the timer should begin. This time is used to calculate how much time has transpired.
 * @returns - formatted time. Default format will be in m:ss or mm min or hh.mm hr. If longTimerFormat is true
 *            the format will be hh:mm:ss or mm:ss
 * @example - `<Timer start={0} stop={30000} startReference={12342341235252} countUp={true}/>`
 */
export declare const Timer: ({ start, stop, startReference, countUp, longTimerFormat, elapsedTimerCallback }: TimerProps) => JSX.Element;
