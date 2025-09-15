"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDigitalLinkPaginate = void 0;
const yup_1 = require("yup");
/**
 * Schema used for digital APIs link type of pagination (not scrollToken)
 */
exports.CXoneDigitalLinkPaginate = (0, yup_1.object)({
    /**
     *  next page identifier
     */
    next: (0, yup_1.string)().nullable().optional(),
    /**
     *  previous page identifier
     */
    previous: (0, yup_1.string)().nullable().optional(),
    /**
     *  current page identifier
     */
    self: (0, yup_1.string)().nullable().optional(),
});
//# sourceMappingURL=cxone-digital-link-paginate.js.map