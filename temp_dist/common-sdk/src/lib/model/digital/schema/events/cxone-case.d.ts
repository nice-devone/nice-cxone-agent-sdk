import { InferType } from 'yup';
export declare const CXoneCaseSchema: import("yup/lib/object").OptionalObjectSchema<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    interactionId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    customFields: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    inboxAssignee: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    inboxAssigneeUser: any;
    threadIdOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    authorEndUserIdentity: any;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    inboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    outboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    ownerAssigneeUser: any;
    routingQueueId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUser: any;
    statusUpdatedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    inboxAssigneeLastAssignedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
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
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    interactionId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    customFields: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    inboxAssignee: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    inboxAssigneeUser: any;
    threadIdOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    authorEndUserIdentity: any;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    inboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    outboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    ownerAssigneeUser: any;
    routingQueueId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUser: any;
    statusUpdatedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    inboxAssigneeLastAssignedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
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
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type CXoneCase = InferType<typeof CXoneCaseSchema>;
export declare const CXoneCaseArray: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    interactionId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    customFields: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    inboxAssignee: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    inboxAssigneeUser: any;
    threadIdOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    authorEndUserIdentity: any;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    inboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    outboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    ownerAssigneeUser: any;
    routingQueueId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUser: any;
    statusUpdatedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    inboxAssigneeLastAssignedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
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
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    interactionId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    customFields: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    inboxAssignee: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    inboxAssigneeUser: any;
    threadIdOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    authorEndUserIdentity: any;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    inboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    outboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    ownerAssigneeUser: any;
    routingQueueId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUser: any;
    statusUpdatedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    inboxAssigneeLastAssignedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
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
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    interactionId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    customFields: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    inboxAssignee: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    inboxAssigneeUser: any;
    threadIdOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    authorEndUserIdentity: any;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    inboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    outboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    ownerAssigneeUser: any;
    routingQueueId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUser: any;
    statusUpdatedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    inboxAssigneeLastAssignedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
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
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    interactionId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    customFields: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    inboxAssignee: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    inboxAssigneeUser: any;
    threadIdOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    authorEndUserIdentity: any;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    inboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    outboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    ownerAssigneeUser: any;
    routingQueueId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUser: any;
    statusUpdatedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    inboxAssigneeLastAssignedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
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
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    interactionId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    customFields: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    inboxAssignee: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    inboxAssigneeUser: any;
    threadIdOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    authorEndUserIdentity: any;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    inboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    outboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    ownerAssigneeUser: any;
    routingQueueId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUser: any;
    statusUpdatedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    inboxAssigneeLastAssignedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
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
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>[]>;
export declare type CXoneCaseArrayObject = InferType<typeof CXoneCaseArray>;
