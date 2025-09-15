"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDigitalMessageSearch = void 0;
const yup_1 = require("yup");
const cxone_message_1 = require("./schema/events/cxone-message");
/**
 * Schema used for message search API response
 */
exports.CXoneDigitalMessageSearch = (0, yup_1.object)({
    /**
     *  total number of customer records
     */
    hits: (0, yup_1.number)().required(),
    /**
     *  pagination token to be used on client side
     */
    scrollToken: (0, yup_1.string)(),
    /**
     *  complete result set of message search applied with search query or filter
     */
    data: (0, yup_1.array)().of((0, yup_1.object)().shape(Object.assign({}, cxone_message_1.CXoneMessageSchema.fields))),
});
//# sourceMappingURL=cxone-digital-message-search.js.map