"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caseStatusChangedEventSchema = void 0;
const cxone_channel_1 = require("./cxone-channel");
const cxone_case_1 = require("./cxone-case");
const cxone_event_1 = require("./cxone-event");
const yup_1 = require("yup");
/*  create hierarchy for data object */
const caseStatusChangedEventDataSchema = (0, yup_1.object)({
    case: (0, yup_1.object)().shape(cxone_case_1.CXoneCaseSchema.fields).required(),
    channel: (0, yup_1.object)().shape(cxone_channel_1.CXoneChannelSchema.fields).required(),
});
/* Concat data property with root level event schema property */
exports.caseStatusChangedEventSchema = (0, yup_1.object)({
    data: (0, yup_1.object)().shape(caseStatusChangedEventDataSchema.fields).required(),
}).concat((0, yup_1.object)().shape(cxone_event_1.CXoneEventSchema.fields).required());
//# sourceMappingURL=cxone-case-status-changed.js.map