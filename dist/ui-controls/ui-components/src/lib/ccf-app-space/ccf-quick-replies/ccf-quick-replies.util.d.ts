import { QuickReplyNextLinks } from '../ccf-app-space.slice';
import { CXoneDigitalQuickReply, CXoneQuickReplyReplaceVariableRequest } from '@nice-devone/common-sdk';
import dayjs from 'dayjs';
import { IndexDBKeyNames, IndexDBStoreNames } from '@nice-devone/core-sdk';
export declare const DYNAMIC_CONTENT_QUICK_RESPONSE = "dynamicContent";
declare type CleanupFavsParams = {
    clientDataKey: string;
    idbStoreName: typeof IndexDBStoreNames[keyof typeof IndexDBStoreNames];
    idbKeyName: typeof IndexDBKeyNames[keyof typeof IndexDBKeyNames];
};
/**
* Syncs the cleaned favorites (deleted QR) to LocalStorage, IndexedDB, and Client Data API.
 * @example
 * ```
 * await cleanupStaleFavorites({
 *   clientDataKey: 'CXAFavInQuickRep',
 *   idbStoreName: IndexDBStoreNames.QUICKREPLIES,
 *   idbKeyName: IndexDBKeyNames.FAV_QUICK_REPLIES
 * });
 * ```
*/
export declare const cleanupStaleFavorites: ({ clientDataKey, idbStoreName, idbKeyName, }: CleanupFavsParams) => Promise<void>;
/**
* This method is used to get the list of Quick replies or responses
* @param contactId - contact Id of current active digital contact
* @param channelId - channel Id of current active digital contact
* @example getSecureFormLink('123456', 'abc12ef3456')
*/
export declare const fetchAllQReplies: import("@reduxjs/toolkit").AsyncThunk<{
    allQReplies: CXoneDigitalQuickReply[];
    nextLinks: QuickReplyNextLinks;
    totalRecords: number;
} | undefined, {
    contactId: string;
    channelId: string;
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
* This method is used to get the list of Quick replies or responses
* @param page - current page number
* @param channelId - its optional we will need when we want to get the rich messages
* @example fetchOutboundQuickReplies(1)
*/
export declare const fetchOutboundQuickReplies: import("@reduxjs/toolkit").AsyncThunk<{
    allQR: CXoneDigitalQuickReply[];
    nextLinks: import("@nice-devone/common-sdk").CXoneDigitalNextLinks;
}, {
    page: number;
    channelId?: string | undefined;
    isCaseStatusNotInDraft?: boolean | undefined;
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
 * This method is used to fetch unified outbound quick replies.
 * @param page - current page number
 * @param limit - number of records per page
 * @param channelId - channel id for quick replies
 * @param skillId - optional skill id
 * @param search - optional search string
 * @param isFavorite - optional boolean to filter favorite quick replies
 */
export declare const fetchUnifiedQuickReplies: import("@reduxjs/toolkit").AsyncThunk<{
    allQuickReplies: CXoneDigitalQuickReply[];
    nextLinks: QuickReplyNextLinks;
    totalRecords: number;
    isFavorite: boolean | undefined;
    page: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    channelId: string;
    skillId?: number | undefined;
    search?: string | undefined;
    isFavorite?: boolean | undefined;
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
 * Method to toggle favorite status of a quick reply.
 * @param quickReplyId - ID of the quick reply to be toggled.
 * @param markAsFavorite - boolean indicating whether to mark as favorite or unmark .
 * @param selectedReply - (Optional) Quick reply in the selected state
 */
export declare const toggleFavoriteQuickReply: import("@reduxjs/toolkit").AsyncThunk<{
    quickReplyId: number;
    markAsFavorite: boolean;
}, {
    quickReplyId: number;
    markAsFavorite: boolean;
    selectedReply?: CXoneDigitalQuickReply | undefined;
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
* This method is used to generate a fresh link for selected Secure Form Quick response
* Generated link will be shared with the customer for submission
* @param formId - Id of selected form under Quick replies
* @param caseId - Selected digital case Id on Interaction Space
* @example getSecureFormLink('123', '123456')
*/
export declare const getSecureFormLink: import("@reduxjs/toolkit").AsyncThunk<void, {
    formId: string;
    caseId: string;
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
* Function to get current date time without seconds and milliseconds
* @returns date and time
* @example getRoundedDate()
*/
export declare const getRoundedDate: () => dayjs.Dayjs;
/**
* This method is used to get Replace Variables details for Quick response when hasVariables flag true
* @param replyContent - main quick response object received from list
* @param digitalContactExternalVariables - Selected digital case Id with external variables
* @example getReplaceVariableDetails(replyContentObject, contactWithExternalVariablesArray)
*/
export declare const getReplaceVariableDetails: import("@reduxjs/toolkit").AsyncThunk<any, {
    replyContent: CXoneDigitalQuickReply;
    digitalContactExternalVariables: CXoneQuickReplyReplaceVariableRequest;
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
export {};
