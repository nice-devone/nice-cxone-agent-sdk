import { PayloadAction } from '@reduxjs/toolkit';
import { agentCompletedContactsResponse, CXoneAgentVoiceContactHistoryRequest, CXoneCase, CXoneRoutingQueue, CXoneTag, MediaType } from '@nice-devone/common-sdk';
import { CXoneVoiceContact, CXoneVoiceMailContact, CXoneWorkItemContact } from '@nice-devone/acd-sdk';
export interface agentCompletedContacts {
    agentVoiceContactData: agentCompletedContactsResponse[];
    agentDigitalContactData: CXoneCase[];
    routingQueueIds: CXoneRoutingQueue[];
}
export declare const ccfAgentState: agentCompletedContacts;
interface AgentDigitalContactHistoryRequest {
    ownerAssignee: string;
}
interface ContactHistoryIndexDBArgs {
    acdContactDetails: CXoneVoiceContact | CXoneVoiceMailContact | CXoneWorkItemContact;
    mediaType: MediaType;
    dispositionData: {
        primaryDispositionId: number;
        dispositionNotes: string;
        tags: CXoneTag[];
    };
}
export declare const AGENT_CONTACT_HISTORY_KEY = "ccfAgentContactHistory";
export declare const CcfAgentContactHistorySlice: import("@reduxjs/toolkit").Slice<agentCompletedContacts, {
    /**
     * used to store voice contact data
     * @param rootState - AppSpace state
     * @example - storeAgentVoiceContactHistory(state)
     */
    storeAgentVoiceContactHistory(state: import("immer/dist/internal").WritableDraft<agentCompletedContacts>, action: PayloadAction<Array<agentCompletedContactsResponse>>): {
        agentVoiceContactData: import("yup/lib/object").AssertsShape<{
            agentId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            dispositionNotes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            fromAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastUpdateTime: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            mediaType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            teamId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            toAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isOutbound: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            contactStart: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            totalDurationSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            tags: any;
            primaryDispositionId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        }>[];
        agentDigitalContactData: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
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
        }>>[];
        routingQueueIds: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            isSubqueue: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            agentResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFirstResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFollowOnResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerIdleTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            timeExtensionEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>[];
    };
    /**
     * used to fecth Agent digital contact data
     * @param rootState - AppSpace state
     * @example -     storeAgentDigitalContactHistory(state)
     */
    storeAgentDigitalContactHistory(state: import("immer/dist/internal").WritableDraft<agentCompletedContacts>, action: PayloadAction<Array<CXoneCase>>): {
        agentDigitalContactData: import("yup/lib/object").AssertsShape<{
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
        }>[];
        agentVoiceContactData: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            agentId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            dispositionNotes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            fromAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastUpdateTime: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            mediaType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            teamId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            toAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isOutbound: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            contactStart: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            totalDurationSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            tags: any;
            primaryDispositionId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        }>>[];
        routingQueueIds: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            isSubqueue: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            agentResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFirstResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFollowOnResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerIdleTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            timeExtensionEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>[];
    };
    /**
     * used to fecth Agent routing queue Id
     * @param rootState - AppSpace state
     * @example - storeRoutingQueueId(state)
     */
    storeRoutingQueueId(state: import("immer/dist/internal").WritableDraft<agentCompletedContacts>, action: PayloadAction<Array<CXoneRoutingQueue>>): {
        routingQueueIds: import("yup/lib/object").AssertsShape<{
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            isSubqueue: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            agentResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFirstResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFollowOnResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerIdleTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            timeExtensionEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>[];
        agentVoiceContactData: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            agentId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            dispositionNotes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            fromAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastUpdateTime: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            mediaType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            teamId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            toAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isOutbound: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            contactStart: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            totalDurationSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            tags: any;
            primaryDispositionId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        }>>[];
        agentDigitalContactData: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
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
        }>>[];
    };
}, "ccfAgentContactHistory">;
export declare const CcfAgentContactHistoryActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * used to store voice contact data
     * @param rootState - AppSpace state
     * @example - storeAgentVoiceContactHistory(state)
     */
    storeAgentVoiceContactHistory(state: import("immer/dist/internal").WritableDraft<agentCompletedContacts>, action: PayloadAction<Array<agentCompletedContactsResponse>>): {
        agentVoiceContactData: import("yup/lib/object").AssertsShape<{
            agentId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            dispositionNotes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            fromAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastUpdateTime: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            mediaType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            teamId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            toAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isOutbound: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            contactStart: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            totalDurationSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            tags: any;
            primaryDispositionId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        }>[];
        agentDigitalContactData: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
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
        }>>[];
        routingQueueIds: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            isSubqueue: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            agentResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFirstResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFollowOnResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerIdleTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            timeExtensionEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>[];
    };
    /**
     * used to fecth Agent digital contact data
     * @param rootState - AppSpace state
     * @example -     storeAgentDigitalContactHistory(state)
     */
    storeAgentDigitalContactHistory(state: import("immer/dist/internal").WritableDraft<agentCompletedContacts>, action: PayloadAction<Array<CXoneCase>>): {
        agentDigitalContactData: import("yup/lib/object").AssertsShape<{
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
        }>[];
        agentVoiceContactData: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            agentId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            dispositionNotes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            fromAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastUpdateTime: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            mediaType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            teamId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            toAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isOutbound: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            contactStart: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            totalDurationSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            tags: any;
            primaryDispositionId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        }>>[];
        routingQueueIds: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            isSubqueue: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            agentResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFirstResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFollowOnResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerIdleTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            timeExtensionEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>[];
    };
    /**
     * used to fecth Agent routing queue Id
     * @param rootState - AppSpace state
     * @example - storeRoutingQueueId(state)
     */
    storeRoutingQueueId(state: import("immer/dist/internal").WritableDraft<agentCompletedContacts>, action: PayloadAction<Array<CXoneRoutingQueue>>): {
        routingQueueIds: import("yup/lib/object").AssertsShape<{
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            isSubqueue: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            agentResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFirstResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFollowOnResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerIdleTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            timeExtensionEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>[];
        agentVoiceContactData: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            agentId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            dispositionNotes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            fromAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastUpdateTime: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            mediaType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            teamId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            toAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isOutbound: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            contactStart: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            totalDurationSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            tags: any;
            primaryDispositionId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        }>>[];
        agentDigitalContactData: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
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
        }>>[];
    };
}, "ccfAgentContactHistory">;
export declare const ccfAgentContactHistoryReducer: import("redux").Reducer<agentCompletedContacts, import("redux").AnyAction>;
/**
/**
 * Thunk action creator to interact with SDK and manage Authentication By Code flow
 *
 * @param args - client ID and auth code
 * ```
 * @example
 *  dispatch(getAcdContactHistory()
    );
 * ```
 */
export declare const getAcdContactHistory: import("@reduxjs/toolkit").AsyncThunk<void, CXoneAgentVoiceContactHistoryRequest, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
/**
 * Thunk to retrive dispositon notes for an interaction
 *
 * @param contactId - contact ID of the interaction
 * ```
 * @example
 *  dispatch(getContactHistoryDisposition(<contactID>)).unwrap();
 * ```
 */
export declare const getContactHistoryDisposition: import("@reduxjs/toolkit").AsyncThunk<import("yup/lib/object").AssertsShape<{
    dispositionId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    dispositionName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    notes: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    dispositionedByAgendId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    lastUpdated: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}> | null, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
/**
 * Thunk to retrieve all the applicable dispositions for a skill
 *
 * @param parameters - container parameter for the following parameters
 *
 * @param skillId - unique skill ID
 * @param mediaType - media type of the skill
 * ```
 * @example
 *  dispatch(getDispositionsForSkill(<skillId>)).unwrap();
 * ```
 */
export declare const getDispositionsForSkill: import("@reduxjs/toolkit").AsyncThunk<import("@nice-devone/common-sdk").CXoneDisposition[] | null, {
    skillId: string;
    mediaType: MediaType;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
/**
 * Thunk action creator to interact with SDK and manage Authentication By Code flow
 *
 * @param args - client ID and auth code
 * ```
 * @example
 *  dispatch(
      getDigitalContactHistory()
    );
 * ```
 */
export declare const getDigitalContactHistory: import("@reduxjs/toolkit").AsyncThunk<void, AgentDigitalContactHistoryRequest, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Thunk action creator to interact with SDK and manage Authentication By Code flow
 *
 * @param args - client ID and auth code
 * ```
 * @example
 *  dispatch(
      getRoutingQueueId()
    );
 * ```
 */
export declare const getRoutingQueueId: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Thunk action creator to get digital user ID
 * @example
 * ```
 *  dispatch(getDigitalUserId());
 * ```
 */
export declare const getDigitalUserId: import("@reduxjs/toolkit").AsyncThunk<any, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Thunk action creator to get store contact history data in indexDB
 * @param acdContactDetails - acd contact details object
 * @example - dispatch(storeContactHistoryIndexDB(acdContactDetails));
 *
 */
export declare const storeContactHistoryIndexDB: import("@reduxjs/toolkit").AsyncThunk<void, ContactHistoryIndexDBArgs, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const cxoneAgentVoiceContactData: ((state: {
    ccfAgentContactHistory: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneAgentDigitalContactData: ((state: {
    ccfAgentContactHistory: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneRoutingQueuId: ((state: {
    ccfAgentContactHistory: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export {};
