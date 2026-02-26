import { CXoneClient } from '@nice-devone/agent-sdk';
import { map, filter, first } from 'rxjs/operators';
import { globalActions } from '../../global.app.slice';
import { agentDirectoryActions, getExtDirectoryFavorites } from './ccf-directory.slice';
const cxoneClient = CXoneClient.instance;
/**
 *
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export const externalDirectorySearchMiddleware = (actions$, state$, { store }) => {
    return actions$.pipe(filter((action) => action.type === agentDirectoryActions.updateExternalDirectoryState.type), first(), map(() => {
        var _a, _b;
        (_b = (_a = cxoneClient === null || cxoneClient === void 0 ? void 0 : cxoneClient.directory.dynamicDirectory) === null || _a === void 0 ? void 0 : _a.searchDirectoryResult) === null || _b === void 0 ? void 0 : _b.subscribe((entries) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if ((_b = (_a = state$.value) === null || _a === void 0 ? void 0 : _a.agentDirectory) === null || _b === void 0 ? void 0 : _b.hideExternalDirectoryData) {
                store.dispatch(agentDirectoryActions.setExternalDirectoryEntries({
                    directoryEntry: [],
                    subscriptionID: '',
                    totalRecords: 0,
                }));
                store.dispatch(getExtDirectoryFavorites((_e = (_d = (_c = state$.value) === null || _c === void 0 ? void 0 : _c.agentDirectory) === null || _d === void 0 ? void 0 : _d.query) === null || _e === void 0 ? void 0 : _e.searchBox));
            }
            else {
                entries && store.dispatch(agentDirectoryActions.setExternalDirectoryEntries({
                    directoryEntry: entries.directoryEntries,
                    subscriptionID: entries.subscriptionId,
                    totalRecords: entries.totalRecords,
                }));
                store.dispatch(getExtDirectoryFavorites((_h = (_g = (_f = state$.value) === null || _f === void 0 ? void 0 : _f.agentDirectory) === null || _g === void 0 ? void 0 : _g.query) === null || _h === void 0 ? void 0 : _h.searchBox));
            }
        });
        return globalActions.default();
    }));
};
//# sourceMappingURL=externalDirectorySearchMiddleware.js.map