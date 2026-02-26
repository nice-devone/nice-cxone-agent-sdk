import { CXoneClient } from '@nice-devone/agent-sdk';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { globalActions } from '../../global.app.slice';
import { agentDirectoryActions, DirectoryDropdownValues } from './ccf-directory.slice';
const cxoneClient = CXoneClient.instance;
const skillPollingAction = 'agentDirectory/startActivityPolling/pending';
/**
 *
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export const skillActivityMiddleware = (actions$, state$, { store }) => {
    return actions$.pipe(filter((action) => action.type === skillPollingAction), map(() => {
        var _a, _b;
        (_b = (_a = cxoneClient === null || cxoneClient === void 0 ? void 0 : cxoneClient.skillActivityQueue) === null || _a === void 0 ? void 0 : _a.skillActivityEvent) === null || _b === void 0 ? void 0 : _b.pipe(
        // we will subscribe only when we get new data
        distinctUntilChanged((prevSkills, currSkills) => JSON.stringify(prevSkills === null || prevSkills === void 0 ? void 0 : prevSkills.skillActivityData) === JSON.stringify(currSkills === null || currSkills === void 0 ? void 0 : currSkills.skillActivityData))).subscribe((skills) => {
            var _a, _b, _c, _d;
            if (((_b = (_a = store.getState()) === null || _a === void 0 ? void 0 : _a.agentDirectory) === null || _b === void 0 ? void 0 : _b.directoryRendered) && skills && ((_d = (_c = state$.value) === null || _c === void 0 ? void 0 : _c.agentDirectory) === null || _d === void 0 ? void 0 : _d.query.dropDown) !== DirectoryDropdownValues.FavoriteList) {
                store.dispatch(agentDirectoryActions.setSkillList(skills));
            }
        });
        return globalActions.default();
    }));
};
//# sourceMappingURL=skillActivityMiddleware.js.map