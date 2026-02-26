import { useEffect } from 'react';
import { useUpdate } from './useUpdate';
/**
     * This hook allows you subscribe to an ObservableValue and AsyncActionRunner.
     * @param observableValue - The value to watch.
     *
     * ```ts
     * function MyComponent(){
     *  const mediator = useMediator();
     *  // This forces a rerender whenever the observable value changes.
     *  const value = useAsyncValue(mediator.someObservableValue);
     *
     *  return <div>{value}</div>
     * }
     * ```
     */
// eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
export function useAsyncValue(observableValue) {
    const update = useUpdate();
    useEffect(() => {
        const subscription = observableValue === null || observableValue === void 0 ? void 0 : observableValue.onChange(update);
        return () => subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
    }, [observableValue, update]);
    return observableValue === null || observableValue === void 0 ? void 0 : observableValue.getValue();
}
//# sourceMappingURL=useAsyncValue.js.map