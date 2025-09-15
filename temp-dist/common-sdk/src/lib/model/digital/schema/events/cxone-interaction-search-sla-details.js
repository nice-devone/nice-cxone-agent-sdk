"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneInteractionSearchSLASchema = exports.CXoneSLADetailsSchema = void 0;
const yup_1 = require("yup");
exports.CXoneSLADetailsSchema = (0, yup_1.object)().shape({
    /**
     * Raw time in seconds
     */
    raw: (0, yup_1.number)(),
    /**
     * Flag to check whether response timer has already some value
     */
    alreadyHasValue: (0, yup_1.boolean)(),
});
exports.CXoneInteractionSearchSLASchema = (0, yup_1.object)().shape({
    /**
     *  first response time from SLA details
     */
    firstResponseTime: (0, yup_1.object)().shape(Object.assign({}, exports.CXoneSLADetailsSchema.fields)),
    /**
     *  Solution time from SLA details
     */
    solutionTime: (0, yup_1.object)().shape(Object.assign({}, exports.CXoneSLADetailsSchema.fields)),
});
//# sourceMappingURL=cxone-interaction-search-sla-details.js.map