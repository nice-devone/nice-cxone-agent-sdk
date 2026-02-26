/**
 * Used to throttle based on the delay provided and then execute the callback
 * @param callback - method passed which will be throttled and executed later
 * @param delay - time duration for which the throttling will happen
 * @example
 * ```
 * useThrottleClick((isSelected: boolean) => callback(arg1, arg2), time)
 * ```
 */
export declare const useThrottleClick: <T>(callback: (...args: T[]) => void, delay: number) => (...args: T[]) => void;
