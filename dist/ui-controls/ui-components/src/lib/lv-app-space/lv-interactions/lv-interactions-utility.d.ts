import { ContactData, DigitalChannelType, ECCRequest, LV_INTERACTION_SUB_TYPES, LV_INTERACTION_TYPES, CXoneMessage, CXoneTag } from '@nice-devone/common-sdk';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
/**
 * Returns the interaction type and interaction subtype based on the contact details and channel name.
 *
 * @param detailsObject - The contact details object, which can be a CXoneVoiceContact or CXoneDigitalContact.
 * @param channelName - (Optional) The digital channel type (e.g., 'Ig', 'Tw', 'Email', 'Chat', 'Sms').
 * @param message - (Optional) most recent message for digital case
 * @returns An object containing the interactionType and interactionSubtype, or null if not applicable.
 * @example
 * ```
 * const result = getInteractionTypes(detailsObject, DigitalChannelType.EMAIL, message);
 * ```
 */
export declare function getInteractionTypes(detailsObject: CXoneVoiceContact | CXoneDigitalContact, channelName?: DigitalChannelType, message?: CXoneMessage | null): {
    interactionType: LV_INTERACTION_TYPES | null;
    interactionSubtype: LV_INTERACTION_SUB_TYPES | null;
};
/**
 * Properties for the Authentication component
 */
export interface getUpdateExperienceRecordPayloadPayload {
    /**
     * detailsObject - The contact details object, which can be a CXoneVoiceContact or CXoneDigitalContact.
     */
    detailsObject: CXoneVoiceContact | CXoneDigitalContact;
    /**
     * agentId - The agent's unique identifier.
     */
    agentId: string;
    /**
     * externalInteractionId - message id or contact id.
     */
    externalInteractionId: string;
    /**
     * dispositionNotes - disposition notes for the contact.
     */
    dispositionNotes?: string | undefined;
    /**
     * saveTranscript - Optional. If true, the transcript of the contact will be saved.
     */
    saveTranscript?: boolean;
    /**
     * sendFinishTime - Optional. If true, the finish time will be included in the payload.
     */
    sendFinishTime?: boolean;
}
/**
 * Generates the payload for disposition a digital ECC experience.
 *
 * @param detailsObject - The digital contact details object.
 * @param agentId - The agent's unique identifier.
 * @param externalInteractionId - The external interaction ID.
 * @param dispositionNotes - Notes or disposition for the interaction.
 * @param saveTranscript - Optional. If true, the transcript of the contact will be saved.
 * @param sendFinishTime - Optional. If true, the finish time will be included in the payload.
 * @example
 * ```
 * const payload = getUpdateExperienceRecordPayload({detailsObject: detailsObject, agentId: 'agent123', externalInteractionId: 'extInt456', dispositionNotes: 'Completed successfully'});
 * ```
 */
export declare function getUpdateExperienceRecordPayload(payload: getUpdateExperienceRecordPayloadPayload): ECCRequest | undefined;
/**
 * Function to get the most recent message from a list of messages.
 * @param messages - An array of message objects.
 * @returns The most recent message object or undefined if no messages exist.
 * @example
 * ```
 * const recentMessage = getMostRecentMessage(messages);
 * ```
 */
export declare function getMostRecentMessage(messages: CXoneMessage[]): import("yup/lib/object").AssertsShape<{
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
        /**
         * Generates the payload for voice a digital ECC experience.
         *
         * @param detailsObject - The digital contact details object.
         * @param agentId - The agent's unique identifier.
         * @param dispositionNotes - Notes or disposition for the interaction.
         * @param dispositionTags - Optional. Tags for the disposition.
         * @example
         * ```
         * const payload = getDispositionExperienceRecordPayloadForACD(detailsObject, 'agent123', 'extInt456', 'Completed successfully');
         * ```
         */
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
}> | null;
/**
 * Function to get the most first message from a list of messages.
 * @param messages - An array of message objects.
 * @returns The first message object or undefined if no messages exist.
 * @example
 * ```
 * const firstMessage = getFirstMessage(messages);
 * ```
 */
export declare function getFirstMessage(messages: CXoneMessage[]): import("yup/lib/object").AssertsShape<{
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
        /**
         * Generates the payload for voice a digital ECC experience.
         *
         * @param detailsObject - The digital contact details object.
         * @param agentId - The agent's unique identifier.
         * @param dispositionNotes - Notes or disposition for the interaction.
         * @param dispositionTags - Optional. Tags for the disposition.
         * @example
         * ```
         * const payload = getDispositionExperienceRecordPayloadForACD(detailsObject, 'agent123', 'extInt456', 'Completed successfully');
         * ```
         */
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
}> | null;
/**
 * Generates the payload for voice a digital ECC experience.
 *
 * @param detailsObject - The digital contact details object.
 * @param agentId - The agent's unique identifier.
 * @param dispositionNotes - Notes or disposition for the interaction.
 * @param dispositionTags - Optional. Tags for the disposition.
 * @example
 * ```
 * const payload = getDispositionExperienceRecordPayloadForACD(detailsObject, 'agent123', 'extInt456', 'Completed successfully');
 * ```
 */
export declare function getDispositionExperienceRecordPayloadForACD(detailsObject: ContactData, agentId: string, dispositionNotes?: string | undefined, dispositionTags?: CXoneTag[]): ECCRequest | undefined;
/**
 * This function create and returns a payload for ECC create API.
 * @param detailsObject - The digital contact details object.
 * @param agentId - The agent's unique identifier.
 * @example
 * ```
 * const payload = getCreateExperienceRecordPayload(detailsObject, 'agent123');
 * ```
 */
export declare function getCreateExperienceRecordPayload(detailsObject: CXoneVoiceContact | CXoneDigitalContact, agentId: string, saveTranscript?: boolean, isAssignment?: boolean): ECCRequest | undefined;
/**
 * This method is going to be fired when ECC updates the Experience Record with the customerId.
 * This applies relateTo scenario as well
 * @param contactId - The contact ID to be updated in the local storage.
 * @param customerId - The customer ID to be associated with LV.
 * @example
 * ```
 * updateLVLSWithCustomerId(contactId, customerId)
 * ```
 */
export declare const updateLVLSWithCustomerId: (contactId: string, customerId: string) => void;
