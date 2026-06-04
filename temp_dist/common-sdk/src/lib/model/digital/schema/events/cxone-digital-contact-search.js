"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDigitalContactSearch = exports.CXoneDigitalContactSearchSchema = void 0;
const yup_1 = require("yup");
const cxone_case_1 = require("./cxone-case");
const cxone_interaction_search_sla_details_1 = require("./cxone-interaction-search-sla-details");
exports.CXoneDigitalContactSearchSchema = (0, yup_1.object)().shape(Object.assign(Object.assign({}, cxone_case_1.CXoneCaseSchema.fields), { 
    // contactId field coming as null value from /contact search response for some older records
    contactId: (0, yup_1.string)().nullable().optional(), 
    /**
     *  channel id from contact response
     */
    channelId: (0, yup_1.string)().nullable().optional(), 
    /**
     *  channel name from contact response
     */
    channelName: (0, yup_1.string)().nullable().optional(), 
    /**
     *  routingQueuePriority from contact response
     */
    routingQueuePriority: (0, yup_1.string)().nullable().optional(), 
    /**
     *  skill id from contact response
     */
    skillId: (0, yup_1.number)().nullable().optional(), 
    /**
     *  skill name from contact response
     */
    skillName: (0, yup_1.string)().nullable().optional(), 
    /**
     *  private channel flag from contact response
     */
    isPrivateChannel: (0, yup_1.boolean)().nullable().optional(), 
    /**
     *  channel type from contact response
     */
    channelType: (0, yup_1.string)().nullable().optional(), 
    /**
     *  sla details from contact response
     */
    sla: (0, yup_1.object)().shape(Object.assign({}, cxone_interaction_search_sla_details_1.CXoneInteractionSearchSLASchema.fields)), 
    /**
     *  preview from contact response
     */
    preview: (0, yup_1.string)().nullable() }));
exports.CXoneDigitalContactSearch = (0, yup_1.object)({
    hits: (0, yup_1.number)().required(),
    scrollToken: (0, yup_1.string)(),
    data: (0, yup_1.array)().of((0, yup_1.object)().shape(Object.assign({}, exports.CXoneDigitalContactSearchSchema.fields))),
});
//# sourceMappingURL=cxone-digital-contact-search.js.map