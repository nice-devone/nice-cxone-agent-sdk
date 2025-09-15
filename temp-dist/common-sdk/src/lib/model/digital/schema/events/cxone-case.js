"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneCaseArray = exports.CXoneCaseSchema = void 0;
const cxone_inbox_assignee_1 = require("./cxone-inbox-assignee");
const yup_1 = require("yup");
const custom_fields_1 = require("./custom-fields");
const cxone_author_end_user_1 = require("./cxone-author-end-user");
const cxone_owner_assignee_user_1 = require("./cxone-owner-assignee-user");
const cxone_end_user_1 = require("./cxone-end-user");
const cxone_recipient_1 = require("./cxone-recipient");
exports.CXoneCaseSchema = (0, yup_1.object)({
    id: (0, yup_1.string)().required(),
    contactId: (0, yup_1.string)().optional().nullable(),
    interactionId: (0, yup_1.string)().nullable(),
    status: (0, yup_1.string)()
        .oneOf([
        'closed',
        'resolved',
        'open',
        'new',
        'pending',
        'escalated',
        'trashed'
    ])
        .required(),
    customFields: (0, yup_1.array)().of((0, yup_1.object)().shape(custom_fields_1.CustomFieldsSchema.fields)),
    inboxAssignee: (0, yup_1.number)().nullable(),
    inboxAssigneeUser: (0, yup_1.object)().shape(cxone_inbox_assignee_1.CXoneInboxAssigneeSchema.fields).nullable(),
    threadIdOnExternalPlatform: (0, yup_1.string)().required(),
    authorEndUserIdentity: (0, yup_1.object)()
        .shape(cxone_author_end_user_1.CXoneAuthorEndUserIdentitySchema.fields)
        .nullable(),
    direction: (0, yup_1.string)().required(),
    createdAt: (0, yup_1.string)().required(),
    inboundCount: (0, yup_1.number)().nullable(),
    outboundCount: (0, yup_1.number)().nullable(),
    ownerAssigneeUser: (0, yup_1.object)()
        .shape(cxone_owner_assignee_user_1.CXOneOwnerAssigneeUserSchema.fields)
        .optional()
        .nullable(),
    routingQueueId: (0, yup_1.string)().nullable().optional(),
    endUser: (0, yup_1.object)().shape(cxone_end_user_1.CXOneEndUserSchema.fields).nullable().optional(),
    statusUpdatedAt: (0, yup_1.date)().nullable(),
    inboxAssigneeLastAssignedAt: (0, yup_1.date)().nullable(),
    recipients: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_recipient_1.CXoneRecipientSchema.fields)),
    // channelId, channelName, skillId, skillName fields we need to validate against /contact search api
    // which are required in inherited schema of CXoneDigitalContactSearch
    channelId: (0, yup_1.string)().nullable().optional(),
    channelName: (0, yup_1.string)().nullable().optional(),
    skillId: (0, yup_1.number)().nullable().optional(),
    skillName: (0, yup_1.string)().nullable().optional(),
    endUserRecipients: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_recipient_1.CXoneRecipientSchema.fields)).nullable().optional(),
    threadId: (0, yup_1.string)().required(),
});
exports.CXoneCaseArray = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneCaseSchema.fields));
//# sourceMappingURL=cxone-case.js.map