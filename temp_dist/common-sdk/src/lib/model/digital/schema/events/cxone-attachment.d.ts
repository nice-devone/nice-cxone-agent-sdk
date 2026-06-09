import { InferType } from 'yup';
export declare const CXoneAttachmentsSchema: import("yup/lib/object").OptionalObjectSchema<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare const CXoneAttachmentWithPreviewSchema: import("yup").ObjectSchema<import("yup/lib/object").Assign<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, {
    previewUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, {
    previewUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, {
    previewUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>>;
declare const CXoneAttachmentsArraySchema: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>[]>;
declare const CXoneAttachmentsWithPreviewArraySchema: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, import("yup/lib/object").Assign<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, {
    previewUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, import("yup/lib/object").Assign<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, {
    previewUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, import("yup/lib/object").Assign<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, {
    previewUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, import("yup/lib/object").Assign<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, {
    previewUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, import("yup/lib/object").Assign<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, {
    previewUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>>[]>;
export declare type CXoneAttachmentArray = InferType<typeof CXoneAttachmentsArraySchema>;
export declare type CXoneAttachmentWithPreviewArray = InferType<typeof CXoneAttachmentsWithPreviewArraySchema>;
export declare type CXoneAttachment = InferType<typeof CXoneAttachmentsSchema>;
export declare type CXoneAttachmentWithPreview = InferType<typeof CXoneAttachmentWithPreviewSchema>;
export {};
