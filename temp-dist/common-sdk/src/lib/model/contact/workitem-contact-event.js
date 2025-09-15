"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkItemContactEventYup = void 0;
const yup_1 = require("yup");
/**
 * @returns work item event yup object
 * @example
 */
exports.WorkItemContactEventYup = (0, yup_1.object)({
    agentId: (0, yup_1.number)().required().positive().integer(),
    contactId: (0, yup_1.string)().required(),
    customData: (0, yup_1.string)().optional(),
    closePopoutUponTermination: (0, yup_1.boolean)().optional(),
    finalState: (0, yup_1.boolean)().required(),
    iisHost: (0, yup_1.string)().optional(),
    inFocus: (0, yup_1.boolean)().optional(),
    lastStateChangeTime: (0, yup_1.date)().required(),
    lastStateChangeTimeUtc: (0, yup_1.date)().required(),
    masterId: (0, yup_1.string)().required(),
    omniGroupId: (0, yup_1.string)().optional(),
    parenContactId: (0, yup_1.string)().optional(),
    popDestination: (0, yup_1.string)().optional(),
    popoutWindowHeight: (0, yup_1.number)().optional().integer(),
    popoutWindowWidth: (0, yup_1.number)().optional().integer(),
    refusalTimeout: (0, yup_1.number)().optional().integer(),
    screenPopUrl: (0, yup_1.string)().required(),
    skillId: (0, yup_1.string)().optional(),
    startTime: (0, yup_1.date)().required(),
    startTimeUtc: (0, yup_1.date)().required(),
    status: (0, yup_1.string)().required(),
    tabTitle: (0, yup_1.string)().optional(),
    type: (0, yup_1.string)().required(),
    url: (0, yup_1.string)().optional(),
    vcHost: (0, yup_1.string)().optional(),
    workItemId: (0, yup_1.string)().optional(),
    workItemPayload: (0, yup_1.string)().optional(),
    workItemType: (0, yup_1.string)().optional(),
    sessionId: (0, yup_1.string)().required(),
}).camelCase();
//# sourceMappingURL=workitem-contact-event.js.map