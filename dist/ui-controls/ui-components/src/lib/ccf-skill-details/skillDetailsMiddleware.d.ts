import { Action } from '@reduxjs/toolkit';
import { StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
/**
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export declare const skillDetailsMiddleware: (actions$: Observable<Action>, _state$: StateObservable<any>, { store }: {
    store: any;
}) => Observable<{
    payload: undefined;
    type: "global/default";
}>;
