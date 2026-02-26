import { CXoneMessage, CXoneRoutingQueue, DigitalContactDirection, SLAIndicatorType, CXoneDigitalContactUserSavedProperties, ReactionType, CXoneDigitalReplyRequest, ExternalPlatformTemplateMessageContent } from '@nice-devone/common-sdk';
import { Dispatch } from '@reduxjs/toolkit';
import { CXoneDigitalContactUserSavedPropertiesMap, ContactsSLADetails } from './ccf-assignment-panel.slice';
import { CcfTranslationKey } from '@nice-devone/i18n';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { DispositionData } from '../ccf-disposition/ccf-disposition-slice';
/**
 * method to check whether draft outbound contacts present inside LocalStorage or not
 * @example checkForDraftContact('123');
 */
export declare const checkForDraftContact: (contactIdToMatch: string) => boolean;
export declare enum SortingCriteria {
    LASTUPDATED = "lastUpdated",
    CREATEDDATE = "createDate"
}
export declare enum TimerTitle {
    AGENT_TIMER = "agentTimer",
    CUSTOMER_TIMER = "customerTimer",
    AGENT = "agentLabel",
    CUSTOMER = "customer"
}
/**
 * Enum for popover item selection action
 */
export declare enum MessageKebabMenu {
    DELETE_AUTHOR_NAME = "deleteAuthorName",
    DELETE_CONTENT = "deleteContent",
    REPLY = "reply",
    DELETE_ENTIRE_MESSAGE = "deleteEntireMessage",
    PREVIEW = "preview"
}
/**
 * Interface for argument passed to get SLATimerDetails
 */
export interface TimerDetails {
    /**
     * @remarks - direction of message whether inbound or outbound
    */
    direction: string;
    /**
     * @remarks - timestamp of message createdAt or caseAssignedAt
     */
    timestamp: string | Date;
    /**
     * @remarks - boolean that determines if it's agent's first response or follow-on response
     */
    isFollowOnResponse: boolean;
    /**
     * @remarks - object containing details about the skills related to the selected case
     */
    skillDetails: CXoneRoutingQueue;
    /**
   * @remarks - reset customer response time
   */
    resetCRT?: number;
}
/**
 * Interface for the object returned by getSLATimerDetails methods
 */
export interface SLATimerDetailsType {
    /**
     * @remarks - sla title whether customer or agent
     */
    title: TimerTitle.AGENT_TIMER | TimerTitle.CUSTOMER_TIMER;
    /**
     * @remarks - calculated sla time
     */
    messageTime: number;
    /**
     * @remarks -sla indicator based on the calculation for time lapsed
     */
    slaIndicator: SLAIndicatorType;
}
/**
 * Enum for Digital contact user saved properties
 */
export declare enum DigitalSavedProperties {
    /**
     * @remarks - Receiver BCC
     */
    RECEIVER_BCC = "receiverBcc",
    /**
     * @remarks - Receiver CC
     */
    RECEIVER_CC = "receiverCc",
    /**
     * @remarks - Receiver To
     */
    RECEIVER_TO = "receiverTo"
}
/**
 * Used to add message reaction
 * @param args -  messageId, reactionType, interactionId, caseId, isSelected
 * * @example
*  dispatch(
     addMessageReaction()
   );
 */
export declare const addMessageReaction: import("@reduxjs/toolkit").AsyncThunk<void, {
    messageId: string;
    reactionType: ReactionType;
    interactionId: string;
    caseId: string;
    isSelected: boolean;
}, {
    state?: unknown;
    dispatch?: Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
   * Used to remove reaction for message
   * @param args -  interactionId, caseId, messageId, isDeleted
   * * @example
  *  dispatch(
       removeMessageReactions()
     );
   */
/**
 * Used to remove reaction for message
 * @param args -  interactionId, caseId, messageId, isDeleted
 * * @example
*  dispatch(
     removeMessageReaction()
   );
 */
export declare const removeMessageReaction: import("@reduxjs/toolkit").AsyncThunk<void, {
    messageId: string;
    reactionType: ReactionType;
    interactionId: string;
    caseId: string;
    isSelected: boolean;
}, {
    state?: unknown;
    dispatch?: Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
  * Thunk action creator to interact with SDK and  call hide/unhide API
  *
  * @param args -  interactionId, caseId, messageId, isHidden
  * ```
  * @example
  *  dispatch(
       messageShowHide()
     );
  * ```
  */
/**
* Thunk action creator to interact with SDK and  call hide/unhide API
*
* @param args -  interactionId, caseId, messageId, isHidden
* ```
* @example
*  dispatch(
     messageShowHide()
   );
* ```
*/
export declare const messageShowHide: import("@reduxjs/toolkit").AsyncThunk<void, {
    interactionId: string;
    caseId: string;
    messageId: string;
    isHidden: boolean;
}, {
    state?: unknown;
    dispatch?: Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
* Thunk action creator to interact with SDK and delete message API
*
* @param args -  interactionId, caseId, messageId, isDeleted
* ```
* @example
*  dispatch(
     deleteMessage(argument)
   );
* ```
*/
export declare const deleteMessage: import("@reduxjs/toolkit").AsyncThunk<void, {
    interactionId: string;
    caseId: string;
    messageId: string;
    isDeleted: boolean;
}, {
    state?: unknown;
    dispatch?: Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
* Thunk action creator to interact with SDK and delete message content API
* @param messageDetails -  message details
* ```
* @example
*  dispatch(deleteMessageContent(messageDetails));
* ```
*/
export declare const deleteMessageContent: import("@reduxjs/toolkit").AsyncThunk<void, {
    interactionId: string;
    caseId: string;
    messageId: string;
    isContentORAuthorName: MessageKebabMenu;
    isPreviousCaseMessage?: boolean | undefined;
    isNextCaseMessage?: boolean | undefined;
}, {
    state?: unknown;
    dispatch?: Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
* Thunk action creator to interact with SDK delete message author name API
*
* @param messageDetails -  message details
* ```
* @example
*  dispatch(deleteMessageAuthorName(messageDetails));
* ```
*/
export declare const deleteMessageAuthorName: import("@reduxjs/toolkit").AsyncThunk<void, {
    interactionId: string;
    caseId: string;
    messageId: string;
    isContentORAuthorName: MessageKebabMenu;
    isPreviousCaseMessage?: boolean | undefined;
    isNextCaseMessage?: boolean | undefined;
}, {
    state?: unknown;
    dispatch?: Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * method to remove focused Outbound draft contact id from LocalStorage
 * @example removeObDraft('123', 'draft');
 */
export declare const removeObDraft: (caseId: string, caseStatus: string) => void;
/**
 * method to get digitalContactSavedProps from localStorage
 * @example getDigitalContactSavedPropsFromLocalStorage();
 */
export declare const getDigitalContactSavedPropsFromLocalStorage: () => {
    [caseId: string]: CXoneDigitalContactUserSavedProperties;
};
/**
 * Method to get SLA Details from localStorage
 * @example -
 * ```
 * getSLADetailsFromLocalStorage();
 * ```
 */
export declare const getSLADetailsFromLocalStorage: () => ContactsSLADetails;
/**
 * method to get ResetCRTFromLocalStorage from localStorage
 * @param caseId -  case Id
 * @example getResetCRTFromLocalStorage('2344442');
 */
export declare const getResetCRTFromLocalStorage: (caseId: string) => number | undefined;
/**
   * method that determines the title and time left for the particular timer
   * @param messages - CXoneMessage[]
   * @param caseAssignedAt - Date
   * @param skillDetails - CXoneRoutingQueue
   * @example calculateSLATime(messages,caseAssignedAt,skillDetails);
   */
export declare const calculateSLATime: (messages: CXoneMessage[], caseAssignedAt: Date, skillDetails: CXoneRoutingQueue, resetCRT?: number) => SLATimerDetailsType | undefined;
/**
   * Used to changes the case status to resolve of the contact details object provided and then unassign them
   * @param contactDetails - contact detail object
   * @param handleToast - callback to show toast on success or error of status change and unassign
   * @example resolveAndUnassignContacts(['123234']);
   */
export declare const resolveAndUnassignContacts: (contactDetails: CXoneDigitalContact[], handleToast: (isError: boolean, messageKey: CcfTranslationKey, placeholder: string) => void) => void;
/**
 * Method to invoke de focus event of previous active contact
 * @param dispatch- Dispatch object to be passed for further actions
 * @example removePreviousContactFocus(dispatch);
 */
export declare const removePreviousContactFocus: (dispatch: Dispatch<any>, removeLS?: boolean, isAssignedSelected?: boolean) => void;
/**
 * Method to set the custom event data in localstorage for custom Event
 * @example - setAgentWorkflowResponseDetails(eventData, currentContact)
 */
export declare const setAgentWorkflowResponseDetails: (eventData: any, currentContact: any) => any;
/**
 * Method to set the DigitalUserSavedProperties from local storage to state
 * @param digitalContactUserSavedProperties - saved contact user properties from state
 * @param dispatch - dispatch function to update the state
 * @example - saveContactUserSavedPropertiesFromLS(digitalContactUserSavedProperties, dispatch)
 */
export declare const saveContactUserSavedPropertiesFromLS: (digitalContactUserSavedProperties: CXoneDigitalContactUserSavedPropertiesMap, dispatch: Dispatch) => void;
/**
 * Method to remove and update contact SLA details from localStorage
 * @param caseId -  case Id
 * @example -
 * ```
 * updateSLADetailsInLocalStorage('2344442');
 * ```
 */
export declare const updateSLADetailsInLocalStorage: (caseId: string) => void;
/**
 * Method to clear contact details from localStorage
 * @param caseId -  case Id
 * @example -
 * ```
 * clearContactDetailsFromLocalStorage('2344442');
 * ```
 */
export declare const clearContactDetailsFromLocalStorage: (caseId: string) => void;
/**
 * Function to get draft message from active contact and reply object data
 * @param activeContact -The active contact.
 * @param sendReplyObj -The reply object.
 * @param xTraceId -The xTraceId.
 * @example getDraftMessage()
 */
export declare const getDraftMessage: (activeContact: CXoneDigitalContact | undefined, sendReplyObj: CXoneDigitalReplyRequest, xTraceId: string) => import("yup/lib/object").AssertsShape<{
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
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>; /**
         * method to remove focused Outbound draft contact id from LocalStorage
         * @example removeObDraft('123', 'draft');
         */
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
}> | undefined;
/**
 * Function to check the type of message content
 * @param content - message content
 * @returns boolean value
 * @example isExternalPlatformTemplateMessageContent(messageContent)
 */
export declare const IsExternalPlatformTemplateMessageContent: (content: any) => content is ExternalPlatformTemplateMessageContent;
/**
 * Method to check whether the user can delete the message content or not
 * @example -
 * ```
 * canDeleteMessageContent(true);
 * ```
 */
export declare const canDeleteMessageContent: (isContentRemoved: boolean) => boolean;
/**
 * Method to check whether the user can delete the message author's name or not
 * @example -
 * ```
 * canDeleteMessageAuthorName(true, 'inbound');
 * ```
 */
export declare const canDeleteMessageAuthorName: (isAuthorNameRemoved: boolean, messageDirection: DigitalContactDirection) => boolean;
/**
 * Method to get selected disposition
 * @param contactId -  contact Id
 * @param dispositions -  disposition of selected contact
 * @example -
 * ```
 * getSelectedDigitalDisposition(12345, dispositions)
 * ```
 */
export declare const getSelectedDigitalDisposition: (contactId: string, dispositions: {
    [contactId: string]: DispositionData;
}) => {};
/**
 * Method to get FileName for Audio Attachment
 * @example - getFileNameForAudioAttachment
 * ```
 * getFileNameForAudioAttachment()
 * ```
 */
export declare const getFileNameForAudioAttachment: () => string;
/**
 * Method to get channel name for narration
 * @param isOutbound -  to check channel is IB or OB
 * @param channelName -  channel name
 * @example - getChannelNameForNarration(true, Chat)
 */
export declare const getChannelNameForNarration: (isOutbound?: boolean, channelName?: string) => string;
/**
   * Method to update selected digital contact user saved properties in redux store
   * @param dispatch -  dispatch function to update the state
   * @param selectedProp -  selected digital contact user saved properties
   * @param caseId -  case Id
   * @param value -  value to be updated
   * @example
   * ```
   * updateSelectedDigitalSavedProperties(dispatch, selectedProp, caseId, value);
   * ```
   */
export declare const updateSelectedDigitalSavedProperties: (dispatch: Dispatch, selectedProp: DigitalSavedProperties, caseId: string, value: string) => void;
