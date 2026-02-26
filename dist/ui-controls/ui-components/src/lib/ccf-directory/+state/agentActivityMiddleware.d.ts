import { Action } from '@reduxjs/toolkit';
import { StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
/**
 *
 * @param actions$ - action for polling of agents "agentDirectory/startAgentTeamPolling/pending"
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return array of agents
 * @example
 */
export declare const agentActivityMiddleware: (actions$: Observable<Action>, state$: StateObservable<any>, { store }: {
    store: any;
}) => Observable<{
    payload: undefined;
    type: "global/default";
}>;
