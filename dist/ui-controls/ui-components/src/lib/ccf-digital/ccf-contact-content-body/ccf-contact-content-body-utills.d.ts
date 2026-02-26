/**
 * generates UUIDs for number of attachments
 * @param attachments - CXoneAttachmentArray
 * @example  getUUIds(attachments)
 * @returns uuidList
 */
export declare const generateUUIdsForInlineAttachment: (attachments: import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
}>>[]) => string[];
/**
 * updates the src of inline images with attachment id
 * @param msgContent - HTML of email content in string format
 * @param uuidList - string array with UUID values.
 * @example  modifyMessageContentInlineImgIds(item)
 * @returns domString - modifiedHTML of email content in string format
 */
export declare const modifyMessageContentInlineImgIds: (msgContent: string, uuidList: string[]) => string;
