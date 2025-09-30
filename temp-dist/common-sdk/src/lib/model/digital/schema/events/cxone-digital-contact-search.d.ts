import { InferType } from 'yup';
export declare const CXoneDigitalContactSearchSchema: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  channel id from contact response
     */
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  channel name from contact response
     */
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  routingQueuePriority from contact response
     */
    routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  skill id from contact response
     */
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     *  skill name from contact response
     */
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  private channel flag from contact response
     */
    isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     *  channel type from contact response
     */
    channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  sla details from contact response
     */
    sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>>>;
    /**
     *  preview from contact response
     */
    preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  channel id from contact response
     */
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  channel name from contact response
     */
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  routingQueuePriority from contact response
     */
    routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  skill id from contact response
     */
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     *  skill name from contact response
     */
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  private channel flag from contact response
     */
    isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     *  channel type from contact response
     */
    channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  sla details from contact response
     */
    sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>>>;
    /**
     *  preview from contact response
     */
    preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  channel id from contact response
     */
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  channel name from contact response
     */
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  routingQueuePriority from contact response
     */
    routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  skill id from contact response
     */
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     *  skill name from contact response
     */
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  private channel flag from contact response
     */
    isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     *  channel type from contact response
     */
    channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  sla details from contact response
     */
    sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>>>;
    /**
     *  preview from contact response
     */
    preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>>;
export declare const CXoneDigitalContactSearch: import("yup/lib/object").OptionalObjectSchema<{
    hits: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    scrollToken: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    data: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel id from contact response
         */
        channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel name from contact response
         */
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  routingQueuePriority from contact response
         */
        routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  skill id from contact response
         */
        skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         *  skill name from contact response
         */
        skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  private channel flag from contact response
         */
        isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        /**
         *  channel type from contact response
         */
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  sla details from contact response
         */
        sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>>;
        /**
         *  preview from contact response
         */
        preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
        endUserRecipients: any;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel id from contact response
         */
        channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel name from contact response
         */
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  routingQueuePriority from contact response
         */
        routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  skill id from contact response
         */
        skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         *  skill name from contact response
         */
        skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  private channel flag from contact response
         */
        isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        /**
         *  channel type from contact response
         */
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  sla details from contact response
         */
        sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>>;
        /**
         *  preview from contact response
         */
        preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
        endUserRecipients: any;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel id from contact response
         */
        channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel name from contact response
         */
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  routingQueuePriority from contact response
         */
        routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  skill id from contact response
         */
        skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         *  skill name from contact response
         */
        skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  private channel flag from contact response
         */
        isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        /**
         *  channel type from contact response
         */
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  sla details from contact response
         */
        sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>>;
        /**
         *  preview from contact response
         */
        preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
        endUserRecipients: any;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel id from contact response
         */
        channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel name from contact response
         */
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  routingQueuePriority from contact response
         */
        routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  skill id from contact response
         */
        skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         *  skill name from contact response
         */
        skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  private channel flag from contact response
         */
        isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        /**
         *  channel type from contact response
         */
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  sla details from contact response
         */
        sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>>;
        /**
         *  preview from contact response
         */
        preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
        endUserRecipients: any;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel id from contact response
         */
        channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel name from contact response
         */
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  routingQueuePriority from contact response
         */
        routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  skill id from contact response
         */
        skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         *  skill name from contact response
         */
        skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  private channel flag from contact response
         */
        isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        /**
         *  channel type from contact response
         */
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  sla details from contact response
         */
        sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>>;
        /**
         *  preview from contact response
         */
        preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
        endUserRecipients: any;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[]>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    hits: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    scrollToken: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    data: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel id from contact response
         */
        channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel name from contact response
         */
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  routingQueuePriority from contact response
         */
        routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  skill id from contact response
         */
        skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         *  skill name from contact response
         */
        skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  private channel flag from contact response
         */
        isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        /**
         *  channel type from contact response
         */
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  sla details from contact response
         */
        sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>>;
        /**
         *  preview from contact response
         */
        preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
        endUserRecipients: any;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel id from contact response
         */
        channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel name from contact response
         */
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  routingQueuePriority from contact response
         */
        routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  skill id from contact response
         */
        skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         *  skill name from contact response
         */
        skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  private channel flag from contact response
         */
        isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        /**
         *  channel type from contact response
         */
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  sla details from contact response
         */
        sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>>;
        /**
         *  preview from contact response
         */
        preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
        endUserRecipients: any;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel id from contact response
         */
        channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel name from contact response
         */
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  routingQueuePriority from contact response
         */
        routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  skill id from contact response
         */
        skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         *  skill name from contact response
         */
        skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  private channel flag from contact response
         */
        isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        /**
         *  channel type from contact response
         */
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  sla details from contact response
         */
        sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>>;
        /**
         *  preview from contact response
         */
        preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
        endUserRecipients: any;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel id from contact response
         */
        channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel name from contact response
         */
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  routingQueuePriority from contact response
         */
        routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  skill id from contact response
         */
        skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         *  skill name from contact response
         */
        skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  private channel flag from contact response
         */
        isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        /**
         *  channel type from contact response
         */
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  sla details from contact response
         */
        sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>>;
        /**
         *  preview from contact response
         */
        preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
        endUserRecipients: any;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel id from contact response
         */
        channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  channel name from contact response
         */
        channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  routingQueuePriority from contact response
         */
        routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  skill id from contact response
         */
        skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         *  skill name from contact response
         */
        skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  private channel flag from contact response
         */
        isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        /**
         *  channel type from contact response
         */
        channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         *  sla details from contact response
         */
        sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
            firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
            solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
                raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
                alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            }>>>;
        }>>>;
        /**
         *  preview from contact response
         */
        preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
        endUserRecipients: any;
        threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[]>;
}>>;
export declare type CXoneDigitalContactSearchObject = InferType<typeof CXoneDigitalContactSearch>;
export declare type CXoneDigitalContactSearchData = InferType<typeof CXoneDigitalContactSearchSchema>;
