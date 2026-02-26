import { useEffect, useRef } from 'react';
/**
 * @param value - Any value which has to be persisted
 * @returns - The value in previous render
 * @example - usePrevious(value)
 */
export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};
//# sourceMappingURL=usePrevious.js.map