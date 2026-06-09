"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneContactDetailsEventSchema = exports.CXoneContactDetailsSchema = void 0;
const cxone_channel_1 = require("./schema/events/cxone-channel");
const cxone_case_1 = require("./schema/events/cxone-case");
const cxone_routing_queue_1 = require("./schema/events/cxone-routing-queue");
const yup_1 = require("yup");
const cxone_message_1 = require("./schema/events/cxone-message");
const cxone_event_1 = require("./schema/events/cxone-event");
const cxone_user_role_permissions_1 = require("./schema/events/cxone-user-role-permissions");
const cxone_messagedraft_1 = require("./schema/events/cxone-messagedraft");
const cxone_message_note_1 = require("./schema/events/cxone-message-note");
const cxone_digital_reply_channel_1 = require("./cxone-digital-reply-channel");
const cxone_contact_custom_field_definition_1 = require("./cxone-contact-custom-field-definition");
exports.CXoneContactDetailsSchema = (0, yup_1.object)({
    customerContact: (0, yup_1.object)().shape(cxone_case_1.CXoneCaseSchema.fields).required(),
    channel: (0, yup_1.object)().shape(cxone_channel_1.CXoneChannelSchema.fields).required(),
    routingQueue: (0, yup_1.object)().shape(cxone_routing_queue_1.CXoneRoutingQueueSchema.fields).nullable().defined(),
    messages: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_message_1.CXoneMessageSchema.fields)),
    messageDrafts: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_messagedraft_1.CXoneMessageDraftsSchema.fields)),
    messageNotes: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_message_note_1.CXoneMessageNoteSchema.fields)),
    permissions: (0, yup_1.object)().shape(cxone_user_role_permissions_1.CXoneUserRolePermissionsSchema.fields),
    replyChannels: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_digital_reply_channel_1.CXoneDigitalReplyChannelSchema.fields)),
    isAssignedToAgentInbox: (0, yup_1.boolean)().optional().default(true),
    customerContactCustomFieldDefinitions: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_contact_custom_field_definition_1.CXoneContactCustomFieldDefinitionSchema.fields)),
});
exports.CXoneContactDetailsEventSchema = (0, yup_1.object)({
    data: (0, yup_1.object)().shape(exports.CXoneContactDetailsSchema.fields).required(),
}).concat((0, yup_1.object)().shape(cxone_event_1.CXoneEventSchema.fields));
//# sourceMappingURL=cxone-contact-details.js.map