"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneAutoSummary = exports.CXoneSavedDispositionResponse = exports.DispositionConstants = exports.CXoneTagYup = exports.CXoneDisposition = void 0;
const yup_1 = require("yup");
const utility_1 = require("../../util/utility");
const digital_contact_status_1 = require("../enum/digital-contact-status");
/**
 * Disposition Model class
 */
class CXoneDisposition {
    /**
     * Used to parse the disposition data
     * @param data - data to be parsed
     * @example -
     * ```
     * disposition.parse(data);
     * ```
     */
    parse(data) {
        this.dispositionId = (0, utility_1.parseInteger)(data === null || data === void 0 ? void 0 : data.dispositionId);
        this.dispositionName = data === null || data === void 0 ? void 0 : data.dispositionName;
        this.displayOrder = (0, utility_1.parseInteger)(data === null || data === void 0 ? void 0 : data.displayOrder);
        this.classification = data === null || data === void 0 ? void 0 : data.classification;
        this.reportingGroup = data === null || data === void 0 ? void 0 : data.reportingGroup;
        this.systemOutcome = data === null || data === void 0 ? void 0 : data.systemOutcome;
        this.requireCommitmentAmount = (0, utility_1.parseBooleanString)(data === null || data === void 0 ? void 0 : data.requireCommitmentAmount);
        this.requireRescheduleDate = (0, utility_1.parseBooleanString)(data === null || data === void 0 ? void 0 : data.requireRescheduleDate);
        this.agentSpecific = (0, utility_1.parseBooleanString)(data === null || data === void 0 ? void 0 : data.agentSpecific);
        this.isPreviewDisposition = (0, utility_1.parseBooleanString)(data === null || data === void 0 ? void 0 : data.isPreviewDisposition);
        this.priority = (0, utility_1.parseInteger)(data === null || data === void 0 ? void 0 : data.priority);
    }
}
exports.CXoneDisposition = CXoneDisposition;
exports.CXoneTagYup = (0, yup_1.object)({
    tagId: (0, yup_1.number)().required().positive().integer(),
    tagName: (0, yup_1.string)().required(),
    isActive: (0, yup_1.boolean)().optional(),
    notes: (0, yup_1.string)().optional().nullable(),
});
exports.DispositionConstants = {
    DISPOSITION: 'disposition',
    NOTES: 'notes',
    AMOUNT: 'amount',
};
exports.CXoneSavedDispositionResponse = (0, yup_1.object)({
    dispositionId: (0, yup_1.number)().required(),
    dispositionName: (0, yup_1.string)().required(),
    notes: (0, yup_1.string)().required(),
    dispositionedByAgendId: (0, yup_1.number)().nullable(),
    lastUpdated: (0, yup_1.string)().required(),
});
exports.CXoneAutoSummary = (0, yup_1.object)({
    triggerReason: (0, yup_1.string)().oneOf([digital_contact_status_1.DigitalContactStatus.RESOLVED, digital_contact_status_1.DigitalContactStatus.CLOSED]).required(),
    appType: (0, yup_1.string)().required(),
    direction: (0, yup_1.string)().required(),
    eventTime: (0, yup_1.string)().required(),
    mediaType: (0, yup_1.string)().required(),
    masterId: (0, yup_1.string)().optional(),
    agentUUId: (0, yup_1.string)().uuid().optional(),
});
//# sourceMappingURL=disposition.js.map