/**
 * Used to debounce given function after provided delay
 * @param value - value passed from usestate
 * @param delay - time duration after which we debounce input value
 * @example
 * ```
 * useDebounce((function: void, delay) => value)
 * ```
 */
export const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};
//# sourceMappingURL=useDebounce.js.map