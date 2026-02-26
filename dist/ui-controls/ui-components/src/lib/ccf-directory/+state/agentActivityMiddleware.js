import { CXoneClient } from '@nice-devone/agent-sdk';
import { map, filter, first } from 'rxjs/operators';
import { agentDirectoryActions, DirectoryDropdownValues, } from '../+state/ccf-directory.slice';
import { globalActions } from '../../global.app.slice';
const cxoneClient = CXoneClient.instance;
const startAgentTeamStatePollingAction = 'agentDirectory/startAgentTeamPolling/pending';
/**
 *
 * @param actions$ - action for polling of agents "agentDirectory/startAgentTeamPolling/pending"
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return array of agents
 * @example
 */
export const agentActivityMiddleware = (actions$, state$, { store }) => {
    // console.log('actions$ is here',actions$)
    return actions$.pipe(filter((action) => action.type === startAgentTeamStatePollingAction), first(), map(() => {
        var _a, _b;
        (_b = (_a = cxoneClient === null || cxoneClient === void 0 ? void 0 : cxoneClient.directory) === null || _a === void 0 ? void 0 : _a.directoryEvent) === null || _b === void 0 ? void 0 : _b.subscribe((event) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            if (((_b = (_a = state$.value) === null || _a === void 0 ? void 0 : _a.agentDirectory) === null || _b === void 0 ? void 0 : _b.query.dropDown) === DirectoryDropdownValues.FavoriteList &&
                ((_c = state$.value) === null || _c === void 0 ? void 0 : _c.agentDirectory.query.searchBox) === '') {
                store.dispatch(agentDirectoryActions.updateFavAgentList(event.agentList.favoriteAgents));
            }
            if (((_e = (_d = state$.value) === null || _d === void 0 ? void 0 : _d.agentDirectory) === null || _e === void 0 ? void 0 : _e.query.dropDown) !== DirectoryDropdownValues.FavoriteList) {
                store.dispatch(agentDirectoryActions.updateAgentList(event));
            }
            if (!((_g = (_f = state$.value) === null || _f === void 0 ? void 0 : _f.agentDirectory) === null || _g === void 0 ? void 0 : _g.drillDownToAgent) && ((_j = (_h = state$.value) === null || _h === void 0 ? void 0 : _h.agentDirectory) === null || _j === void 0 ? void 0 : _j.query.dropDown) !== DirectoryDropdownValues.FavoriteList) {
                store.dispatch(agentDirectoryActions.updateTeamList(event));
                store.dispatch(agentDirectoryActions.updateDigitalSkillList(event));
            }
            // used only in case of All Section to get all standard book entries
            if (((_l = (_k = event === null || event === void 0 ? void 0 : event.addressBookList) === null || _k === void 0 ? void 0 : _k.data) === null || _l === void 0 ? void 0 : _l.length) > 0) {
                store.dispatch(agentDirectoryActions.standardEntriesCountForAll(false));
                if (((_o = (_m = state$.value) === null || _m === void 0 ? void 0 : _m.agentDirectory) === null || _o === void 0 ? void 0 : _o.query.dropDown) !== DirectoryDropdownValues.FavoriteList) {
                    store.dispatch(agentDirectoryActions.updateStandardAddressBookEntries(event));
                }
            }
            else if (((_p = event === null || event === void 0 ? void 0 : event.addressBookList) === null || _p === void 0 ? void 0 : _p.totalSearchMatchRecords) === 0) {
                store.dispatch(agentDirectoryActions.standardEntriesCountForAll(true));
            }
        });
        return globalActions.default();
    }));
};
//# sourceMappingURL=agentActivityMiddleware.js.map