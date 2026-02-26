import { ObservableValue } from '@nice-devone/agent-sdk';
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
export declare function useAsyncValue<TValue, TInitial = TValue>(observableValue: ObservableValue<TValue, TInitial>): TValue | TInitial;
