/**
 * Used to debounce given function after provided delay
 * @param value - value passed from usestate
 * @param delay - time duration after which we debounce input value
 * @example
 * ```
 * useDebounce((function: void, delay) => value)
 * ```
 */
export declare const debounce: <T extends (...args: any[]) => void>(func: T, delay: number) => (this: ThisParameterType<T>, ...args: Parameters<T>) => void;
