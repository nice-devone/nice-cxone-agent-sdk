import { InferType } from 'yup';
export interface CXoneDigitalTranslationLanguages {
    languages: object;
    languageTranslations: object;
}
export interface CXoneDigitalTranslationApiRequest {
    text: string;
    from: string;
    to: string;
    id: string;
}
export declare const CXoneDigitaltranslationApiResponseSchema: import("yup/lib/object").OptionalObjectSchema<{
    result: import("yup").ArraySchema<import("yup/lib/object").OptionalObjectSchema<{
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<{
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>[], import("yup/lib/object").AssertsShape<{
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>[]>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    result: import("yup").ArraySchema<import("yup/lib/object").OptionalObjectSchema<{
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<{
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>[], import("yup/lib/object").AssertsShape<{
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>[]>;
}>>;
export declare type CXoneDigitalTranslationApiResponse = InferType<typeof CXoneDigitaltranslationApiResponseSchema>;
