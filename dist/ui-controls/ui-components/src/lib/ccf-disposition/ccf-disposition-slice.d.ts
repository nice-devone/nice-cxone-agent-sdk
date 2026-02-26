import { ContactData, CXoneDisposition, CXoneTag, DigitalContactStatus, MediaType, TagsResponse, AgentAssistCommand, AutoSummaryErrorCode, CXoneAutoSummaryPayload } from '@nice-devone/common-sdk';
import { CcfTranslationKey } from '@nice-devone/i18n';
import { PayloadAction } from '@reduxjs/toolkit';
import { TimeZone } from '../ccf-commitment/ccf-commitment.slice';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
export interface AcdDispositionForm {
    type: MediaType.VOICE | MediaType.VOICEMAIL | MediaType.WORKITEM;
    disposition: CXoneDisposition | null;
    tags: CXoneTag[];
    notes: string;
    amount?: number;
    retryDateTime?: string;
    retryTimeZone?: TimeZone;
    retryNumber?: string;
    status?: string;
}
export interface DigitalDispositionForm {
    type: MediaType.DIGITAL;
    status: DigitalContactStatus;
    disposition?: CXoneDisposition | null;
    notes?: string;
    requireDisposition: boolean;
}
export interface DispositionDataObjectType {
    [MediaType.VOICE]: {
        disposition: CXoneDisposition | null;
        notes: {
            value: string;
        };
    };
    [MediaType.DIGITAL]: {
        all: {
            value: string;
        };
        SMS?: {
            value: string;
        };
        Email?: {
            value: string;
        };
        Twitter?: {
            value: string;
        };
        Facebook?: {
            value: string;
        };
        Linkedin?: {
            value: string;
        };
        Instagram?: {
            value: string;
        };
        Chat?: {
            value: string;
        };
    };
}
/**
 * This interface is for the structure of the disposition success error message key and placeholder for the translation text to be replaced
 */
export interface DispositionOutcomeResponse {
    isError: boolean;
    messageKey: CcfTranslationKey;
    placeholder?: string;
}
export interface DispositionsErrorResponse {
    [contactId: string]: DispositionOutcomeResponse;
}
export interface GlobalDispositionData {
    isDispositionOpen: boolean;
    dispositionType: string;
    dispositionOutcomeResponse: DispositionOutcomeResponse;
    dispositions: {
        [contactId: string]: DispositionData;
    };
    dispositionsErrorResponse: {
        [contactId: string]: DispositionOutcomeResponse;
    };
    autoSummaryEnabledContacts?: (string | number)[];
    isShowOutcomeConfirmationDialog?: boolean;
    contactPendingRedial: PendingRedialContact;
    isCoolingDown?: boolean;
    attemptCount?: number;
    retryCountdown?: number;
    lastAttemptAt?: number | null;
}
export declare type PossibleDispositionForms = AcdDispositionForm | DigitalDispositionForm;
export interface DispositionData {
    dispositionData: CXoneDisposition[];
    formInputs: PossibleDispositionForms;
    isResolved: boolean;
    isReadyToSend: boolean;
    tagsData: CXoneTag[];
    autoSummaryStatus?: AgentAssistCommand;
    autoSummaryErrorMessage?: AutoSummaryErrorCode;
    isGenerateAutoSummaryRequestSent?: boolean;
    hasAutoSummaryTimedOut?: boolean;
    dispositionList: CXoneDisposition[];
    tagList: CXoneTag[];
    hasFinalSummaryTimedout?: boolean;
    isGenerateFinalSummaryRequestSent?: boolean;
    isDispositionSaved?: boolean;
    isDigitalStatusSaving: boolean;
    pendingDigitalStatus: string;
    isDigitalStatusToastOpen: boolean;
}
/**
 * This interface is for draft disposition data
 */
export interface DraftDispositionData {
    dispositionId: number;
    note: string;
}
/**
 * This interface is for the draft disposition contact
 */
export interface DraftDispositionContact {
    [contactId: string]: DraftDispositionData;
}
/**
 * This interface is for the draft disposition contacts
 */
export interface DraftDispositionContacts {
    dispositionContacts: DraftDispositionContact;
}
export interface PendingRedialContact {
    contactId: string;
    skillId: number;
    isOutbound?: boolean;
    toAddr?: string;
    status: 'pending' | 'dialed';
}
export declare const initialDispositionState: GlobalDispositionData;
/**
 * Selector to get the isCoolingDown state from the disposition slice.
 * @returns A selector function that retrieves the isCoolingDown boolean value.
 * @example
 * const isCoolingDown = useSelector(getCoolingDown());
 */
export declare const getCoolingDown: () => ((state: {
    disposition: GlobalDispositionData;
}) => boolean | undefined) & import("reselect").OutputSelectorFields<(args_0: GlobalDispositionData) => (boolean | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Selector to get the attemptCount state from the disposition slice.
 * @returns A selector function that retrieves the attemptCount value.
 * @example
 * const attemptCount = useSelector(getAttemptCount());
 */
export declare const getAttemptCount: () => ((state: {
    disposition: GlobalDispositionData;
}) => number | undefined) & import("reselect").OutputSelectorFields<(args_0: GlobalDispositionData) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Selector to get the retryCountdown state from the disposition slice.
 * @returns A selector function that retrieves the retryCountdown value.
 * @example
 * const retryCountdown = useSelector(getRetryCountdown());
 */
export declare const getRetryCountdown: () => ((state: {
    disposition: GlobalDispositionData;
}) => number) & import("reselect").OutputSelectorFields<(args_0: GlobalDispositionData) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Selector to get the lastAttemptAt state from the disposition slice.
 * @returns A selector function that retrieves the lastAttemptAt value.
 * @example
 * const lastAttemptAt = useSelector(getRetryStartTime());
 */
export declare const getRetryStartTime: () => ((state: {
    disposition: GlobalDispositionData;
}) => number | null | undefined) & import("reselect").OutputSelectorFields<(args_0: GlobalDispositionData) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const DISPOSITION_KEY = "disposition";
export declare const sendTags: import("@reduxjs/toolkit").AsyncThunk<void, string, {
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
 * Used to save the disposition as well as case status change for digital contacts
 */
export declare const saveDigitalDisposition: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
    activeDisposition: DispositionData;
    selectedDigitalContact: CXoneDigitalContact;
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
 * Used to save case status change for digital contacts
 */
export declare const saveDigitalStatus: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
    fromStatus: string;
    toStatus: string;
    selectedDigitalContact: CXoneDigitalContact;
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
export declare const dispositionInteractionSlice: import("@reduxjs/toolkit").Slice<GlobalDispositionData, {
    displayDispositionCard: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<boolean>) => {
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setDispositionType: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<string>) => {
        dispositionType: string;
        isDispositionOpen: boolean;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    addorUpdateDigitalContact: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<CXoneDigitalContact>) => {
        dispositions: {
            [x: string]: import("immer/dist/internal").WritableDraft<DispositionData> | {
                formInputs: DigitalDispositionForm;
                isResolved: boolean;
                dispositionData: import("immer/dist/internal").WritableDraft<CXoneDisposition>[];
                isReadyToSend: boolean;
                tagsData: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
                    tagId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
                    tagName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
                    isActive: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
                    notes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                }>>[];
                autoSummaryStatus?: AgentAssistCommand | undefined;
                autoSummaryErrorMessage?: AutoSummaryErrorCode | undefined;
                isGenerateAutoSummaryRequestSent?: boolean | undefined;
                hasAutoSummaryTimedOut?: boolean | undefined;
                dispositionList: import("immer/dist/internal").WritableDraft<CXoneDisposition>[];
                tagList: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
                    tagId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
                    tagName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
                    isActive: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
                    notes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                }>>[];
                hasFinalSummaryTimedout?: boolean | undefined;
                isGenerateFinalSummaryRequestSent?: boolean | undefined;
                isDispositionSaved?: boolean | undefined;
                isDigitalStatusSaving: boolean;
                pendingDigitalStatus: string;
                isDigitalStatusToastOpen: boolean;
            };
        };
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    addNewDispositionsByContact: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<{
        dispositionData: CXoneDisposition[];
    }>) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    setFormInput: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    clearDispositionById: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    addTags: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<{
        tagData: TagsResponse;
        store: ContactData[];
    }>) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    readyDisposition: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    sendDisposition: (state: GlobalDispositionData, action: PayloadAction<string>) => GlobalDispositionData;
    checkAndSendDisposition: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    updateDispositionOutcomeResponse: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositionOutcomeResponse: any;
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    updateIsDispositionSaved: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    updateIsShowOutcomeConfirmationDialog: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        isShowOutcomeConfirmationDialog: any;
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    clearDispositionOutcomeResponse: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>) => {
        dispositionOutcomeResponse: DispositionOutcomeResponse;
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    updateDispositionErrorResponse: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositionsErrorResponse: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    updateDigitalIsResolved: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    reloadDispositionData: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<any>) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setAutoSummaryData: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setAutoSummaryStatus: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setisGenerateAutoSummaryRequestSent: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    setAutoSummaryEnabledContact: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData> | {
        autoSummaryEnabledContacts: any[];
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setAutoSummaryTimeout: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setDispositionOrTagList: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<{
        contactId: string;
        key: string;
        value: CXoneDisposition[] | CXoneTag[] | [
        ];
    }>) => {
        dispositions: {
            [x: string]: import("immer/dist/internal").WritableDraft<DispositionData> | {
                dispositionData: import("immer/dist/internal").WritableDraft<CXoneDisposition>[];
                formInputs: import("immer/dist/internal").WritableDraft<AcdDispositionForm> | import("immer/dist/internal").WritableDraft<DigitalDispositionForm>;
                isResolved: boolean;
                isReadyToSend: boolean;
                tagsData: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
                    tagId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
                    tagName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
                    isActive: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
                    notes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                }>>[];
                autoSummaryStatus?: AgentAssistCommand | undefined;
                autoSummaryErrorMessage?: AutoSummaryErrorCode | undefined;
                isGenerateAutoSummaryRequestSent?: boolean | undefined;
                hasAutoSummaryTimedOut?: boolean | undefined;
                dispositionList: import("immer/dist/internal").WritableDraft<CXoneDisposition>[];
                tagList: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
                    tagId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
                    tagName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
                    isActive: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
                    notes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                }>>[];
                hasFinalSummaryTimedout?: boolean | undefined;
                isGenerateFinalSummaryRequestSent?: boolean | undefined;
                isDispositionSaved?: boolean | undefined;
                isDigitalStatusSaving: boolean;
                pendingDigitalStatus: string;
                isDigitalStatusToastOpen: boolean;
            };
        };
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setFinalSummaryTimeout: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setIsGenerateFinalSummaryRequestSent: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    setIsDigitalStatusSaving: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    /**
     * Updates the pending digital status for a specific contact.
     * @param state - The current state of the disposition slice.
     * @param action - The action containing the contact ID and the new pending digital status.
     * @returns The updated state with the new pending digital status for the specified contact.
     * @example
     * dispatch(dispositionInteractionActions.setPendingDigitalStatus(
     *   contactId: '12345',
     *   pendingDigitalStatus: 'newStatus'
     * ));
     */
    setPendingDigitalStatus: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    /**
     * Updates the open/close state of the autosummary failure toast for a specific contact.
     * @param state - The current state of the disposition slice.
     * @param action - The action containing the contact ID and the new pending digital status.
     * @returns The updated state with the open/close state of the toast for the specified contact.
     * @example
     * dispatch(dispositionInteractionActions.setIsToastOpen(
     *   contactId: '12345',
     *   setIsToastOpen: true
     * ));
     */
    setIsDigitalStatusToastOpen: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    /**
     * Function sets pending voice contact for redial
     * @param state -InboxState
     * @param action -PayloadAction<PendingRedialContact>
     * @example - dispatch(setPendingVoiceContactForRedial(PendingRedialContact))
     */
    setPendingVoiceContactForRedial(state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<PendingRedialContact>): {
        contactPendingRedial: PendingRedialContact;
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    /**
     * Function clears pending voice contact for redial
     * @param state -InboxState
     * @example - dispatch(setPendingVoiceContactForRedial())
     */
    clearPendingVoiceContactForRedial(state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>): {
        contactPendingRedial: PendingRedialContact;
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    /**
     * Sets the retry click count in the disposition state.
     * @param state - The current state of the disposition slice.
     * @param action - The action containing the new retry click count.
     * @example
     * dispatch(dispositionInteractionActions.setAttemptCount(3));
     */
    setAttemptCount(state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<number>): void;
    /**
     * Sets the retry countdown in the disposition state.
     * @param state - The current state of the disposition slice.
     * @param action - The action containing the new retry countdown value.
     * @example
     * dispatch(dispositionInteractionActions.setRetryCountdown(10));
     */
    setRetryCountdown(state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<number>): void;
    /**
     * Sets the isCoolingDown state in the disposition slice.
     * @param state - The current state of the disposition slice.
     * @param action - The action containing the new isCoolingDown value.
     * @example
     * dispatch(dispositionInteractionActions.setCoolingDown(true));
     */
    setCoolingDown(state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<boolean>): void;
    /**
     * Sets the lastAttemptAt in the disposition state.
     * @param state - The current state of the disposition slice.
     * @param action - The action containing the new lastAttemptAt value.
     * @example
     * dispatch(dispositionInteractionActions.setCanRetry(Date.now()));
     */
    setCanRetry(state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }): void;
}, "disposition">;
export declare const dispostionInteractionReducer: import("redux").Reducer<GlobalDispositionData, import("redux").AnyAction>;
export declare const dispositionInteractionActions: import("@reduxjs/toolkit").CaseReducerActions<{
    displayDispositionCard: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<boolean>) => {
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setDispositionType: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<string>) => {
        dispositionType: string;
        isDispositionOpen: boolean;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    addorUpdateDigitalContact: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<CXoneDigitalContact>) => {
        dispositions: {
            [x: string]: import("immer/dist/internal").WritableDraft<DispositionData> | {
                formInputs: DigitalDispositionForm;
                isResolved: boolean;
                dispositionData: import("immer/dist/internal").WritableDraft<CXoneDisposition>[];
                isReadyToSend: boolean;
                tagsData: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
                    tagId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
                    tagName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
                    isActive: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
                    notes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                }>>[];
                autoSummaryStatus?: AgentAssistCommand | undefined;
                autoSummaryErrorMessage?: AutoSummaryErrorCode | undefined;
                isGenerateAutoSummaryRequestSent?: boolean | undefined;
                hasAutoSummaryTimedOut?: boolean | undefined;
                dispositionList: import("immer/dist/internal").WritableDraft<CXoneDisposition>[];
                tagList: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
                    tagId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
                    tagName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
                    isActive: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
                    notes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                }>>[];
                hasFinalSummaryTimedout?: boolean | undefined;
                isGenerateFinalSummaryRequestSent?: boolean | undefined;
                isDispositionSaved?: boolean | undefined;
                isDigitalStatusSaving: boolean;
                pendingDigitalStatus: string;
                isDigitalStatusToastOpen: boolean;
            };
        };
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    addNewDispositionsByContact: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<{
        dispositionData: CXoneDisposition[];
    }>) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    setFormInput: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    clearDispositionById: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    addTags: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<{
        tagData: TagsResponse;
        store: ContactData[];
    }>) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    readyDisposition: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    sendDisposition: (state: GlobalDispositionData, action: PayloadAction<string>) => GlobalDispositionData;
    checkAndSendDisposition: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    updateDispositionOutcomeResponse: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositionOutcomeResponse: any;
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    updateIsDispositionSaved: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    updateIsShowOutcomeConfirmationDialog: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        isShowOutcomeConfirmationDialog: any;
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    clearDispositionOutcomeResponse: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>) => {
        dispositionOutcomeResponse: DispositionOutcomeResponse;
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    updateDispositionErrorResponse: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositionsErrorResponse: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    updateDigitalIsResolved: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    reloadDispositionData: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<any>) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setAutoSummaryData: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setAutoSummaryStatus: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setisGenerateAutoSummaryRequestSent: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    setAutoSummaryEnabledContact: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData> | {
        autoSummaryEnabledContacts: any[];
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setAutoSummaryTimeout: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setDispositionOrTagList: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<{
        contactId: string;
        key: string;
        value: CXoneDisposition[] | CXoneTag[] | [
        ];
    }>) => {
        dispositions: {
            [x: string]: import("immer/dist/internal").WritableDraft<DispositionData> | {
                dispositionData: import("immer/dist/internal").WritableDraft<CXoneDisposition>[];
                formInputs: import("immer/dist/internal").WritableDraft<AcdDispositionForm> | import("immer/dist/internal").WritableDraft<DigitalDispositionForm>;
                isResolved: boolean;
                isReadyToSend: boolean;
                tagsData: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
                    tagId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
                    tagName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
                    isActive: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
                    notes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                }>>[];
                autoSummaryStatus?: AgentAssistCommand | undefined;
                autoSummaryErrorMessage?: AutoSummaryErrorCode | undefined;
                isGenerateAutoSummaryRequestSent?: boolean | undefined;
                hasAutoSummaryTimedOut?: boolean | undefined;
                dispositionList: import("immer/dist/internal").WritableDraft<CXoneDisposition>[];
                tagList: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
                    tagId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
                    tagName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
                    isActive: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
                    notes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                }>>[];
                hasFinalSummaryTimedout?: boolean | undefined;
                isGenerateFinalSummaryRequestSent?: boolean | undefined;
                isDispositionSaved?: boolean | undefined;
                isDigitalStatusSaving: boolean;
                pendingDigitalStatus: string;
                isDigitalStatusToastOpen: boolean;
            };
        };
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setFinalSummaryTimeout: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => {
        dispositions: {};
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        contactPendingRedial: import("immer/dist/internal").WritableDraft<PendingRedialContact>;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    setIsGenerateFinalSummaryRequestSent: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    setIsDigitalStatusSaving: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    /**
     * Updates the pending digital status for a specific contact.
     * @param state - The current state of the disposition slice.
     * @param action - The action containing the contact ID and the new pending digital status.
     * @returns The updated state with the new pending digital status for the specified contact.
     * @example
     * dispatch(dispositionInteractionActions.setPendingDigitalStatus(
     *   contactId: '12345',
     *   pendingDigitalStatus: 'newStatus'
     * ));
     */
    setPendingDigitalStatus: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    /**
     * Updates the open/close state of the autosummary failure toast for a specific contact.
     * @param state - The current state of the disposition slice.
     * @param action - The action containing the contact ID and the new pending digital status.
     * @returns The updated state with the open/close state of the toast for the specified contact.
     * @example
     * dispatch(dispositionInteractionActions.setIsToastOpen(
     *   contactId: '12345',
     *   setIsToastOpen: true
     * ));
     */
    setIsDigitalStatusToastOpen: (state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<GlobalDispositionData>;
    /**
     * Function sets pending voice contact for redial
     * @param state -InboxState
     * @param action -PayloadAction<PendingRedialContact>
     * @example - dispatch(setPendingVoiceContactForRedial(PendingRedialContact))
     */
    setPendingVoiceContactForRedial(state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<PendingRedialContact>): {
        contactPendingRedial: PendingRedialContact;
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    /**
     * Function clears pending voice contact for redial
     * @param state -InboxState
     * @example - dispatch(setPendingVoiceContactForRedial())
     */
    clearPendingVoiceContactForRedial(state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>): {
        contactPendingRedial: PendingRedialContact;
        isDispositionOpen: boolean;
        dispositionType: string;
        dispositionOutcomeResponse: import("immer/dist/internal").WritableDraft<DispositionOutcomeResponse>;
        dispositions: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionData;
        }>;
        dispositionsErrorResponse: import("immer/dist/internal").WritableDraft<{
            [contactId: string]: DispositionOutcomeResponse;
        }>;
        autoSummaryEnabledContacts?: (string | number)[] | undefined;
        isShowOutcomeConfirmationDialog?: boolean | undefined;
        isCoolingDown?: boolean | undefined;
        attemptCount?: number | undefined;
        retryCountdown?: number | undefined;
        lastAttemptAt?: number | null | undefined;
    };
    /**
     * Sets the retry click count in the disposition state.
     * @param state - The current state of the disposition slice.
     * @param action - The action containing the new retry click count.
     * @example
     * dispatch(dispositionInteractionActions.setAttemptCount(3));
     */
    setAttemptCount(state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<number>): void;
    /**
     * Sets the retry countdown in the disposition state.
     * @param state - The current state of the disposition slice.
     * @param action - The action containing the new retry countdown value.
     * @example
     * dispatch(dispositionInteractionActions.setRetryCountdown(10));
     */
    setRetryCountdown(state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<number>): void;
    /**
     * Sets the isCoolingDown state in the disposition slice.
     * @param state - The current state of the disposition slice.
     * @param action - The action containing the new isCoolingDown value.
     * @example
     * dispatch(dispositionInteractionActions.setCoolingDown(true));
     */
    setCoolingDown(state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: PayloadAction<boolean>): void;
    /**
     * Sets the lastAttemptAt in the disposition state.
     * @param state - The current state of the disposition slice.
     * @param action - The action containing the new lastAttemptAt value.
     * @example
     * dispatch(dispositionInteractionActions.setCanRetry(Date.now()));
     */
    setCanRetry(state: import("immer/dist/internal").WritableDraft<GlobalDispositionData>, action: {
        payload: any;
        type: string;
    }): void;
}, "disposition">;
/**
 * Function to get disposition type
 * @param rootState - DispositionType
 * @returns It returns disposition type
 * @example - const disposition = getDispositionState(rootState)
 */
export declare const getDispositionState: (rootState: {
    disposition: GlobalDispositionData;
}) => GlobalDispositionData;
export declare const getIsDispositionOpen: ((state: {
    disposition: GlobalDispositionData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: GlobalDispositionData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getDispositionType: ((state: {
    disposition: GlobalDispositionData;
}) => string) & import("reselect").OutputSelectorFields<(args_0: GlobalDispositionData) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getDispositionData: ((state: {
    disposition: GlobalDispositionData;
}) => GlobalDispositionData) & import("reselect").OutputSelectorFields<(args_0: GlobalDispositionData) => GlobalDispositionData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getDispositionOutcomeResponse: ((state: {
    disposition: GlobalDispositionData;
}) => DispositionOutcomeResponse) & import("reselect").OutputSelectorFields<(args_0: GlobalDispositionData) => DispositionOutcomeResponse & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getContactPendingRedial: ((state: {
    disposition: GlobalDispositionData;
}) => PendingRedialContact) & import("reselect").OutputSelectorFields<(args_0: GlobalDispositionData) => PendingRedialContact & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Function to get disposition data by contactId
 * @param contactId - Contact Id
 * @returns It returns disposition data by contactId
 * @example - const disposition = getDispositionByContactId(rootState, contactId)
 */
export declare const getPendingDigitalStatus: (contactId: string) => ((state: {
    disposition: GlobalDispositionData;
}) => string) & import("reselect").OutputSelectorFields<(args_0: GlobalDispositionData) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Selector to get the open/close state of the toast for a specific contact.
 * @param contactId - The ID of the contact.
 * @returns A selector function that retrieves the `isToastOpen` state for the specified contact.
 * @example
 * const isToastOpen = useSelector(IsDigitalStatusToastOpen(contactId));
 */
export declare const getIsDigitalStatusToastOpen: (contactId: string) => ((state: {
    disposition: GlobalDispositionData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: GlobalDispositionData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Function to calculate the time based on time zone
 * @param dateTime - dateTime string in the format yyyy-mm-ddhh:mm:ss
 * @param tZOffset - offset of the time zone
 * @returns date time with the offset yyyy-mm-ddhh:mm:ss(-/+)hh:mm
 * @example - adjustTimeBasedOnOffset('2023-06-0523:11:10', '-01:00')
 */
export declare const adjustTimeBasedOnOffset: (dateTime: string, tZOffset: string) => string;
/**
 * Function to get disposition error response
 * @param caseId - Case Id
 * @returns It returns Disposition Error Response
 * @example - const dispositionError = getDispositionErrorResponseById(rootState)
 */
export declare const getDispositionErrorResponseById: (caseId: string) => (state: {
    disposition: GlobalDispositionData;
}) => DispositionOutcomeResponse;
/**
 * Used to generate the disposition Auto Summary
 * * @example - dispatch(generateAutoSummary(autoSummaryPayload))
 */
export declare const generateAutoSummary: import("@reduxjs/toolkit").AsyncThunk<void, {
    caseId: string;
    autoSummaryPayload: CXoneAutoSummaryPayload;
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
 * Function to update disposition notes in local storage
 * @param dispositionData - disposition data
 * @param digitalContactId - contact ID
 * @example - adjustTimeBasedOnOffset('2023-06-0523:11:10', '-01:00')
 */
export declare const setDispositionToLocalStorage: (currentDispositionData: CXoneDisposition | null | undefined, digitalContactId: string, notes: string | undefined) => void;
/**
 * Function to get disposition data from local storage
 * @example getDispositionLocalStorageData();
 */
export declare const getDispositionLocalStorageData: () => DraftDispositionContacts;
/**
 * Function to removed disposition details in local storage
 * @param digitalContactId - contact ID
 * @example - removedDispositionFromLocalStorage('1234635')
 */
export declare const removedDispositionFromLocalStorage: (digitalContactId: string) => void;
