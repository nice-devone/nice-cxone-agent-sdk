import { Store } from '@reduxjs/toolkit';
import { StateObservable } from 'redux-observable';
import { RootStateOrAny } from 'react-redux';
/**
 *
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export declare const agentLegMiddleware: (actions$: any, _state$: StateObservable<RootStateOrAny>, { store }: {
    store: Store<RootStateOrAny>;
}) => any;
