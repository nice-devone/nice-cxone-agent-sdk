import { Action, Store } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
/**
 *
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export declare const screenPopEventMiddleware: (actions$: Observable<Action>, _state$: StateObservable<RootStateOrAny>, { store }: {
    store: Store;
}) => Observable<{
    payload: undefined;
    type: "global/default";
}>;
