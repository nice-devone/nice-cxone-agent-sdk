"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalMessageNoteUpdateEventSchema = exports.DigitalMessageNoteCreateEventSchema = exports.CXoneMessageNoteSchema = void 0;
const yup_1 = require("yup");
const cxone_inbox_assignee_1 = require("./cxone-inbox-assignee");
const cxone_case_1 = require("./cxone-case");
const cxone_event_1 = require("./cxone-event");
const CXoneMessageNoteStatusSchema = (0, yup_1.object)({
    type: (0, yup_1.string)().required(),
});
const CXoneMessageSchemaForNote = (0, yup_1.object)({
    id: (0, yup_1.string)().required(),
});
const CXoneUserDetailSchema = (0, yup_1.object)().shape(Object.assign(Object.assign({}, cxone_inbox_assignee_1.CXoneInboxAssigneeSchema.fields), { agentId: (0, yup_1.string)().nullable(), nickname: (0, yup_1.string)(), imageUrl: (0, yup_1.string)().required(), publicImageUrl: (0, yup_1.string)().nullable(), isBotUser: (0, yup_1.boolean)().required(), isSurveyUser: (0, yup_1.boolean)().required() }));
exports.CXoneMessageNoteSchema = (0, yup_1.object)({
    id: (0, yup_1.string)().required(),
    user: (0, yup_1.object)().shape(CXoneUserDetailSchema.fields).nullable(),
    createdAt: (0, yup_1.string)().required(),
    updatedAt: (0, yup_1.string)().required(),
    content: (0, yup_1.string)().required(),
    currentAssignee: (0, yup_1.string)().nullable(),
    status: (0, yup_1.object)().shape(CXoneMessageNoteStatusSchema.fields),
    message: (0, yup_1.object)().shape(CXoneMessageSchemaForNote.fields),
});
const CXoneMessageNoteArraySchema = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneMessageNoteSchema.fields));
/*  create hierarchy for data object */
const DigitalMessageNoteSchema = (0, yup_1.object)({
    messageNote: (0, yup_1.object)().shape(exports.CXoneMessageNoteSchema.fields).required(),
    case: (0, yup_1.object)().shape(cxone_case_1.CXoneCaseSchema.fields).required(),
});
/* Concat data property with root level event schema property */
exports.DigitalMessageNoteCreateEventSchema = (0, yup_1.object)({
    data: (0, yup_1.object)().shape(DigitalMessageNoteSchema.fields).from('customerContact', 'case').required(),
}).concat((0, yup_1.object)().shape(cxone_event_1.CXoneEventSchema.fields));
exports.DigitalMessageNoteUpdateEventSchema = (0, yup_1.object)({
    data: (0, yup_1.object)().shape(DigitalMessageNoteSchema.fields).from('contact', 'case').required(),
}).concat((0, yup_1.object)().shape(cxone_event_1.CXoneEventSchema.fields));
//# sourceMappingURL=cxone-message-note.js.map