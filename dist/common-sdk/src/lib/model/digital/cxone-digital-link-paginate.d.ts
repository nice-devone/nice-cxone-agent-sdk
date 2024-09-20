import { InferType } from 'yup';
/**
 * Schema used for digital APIs link type of pagination (not scrollToken)
 */
export declare const CXoneDigitalLinkPaginate: import("yup/lib/object").OptionalObjectSchema<{
    /**
     *  next page identifier
     */
    next: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  previous page identifier
     */
    previous: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  current page identifier
     */
    self: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     *  next page identifier
     */
    next: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  previous page identifier
     */
    previous: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  current page identifier
     */
    self: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type CXoneDigitalLinkPaginateDetails = InferType<typeof CXoneDigitalLinkPaginate>;
