"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDigitalThreadSearch = void 0;
const yup_1 = require("yup");
const cxone_message_1 = require("./schema/events/cxone-message");
const cxone_digital_link_paginate_1 = require("./cxone-digital-link-paginate");
const cxone_thread_1 = require("./schema/events/cxone-thread");
const cxone_channel_1 = require("./schema/events/cxone-channel");
/**
 * Schema used for thread's context like channels & messages
 */
const CXoneThreadContextSchema = (0, yup_1.object)({
    /**
     * list of related channels for thread results
     */
    channels: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_channel_1.CXoneChannelSchema.fields)),
    /**
     * list of related messages for thread results
     */
    messages: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_message_1.CXoneMessageSchema.fields)),
});
/**
 * Schema used for thread search API response
 */
exports.CXoneDigitalThreadSearch = (0, yup_1.object)({
    /**
     *  total number of thread records
     */
    totalRecords: (0, yup_1.number)().required(),
    /**
     *  pagination information to be used for pagination purpose
     */
    _links: (0, yup_1.object)().shape(Object.assign({}, cxone_digital_link_paginate_1.CXoneDigitalLinkPaginate.fields)),
    /**
     *  result set of basic thread search details
     */
    data: (0, yup_1.array)().of((0, yup_1.object)().shape(Object.assign({}, cxone_thread_1.CXoneThreadSchema.fields))).nullable().optional(),
    /**
     *  result set of thread's context like related message & channel details
     */
    _context: (0, yup_1.object)().shape(CXoneThreadContextSchema.fields).nullable().optional(),
});
//# sourceMappingURL=cxone-digital-thread-search.js.map