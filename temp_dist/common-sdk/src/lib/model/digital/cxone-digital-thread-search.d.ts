import { InferType } from 'yup';
/**
 * Schema used for thread search API response
 */
export declare const CXoneDigitalThreadSearch: import("yup/lib/object").OptionalObjectSchema<{
    /**
     *  total number of thread records
     */
    totalRecords: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     *  pagination information to be used for pagination purpose
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
     *  result set of basic thread search details
     */
    data: any;
    /**
     *  result set of thread's context like related message & channel details
     */
    _context: any;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     *  total number of thread records
     */
    totalRecords: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     *  pagination information to be used for pagination purpose
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
     *  result set of basic thread search details
     */
    data: any;
    /**
     *  result set of thread's context like related message & channel details
     */
    _context: any;
}>>;
export declare type CXoneDigitalThreadSearchDetails = InferType<typeof CXoneDigitalThreadSearch>;
