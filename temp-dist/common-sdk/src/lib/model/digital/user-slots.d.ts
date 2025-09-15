import { InferType } from 'yup';
export declare const UserSlotsSchema: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    slotId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    postId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    caseId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    slotId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    postId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    caseId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    slotId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    postId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    caseId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    slotId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    postId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    caseId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    slotId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    postId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    caseId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>[]>;
export declare type UserSlots = InferType<typeof UserSlotsSchema>;
