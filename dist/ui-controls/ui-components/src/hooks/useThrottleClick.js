import { useState, useCallback } from 'react';
/**
 * Used to throttle based on the delay provided and then execute the callback
 * @param callback - method passed which will be throttled and executed later
 * @param delay - time duration for which the throttling will happen
 * @example
 * ```
 * useThrottleClick((isSelected: boolean) => callback(arg1, arg2), time)
 * ```
 */
export const useThrottleClick = (callback, delay) => {
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = useCallback((...args) => {
        if (!isClicked) {
            setIsClicked(true);
            callback(...args);
            setTimeout(() => setIsClicked(false), delay);
        }
    }, [callback, delay, isClicked]);
    return handleClick;
};
//# sourceMappingURL=useThrottleClick.js.map