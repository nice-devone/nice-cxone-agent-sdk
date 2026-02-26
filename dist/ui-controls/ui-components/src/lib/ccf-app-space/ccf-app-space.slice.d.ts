import { AnyAction, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { CXoneDigitalReplaceVariables, CXoneDigitalQuickReply, FavQuickReply, ExternalPlatformTemplate, CXoneMessageContent, ReplyAPIStatus, DraftMessagePayload } from '@nice-devone/common-sdk';
import { CcfTranslationKey } from '@nice-devone/i18n';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { Id } from 'react-toastify';
export declare const CCF_APP_SPACE_KEY = "appSpace";
export declare const DYNAMIC_CONTENT_QUICK_RESPONSE = "dynamicContent";
export declare const RICH_MESSAGE_TYPES: string[];
interface SelectedTab {
    index: string;
    tab: string;
}
/**
 * This interface is for quick reply next link details
 */
export interface QuickReplyNextLinks {
    /**
     * @remarks - represents next link
     */
    next: string;
    /**
     * @remarks - represents current link
     */
    self: string;
    /**
     * @remarks - represents previous link
     */
    previous: string;
}
/**
 * This interface is for rich message payload details
 */
export interface RichMessagePayloadDetails {
    /**
     * @remarks - Digital contact details
     */
    contactDetails: CXoneDigitalContact;
    /**
     * @remarks - Rich message details
     */
    richMessageDetails: CXoneDigitalQuickReply;
    /**
     * @remarks - Customer name
     */
    customerName: string;
}
/**
 * This interface is for quick reply response
 */
export interface QuickReplyResponse {
    /**
     * @remarks - is error
     */
    isError: boolean;
    /**
     * @remarks - message key
     */
    messageKey: CcfTranslationKey;
    /**
     * @remarks - placeholder
     */
    placeholder?: string;
}
/**
 * This interface is for quick reply toast Response
 */
export interface quickReplyToastResponse {
    [contactId: string]: QuickReplyResponse;
}
export interface CcfAppSpaceState {
    query: {
        searchBox: string;
    };
    isLoading: boolean;
    isOutboundQuickRepliesLoading: boolean;
    favQReplies: FavQuickReply[];
    allQReplies: CXoneDigitalQuickReply[];
    favQuickOutboundReplies: FavQuickReply[];
    allQRepliesOutbound: CXoneDigitalQuickReply[];
    allMessageTemplates: ExternalPlatformTemplate[];
    selectedQReply: CXoneDigitalQuickReply;
    varReplacedContent: {
        content: string;
    };
    qReplySent: string;
    isQReplySent?: boolean;
    previewQuickReply?: boolean;
    appSpaceSelectedTab: SelectedTab;
    isAppSpaceTwoColumn: boolean;
    previewOutboundTemplate?: boolean;
    quickReplyToastResponse: {
        [contactId: string]: QuickReplyResponse;
    };
    outboundQuickReplyNextLinks: QuickReplyNextLinks;
    nextLinks: QuickReplyNextLinks;
    favNextLinks: QuickReplyNextLinks;
    totalRecords: number;
    totalUnifiedFavoriteQuickReplies?: number;
    richMessageSendState: ReplyAPIStatus;
    draftRichMessagePayload: DraftMessagePayload;
    showClientDataApiFailedFavQkReplyToast: {
        storageExceeded: boolean;
        apiFailed: boolean;
    };
    storeFavsToastReference: Id | null;
    allFavQuickReplies: {
        inbound: Id[];
        outbound: Id[];
    };
    unifiedFavoriteQuickReplies: CXoneDigitalQuickReply[];
    quickRepliesByPage: Record<number, CXoneDigitalQuickReply[]>;
    favoriteQuickRepliesByPage: Record<number, CXoneDigitalQuickReply[]>;
    favoriteToggleToast?: QuickReplyResponse | null;
}
export declare const initialCcfAppSpaceState: CcfAppSpaceState;
export declare const fetchAllMessageTemplates: import("@reduxjs/toolkit").AsyncThunk<import("yup/lib/object").AssertsShape<{
    template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    category: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    messageContent: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * Returns the cached favorite quick replies data by page.
                 * @example -
                 * ```
                 * const getFavCachedData = useSelector(getFavCachedData);
                 * ```
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>>;
}>[] | undefined, string, {
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
  * to replace variables in a reply
  * @param caseId - current case id
  * @param replyId - current replyid
  * @example - `dispatch(replaceVariables({caseId, replyId}))`
*/
export declare const replaceVariables: import("@reduxjs/toolkit").AsyncThunk<CXoneDigitalReplaceVariables, {
    caseId: string;
    replyId: string;
}, {
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
  * to replace variables in a response
  * @param replyId - current replyid
  * @example - `dispatch(replaceQucikResponseVariables({replyId}))`
*/
export declare const replaceQucikResponseVariables: import("@reduxjs/toolkit").AsyncThunk<CXoneDigitalReplaceVariables, {
    replyId: string;
}, {
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const clearFavQuickRepliesfromIDB: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const getFavQuickReplies: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
  * to get favorite responses for an outbound chat
  * @param replyId - current replyid
  * @example - `dispatch(getFavOutboundQuickReplies())`
*/
export declare const getFavOutboundQuickReplies: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const setFavQuickReplies: import("@reduxjs/toolkit").AsyncThunk<void, CXoneDigitalQuickReply, {
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const setFavOutboundQuickReplies: import("@reduxjs/toolkit").AsyncThunk<void, CXoneDigitalQuickReply, {
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const setLocalStorageKey: import("@reduxjs/toolkit").AsyncThunk<void, {
    key: string;
    value: string;
}, {
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used for sending rich message in outbound reply API
 */
export declare const sendRichMessage: import("@reduxjs/toolkit").AsyncThunk<void, RichMessagePayloadDetails, {
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used for sending quick response message directly using Outbound API from App space section itself
 * @param replyPayloadContent - payload to be sent in API of type RichMessagePayloadDetails
 * @example - `dispatch(sendDirectMessageFromPreview(replyPayloadObject))`
 */
export declare const sendDirectMessageFromPreview: import("@reduxjs/toolkit").AsyncThunk<void, RichMessagePayloadDetails, {
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const appSpaceSlice: import("@reduxjs/toolkit").Slice<{
    favoriteQuickRepliesByPage: {};
    query: import("immer/dist/internal").WritableDraft<{
        searchBox: string;
    }>;
    isLoading: boolean;
    isOutboundQuickRepliesLoading: boolean;
    favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
    allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
    favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
    allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
    allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
    selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
    varReplacedContent: import("immer/dist/internal").WritableDraft<{
        content: string;
    }>;
    qReplySent: string;
    isQReplySent?: boolean | undefined;
    previewQuickReply?: boolean | undefined;
    appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
    isAppSpaceTwoColumn: boolean;
    previewOutboundTemplate?: boolean | undefined;
    quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
        [contactId: string]: QuickReplyResponse;
    }>;
    outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
    nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
    favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
    totalRecords: number;
    totalUnifiedFavoriteQuickReplies?: number | undefined;
    richMessageSendState: ReplyAPIStatus;
    draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
    showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
        storageExceeded: boolean;
        apiFailed: boolean;
    }>;
    storeFavsToastReference: Id | null;
    allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
        inbound: Id[];
        outbound: Id[];
    }>;
    unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
    quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
    favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
}, {
    /**
       * updated search query
       * @param state - app space state
       * @param action - `PayloadAction<{ key: string; value: string }>`
       * @example - `dispatch(updateQuery({key, value}))`
       */
    updateQuery(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<{
        key: string;
        value: string;
    }>): {
        query: {
            searchBox: string;
        };
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
       * Updated selectedQReply state value on selected reply to preview that reply
       * @param state - app space state
       * @param action - PayloadAction<CXoneDigitalQuickReply>
       * @example - `dispatch(updateSelectedQReply(@param))`
       */
    updateSelectedQReply(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<CXoneDigitalQuickReply>): {
        selectedQReply: CXoneDigitalQuickReply;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
       * updating qReplySent state value after agent send the reply
       * @param state - app space state
       * @param action  - PayloadAction<string>
       * @example - `dispatch(updateSelectedQReply(@param))`
       */
    updateSentQReply(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<string>): {
        qReplySent: string;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
       *UpdateAllMessageTemplate update allMessageTemplates state
       * @param state - app space state
       * @param action - PayloadAction<ExternalPlatformTemplate>
       * @example - `dispatch(UpdateAllMessageTemplate(@param))`
       */
    UpdateAllMessageTemplate(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<ExternalPlatformTemplate[]>): {
        allMessageTemplates: ExternalPlatformTemplate[];
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
       * updating previewQuickReply state value to show preview screen or go back to list view
       * @param state - app space state
       * @param action - PayloadAction<boolean>
       * @example - `dispatch(updatePreviewQuickReply(@param))`
       */
    updatePreviewQuickReply(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<boolean>): {
        previewQuickReply: boolean;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
      * updating updatePreviewOutboundTemplate state value on set the selected reply and go back to all templates
      * @param state - app space state
      * @param action - PayloadAction<boolean>
      * @example - `dispatch(updatePreviewOutboundTemplate(@param))`
      */
    updatePreviewOutboundTemplate(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<boolean>): {
        previewOutboundTemplate: boolean;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
       * updating isQReplySent state value after sent out reply to enable toast msg
       * @param state - app space state
       * @param action - PayloadAction<boolean>
       * @example - `dispatch(updateIsQReplySent(@param))`
       */
    updateIsQReplySent(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<boolean>): {
        isQReplySent: boolean;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
       * Toggle favourite replies in the quick replies
       * @param state - appSpace state
       * @param action -PayloadAction<CXoneDigitalQuickReply>
       * @example - `dispatch (toggleFavQuickReply(@param))`
       */
    toggleFavQuickReply(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<CXoneDigitalQuickReply>): {
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
       * Toggle favourite replies in the quick replies
       * @param state - appSpace state
       * @param action -PayloadAction<CXoneDigitalQuickReply>
       * @example - `dispatch (toggleFavQuickReplyOutbound(replyObj))`
       */
    toggleFavQuickReplyOutbound(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<CXoneDigitalQuickReply>): {
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
     * Toggle rich message selection
     * @param state - appSpace state
     * @param action -PayloadAction<CXoneDigitalQuickReply>
     * @example - `dispatch (toggleRichMessageSelection(@param))`
     */
    toggleRichMessageSelection(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<CXoneDigitalQuickReply>): {
        allQReplies: ({
            isSelected: true;
            id: number;
            type: string;
            hasVariables: boolean;
            title: string;
            content: string;
            externalVariables: string[];
            isfavorite?: boolean | undefined;
            isFavorite?: boolean | undefined;
            messageContent: import("immer/dist/internal").WritableDraft<CXoneMessageContent>;
            categoryId?: string | undefined;
        } | {
            isSelected: false;
            id: number;
            type: string;
            hasVariables: boolean;
            title: string;
            content: string;
            externalVariables: string[];
            isfavorite?: boolean | undefined;
            isFavorite?: boolean | undefined;
            messageContent: import("immer/dist/internal").WritableDraft<CXoneMessageContent>;
            categoryId?: string | undefined;
        })[];
        unifiedFavoriteQuickReplies: ({
            isSelected: true;
            id: number;
            type: string;
            hasVariables: boolean;
            title: string;
            content: string;
            externalVariables: string[];
            isfavorite?: boolean | undefined;
            isFavorite?: boolean | undefined;
            messageContent: import("immer/dist/internal").WritableDraft<CXoneMessageContent>;
            categoryId?: string | undefined;
        } | {
            isSelected: false;
            id: number;
            type: string;
            hasVariables: boolean;
            title: string;
            content: string;
            externalVariables: string[];
            isfavorite?: boolean | undefined;
            isFavorite?: boolean | undefined;
            messageContent: import("immer/dist/internal").WritableDraft<CXoneMessageContent>;
            categoryId?: string | undefined;
        })[];
        allQRepliesOutbound: ({
            isSelected: true;
            id: number;
            type: string;
            hasVariables: boolean;
            title: string;
            content: string;
            externalVariables: string[];
            isfavorite?: boolean | undefined;
            isFavorite?: boolean | undefined;
            messageContent: import("immer/dist/internal").WritableDraft<CXoneMessageContent>;
            categoryId?: string | undefined;
        } | {
            isSelected: false;
            id: number;
            type: string;
            hasVariables: boolean;
            title: string;
            content: string;
            externalVariables: string[];
            isfavorite?: boolean | undefined;
            isFavorite?: boolean | undefined;
            messageContent: import("immer/dist/internal").WritableDraft<CXoneMessageContent>;
            categoryId?: string | undefined;
        })[];
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
       * Function updates the app space tab status on change of tabs
       * @param state - InboxState
       * @param action - tab index and tab label
       * @returns -  updated app space tab label
       * @example - dispatch(updateAppSpaceTab(`{ index : 0, tab: 'Directory' }`))
      */
    updateAppSpaceTabStatus(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<SelectedTab>): import("immer/dist/internal").WritableDraft<CcfAppSpaceState>;
    /**
       * Function restes the variable content
       * @param state - InboxState
       * @returns -  updated app space variable content
       * @example - dispatch(resetVarReplacedContent)
      */
    resetVarReplacedContent(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>): {
        varReplacedContent: {
            content: string;
        };
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
     * Reducer function to store fav quick replies
     * @param state - AppState
     * @param action - action.payload
     * @example - dispatch(storeFavQuickReply());
     * @returns - updated state
     */
    storeFavQuickReply(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<FavQuickReply[]>): {
        favQReplies: FavQuickReply[];
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
     * Reducer function to store fav outbound quick replies
     * @param state - AppState
     * @param action - action.payload
     * @example - dispatch(storeFavOutboundQuickReplies());
     * @returns - updated state
     */
    storeFavOutboundQuickReplies(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<FavQuickReply[]>): {
        favQuickOutboundReplies: FavQuickReply[];
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
   * Function to check size of app space for two column structure
   * @param state - AppState
   * @param action - action.payload
   * @example - dispatch(setAppspaceResolution(`{ isAppSpaceTwoColumn: true/false }`));
   * @returns updated state
   */
    setAppspaceResolution(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<number>): {
        isAppSpaceTwoColumn: boolean;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
     * Function to update quick reply toast response
     * @param state - AppState
     * @param action - action.payload
     * @example -
     * ```
     * dispatch(updateQuickReplyToastResponse(`{ contactId: '1234', errorDetails:{messageKey: 'unableToSendMessage'} }`));
     * ```
     * @returns updated state
     */
    updateQuickReplyToastResponse: (state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: {
        payload: any;
        type: string;
    }) => {
        quickReplyToastResponse: {};
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
     * Function to reset rich message send status
     * @param state - AppState
     * @param action - action.payload
     * @example -
     * ```
     * dispatch(setRichMessageSendStatus('success'));
     * ```
     * @returns updated state
     */
    setRichMessageSendStatus(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<ReplyAPIStatus>): {
        richMessageSendState: ReplyAPIStatus;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
     * Function to set draft rich message payload
     * @param state - AppState
     * @param action - action.payload
     * @example -
     * ```
     * dispatch(setDraftRichMessagePayload({content: 'dummy'}));
     * ```
     * @returns updated state
     */
    setDraftRichMessagePayload(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<DraftMessagePayload>): {
        draftRichMessagePayload: DraftMessagePayload;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
     * Function to rollback favorite quick replies in case of API failure
     * @example
     * ```
     * dispatch(rollbackFavQuickReplies({ toggledIds, favReplies }));
     * ```
     */
    rollbackFavQuickReplies: (state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<{
        toggledIds: number[];
        favReplies: FavQuickReply[];
    }>) => void;
    /**
     * Sets the toast visibility for client data API failure.
     * @example -
     * ```
     * dispatch(setClientDataApiFailedFavQkReplyToast(true));
     * ```
     */
    setClientDataApiFailedFavQkReplyToast(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<{
        storageExceeded: boolean;
        apiFailed: boolean;
    }>): void;
    /**
     * Sets the toast visibility for favorite toggle action.
     * @example -
     * ```
     * dispatch(setFavoriteToggleToast(true));
     * ```
     */
    setFavoriteToggleToast(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<QuickReplyResponse | null>): void;
    /**
     * clears the favorite toggle toast state
     * @example -
     * ```
     * dispatch(clearFavoriteToggleToast(state));
     * ```
     */
    clearFavoriteToggleToast(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>): void;
    /**
     * Method used to set toast reference
     * @param state - DirectoryState
     * @param action - payload with an object containing toast reference ID
     * @example -
     * ```
     * dispatch(updateFavsToastReference(Id));
     * ```
     */
    updateFavsToastReference(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<Id | null>): void;
    /**
     * Reducer function to store all fav quick replies
     * @param state - AppState
     * @param action - action.payload
     * @example - dispatch(storeAllFavQuickReplies());
     * @returns - updated state
     */
    storeAllFavQuickReplies(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<{
        inbound: Id[];
        outbound: Id[];
    }>): {
        allFavQuickReplies: {
            inbound: Id[];
            outbound: Id[];
        };
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
     * Clears the quick replies page cache
     * @param state - AppState
     * @example - dispatch(clearQuickRepliesCache(state));
     * @returns - updated state with cleared cache
     */
    clearQuickRepliesCache(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>): {
        quickRepliesByPage: {};
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favoriteQuickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
     * Clears the favorite quick replies page cache
     * @param state - AppState
     * @example - dispatch(clearFavoriteQuickRepliesCache(state));
     * @returns - updated state with cleared favorite cache
     */
    clearFavoriteQuickRepliesCache(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>): {
        favoriteQuickRepliesByPage: {};
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
        }>;
        isLoading: boolean;
        isOutboundQuickRepliesLoading: boolean;
        favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
        allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
        selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
        varReplacedContent: import("immer/dist/internal").WritableDraft<{
            content: string;
        }>;
        qReplySent: string;
        isQReplySent?: boolean | undefined;
        previewQuickReply?: boolean | undefined;
        appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
        isAppSpaceTwoColumn: boolean;
        previewOutboundTemplate?: boolean | undefined;
        quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: QuickReplyResponse;
        }>;
        outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
        totalRecords: number;
        totalUnifiedFavoriteQuickReplies?: number | undefined;
        richMessageSendState: ReplyAPIStatus;
        draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
        showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        storeFavsToastReference: Id | null;
        allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
            inbound: Id[];
            outbound: Id[];
        }>;
        unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
        quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
        favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
    };
    /**
     * Loads quick replies from cache for a specific page
     * @param state - AppState
     * @param action - PayloadAction with page number
     * @example - dispatch(loadQuickRepliesFromCache(2));
     * @returns - updated state with cached data loaded into allQReplies
     */
    loadQuickRepliesFromCache(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<number>): import("immer/dist/internal").WritableDraft<CcfAppSpaceState>;
    /**
     * Loads favorite quick replies from cache for a specific page
     * @param state - AppState
     * @param action - PayloadAction with page number
     * @example - dispatch(loadFavoriteQuickRepliesFromCache(2));
     * @returns - updated state with cached data loaded into unifiedFavoriteQuickReplies
     */
    loadFavoriteQuickRepliesFromCache(state: import("immer/dist/internal").WritableDraft<CcfAppSpaceState>, action: PayloadAction<number>): import("immer/dist/internal").WritableDraft<CcfAppSpaceState>;
}, "appSpace">;
export declare const appSpaceReducer: import("redux").Reducer<{
    favoriteQuickRepliesByPage: {};
    query: import("immer/dist/internal").WritableDraft<{
        searchBox: string;
    }>;
    isLoading: boolean;
    isOutboundQuickRepliesLoading: boolean;
    favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
    allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
    favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
    allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
    allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
    selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
    varReplacedContent: import("immer/dist/internal").WritableDraft<{
        content: string;
    }>;
    qReplySent: string;
    isQReplySent?: boolean | undefined;
    previewQuickReply?: boolean | undefined;
    appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
    isAppSpaceTwoColumn: boolean;
    previewOutboundTemplate?: boolean | undefined;
    quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
        [contactId: string]: QuickReplyResponse;
    }>;
    outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
    nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
    favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
    totalRecords: number;
    totalUnifiedFavoriteQuickReplies?: number | undefined;
    richMessageSendState: ReplyAPIStatus;
    draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
    showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
        storageExceeded: boolean;
        apiFailed: boolean;
    }>;
    storeFavsToastReference: Id | null;
    allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
        inbound: Id[];
        outbound: Id[];
    }>;
    unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
    quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
    favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
}, AnyAction>;
export declare const updateQuery: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    key: string;
    value: string;
}, "appSpace/updateQuery">, updateSelectedQReply: import("@reduxjs/toolkit").ActionCreatorWithPayload<CXoneDigitalQuickReply, "appSpace/updateSelectedQReply">, updateSentQReply: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "appSpace/updateSentQReply">, UpdateAllMessageTemplate: import("@reduxjs/toolkit").ActionCreatorWithPayload<ExternalPlatformTemplate[], "appSpace/UpdateAllMessageTemplate">, updatePreviewQuickReply: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "appSpace/updatePreviewQuickReply">, updateIsQReplySent: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "appSpace/updateIsQReplySent">, toggleFavQuickReply: import("@reduxjs/toolkit").ActionCreatorWithPayload<CXoneDigitalQuickReply, "appSpace/toggleFavQuickReply">, toggleFavQuickReplyOutbound: import("@reduxjs/toolkit").ActionCreatorWithPayload<CXoneDigitalQuickReply, "appSpace/toggleFavQuickReplyOutbound">, updateAppSpaceTabStatus: import("@reduxjs/toolkit").ActionCreatorWithPayload<SelectedTab, "appSpace/updateAppSpaceTabStatus">, resetVarReplacedContent: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"appSpace/resetVarReplacedContent">, storeFavQuickReply: import("@reduxjs/toolkit").ActionCreatorWithPayload<FavQuickReply[], "appSpace/storeFavQuickReply">, storeFavOutboundQuickReplies: import("@reduxjs/toolkit").ActionCreatorWithPayload<FavQuickReply[], "appSpace/storeFavOutboundQuickReplies">, setAppspaceResolution: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "appSpace/setAppspaceResolution">, updatePreviewOutboundTemplate: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "appSpace/updatePreviewOutboundTemplate">, toggleRichMessageSelection: import("@reduxjs/toolkit").ActionCreatorWithPayload<CXoneDigitalQuickReply, "appSpace/toggleRichMessageSelection">, updateQuickReplyToastResponse: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "appSpace/updateQuickReplyToastResponse">, setRichMessageSendStatus: import("@reduxjs/toolkit").ActionCreatorWithPayload<ReplyAPIStatus, "appSpace/setRichMessageSendStatus">, setDraftRichMessagePayload: import("@reduxjs/toolkit").ActionCreatorWithPayload<DraftMessagePayload, "appSpace/setDraftRichMessagePayload">, rollbackFavQuickReplies: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    toggledIds: number[];
    favReplies: FavQuickReply[];
}, "appSpace/rollbackFavQuickReplies">, updateFavsToastReference: import("@reduxjs/toolkit").ActionCreatorWithPayload<Id | null, "appSpace/updateFavsToastReference">, storeAllFavQuickReplies: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    inbound: Id[];
    outbound: Id[];
}, "appSpace/storeAllFavQuickReplies">, setClientDataApiFailedFavQkReplyToast: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    storageExceeded: boolean;
    apiFailed: boolean;
}, "appSpace/setClientDataApiFailedFavQkReplyToast">, setFavoriteToggleToast: import("@reduxjs/toolkit").ActionCreatorWithPayload<QuickReplyResponse | null, "appSpace/setFavoriteToggleToast">, clearFavoriteToggleToast: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"appSpace/clearFavoriteToggleToast">, clearQuickRepliesCache: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"appSpace/clearQuickRepliesCache">, loadQuickRepliesFromCache: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "appSpace/loadQuickRepliesFromCache">, clearFavoriteQuickRepliesCache: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"appSpace/clearFavoriteQuickRepliesCache">, loadFavoriteQuickRepliesFromCache: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "appSpace/loadFavoriteQuickRepliesFromCache">;
declare const _default: import("redux").Reducer<{
    favoriteQuickRepliesByPage: {};
    query: import("immer/dist/internal").WritableDraft<{
        searchBox: string;
    }>;
    isLoading: boolean;
    isOutboundQuickRepliesLoading: boolean;
    favQReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
    allQReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
    favQuickOutboundReplies: import("immer/dist/internal").WritableDraft<FavQuickReply>[];
    allQRepliesOutbound: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
    allMessageTemplates: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>[];
    selectedQReply: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>;
    varReplacedContent: import("immer/dist/internal").WritableDraft<{
        content: string;
    }>;
    qReplySent: string;
    isQReplySent?: boolean | undefined;
    previewQuickReply?: boolean | undefined;
    appSpaceSelectedTab: import("immer/dist/internal").WritableDraft<SelectedTab>;
    isAppSpaceTwoColumn: boolean;
    previewOutboundTemplate?: boolean | undefined;
    quickReplyToastResponse: import("immer/dist/internal").WritableDraft<{
        [contactId: string]: QuickReplyResponse;
    }>;
    outboundQuickReplyNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
    nextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
    favNextLinks: import("immer/dist/internal").WritableDraft<QuickReplyNextLinks>;
    totalRecords: number;
    totalUnifiedFavoriteQuickReplies?: number | undefined;
    richMessageSendState: ReplyAPIStatus;
    draftRichMessagePayload: import("immer/dist/internal").WritableDraft<DraftMessagePayload>;
    showClientDataApiFailedFavQkReplyToast: import("immer/dist/internal").WritableDraft<{
        storageExceeded: boolean;
        apiFailed: boolean;
    }>;
    storeFavsToastReference: Id | null;
    allFavQuickReplies: import("immer/dist/internal").WritableDraft<{
        inbound: Id[];
        outbound: Id[];
    }>;
    unifiedFavoriteQuickReplies: import("immer/dist/internal").WritableDraft<CXoneDigitalQuickReply>[];
    quickRepliesByPage: import("immer/dist/internal").WritableDraft<Record<number, CXoneDigitalQuickReply[]>>;
    favoriteToggleToast?: import("immer/dist/internal").WritableDraft<QuickReplyResponse> | null | undefined;
}, AnyAction>;
export default _default;
export declare const getAllQReplies: ((state: {
    appSpace: CcfAppSpaceState;
}) => CXoneDigitalQuickReply[]) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => CXoneDigitalQuickReply[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getUnifiedFavoriteQuickReplies: ((state: {
    appSpace: CcfAppSpaceState;
}) => CXoneDigitalQuickReply[]) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => CXoneDigitalQuickReply[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getFavQReplies: ((state: {
    appSpace: CcfAppSpaceState;
}) => FavQuickReply[]) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => FavQuickReply[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getAllQRepliesOutbound: ((state: {
    appSpace: CcfAppSpaceState;
}) => CXoneDigitalQuickReply[]) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => CXoneDigitalQuickReply[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getFavQRepliesOutbound: ((state: {
    appSpace: CcfAppSpaceState;
}) => FavQuickReply[]) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => FavQuickReply[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSelectedQReply: ((state: {
    appSpace: CcfAppSpaceState;
}) => CXoneDigitalQuickReply) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => CXoneDigitalQuickReply & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSentQReply: ((state: {
    appSpace: CcfAppSpaceState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getPreviewQuickReply: ((state: {
    appSpace: CcfAppSpaceState;
}) => boolean | undefined) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => (boolean | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getIsQReplySent: ((state: {
    appSpace: CcfAppSpaceState;
}) => boolean | undefined) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => (boolean | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getVarReplacedContent: ((state: {
    appSpace: CcfAppSpaceState;
}) => {
    content: string;
}) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => {
    content: string;
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectAppSpaceActiveTabStatus: ((state: {
    appSpace: CcfAppSpaceState;
}) => SelectedTab) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => SelectedTab & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getLoadingStatus: ((state: {
    appSpace: CcfAppSpaceState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getIfMoreQRAvailable: ((state: {
    appSpace: CcfAppSpaceState;
}) => QuickReplyNextLinks) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => QuickReplyNextLinks & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getIfNextLinkAvailable: ((state: {
    appSpace: CcfAppSpaceState;
}) => QuickReplyNextLinks) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => QuickReplyNextLinks & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getIsFavNextLinkAvailable: ((state: {
    appSpace: CcfAppSpaceState;
}) => QuickReplyNextLinks) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => QuickReplyNextLinks & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getTotalQRepliesCount: ((state: {
    appSpace: CcfAppSpaceState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getTotalFavoriteQRCount: ((state: {
    appSpace: CcfAppSpaceState;
}) => number | undefined) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getOutboundLoadingStatus: ((state: {
    appSpace: CcfAppSpaceState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
   * used to get the flag, if app space is greater than 575px
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getAppspaceResolution(state)
   */
export declare const getAppspaceResolution: ((state: {
    appSpace: CcfAppSpaceState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
   * used to get the flag, preview outbound templated is enable or not
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getPreviewOutboundTemplate(state)
   */
export declare const getPreviewOutboundTemplate: ((state: {
    appSpace: CcfAppSpaceState;
}) => boolean | undefined) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => (boolean | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
   * Used to get the all outbound message template list
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getAllMessageTemplates(state)
   */
export declare const getAllMessageTemplates: ((state: {
    appSpace: CcfAppSpaceState;
}) => ExternalPlatformTemplate[]) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => ExternalPlatformTemplate[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Function to get quick reply toast response by Id
 * @param caseId - Digital Case Id
 * @returns It returns quick reply toast Response
 * @example -
 * ```
 * const quickReplyToastDetails = getQuickReplyToastResponseById(rootState)
 *
 * ```
 */
export declare const getQuickReplyToastResponseById: (caseId: string) => (state: {
    appSpace: CcfAppSpaceState;
}) => QuickReplyResponse;
export declare const getRichMessageSendState: ((state: {
    appSpace: CcfAppSpaceState;
}) => ReplyAPIStatus) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => ReplyAPIStatus & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getDraftRichMessagePayload: ((state: {
    appSpace: CcfAppSpaceState;
}) => DraftMessagePayload) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => DraftMessagePayload & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Returns whether the Fav Quick Reply API failure toast should be shown.
 * @example -
 * ```
 * const showApiFailedToast = useSelector(getClientDataApiFailedFavQkReplyToast);
 * ```
 */
export declare const getClientDataApiFailedFavQkReplyToast: ((state: {
    appSpace: CcfAppSpaceState;
}) => {
    storageExceeded: boolean;
    apiFailed: boolean;
}) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => {
    storageExceeded: boolean;
    apiFailed: boolean;
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Returns the toast reference ID for favorites.
 * @example -
 * ```
 * const favoritesToastReference = useSelector(getQuickReplyFavoritesToastReference);
 * ```
 */
export declare const getQuickReplyFavoritesToastReference: ((state: {
    appSpace: CcfAppSpaceState;
}) => Id | null) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => (Id | null) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Returns the cached quick replies data by page.
 * @example -
 * ```
 * const getCachedData = useSelector(getCachedData);
 * ```
 */
export declare const getCachedData: ((state: {
    appSpace: CcfAppSpaceState;
}) => Record<number, CXoneDigitalQuickReply[]>) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => Record<number, CXoneDigitalQuickReply[]> & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Returns the cached favorite quick replies data by page.
 * @example -
 * ```
 * const getFavCachedData = useSelector(getFavCachedData);
 * ```
 */
export declare const getFavCachedData: ((state: {
    appSpace: CcfAppSpaceState;
}) => Record<number, CXoneDigitalQuickReply[]>) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => Record<number, CXoneDigitalQuickReply[]> & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Returns the favorite toggle toast response.
 * @example -
 * ```
 * const getFavoriteToggleToast = useSelector(getFavoriteToggleToast);
 * ```
 */
export declare const getFavoriteToggleToast: ((state: {
    appSpace: CcfAppSpaceState;
}) => QuickReplyResponse | null | undefined) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => QuickReplyResponse & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Returns all quick replies marked as favorite
 * @example -
 * ```
 * const getAllFavQReplies = useSelector(getAllFavQReplies);
 * ```
 */
export declare const getAllFavQuickReplies: ((state: {
    appSpace: CcfAppSpaceState;
}) => {
    inbound: Id[];
    outbound: Id[];
}) & import("reselect").OutputSelectorFields<(args_0: CcfAppSpaceState) => {
    inbound: Id[];
    outbound: Id[];
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
