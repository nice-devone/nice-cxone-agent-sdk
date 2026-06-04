"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completedContactsArrayReponse = exports.completedContactsArray = void 0;
/**
 * Interface used as a Model for Response JSON for Agent Contact History
 * @returns returns - Agent Contact History Data
 * ```
 * @example
 * Array<AgentVoiceContactHistoryResponse>
 * ```
 */
const yup_1 = require("yup");
const tags = (0, yup_1.object)({
    TagName: (0, yup_1.string)().required(),
});
exports.completedContactsArray = (0, yup_1.object)({
    agentId: (0, yup_1.string)().optional().nullable(),
    contactId: (0, yup_1.string)().optional().nullable(),
    dispositionNotes: (0, yup_1.string)().optional().nullable(),
    firstName: (0, yup_1.string)().optional().nullable(),
    fromAddr: (0, yup_1.string)().optional().nullable(),
    lastName: (0, yup_1.string)().optional().nullable(),
    lastUpdateTime: (0, yup_1.string)().optional(),
    mediaType: (0, yup_1.string)().optional().nullable(),
    skillId: (0, yup_1.string)().optional().nullable(),
    skillName: (0, yup_1.string)().optional().nullable(),
    teamId: (0, yup_1.string)().optional().nullable(),
    toAddr: (0, yup_1.string)().optional().nullable(),
    isOutbound: (0, yup_1.boolean)(),
    contactStart: (0, yup_1.string)().optional().nullable(),
    totalDurationSeconds: (0, yup_1.number)(),
    tags: (0, yup_1.array)().of(tags).optional().nullable(),
    primaryDispositionId: (0, yup_1.number)().nullable().optional(),
});
exports.completedContactsArrayReponse = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.completedContactsArray.fields));
//# sourceMappingURL=cxone-agent-voice-completed-contact-history-response.js.map