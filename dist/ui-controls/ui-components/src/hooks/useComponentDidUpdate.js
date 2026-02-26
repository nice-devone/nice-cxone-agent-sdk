import { useEffect, useRef } from 'react';
/**
 * Custom hook for the componentDidUpdate lifecycle method.
 * Executes a callback function after the component updates only based on the dependencies passed.
 * @param callback - The callback function to be executed after the component updates.
 * @param dependencies - An array of values that the effect depends on.
 * @example
 * ```
 * useComponentDidUpdate(() => {
 *  ...
 *}, [dependency1, dependency2])
 * ```
 */
function useComponentDidUpdate(callback, dependencies) {
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
        else {
            callback();
        }
    }, dependencies);
}
export default useComponentDidUpdate;
//# sourceMappingURL=useComponentDidUpdate.js.map