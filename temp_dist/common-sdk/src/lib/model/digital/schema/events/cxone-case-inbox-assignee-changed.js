"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactDetailsInboxAssigneeEventSchema = exports.contactDetailsInboxAssigneeSchema = exports.caseInboxAssigneeChangedEventSchema = void 0;
const cxone_channel_1 = require("./cxone-channel");
const cxone_case_1 = require("./cxone-case");
const cxone_event_1 = require("./cxone-event");
const cxone_routing_queue_1 = require("./cxone-routing-queue");
const cxone_inbox_assignee_1 = require("./cxone-inbox-assignee");
const cxone_message_1 = require("./cxone-message");
const yup_1 = require("yup");
const cxone_messagedraft_1 = require("./cxone-messagedraft");
const cxone_message_note_1 = require("./cxone-message-note");
/*  create hierarchy for data object */
const caseInboxAssigneeChangedEventDataSchema = (0, yup_1.object)({
    case: (0, yup_1.object)().shape(cxone_case_1.CXoneCaseSchema.fields).required(),
    channel: (0, yup_1.object)().shape(cxone_channel_1.CXoneChannelSchema.fields).required(),
    routingQueue: (0, yup_1.object)().shape(cxone_routing_queue_1.CXoneRoutingQueueSchema.fields).nullable().defined(),
    inboxAssignee: (0, yup_1.object)().shape(cxone_inbox_assignee_1.CXoneInboxAssigneeSchema.fields).nullable(),
});
/* Concat data property with root level event schema property */
exports.caseInboxAssigneeChangedEventSchema = (0, yup_1.object)({
    data: (0, yup_1.object)().shape(caseInboxAssigneeChangedEventDataSchema.fields).required(),
}).concat((0, yup_1.object)().shape(cxone_event_1.CXoneEventSchema.fields).required());
/* Schema for contact details Inbox assignee */
exports.contactDetailsInboxAssigneeSchema = (0, yup_1.object)({
    case: (0, yup_1.object)().shape(cxone_case_1.CXoneCaseSchema.fields).required(),
    channel: (0, yup_1.object)().shape(cxone_channel_1.CXoneChannelSchema.fields).required(),
    routingQueue: (0, yup_1.object)().shape(cxone_routing_queue_1.CXoneRoutingQueueSchema.fields).nullable().defined(),
    messages: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_message_1.CXoneMessageSchema.fields)),
    messageDrafts: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_messagedraft_1.CXoneMessageDraftsSchema.fields)),
    messageNotes: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_message_note_1.CXoneMessageNoteSchema.fields)),
});
/* Schema for contact details Inbox assignee WS event */
exports.contactDetailsInboxAssigneeEventSchema = (0, yup_1.object)({
    data: (0, yup_1.object)().shape(exports.contactDetailsInboxAssigneeSchema.fields).from('customerContact', 'case').required(),
}).concat((0, yup_1.object)().shape(cxone_event_1.CXoneEventSchema.fields));
//# sourceMappingURL=cxone-case-inbox-assignee-changed.js.map