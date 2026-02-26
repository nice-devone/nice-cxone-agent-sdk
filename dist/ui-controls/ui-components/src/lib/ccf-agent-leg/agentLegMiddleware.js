import { filter, first, map } from 'rxjs/operators';
import { agentStateActions } from '../ccf-agent-state/ccf-agent-state.slice';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { CcfAuthenticationActions } from '../ccf-authentication/ccf-authentication.slice';
/**
 *
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export const agentLegMiddleware = (actions$, _state$, { store }) => {
    return actions$.pipe(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter((action) => action.type === CcfAuthenticationActions.logUserIn.type), first(), map(() => {
        var _a, _b, _c;
        (_c = (_b = (_a = CXoneAcdClient === null || CXoneAcdClient === void 0 ? void 0 : CXoneAcdClient.instance) === null || _a === void 0 ? void 0 : _a.session) === null || _b === void 0 ? void 0 : _b.agentLegEvent) === null || _c === void 0 ? void 0 : _c.subscribe((agentLeg) => {
            agentLeg &&
                (store === null || store === void 0 ? void 0 : store.dispatch(agentStateActions.setAgentLegData(agentLeg)));
        });
        return agentStateActions === null || agentStateActions === void 0 ? void 0 : agentStateActions.default;
    }));
};
//# sourceMappingURL=agentLegMiddleware.js.map