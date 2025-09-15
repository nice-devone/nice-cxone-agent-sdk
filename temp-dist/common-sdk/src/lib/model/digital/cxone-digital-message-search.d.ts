import { InferType } from 'yup';
import { CXoneMessageSchema } from './schema/events/cxone-message';
/**
 * Schema used for message search API response
 */
export declare const CXoneDigitalMessageSearch: import("yup/lib/object").OptionalObjectSchema<{
    /**
     *  total number of customer records
     */
    hits: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     *  pagination token to be used on client side
     */
    scrollToken: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  complete result set of message search applied with search query or filter
     */
    data: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
        postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        messageContent: any;
        messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[]>;
        direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        deviceFingerprint: any;
        title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[]>;
        authorEndUserIdentity: any;
        authorUser: any;
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        replyToMessage: any;
        isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        reactionStatistics: any;
        isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[]>;
        _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
        replyChannel: any;
        readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channel: any;
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        forward: any;
        xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contentRemoved: any;
        authorNameRemoved: any;
        delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[]>;
        customerStatistics: any;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
        postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        messageContent: any;
        messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[]>;
        direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        deviceFingerprint: any;
        title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[]>;
        authorEndUserIdentity: any;
        authorUser: any;
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        replyToMessage: any;
        isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        reactionStatistics: any;
        isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[]>;
        _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
        replyChannel: any;
        readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channel: any;
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        forward: any;
        xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contentRemoved: any;
        authorNameRemoved: any;
        delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[]>;
        customerStatistics: any;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
        postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        messageContent: any;
        messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[]>;
        direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        deviceFingerprint: any;
        title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[]>;
        authorEndUserIdentity: any;
        authorUser: any;
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        replyToMessage: any;
        isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        reactionStatistics: any;
        isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[]>;
        _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
        replyChannel: any;
        readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channel: any;
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        forward: any;
        xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contentRemoved: any;
        authorNameRemoved: any;
        delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[]>;
        customerStatistics: any;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
        postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        messageContent: any;
        messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[]>;
        direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        deviceFingerprint: any;
        title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[]>;
        authorEndUserIdentity: any;
        authorUser: any;
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        replyToMessage: any;
        isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        reactionStatistics: any;
        isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[]>;
        _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
        replyChannel: any;
        readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channel: any;
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        forward: any;
        xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contentRemoved: any;
        authorNameRemoved: any;
        delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[]>;
        customerStatistics: any;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
        postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        messageContent: any;
        messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[]>;
        direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        deviceFingerprint: any;
        title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[]>;
        authorEndUserIdentity: any;
        authorUser: any;
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        replyToMessage: any;
        isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        reactionStatistics: any;
        isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[]>;
        _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
        replyChannel: any;
        readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channel: any;
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        forward: any;
        xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contentRemoved: any;
        authorNameRemoved: any;
        delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[]>;
        customerStatistics: any;
    }>>[]>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     *  total number of customer records
     */
    hits: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     *  pagination token to be used on client side
     */
    scrollToken: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  complete result set of message search applied with search query or filter
     */
    data: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
        postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        messageContent: any;
        messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[]>;
        direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        deviceFingerprint: any;
        title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[]>;
        authorEndUserIdentity: any;
        authorUser: any;
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        replyToMessage: any;
        isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        reactionStatistics: any;
        isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[]>;
        _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
        replyChannel: any;
        readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channel: any;
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        forward: any;
        xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contentRemoved: any;
        authorNameRemoved: any;
        delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[]>;
        customerStatistics: any;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
        postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        messageContent: any;
        messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[]>;
        direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        deviceFingerprint: any;
        title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[]>;
        authorEndUserIdentity: any;
        authorUser: any;
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        replyToMessage: any;
        isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        reactionStatistics: any;
        isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[]>;
        _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
        replyChannel: any;
        readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channel: any;
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        forward: any;
        xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contentRemoved: any;
        authorNameRemoved: any;
        delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[]>;
        customerStatistics: any;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
        postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        messageContent: any;
        messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[]>;
        direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        deviceFingerprint: any;
        title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[]>;
        authorEndUserIdentity: any;
        authorUser: any;
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        replyToMessage: any;
        isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        reactionStatistics: any;
        isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[]>;
        _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
        replyChannel: any;
        readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channel: any;
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        forward: any;
        xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contentRemoved: any;
        authorNameRemoved: any;
        delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[]>;
        customerStatistics: any;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
        postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        messageContent: any;
        messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[]>;
        direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        deviceFingerprint: any;
        title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[]>;
        authorEndUserIdentity: any;
        authorUser: any;
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        replyToMessage: any;
        isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        reactionStatistics: any;
        isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[]>;
        _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
        replyChannel: any;
        readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channel: any;
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        forward: any;
        xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contentRemoved: any;
        authorNameRemoved: any;
        delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[]>;
        customerStatistics: any;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
        postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        messageContent: any;
        messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            user: any;
            createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
            message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            }>>>;
        }>>[]>;
        direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        deviceFingerprint: any;
        title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        }>>[]>;
        authorEndUserIdentity: any;
        authorUser: any;
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        replyToMessage: any;
        isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        reactionStatistics: any;
        isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[]>;
        _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
        replyChannel: any;
        readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channel: any;
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        forward: any;
        xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        contentRemoved: any;
        authorNameRemoved: any;
        delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>[]>;
        customerStatistics: any;
    }>>[]>;
}>>;
export declare type CXoneDigitalMessageSearchDetails = InferType<typeof CXoneDigitalMessageSearch>;
export declare type CXoneDigitalMessageSearchData = InferType<typeof CXoneMessageSchema>;
