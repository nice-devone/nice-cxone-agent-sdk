import { InferType } from 'yup';
export declare const TypingPreviewEventSchema: import("yup").ObjectSchema<{
    data: any;
} & import("yup/lib/object").ObjectShape, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    data: any;
} & import("yup/lib/object").ObjectShape>, import("yup/lib/object").AssertsShape<{
    data: any;
} & import("yup/lib/object").ObjectShape>>;
export declare type TypingPreviewEvent = InferType<typeof TypingPreviewEventSchema>;
