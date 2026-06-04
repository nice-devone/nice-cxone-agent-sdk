import { InferType } from 'yup';
/**
 * Schema used for threads related to digital case
 */
export declare const CXoneThreadSchema: import("yup/lib/object").OptionalObjectSchema<{
    /**
     *  flag to know more messages are allowed to be added on current thread or not
     */
    canAddMoreMessages: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     *  unique identifier of the channel related to current thread
     */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     *  unique identifier of the current thread
     */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     *  unique identifier of the external digital platform
     */
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  name of the current thread
     */
    threadName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     *  flag to know more messages are allowed to be added on current thread or not
     */
    canAddMoreMessages: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     *  unique identifier of the channel related to current thread
     */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     *  unique identifier of the current thread
     */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     *  unique identifier of the external digital platform
     */
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  name of the current thread
     */
    threadName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type CXoneThread = InferType<typeof CXoneThreadSchema>;
