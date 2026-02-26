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
declare function useComponentDidUpdate(callback: () => void, dependencies: any[]): void;
export default useComponentDidUpdate;
