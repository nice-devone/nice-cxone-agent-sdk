import { CXoneClient } from '@nice-devone/agent-sdk';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { agentSkillDetailsActions } from '../ccf-agent-skill/ccf-agent-skill-details-slice';
import { globalActions } from '../global.app.slice';
import { Navigation } from '../../enums/navigation-menus';
const cxoneClient = CXoneClient.instance;
const agentskillPollingAction = 'agentSkillDetails/startActivityPolling/pending';
/**
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export const skillDetailsMiddleware = (actions$, _state$, { store }) => {
    return actions$.pipe(filter((action) => action.type === agentskillPollingAction), map(() => {
        var _a, _b;
        (_b = (_a = cxoneClient === null || cxoneClient === void 0 ? void 0 : cxoneClient.skillActivityQueue) === null || _a === void 0 ? void 0 : _a.skillActivityEvent) === null || _b === void 0 ? void 0 : _b.pipe(
        // we will subscribe only when we get new data
        distinctUntilChanged((prevSkills, currSkills) => JSON.stringify(prevSkills === null || prevSkills === void 0 ? void 0 : prevSkills.skillActivityData) === JSON.stringify(currSkills === null || currSkills === void 0 ? void 0 : currSkills.skillActivityData))).subscribe((skills) => {
            if ((store.getState().global.selectedMenuName === Navigation.QUEUE || store.getState().appSpace.appSpaceSelectedTab.tab === Navigation.QUEUE) && skills) {
                store.dispatch(agentSkillDetailsActions.setAgentsAssignedToSkill(skills));
            }
        });
        return globalActions.default();
    }));
};
//# sourceMappingURL=skillDetailsMiddleware.js.map