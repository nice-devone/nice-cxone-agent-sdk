import { InferType } from 'yup';
/**
 * Schema used for customer identities
 */
export declare const CXoneCustomerIdentitiesSchema: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     *  Unique id of the customer identity
     */
    id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  customer identity on actual digital platform
     */
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  first name of the customer
     */
    firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  last name of the customer
     */
    lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *   nick name of the customer
     */
    nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  link to load customer user profile image
     */
    image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  digital channel or platform's external id
     */
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     *  Unique id of the customer identity
     */
    id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  customer identity on actual digital platform
     */
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  first name of the customer
     */
    firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  last name of the customer
     */
    lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *   nick name of the customer
     */
    nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  link to load customer user profile image
     */
    image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  digital channel or platform's external id
     */
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     *  Unique id of the customer identity
     */
    id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  customer identity on actual digital platform
     */
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  first name of the customer
     */
    firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  last name of the customer
     */
    lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *   nick name of the customer
     */
    nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  link to load customer user profile image
     */
    image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  digital channel or platform's external id
     */
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>>;
/**
 * Schema used for customer search custom fields
 */
export declare const CXoneCustomerSearchCustomFields: import("yup/lib/object").OptionalObjectSchema<{
    /**
     *  unique identifier of the custom field
     */
    ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  value of the custom field
     */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  update date of the custom field
     */
    updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     *  unique identifier of the custom field
     */
    ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  value of the custom field
     */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  update date of the custom field
     */
    updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
/**
 * Schema used for messge Statistics
 */
export declare const CXoneMessageStatistics: import("yup/lib/object").OptionalObjectSchema<{
    /**
     *  number of inbound messages by customer
     */
    inbound: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     *  number of outbound messages for customer
     */
    outbound: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     *  number of inbound messages by customer
     */
    inbound: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     *  number of outbound messages for customer
     */
    outbound: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
}>>;
/**
 * Schema used for customer search (Interaction search customer tab)
 */
export declare const CXoneDigitalCustomerSearchSchema: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     *  Unique id of the customer
     */
    id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  first name of the customer
     */
    firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  last name (surname) of the customer
     */
    surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  complete full name of the customer
     */
    fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  link to load customer user profile image
     */
    image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  customer linked custom fields
     */
    customFields: any;
    /**
     *  detailed identity information related to customer & platform
     */
    identities: any;
    /**
     *  message statics of inbound and outbound messages
     */
    messageStatistics: any;
    /**
     *  last activity date of the customer
     */
    updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     *  Unique id of the customer
     */
    id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  first name of the customer
     */
    firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  last name (surname) of the customer
     */
    surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  complete full name of the customer
     */
    fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  link to load customer user profile image
     */
    image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  customer linked custom fields
     */
    customFields: any;
    /**
     *  detailed identity information related to customer & platform
     */
    identities: any;
    /**
     *  message statics of inbound and outbound messages
     */
    messageStatistics: any;
    /**
     *  last activity date of the customer
     */
    updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     *  Unique id of the customer
     */
    id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  first name of the customer
     */
    firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  last name (surname) of the customer
     */
    surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  complete full name of the customer
     */
    fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  link to load customer user profile image
     */
    image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  customer linked custom fields
     */
    customFields: any;
    /**
     *  detailed identity information related to customer & platform
     */
    identities: any;
    /**
     *  message statics of inbound and outbound messages
     */
    messageStatistics: any;
    /**
     *  last activity date of the customer
     */
    updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>>;
/**
 * Schema used for customer search API response
 */
export declare const CXoneDigitalCustomerSearch: import("yup/lib/object").OptionalObjectSchema<{
    /**
     *  total number of customer records
     */
    hits: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
    *  used for pagination purpose
    */
    _links: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        next: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previous: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        self: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        next: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previous: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        self: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        next: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previous: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        self: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>;
    /**
     *  complete result set of customer search applied with search or query params
     */
    data: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         *  Unique id of the customer
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  first name of the customer
         */
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  last name (surname) of the customer
         */
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  complete full name of the customer
         */
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  link to load customer user profile image
         */
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  customer linked custom fields
         */
        customFields: any;
        /**
         *  detailed identity information related to customer & platform
         */
        identities: any;
        /**
         *  message statics of inbound and outbound messages
         */
        messageStatistics: any;
        /**
         *  last activity date of the customer
         */
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         *  Unique id of the customer
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  first name of the customer
         */
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  last name (surname) of the customer
         */
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  complete full name of the customer
         */
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  link to load customer user profile image
         */
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  customer linked custom fields
         */
        customFields: any;
        /**
         *  detailed identity information related to customer & platform
         */
        identities: any;
        /**
         *  message statics of inbound and outbound messages
         */
        messageStatistics: any;
        /**
         *  last activity date of the customer
         */
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         *  Unique id of the customer
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  first name of the customer
         */
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  last name (surname) of the customer
         */
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  complete full name of the customer
         */
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  link to load customer user profile image
         */
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  customer linked custom fields
         */
        customFields: any;
        /**
         *  detailed identity information related to customer & platform
         */
        identities: any;
        /**
         *  message statics of inbound and outbound messages
         */
        messageStatistics: any;
        /**
         *  last activity date of the customer
         */
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         *  Unique id of the customer
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  first name of the customer
         */
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  last name (surname) of the customer
         */
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  complete full name of the customer
         */
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  link to load customer user profile image
         */
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  customer linked custom fields
         */
        customFields: any;
        /**
         *  detailed identity information related to customer & platform
         */
        identities: any;
        /**
         *  message statics of inbound and outbound messages
         */
        messageStatistics: any;
        /**
         *  last activity date of the customer
         */
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         *  Unique id of the customer
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  first name of the customer
         */
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  last name (surname) of the customer
         */
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  complete full name of the customer
         */
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  link to load customer user profile image
         */
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  customer linked custom fields
         */
        customFields: any;
        /**
         *  detailed identity information related to customer & platform
         */
        identities: any;
        /**
         *  message statics of inbound and outbound messages
         */
        messageStatistics: any;
        /**
         *  last activity date of the customer
         */
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     *  total number of customer records
     */
    hits: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
    *  used for pagination purpose
    */
    _links: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        next: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previous: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        self: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        next: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previous: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        self: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        next: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previous: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        self: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>;
    /**
     *  complete result set of customer search applied with search or query params
     */
    data: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         *  Unique id of the customer
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  first name of the customer
         */
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  last name (surname) of the customer
         */
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  complete full name of the customer
         */
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  link to load customer user profile image
         */
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  customer linked custom fields
         */
        customFields: any;
        /**
         *  detailed identity information related to customer & platform
         */
        identities: any;
        /**
         *  message statics of inbound and outbound messages
         */
        messageStatistics: any;
        /**
         *  last activity date of the customer
         */
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         *  Unique id of the customer
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  first name of the customer
         */
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  last name (surname) of the customer
         */
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  complete full name of the customer
         */
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  link to load customer user profile image
         */
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  customer linked custom fields
         */
        customFields: any;
        /**
         *  detailed identity information related to customer & platform
         */
        identities: any;
        /**
         *  message statics of inbound and outbound messages
         */
        messageStatistics: any;
        /**
         *  last activity date of the customer
         */
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         *  Unique id of the customer
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  first name of the customer
         */
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  last name (surname) of the customer
         */
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  complete full name of the customer
         */
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  link to load customer user profile image
         */
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  customer linked custom fields
         */
        customFields: any;
        /**
         *  detailed identity information related to customer & platform
         */
        identities: any;
        /**
         *  message statics of inbound and outbound messages
         */
        messageStatistics: any;
        /**
         *  last activity date of the customer
         */
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         *  Unique id of the customer
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  first name of the customer
         */
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  last name (surname) of the customer
         */
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  complete full name of the customer
         */
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  link to load customer user profile image
         */
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  customer linked custom fields
         */
        customFields: any;
        /**
         *  detailed identity information related to customer & platform
         */
        identities: any;
        /**
         *  message statics of inbound and outbound messages
         */
        messageStatistics: any;
        /**
         *  last activity date of the customer
         */
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         *  Unique id of the customer
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  first name of the customer
         */
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  last name (surname) of the customer
         */
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  complete full name of the customer
         */
        fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  link to load customer user profile image
         */
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  customer linked custom fields
         */
        customFields: any;
        /**
         *  detailed identity information related to customer & platform
         */
        identities: any;
        /**
         *  message statics of inbound and outbound messages
         */
        messageStatistics: any;
        /**
         *  last activity date of the customer
         */
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
}>>;
export declare type CXoneDigitalCustomerSearchDetails = InferType<typeof CXoneDigitalCustomerSearch>;
