"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDigitalCustomerSearch = exports.CXoneDigitalCustomerSearchSchema = exports.CXoneMessageStatistics = exports.CXoneCustomerSearchCustomFields = exports.CXoneCustomerIdentitiesSchema = void 0;
const yup_1 = require("yup");
const cxone_digital_link_paginate_1 = require("../../cxone-digital-link-paginate");
/**
 * Schema used for customer identities
 */
exports.CXoneCustomerIdentitiesSchema = (0, yup_1.object)().shape({
    /**
     *  Unique id of the customer identity
     */
    id: (0, yup_1.string)(),
    /**
     *  customer identity on actual digital platform
     */
    idOnExternalPlatform: (0, yup_1.string)(),
    /**
     *  first name of the customer
     */
    firstName: (0, yup_1.string)().nullable().optional(),
    /**
     *  last name of the customer
     */
    lastName: (0, yup_1.string)().nullable().optional(),
    /**
     *   nick name of the customer
     */
    nickname: (0, yup_1.string)().nullable().optional(),
    /**
     *  link to load customer user profile image
     */
    image: (0, yup_1.string)().nullable().optional(),
    /**
     *  digital channel or platform's external id
     */
    externalPlatformId: (0, yup_1.string)().nullable().optional(),
});
/**
 * Schema used for customer search custom fields
 */
exports.CXoneCustomerSearchCustomFields = (0, yup_1.object)({
    /**
     *  unique identifier of the custom field
     */
    ident: (0, yup_1.string)(),
    /**
     *  value of the custom field
     */
    value: (0, yup_1.string)().nullable().optional(),
    /**
     *  update date of the custom field
     */
    updatedAt: (0, yup_1.string)().nullable().optional(),
});
/**
 * Schema used for messge Statistics
 */
exports.CXoneMessageStatistics = (0, yup_1.object)({
    /**
     *  number of inbound messages by customer
     */
    inbound: (0, yup_1.number)().optional().default(0),
    /**
     *  number of outbound messages for customer
     */
    outbound: (0, yup_1.number)().optional().default(0),
});
/**
 * Schema used for customer search (Interaction search customer tab)
 */
exports.CXoneDigitalCustomerSearchSchema = (0, yup_1.object)().shape({
    /**
     *  Unique id of the customer
     */
    id: (0, yup_1.string)(),
    /**
     *  first name of the customer
     */
    firstName: (0, yup_1.string)().nullable().optional(),
    /**
     *  last name (surname) of the customer
     */
    surname: (0, yup_1.string)().nullable().optional(),
    /**
     *  complete full name of the customer
     */
    fullName: (0, yup_1.string)().nullable().optional(),
    /**
     *  link to load customer user profile image
     */
    image: (0, yup_1.string)().nullable().optional(),
    /**
     *  customer linked custom fields
     */
    customFields: (0, yup_1.array)().of((0, yup_1.object)().shape(Object.assign({}, exports.CXoneCustomerSearchCustomFields.fields))).nullable().optional(),
    /**
     *  detailed identity information related to customer & platform
     */
    identities: (0, yup_1.array)().of((0, yup_1.object)().shape(Object.assign({}, exports.CXoneCustomerIdentitiesSchema.fields))).nullable().optional(),
    /**
     *  message statics of inbound and outbound messages
     */
    messageStatistics: (0, yup_1.object)().shape(Object.assign({}, exports.CXoneMessageStatistics.fields)).nullable().optional(),
    /**
     *  last activity date of the customer
     */
    updatedAt: (0, yup_1.string)().nullable().optional(),
});
/**
 * Schema used for customer search API response
 */
exports.CXoneDigitalCustomerSearch = (0, yup_1.object)({
    /**
     *  total number of customer records
     */
    hits: (0, yup_1.number)().required(),
    /**
    *  used for pagination purpose
    */
    _links: (0, yup_1.object)().shape(Object.assign({}, cxone_digital_link_paginate_1.CXoneDigitalLinkPaginate.fields)),
    /**
     *  complete result set of customer search applied with search or query params
     */
    data: (0, yup_1.array)().of((0, yup_1.object)().shape(Object.assign({}, exports.CXoneDigitalCustomerSearchSchema.fields))),
});
//# sourceMappingURL=cxone-digital-customer-search.js.map