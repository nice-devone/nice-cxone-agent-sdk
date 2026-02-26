import { AnyAction, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { CXoneDigitalReplyRequest, CopilotAdaptiveCard, CopilotMessageData, CopilotElement, DigitalFileAttachment, AgentCopilotContentType, GuidanceFeedbackData, CopilotProfileConfig, FilterValueSets, FilterOptionValues, ContactHistoryData, CXoneConfiguration, UserInfo, CopilotTaskAssistCardData, KnowledgeHubConfiguration, AutoSummaryCardFeature, ValidationInfo, DecisionTreeData } from '@nice-devone/common-sdk';
import { replyMessageObject } from '../ccf-editor/ccf-editor-utils';
import { CardElement, ComboCard, CardData } from './ccf-agent-copilot-helper';
import { CcfAppToastMessageProps } from '@nice-devone/ui-controls';
export declare const CCF_COPILOT_KEY = "ccfCopilotData";
/**
 * interface for all adaptive cards data
 */
export interface AllAdaptiveCardsData {
    [adaptiveCard: string]: CopilotAdaptiveCard;
}
/**
 * Type for icons data
 */
export declare type copilotAdaptiveCardIcon = {
    [key: string]: JSX.Element;
};
/**
 * Map of latest Copilot elements by content type.
 * Strongly-typed alternative to a generic key-to-element record.
 */
declare type LatestByType = Partial<Record<AgentCopilotContentType, CopilotElement>>;
/**
 * Type for copilot data
 */
export declare type CcfAgentCopilotData = {
    adaptiveCardsData: CcfCopilotData;
    isCopilotAvailable: boolean;
};
/**
 * type for collection of Copilot message data for each case Id.
 */
export declare type CopilotMessageDataExtended = CopilotMessageData & {
    acpAppElement?: CopilotElement;
    latestByType?: LatestByType;
};
export declare type CcfCopilotData = {
    [caseId: string]: CopilotMessageDataExtended;
};
export declare const initialCcfCopilotState: CcfAgentCopilotData;
/**
 * This enum is for private KBAnswer Container
 */
export declare enum PrivateContainer {
    /**
     * private card title container
     */
    INTERNAL_USE_TITLE = "internalUseTitle"
}
/**
 * This enum is for filter value types in copilot
 */
export declare enum CopilotFilterValueType {
    DEFAULT = "default",
    ALL = "all",
    ACTIVE = "active",
    PREVIOUS = "previous"
}
/**
 * This enum defines the schema order for kbcombo adaptive card containers
 */
export declare enum AdaptiveCardContainerOrder {
    KB_ANSWERS = "kbAnswers",
    KB_INTERNAL_USE = "kbInternalUse",
    FILTERS_USED_CONTAINER = "filtersUsedContainer",
    KB_LINKS = "kbLinks",
    KB_IMAGES = "kbImages",
    KB_PROCESS_STEPS = "kbProcessSteps",
    KB_PRIVATE_PROCESS_STEPS = "KbPrivateProcessSteps"
}
export declare const ccfCopilotSlice: import("@reduxjs/toolkit").Slice<CcfAgentCopilotData, {
    /**
     * Function to add card data to existing state
     * @param state - CcfCopilotData
     * @example -
     * ```
     * dispatch(addAdaptiveCardData(payload));
     * ```
     * @returns - this returns state
     */
    addAdaptiveCardData(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<CcfCopilotData>): CcfAgentCopilotData;
    /**
     * Function to add email adaptive card data
     * @param state - CcfCopilotData
     * @example -
     * ```
     * dispatch(addEmailAdaptiveCardData(payload));
     * ```
     * @returns - this returns state
     */
    addEmailAdaptiveCardData(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<CcfCopilotData>): CcfAgentCopilotData;
    /**
     * Function to update email adaptive card data in existing state
     * @param state - CcfCopilotData
     * @example -
     * ```
     * dispatch(updateAdaptiveCardsEmail(payload));
     * ```
     * @returns - this returns state
     */
    updateAdaptiveCardsEmail(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): CcfAgentCopilotData;
    /**
     * Function to set agent copilot next best responses
     * @param state - CcfCopilotData
     * @param action - PayloadAction<CcfCopilotData>
     * @example
     * ```
     * dispatch(setNextBestResponse())
     * ```
     * @returns
     */
    setNextBestResponse(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<CcfCopilotData>): CcfAgentCopilotData;
    /**
     * Function to set agent copilot request status
     * @param state - CcfCopilotData
     * @param action - PayloadAction<CcfCopilotData>
     * @example
     * ```
     * dispatch(setcurrentRequestState())
     * ```
     * @returns
     */
    setCurrentRequestStatus(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<CcfCopilotData>): CcfAgentCopilotData;
    /**
     * Function to remove next best responses
     * @param state - CcfCopilotData
     * @param action - PayloadAction<string>
     * @example -
     * ```
     * dispatch(removeNextBestResponse())
     * ```
     * @returns
     */
    removeNextBestResponse(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): CcfAgentCopilotData;
    /**
     * Function to remove current request state
     * @param state - CcfCopilotData
     * @param action - PayloadAction<string>
     * @example -
     * ```
     * dispatch(clearCopilotRequestStatus())
     * ```
     * @returns
     */
    clearCopilotRequestStatus(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Clears and removes all copilot data for a specific caseId from Redux and IndexedDB.
     * Call this when a case is unassigned or closed.
     * @example
     * ```ts
     * dispatch(CcfCopilotActions.clearCopilotCaseFromIndexedDb('12345'));
     * ```
     */
    clearCopilotCaseFromIndexedDb(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): {
        adaptiveCardsData: CcfCopilotData;
        isCopilotAvailable: boolean;
    };
    /**
     * updating responseSent state value after agent send text in editor
     * @param state - CcfCopilotData
     * @param action  - `PayloadAction<{ response: string; caseId: string }>`
     * @example -
     * ```
     * dispatch(updateSentBestResponse(@param))
     * ```
     */
    updateSentBestResponse(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        response: string;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                responseSent: string;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * updating isResponseInserted state value after sent out reply
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(updateIsBestResponseSent(@param))
     * ```
     */
    updateIsBestResponseSent(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        isResponseInserted: boolean;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                isResponseInserted: boolean;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * rehydrate state from index db data
     * @param state - CcfCopilotData
     * @param action - PayloadAction<CcfCopilotData>
     * @example -
     * ```
     * dispatch(rehydrateCopilotState(payload))
     * ```
     */
    rehydrateCopilotState(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<CcfCopilotData>): CcfAgentCopilotData;
    /**
     * updating isCopilotAvailable state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(setCopilotStatus(@param))
     * ```
     */
    setCopilotStatus(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<boolean>): {
        isCopilotAvailable: boolean;
        adaptiveCardsData: import("immer/dist/internal").WritableDraft<CcfCopilotData>;
    };
    /**
     * updating isCopilotAvailable state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(updateAdaptiveCardSchema(@param))
     * ```
     */
    updateAdaptiveCardSchema(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        updatedCopilotCard: CardElement[];
        caseId: string;
        cardId: number;
        containerId: string;
        containerCardId?: string;
        isJourneySummaryExpanded?: boolean;
        isAutoSummaryExpanded?: boolean;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: CopilotElement[];
                isJourneySummaryExpanded: boolean;
                isAutoSummaryExpanded: boolean;
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Function to set error toast message
     * @param state - AppState
     * @param action - action.payload
     * @example - dispatch(setToastErrorMessage(`{ errorMessage: error }`));
     * @returns
     */
    setToastErrorMessage(_state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<CcfAppToastMessageProps>): void;
    /**
     * set insertedNBRId state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(setInsertedNBRId(@param))
     * ```
     */
    setInsertedNBRId(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        insertedNBRId: string;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                insertedNBRId: string;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * set isNBRAvailable state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(setIsNBRAvailable(@param))
     * ```
     */
    setIsNBRAvailable(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        isNBRAvailable: boolean;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                isNBRAvailable: boolean;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * set isNBROpen state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(setsetIsNBROpen(@param))
     * ```
     */
    setIsNBROpen(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        isNBROpen: boolean;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                isNBROpen: boolean;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * updating feedbackData state value after Like/Dislike or KbAnswer feedback is not selected
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{ feedback: string; caseId: string; objectId: string; contactId: string; agentId: string; agentContactId: string, title: string, utteranceId: string, kbAnswerUid: string }>`
     * @example -
     * ```
     * dispatch(updateFeedbackData(@param))
     * ```
     */
    updateFeedbackData(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        feedback: string;
        caseId: string;
        objectId: string;
        contactId: string;
        agentId: string;
        agentContactId: string;
        title: string;
        utteranceId?: string;
        kbAnswerUid?: string;
    }>): CcfAgentCopilotData;
    /**
     * Add overall subcard data if no cardsa re geenrated
     * @param state - CcfCopilotData
     * @param action - Payload<string>
     * @example -
     * ```
     * dispatch(addOverallSubcardData(@param))
     * ```
     */
    addOverallSubcardData(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                comprehensiveFeedback: {
                    contactFeedbackCard: {
                        overallFeedbackTitle: string;
                        feedback: string;
                    };
                    guidanceFeedbacks: import("immer/dist/internal").WritableDraft<GuidanceFeedbackData>[];
                };
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * set isEditorActionPerformed state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(setIsEditorActionPerformed(@param))
     * ```
     */
    setIsEditorActionPerformed(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        isEditorActionPerformed: boolean;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                isEditorActionPerformed: boolean;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * updating subcards property of comprehensiveFeedback state value after call/chat is closed
     * @param state - CcfCopilotData
     * @param action - PayloadAction<GuidanceFeedbackData>
     * @example -
     * ```
     * dispatch(updateComprehensiveSubcardsFeedback(@param))
     * ```
     */
    updateComprehensiveSubcardsFeedback(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        feedbackData: GuidanceFeedbackData;
    }>): CcfAgentCopilotData;
    /**
     * updating contactFeedbackCard property of comprehensiveFeedback state value after call/chat is closed
     * @param state - CcfCopilotData
     * @param action - PayloadAction<GuidanceFeedbackData>
     * @example -
     * ```
     * dispatch(updateOverSubcardsFeedback(@param))
     * ```
     */
    updateOverSubcardsFeedback(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        feedback?: string;
        comment?: string;
    }>): CcfAgentCopilotData;
    /**
     * updating isJourneySummaryExpanded state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(updateIsJourneySummaryExpanded(@param))
     * ```
     */
    updateIsJourneySummaryExpanded(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        isJourneySummaryExpanded: boolean;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                isJourneySummaryExpanded: boolean;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * updating filters data isFilterApplied
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{caseId: string, isFilterApplied: boolean}>`
     * @example -
     * ```
     * dispatch(setFilterStatusForCase(@param))
     * ```
     */
    setFilterStatusForCase(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        isFilterApplied: boolean;
    }>): CcfAgentCopilotData;
    /**
     * updating filters data shouldOpenFilterPopover
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{caseId: string, shouldOpenFilterPopover: boolean}>`
     * @example -
     * ```
     * dispatch(setShouldOpenFilterPopoverForCase(@param))
     * ```
     */
    setShouldOpenFilterPopoverForCase(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        shouldOpenFilterPopover: boolean;
    }>): CcfAgentCopilotData;
    /**
     * updating adaptive cards by removing filter card and setting isFilterCardShown to true, so that filter card is only displayed one time
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{caseId: string, isFilterCardShown: boolean}>`
     * @example -
     * ```
     * dispatch(updateAndHideFilterCard(@param))
     * ```
     */
    updateAndHideFilterCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        isFilterCardShown: boolean;
    }>): CcfAgentCopilotData;
    /**
     * updating specific filter value set in adaptive cards data
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{caseId: string, filterType: 'all', filterValues: Array<{ id: string; name: string }>}>`
     * @example -
     * ```
     * dispatch(updateFilterValues(@param))
     * ```
     */
    updateFilterValues(state: CcfAgentCopilotData, action: PayloadAction<{
        caseId: string;
        filterType: CopilotFilterValueType;
        filterValues: FilterOptionValues;
    }>): CcfAgentCopilotData;
    /**
     * updating all filter values sets in adaptive cards data
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{caseId: string, filters:FilterValueSets}>`
     * @example -
     * ```
     * dispatch(updateAllFilterValueSets(@param))
     * ```
     */
    updateAllFilterValueSets(state: CcfAgentCopilotData, action: PayloadAction<{
        caseId: string;
        filters: FilterValueSets;
    }>): CcfAgentCopilotData;
    /**
     * set isComprehensiveFeedbackSent value
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{ caseId: string; isComprehensiveFeedbackSent: boolean }>`
     * @example -
     * ```
     * dispatch(setIsComprehensiveFeedbackSent(@param))
     * ```
     */
    setIsComprehensiveFeedbackSent(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        isComprehensiveFeedbackSent: boolean;
    }>): CcfAgentCopilotData;
    /**
     * set updateComprehensiveCard value
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{ caseId: string; updateComprehensiveCard: boolean }>`
     * @example -
     * ```
     * dispatch(reRenderComprehensiveCard(@param))
     * ```
     */
    reRenderComprehensiveCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        updateComprehensiveCard: boolean;
    }>): CcfAgentCopilotData;
    /**
     * Function to remove generate email card if editor is not open
     * @param state - CcfCopilotData
     * @param action - PayloadAction<string>
     * @example -
     * ```
     * dispatch(removeGenerateEmailCard(@param))
     * ```
     * @returns
     */
    removeGenerateEmailCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Function to add contact history data
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{ caseId: string; contactHistory: ContactHistoryData[] }>`
     * @example -
     * ```
     * dispatch(addContactHistory(@param))
     * ```
     * @returns
     */
    addContactHistory(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        contactHistory: ContactHistoryData[];
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                contactHistory: ContactHistoryData[];
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * generate comprehensive card value
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{ caseId: string; generateComprehensiveCard: boolean }>`
     * @example -
     * ```
     * dispatch(generateComprehensiveCard(@param))
     * ```
     */
    generateComprehensiveCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        generateComprehensiveCard: boolean;
    }>): CcfAgentCopilotData;
    /**
     * Set isFinalSummaryGenerated after status is changed to Resolved/Closed
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{ caseId: string; isFinalSummaryGenerated: boolean }>`
     * @example
     * ```
     * dispatch(setIsFinalSummaryGenerated({ caseId: '123123', isFinalSummaryGenerated: true }))
     * ```
     */
    setIsFinalSummaryGenerated(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        isFinalSummaryGenerated: boolean;
    }>): CcfAgentCopilotData;
    /**
     * Sets the current task assist request status in the state.
     *
     * @param state - The current state of type `CcfCopilotData`.
     * @param action - The action containing the payload, which includes `contactId` (a string) and `status` (a string representing the task assist status).
     *
     * @example
     * dispatch(CcfCopilotActions.setIsTaskAssistRequestCompleted( contactId: '12345', status: 'success' ));
     *
     * @returns - The updated `CcfCopilotData` state with the new task assist status for the specified `contactId`.
     */
    setIsTaskAssistRequestCompleted(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        status: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                currentTaskAssistRequestStatus: string;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
 * Updates the content of the auto summary card for the specified contact.
 *
 * This reducer iterates through the currently stored adaptive card elements (acpAppElements)
 * for a given contact and finds the card whose content type is FINAL_SUMMARY_NOTES. It then
 * updates that card’s content by replacing its `summary` property with the new text provided in the action payload.
 * After updating, it calls the `setCopilotIndexDb` function to persist the new state in IndexedDB.
 *
 * @param state - The current state of type `CcfCopilotData`.
 * @param action - A Redux action containing a payload with:
 *   - `contactId`: The identifier of the contact/case.
 *   - `summary`: The new summary text that will replace the current one in the final summary card.
 *
 * @example
 * dispatch(CcfCopilotActions.updateAutoSummaryCardContent( contactId: '12345', summary: 'New summary text' ));
 *
 * @returns The updated state with the auto summary card's content modified.
 */
    updateAutoSummaryCardContent(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        summary: string | undefined;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Sets the current task assist request status in the state.
     *
     * @param state - The current state of type `CcfCopilotData`.
     * @param action - The action containing the payload, which includes `contactId` (a string) and `status` (a string representing the task assist status).
     *
     * @example
     * dispatch(CcfCopilotActions.setIsTaskAssistRequestStatus( contactId: '12345', status: 'success' ));
     *
     * @returns - The updated `CcfCopilotData` state with the new task assist status for the specified `contactId`.
     */
    setIsTaskAssistRequestStatus(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        status: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                currentTaskAssistRequestStatus: string;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Adds or updates a Task Assist status card in the adaptive cards data for a given contact (case).
     *
     * If a card with the same `objectId` already exists for the specified contact, it will be replaced.
     * Otherwise, the new card will be added to the list of adaptive cards for that contact.
     * The updated adaptive cards data is also persisted to the Copilot IndexDB via the copilot service.
     *
     * @param state - The current slice state containing adaptive cards data.
     * @param action - The Redux action payload containing:
     *   - `contactId`: The unique identifier for the contact (case).
     *   - `content`: The content data for the Task Assist card.
     * @example
     * ```
     * dispatch(addTaskAssistStatusCard({ contactId, content }));
     * ```
     * @returns The updated state with the new or replaced Task Assist status card.
     */
    addTaskAssistStatusCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: {
        payload: {
            contactId: string;
            content: {
                [key: string]: string | number | boolean | string[] | ValidationInfo;
            };
        };
        type: string;
    }): CcfAgentCopilotData | undefined;
    /**
     * Adds a TASK_ASSIST adaptive card for a specific intent.
     *
     * If a custom schema exists for the intent, it renders a form-capture card. Otherwise, it adds
     * a fallback error card using the default 'informationCard' schema.
     *
     * The new card is appended to `adaptiveCardsData` for the given contact ID.
     *
     * @param state - Current Redux state (`CcfCopilotData`).
     * @param action - Payload containing:
     *   - `intentConfig`: Includes `intentName` and `displayName`.
     *   - `contactId`: The ID of the case/contact.
     *   - `preFilledData`: Data to pre-fill the card, if applicable.
     * @example
     * ```
     * dispatch(addTaskAssistFormCard({ intentConfig, contactId, preFilledData }));
     * ```
     *
     * @returns Updated Redux state with the new card added.
     */
    addTaskAssistFormCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        taskAssistFormData?: CopilotTaskAssistCardData;
    }>): import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>;
    /**
 * Removes a task assist card from the adaptive cards data for a given contact based on the objectId.
 *
 * This reducer filters out any adaptive card whose content contains an "id" equal to the provided objectId.
 *
 * @param state - The current copilot state.
 * @param action - An action payload containing:
 *        - contactId: The contact (or case) identifier.
 *        - objectId: The identifier used within the card's content to match the card to remove.
 *
 * @example
 * dispatch(removeTaskAssistCard(contactId: '12345', objjectId: '123'));
 *
 * @returns The updated copilot state without the removed card.
 */
    removeTaskAssistCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        objectId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                currentTaskAssistRequestStatus: string;
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
    * updating auto summary card with sidposition notes
    * @param action - An action payload containing:
    *        - dispositionNotes: The updated summary notes to be set in the card.
    *        - contactId: The contact (or case) identifier.
    *
    * @example
    * dispatch(updateAutoSummaryCard(dispositionNotes: 'summary updated', caseId: '123'));
    *
    * @returns The updated copilot state with updated auto summary card.
     */
    updateAutoSummaryCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        dispositionNotes: string;
        caseId: string;
    }>): import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>;
    /**
    * updating auto summary card to expand
    * @param action - An action payload containing:
    *        - contactId: The contact (or case) identifier.
    *
    * @example
    * dispatch(expandAutoSummaryCard(caseId: '123'));
    *
    * @returns The updated copilot state with expanded auto summary card.
     */
    expandAutoSummaryCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>;
    /**
    * set isAutoSummaryExpanded value
    * @param action - An action payload containing:
    *        - contactId: The contact (or case) identifier.
    *        - isAutoSummaryExpanded: Boolean value to set the auto summary card expanded state.
    *
    * @example
    * dispatch(setIsAutoSummaryExpanded( caseId: '123', isAutoSummaryExpanded: true ));
    *
    * @returns The updated copilot state with the isAutoSummaryExpanded value set.
     */
    setIsAutoSummaryExpanded(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        isAutoSummaryExpanded: boolean;
    }>): import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>;
    /**
     * Function to remove autosummary card
     * @param state - CcfCopilotData
     * @param action - PayloadAction<string>
     * @example -
     * ```
     * dispatch(removeAutoSummaryCard(@param))
     * ```
     * @returns
     */
    removeAutoSummaryCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                isAutoSummaryExpanded: boolean;
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Adds an AutoSummary error card to the adaptive cards data for a given contact (case).
     *
     * This card indicates that an AutoSummary could not be generated.
     * A new error card is always appended to the adaptive cards list for the contact.
     * The updated adaptive cards data is also persisted to the Copilot IndexDB via the copilot service.
     *
     * @param state - The current slice state containing adaptive cards data.
     * @param action - The Redux action payload containing:
     *   - `contactId`: The unique identifier for the contact (case).
     *
     * @example
     * ```ts
     * dispatch(addAutoSummaryErrorCard({ contactId }));
     * ```
     *
     * @returns The updated state with the new AutoSummary error card appended.
     */
    addAutoSummaryErrorCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        isLoading?: boolean;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: CopilotElement[];
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Updates the decision tree state for a specific contact in the copilot state.
     *
     * @param state - The current copilot state.
     * @param action - An action payload containing:
     *       - contactId: The contact (or case) identifier.
     *       - updates: Partial updates to the decision tree state, including isDecisionTreeOpen and/or decisionTreeData.
     * @returns The updated copilot state with the decision tree state updated.
     * @example
     * ```
     * dispatch(updateDecisionTreeState({ contactId: '12345', updates: { isDecisionTreeOpen: true, decisionTreeData: {...} } }));
     * ```
     */
    updateDecisionTreeState(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        updates: Partial<Pick<CopilotMessageData, 'isDecisionTreeOpen' | 'decisionTreeData'>>;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: DecisionTreeData;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
 * Updates only the decision tree sections for a specific contact.
 * Preserves existing sections and appends the new ones.
 * @example
 * ```
 * dispatch(updateDecisionTreeSectionsState({ contactId: '12345', data: { sections: [...] } }));
 * ```
 */
    updateDecisionTreeSectionsState(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        updates: Partial<Pick<DecisionTreeData, 'sections' | 'title' | 'icon' | 'completeBtnTitle'>>;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                decisionTreeData: {
                    title: string;
                    icon: string;
                    sections: import("@nice-devone/common-sdk").DecisionTreeSection[];
                    completeBtnTitle: string;
                    taskSessionUid: string;
                    contactId: string;
                    decisionTreeId: string;
                    answeredQuestions: number;
                    totalNoOfQuestions: number;
                    currentSectionId: string;
                    suggestedQuestions: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").SuggestedQuestionSection>[];
                    capturedResponses: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CapturedSection>[];
                    showSubmit: boolean;
                    previousSection?: string | undefined;
                    visitedSections: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").BaseSection>[];
                    error: string | null;
                };
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Function to return default state for middleware
     * @param state - AgentState
     * @returns It returns default state
     * @example -default()
     */
    default(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>): {
        adaptiveCardsData: import("immer/dist/internal").WritableDraft<CcfCopilotData>;
        isCopilotAvailable: boolean;
    };
}, "ccfCopilotData">;
/**
 * Used to get copilot running summary by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * selectRunningSummary('123123');
 * ```
 */
export declare const selectRunningSummary: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => CopilotElement | null) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => CopilotElement & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get copilot adaptive cards by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getAdaptiveCards('123123');
 * ```
 */
export declare const getAdaptiveCards: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => CopilotElement[]) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => CopilotElement[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Base selector to retrieve case data once and derive other selectors from it.
 * Helps stabilize memoization and reduce repeated state lookups.
 * @example
 * const caseData = useSelector(selectCaseData('123'));
 */
export declare const selectCaseData: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => CopilotMessageDataExtended) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => CopilotMessageData & {
    acpAppElement?: CopilotElement | undefined;
    latestByType?: Partial<Record<AgentCopilotContentType, CopilotElement>> | undefined;
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get copilot next best responses by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getNextBestResponses('123123');
 * ```
 */
export declare const getNextBestResponses: (caseId: string, isACPEnabled?: boolean) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => string[] | null) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => string[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get copilot next best response objectId by caseId
 * @param caseId - Case Id
 * @param isACPEnabled - Flag indicating whether ACP is enabled.
 * @returns The copilot objectId if found, otherwise null.
 * @example -
 * ```
 * const objectId = getNbrObjectDetails('caseId', true);
 * ```
 */
export declare const getNbrObjectDetails: (caseId: string, isACPEnabled?: boolean) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => string | null) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get responseSent by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getSentBestResponse('123123');
 * ```
 */
export declare const getSentBestResponse: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isResponseInserted by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsResponseSent('123123');
 * ```
 */
export declare const getIsResponseSent: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get currentStatus by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getCopilotRequestStatus('123123');
 * ```
 */
export declare const getCopilotRequestStatus: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get copilot final summary by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * const copilotFinalSummary = useSelector(getFinalSummaryNotes('123123'));
 * ```
 */
export declare const getFinalSummaryNotes: (caseId: string, isCopilotAvailable: boolean) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => CopilotAdaptiveCard | {
    summary: any;
}) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => (CopilotAdaptiveCard | {
    summary: any;
}) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isCopilotAvailable
 * @example -
 * ```
 * getCopilotStatus();
 * ```
 */
export declare const getCopilotStatus: () => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get if acp is enabled
 * @example -
 * ```
 * const { copilotEnabled } = useSelector(isCopilotEnabledForContact);
 * ```
 */
export declare const isCopilotEnabledForContact: ((state: {
    ccfCopilotData: CcfAgentCopilotData;
} & {
    inbox: import("../ccf-assignment-panel/ccf-assignment-panel.slice").AssignmentState;
}) => {
    copilotEnabled: boolean;
}) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData, args_1: import("@nice-devone/common-sdk").ContactData | null) => {
    copilotEnabled: boolean;
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get if ACP is enabled for a  specific disposition/contactId.
 * This is a selector factory; it returns a selector bound to the provided contactId.
 * @example -
 * const contactId = '123';
 * ```
 * const { copilotEnabled } = useSelector(selectHasCopilotConfig(contactId));
 * ```
 */
export declare const selectHasCopilotConfig: (contactId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => {
    copilotEnabled: boolean;
    copilotConfig: any;
}) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => {
    copilotEnabled: boolean;
    copilotConfig: any;
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get insertedNBRId by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getInsertedNBRId('123123');
 * ```
 */
export declare const getInsertedNBRId: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isNBRAvailable by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsNBRAvailable('123123');
 * ```
 */
export declare const getIsNBRAvailable: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isNBROpen by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsNBROpen('123123');
 * ```
 */
export declare const getIsNBROpen: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isFinalSummaryGenerated by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsFinalSummaryGenerated('123123');
 * ```
 */
export declare const getIsFinalSummaryGenerated: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isFilterApplied by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getFilterStatusForCase('123123');
 * ```
 */
export declare const getFilterStatusForCase: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isFilterCardShown by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsFilterCardShown('123123');
 * ```
 */
export declare const getIsFilterCardShown: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get shouldOpenFilterPopover by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getShouldOpenFilterPopover('123123');
 * ```
 */
export declare const getShouldOpenFilterPopover: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isJourneySummary by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsJourneySummaryExpanded('123123');
 * ```
 */
export declare const getIsJourneySummaryExpanded: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get copilot adaptive cards by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getJourneySummaryAdaptiveCard('123123');
 * ```
 */
export declare const getJourneySummaryAdaptiveCard: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => CopilotElement[]) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => CopilotElement[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get  copilotFilterValues by caseId
 * @param caseId - Case Id
 * @param filterType - Filter Type
 * @example -
 * ```
 * getAllCopilotFilterValueSets('123123');
 * ```
 */
export declare const getAllCopilotFilterValueSets: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => FilterValueSets) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => FilterValueSets & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get comprehensive feedback Data by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getComprehensiveFeedbackData('123123');
 * ```
 */
export declare const getComprehensiveFeedbackData: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => import("@nice-devone/common-sdk").OverallContactFeedbackData) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => import("@nice-devone/common-sdk").OverallContactFeedbackData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get updateComprehensiveCard by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getUpdatedComprehensiveCard('123123');
 * ```
 */
export declare const getUpdatedComprehensiveCard: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isAgentSearchAvailable: ((state: {
    inbox: import("../ccf-assignment-panel/ccf-assignment-panel.slice").AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: never[], args_1: import("@nice-devone/common-sdk").ContactData | null) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get script params for contact
 * @returns script params value from AAHConfig.
 * @example -
 * ```
 * const flag = getScriptParamsForContact("finalSummary");
 * ```
 */
export declare const getScriptParamsForContact: ((state: {
    inbox: import("../ccf-assignment-panel/ccf-assignment-panel.slice").AssignmentState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: never[], args_1: import("@nice-devone/common-sdk").ContactData | null) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get if flag enabled in AAH configuration
 * @param configKey - Flag indicating whether ACP is enabled.
 * @returns true is provided flag is enabled, otherwise false.
 * @example -
 * ```
 * const flag = isAgentAssistConfigParamsEnabledForContact("finalSummary");
 * ```
 */
export declare const isAgentAssistConfigParamsEnabledForContact: (configKey: string) => ((state: {
    inbox: import("../ccf-assignment-panel/ccf-assignment-panel.slice").AssignmentState;
}) => string | boolean) & import("reselect").OutputSelectorFields<(args_0: never[], args_1: import("@nice-devone/common-sdk").ContactData | null) => (string | boolean) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Selector factory to get multiple Agent Assist config params for the current contact/case.
 * @param keys - Array of config keys to fetch from Params
 * @returns Object with key-value pairs for each config key
 * * @example
 * ```
 * const params = useSelector(getAgentAssistConfigParamsForContact(['finalSummary', 'scriptParams']));
 * ```
 */
export declare const getAgentAssistConfigParamsForContact: (keys: string[]) => ((state: {
    inbox: import("../ccf-assignment-panel/ccf-assignment-panel.slice").AssignmentState;
}) => Record<string, string | number | boolean | object | unknown[] | Record<string, unknown> | KnowledgeHubConfiguration | AutoSummaryCardFeature | null | undefined>) & import("reselect").OutputSelectorFields<(args_0: never[], args_1: import("@nice-devone/common-sdk").ContactData | null) => Record<string, string | number | boolean | object | unknown[] | Record<string, unknown> | KnowledgeHubConfiguration | AutoSummaryCardFeature | null | undefined> & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
   * Selector to get the array of AutoSummaryCardFeature for a given caseId.
   * @param caseId - Case Id
   * @example
   * ```
   * const features = useSelector(getAutoSummaryCardFeatures('123123'));
   * ```
   */
export declare const getAutoSummaryCardFeatures: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => any) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => any> & {
    clearCache: () => void;
};
/**
 * Used to get nested knowledge hub config property from AAH configuration
 * @param configKey - Property key within knowledgeHubConfig
 * @returns Value of the property if found, otherwise false.
 * @example -
 * ```
 * const enableDirectQuery = isKnowledgeHubConfigEnabledForContact('enableDirectQuery');
 * ```
 */
export declare const isKnowledgeHubConfigEnabledForContact: (configKey: string) => ((state: {
    inbox: import("../ccf-assignment-panel/ccf-assignment-panel.slice").AssignmentState;
}) => string | number | boolean) & import("reselect").OutputSelectorFields<(args_0: never[], args_1: import("@nice-devone/common-sdk").ContactData | null) => (string | number | boolean) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get getEmailIdentifier by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getEmailIdentifier('123123');
 * ```
 */
export declare const getEmailIdentifier: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isEditorActionPerformed by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsEditorActionPerformed('123123');
 * ```
 */
export declare const getIsEditorActionPerformed: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get getCurrentTopicCardUid by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getCurrentTopicCardUid('123123');
 * ```
 */
export declare const getCurrentTopicCardUid: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Returns the latest Sentiment card for a case using O(1) lookup via latestByType
 * with array fallback capped by `getMaxElementsCap()`.
 * @param caseId - Case Id
 * @example
 * const sentiment = useSelector(getLatestSentimentCard('123'));
 */
export declare const getLatestSentimentCard: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => CopilotElement | null) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => CopilotElement & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Returns the latest Disclosure card for a case using O(1) lookup via latestByType
 * with array fallback capped by `getMaxElementsCap()`.
 * @param caseId - Case Id
 * @example
 * const disclosure = useSelector(getLatestDisclosureCard('123'));
 */
export declare const getLatestDisclosureCard: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => CopilotElement | null) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => CopilotElement & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isComprehensiveFeedbackSent by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsComprehensiveFeedbackSent('123123');
 * ```
 */
export declare const getIsComprehensiveFeedbackSent: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get generateComprehensiveCard by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getGenerateComprehensiveCard('123123');
 * ```
 */
export declare const getGenerateComprehensiveCard: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isFinalSummaryRegenerating by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsFinalSummaryRegenerating('123123');
 * ```
 * @returns - boolean indicating if final summary is regenerating
 */
export declare const getIsFinalSummaryRegenerating: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isAutoSummaryExpanded by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsAutoSummaryExpanded('123123');
 * ```
 */
export declare const getIsAutoSummaryExpanded: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get isDecisionTreeOpen by caseId
 * @param caseId - Case Id
 * @returns - boolean indicating if decision tree is open
 * @example -
 * ```
 * getDecisionTreeOpenStatus('123123');
 * ```
 */
export declare const getDecisionTreeOpenStatus: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
   * Used to get decision tree data by caseId
   * @param caseId - Case Id
   * @returns - Decision tree data or null
   * @example -
   * ```
   * getDecisionTreeData('123123');
   * ```
   */
export declare const getDecisionTreeData: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => DecisionTreeData) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => DecisionTreeData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get copilot adaptive cards by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getAutoSummaryAdaptiveCard('123123');
 * ```
 */
export declare const getAutoSummaryAdaptiveCard: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => CopilotElement[]) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => CopilotElement[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const CcfCopilotReducer: import("redux").Reducer<CcfAgentCopilotData, AnyAction>;
export declare const CcfCopilotActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Function to add card data to existing state
     * @param state - CcfCopilotData
     * @example -
     * ```
     * dispatch(addAdaptiveCardData(payload));
     * ```
     * @returns - this returns state
     */
    addAdaptiveCardData(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<CcfCopilotData>): CcfAgentCopilotData;
    /**
     * Function to add email adaptive card data
     * @param state - CcfCopilotData
     * @example -
     * ```
     * dispatch(addEmailAdaptiveCardData(payload));
     * ```
     * @returns - this returns state
     */
    addEmailAdaptiveCardData(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<CcfCopilotData>): CcfAgentCopilotData;
    /**
     * Function to update email adaptive card data in existing state
     * @param state - CcfCopilotData
     * @example -
     * ```
     * dispatch(updateAdaptiveCardsEmail(payload));
     * ```
     * @returns - this returns state
     */
    updateAdaptiveCardsEmail(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): CcfAgentCopilotData;
    /**
     * Function to set agent copilot next best responses
     * @param state - CcfCopilotData
     * @param action - PayloadAction<CcfCopilotData>
     * @example
     * ```
     * dispatch(setNextBestResponse())
     * ```
     * @returns
     */
    setNextBestResponse(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<CcfCopilotData>): CcfAgentCopilotData;
    /**
     * Function to set agent copilot request status
     * @param state - CcfCopilotData
     * @param action - PayloadAction<CcfCopilotData>
     * @example
     * ```
     * dispatch(setcurrentRequestState())
     * ```
     * @returns
     */
    setCurrentRequestStatus(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<CcfCopilotData>): CcfAgentCopilotData;
    /**
     * Function to remove next best responses
     * @param state - CcfCopilotData
     * @param action - PayloadAction<string>
     * @example -
     * ```
     * dispatch(removeNextBestResponse())
     * ```
     * @returns
     */
    removeNextBestResponse(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): CcfAgentCopilotData;
    /**
     * Function to remove current request state
     * @param state - CcfCopilotData
     * @param action - PayloadAction<string>
     * @example -
     * ```
     * dispatch(clearCopilotRequestStatus())
     * ```
     * @returns
     */
    clearCopilotRequestStatus(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Clears and removes all copilot data for a specific caseId from Redux and IndexedDB.
     * Call this when a case is unassigned or closed.
     * @example
     * ```ts
     * dispatch(CcfCopilotActions.clearCopilotCaseFromIndexedDb('12345'));
     * ```
     */
    clearCopilotCaseFromIndexedDb(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): {
        adaptiveCardsData: CcfCopilotData;
        isCopilotAvailable: boolean;
    };
    /**
     * updating responseSent state value after agent send text in editor
     * @param state - CcfCopilotData
     * @param action  - `PayloadAction<{ response: string; caseId: string }>`
     * @example -
     * ```
     * dispatch(updateSentBestResponse(@param))
     * ```
     */
    updateSentBestResponse(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        response: string;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                responseSent: string;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * updating isResponseInserted state value after sent out reply
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(updateIsBestResponseSent(@param))
     * ```
     */
    updateIsBestResponseSent(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        isResponseInserted: boolean;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                isResponseInserted: boolean;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * rehydrate state from index db data
     * @param state - CcfCopilotData
     * @param action - PayloadAction<CcfCopilotData>
     * @example -
     * ```
     * dispatch(rehydrateCopilotState(payload))
     * ```
     */
    rehydrateCopilotState(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<CcfCopilotData>): CcfAgentCopilotData;
    /**
     * updating isCopilotAvailable state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(setCopilotStatus(@param))
     * ```
     */
    setCopilotStatus(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<boolean>): {
        isCopilotAvailable: boolean;
        adaptiveCardsData: import("immer/dist/internal").WritableDraft<CcfCopilotData>;
    };
    /**
     * updating isCopilotAvailable state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(updateAdaptiveCardSchema(@param))
     * ```
     */
    updateAdaptiveCardSchema(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        updatedCopilotCard: CardElement[];
        caseId: string;
        cardId: number;
        containerId: string;
        containerCardId?: string;
        isJourneySummaryExpanded?: boolean;
        isAutoSummaryExpanded?: boolean;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: CopilotElement[];
                isJourneySummaryExpanded: boolean;
                isAutoSummaryExpanded: boolean;
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Function to set error toast message
     * @param state - AppState
     * @param action - action.payload
     * @example - dispatch(setToastErrorMessage(`{ errorMessage: error }`));
     * @returns
     */
    setToastErrorMessage(_state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<CcfAppToastMessageProps>): void;
    /**
     * set insertedNBRId state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(setInsertedNBRId(@param))
     * ```
     */
    setInsertedNBRId(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        insertedNBRId: string;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                insertedNBRId: string;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * set isNBRAvailable state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(setIsNBRAvailable(@param))
     * ```
     */
    setIsNBRAvailable(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        isNBRAvailable: boolean;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                isNBRAvailable: boolean;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * set isNBROpen state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(setsetIsNBROpen(@param))
     * ```
     */
    setIsNBROpen(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        isNBROpen: boolean;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                isNBROpen: boolean;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * updating feedbackData state value after Like/Dislike or KbAnswer feedback is not selected
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{ feedback: string; caseId: string; objectId: string; contactId: string; agentId: string; agentContactId: string, title: string, utteranceId: string, kbAnswerUid: string }>`
     * @example -
     * ```
     * dispatch(updateFeedbackData(@param))
     * ```
     */
    updateFeedbackData(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        feedback: string;
        caseId: string;
        objectId: string;
        contactId: string;
        agentId: string;
        agentContactId: string;
        title: string;
        utteranceId?: string;
        kbAnswerUid?: string;
    }>): CcfAgentCopilotData;
    /**
     * Add overall subcard data if no cardsa re geenrated
     * @param state - CcfCopilotData
     * @param action - Payload<string>
     * @example -
     * ```
     * dispatch(addOverallSubcardData(@param))
     * ```
     */
    addOverallSubcardData(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                comprehensiveFeedback: {
                    contactFeedbackCard: {
                        overallFeedbackTitle: string;
                        feedback: string;
                    };
                    guidanceFeedbacks: import("immer/dist/internal").WritableDraft<GuidanceFeedbackData>[];
                };
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * set isEditorActionPerformed state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(setIsEditorActionPerformed(@param))
     * ```
     */
    setIsEditorActionPerformed(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        isEditorActionPerformed: boolean;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                isEditorActionPerformed: boolean;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * updating subcards property of comprehensiveFeedback state value after call/chat is closed
     * @param state - CcfCopilotData
     * @param action - PayloadAction<GuidanceFeedbackData>
     * @example -
     * ```
     * dispatch(updateComprehensiveSubcardsFeedback(@param))
     * ```
     */
    updateComprehensiveSubcardsFeedback(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        feedbackData: GuidanceFeedbackData;
    }>): CcfAgentCopilotData;
    /**
     * updating contactFeedbackCard property of comprehensiveFeedback state value after call/chat is closed
     * @param state - CcfCopilotData
     * @param action - PayloadAction<GuidanceFeedbackData>
     * @example -
     * ```
     * dispatch(updateOverSubcardsFeedback(@param))
     * ```
     */
    updateOverSubcardsFeedback(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        feedback?: string;
        comment?: string;
    }>): CcfAgentCopilotData;
    /**
     * updating isJourneySummaryExpanded state value
     * @param state - CcfCopilotData
     * @param action - PayloadAction<boolean>
     * @example -
     * ```
     * dispatch(updateIsJourneySummaryExpanded(@param))
     * ```
     */
    updateIsJourneySummaryExpanded(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        isJourneySummaryExpanded: boolean;
        caseId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                isJourneySummaryExpanded: boolean;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * updating filters data isFilterApplied
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{caseId: string, isFilterApplied: boolean}>`
     * @example -
     * ```
     * dispatch(setFilterStatusForCase(@param))
     * ```
     */
    setFilterStatusForCase(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        isFilterApplied: boolean;
    }>): CcfAgentCopilotData;
    /**
     * updating filters data shouldOpenFilterPopover
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{caseId: string, shouldOpenFilterPopover: boolean}>`
     * @example -
     * ```
     * dispatch(setShouldOpenFilterPopoverForCase(@param))
     * ```
     */
    setShouldOpenFilterPopoverForCase(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        shouldOpenFilterPopover: boolean;
    }>): CcfAgentCopilotData;
    /**
     * updating adaptive cards by removing filter card and setting isFilterCardShown to true, so that filter card is only displayed one time
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{caseId: string, isFilterCardShown: boolean}>`
     * @example -
     * ```
     * dispatch(updateAndHideFilterCard(@param))
     * ```
     */
    updateAndHideFilterCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        isFilterCardShown: boolean;
    }>): CcfAgentCopilotData;
    /**
     * updating specific filter value set in adaptive cards data
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{caseId: string, filterType: 'all', filterValues: Array<{ id: string; name: string }>}>`
     * @example -
     * ```
     * dispatch(updateFilterValues(@param))
     * ```
     */
    updateFilterValues(state: CcfAgentCopilotData, action: PayloadAction<{
        caseId: string;
        filterType: CopilotFilterValueType;
        filterValues: FilterOptionValues;
    }>): CcfAgentCopilotData;
    /**
     * updating all filter values sets in adaptive cards data
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{caseId: string, filters:FilterValueSets}>`
     * @example -
     * ```
     * dispatch(updateAllFilterValueSets(@param))
     * ```
     */
    updateAllFilterValueSets(state: CcfAgentCopilotData, action: PayloadAction<{
        caseId: string;
        filters: FilterValueSets;
    }>): CcfAgentCopilotData;
    /**
     * set isComprehensiveFeedbackSent value
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{ caseId: string; isComprehensiveFeedbackSent: boolean }>`
     * @example -
     * ```
     * dispatch(setIsComprehensiveFeedbackSent(@param))
     * ```
     */
    setIsComprehensiveFeedbackSent(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        isComprehensiveFeedbackSent: boolean;
    }>): CcfAgentCopilotData;
    /**
     * set updateComprehensiveCard value
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{ caseId: string; updateComprehensiveCard: boolean }>`
     * @example -
     * ```
     * dispatch(reRenderComprehensiveCard(@param))
     * ```
     */
    reRenderComprehensiveCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        updateComprehensiveCard: boolean;
    }>): CcfAgentCopilotData;
    /**
     * Function to remove generate email card if editor is not open
     * @param state - CcfCopilotData
     * @param action - PayloadAction<string>
     * @example -
     * ```
     * dispatch(removeGenerateEmailCard(@param))
     * ```
     * @returns
     */
    removeGenerateEmailCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Function to add contact history data
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{ caseId: string; contactHistory: ContactHistoryData[] }>`
     * @example -
     * ```
     * dispatch(addContactHistory(@param))
     * ```
     * @returns
     */
    addContactHistory(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        contactHistory: ContactHistoryData[];
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                contactHistory: ContactHistoryData[];
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * generate comprehensive card value
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{ caseId: string; generateComprehensiveCard: boolean }>`
     * @example -
     * ```
     * dispatch(generateComprehensiveCard(@param))
     * ```
     */
    generateComprehensiveCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        generateComprehensiveCard: boolean;
    }>): CcfAgentCopilotData;
    /**
     * Set isFinalSummaryGenerated after status is changed to Resolved/Closed
     * @param state - CcfCopilotData
     * @param action - `PayloadAction<{ caseId: string; isFinalSummaryGenerated: boolean }>`
     * @example
     * ```
     * dispatch(setIsFinalSummaryGenerated({ caseId: '123123', isFinalSummaryGenerated: true }))
     * ```
     */
    setIsFinalSummaryGenerated(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        isFinalSummaryGenerated: boolean;
    }>): CcfAgentCopilotData;
    /**
     * Sets the current task assist request status in the state.
     *
     * @param state - The current state of type `CcfCopilotData`.
     * @param action - The action containing the payload, which includes `contactId` (a string) and `status` (a string representing the task assist status).
     *
     * @example
     * dispatch(CcfCopilotActions.setIsTaskAssistRequestCompleted( contactId: '12345', status: 'success' ));
     *
     * @returns - The updated `CcfCopilotData` state with the new task assist status for the specified `contactId`.
     */
    setIsTaskAssistRequestCompleted(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        status: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                currentTaskAssistRequestStatus: string;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
 * Updates the content of the auto summary card for the specified contact.
 *
 * This reducer iterates through the currently stored adaptive card elements (acpAppElements)
 * for a given contact and finds the card whose content type is FINAL_SUMMARY_NOTES. It then
 * updates that card’s content by replacing its `summary` property with the new text provided in the action payload.
 * After updating, it calls the `setCopilotIndexDb` function to persist the new state in IndexedDB.
 *
 * @param state - The current state of type `CcfCopilotData`.
 * @param action - A Redux action containing a payload with:
 *   - `contactId`: The identifier of the contact/case.
 *   - `summary`: The new summary text that will replace the current one in the final summary card.
 *
 * @example
 * dispatch(CcfCopilotActions.updateAutoSummaryCardContent( contactId: '12345', summary: 'New summary text' ));
 *
 * @returns The updated state with the auto summary card's content modified.
 */
    updateAutoSummaryCardContent(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        summary: string | undefined;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Sets the current task assist request status in the state.
     *
     * @param state - The current state of type `CcfCopilotData`.
     * @param action - The action containing the payload, which includes `contactId` (a string) and `status` (a string representing the task assist status).
     *
     * @example
     * dispatch(CcfCopilotActions.setIsTaskAssistRequestStatus( contactId: '12345', status: 'success' ));
     *
     * @returns - The updated `CcfCopilotData` state with the new task assist status for the specified `contactId`.
     */
    setIsTaskAssistRequestStatus(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        status: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                currentTaskAssistRequestStatus: string;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Adds or updates a Task Assist status card in the adaptive cards data for a given contact (case).
     *
     * If a card with the same `objectId` already exists for the specified contact, it will be replaced.
     * Otherwise, the new card will be added to the list of adaptive cards for that contact.
     * The updated adaptive cards data is also persisted to the Copilot IndexDB via the copilot service.
     *
     * @param state - The current slice state containing adaptive cards data.
     * @param action - The Redux action payload containing:
     *   - `contactId`: The unique identifier for the contact (case).
     *   - `content`: The content data for the Task Assist card.
     * @example
     * ```
     * dispatch(addTaskAssistStatusCard({ contactId, content }));
     * ```
     * @returns The updated state with the new or replaced Task Assist status card.
     */
    addTaskAssistStatusCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: {
        payload: {
            contactId: string;
            content: {
                [key: string]: string | number | boolean | string[] | ValidationInfo;
            };
        };
        type: string;
    }): CcfAgentCopilotData | undefined;
    /**
     * Adds a TASK_ASSIST adaptive card for a specific intent.
     *
     * If a custom schema exists for the intent, it renders a form-capture card. Otherwise, it adds
     * a fallback error card using the default 'informationCard' schema.
     *
     * The new card is appended to `adaptiveCardsData` for the given contact ID.
     *
     * @param state - Current Redux state (`CcfCopilotData`).
     * @param action - Payload containing:
     *   - `intentConfig`: Includes `intentName` and `displayName`.
     *   - `contactId`: The ID of the case/contact.
     *   - `preFilledData`: Data to pre-fill the card, if applicable.
     * @example
     * ```
     * dispatch(addTaskAssistFormCard({ intentConfig, contactId, preFilledData }));
     * ```
     *
     * @returns Updated Redux state with the new card added.
     */
    addTaskAssistFormCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        taskAssistFormData?: CopilotTaskAssistCardData;
    }>): import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>;
    /**
 * Removes a task assist card from the adaptive cards data for a given contact based on the objectId.
 *
 * This reducer filters out any adaptive card whose content contains an "id" equal to the provided objectId.
 *
 * @param state - The current copilot state.
 * @param action - An action payload containing:
 *        - contactId: The contact (or case) identifier.
 *        - objectId: The identifier used within the card's content to match the card to remove.
 *
 * @example
 * dispatch(removeTaskAssistCard(contactId: '12345', objjectId: '123'));
 *
 * @returns The updated copilot state without the removed card.
 */
    removeTaskAssistCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        objectId: string;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                currentTaskAssistRequestStatus: string;
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
    * updating auto summary card with sidposition notes
    * @param action - An action payload containing:
    *        - dispositionNotes: The updated summary notes to be set in the card.
    *        - contactId: The contact (or case) identifier.
    *
    * @example
    * dispatch(updateAutoSummaryCard(dispositionNotes: 'summary updated', caseId: '123'));
    *
    * @returns The updated copilot state with updated auto summary card.
     */
    updateAutoSummaryCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        dispositionNotes: string;
        caseId: string;
    }>): import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>;
    /**
    * updating auto summary card to expand
    * @param action - An action payload containing:
    *        - contactId: The contact (or case) identifier.
    *
    * @example
    * dispatch(expandAutoSummaryCard(caseId: '123'));
    *
    * @returns The updated copilot state with expanded auto summary card.
     */
    expandAutoSummaryCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>;
    /**
    * set isAutoSummaryExpanded value
    * @param action - An action payload containing:
    *        - contactId: The contact (or case) identifier.
    *        - isAutoSummaryExpanded: Boolean value to set the auto summary card expanded state.
    *
    * @example
    * dispatch(setIsAutoSummaryExpanded( caseId: '123', isAutoSummaryExpanded: true ));
    *
    * @returns The updated copilot state with the isAutoSummaryExpanded value set.
     */
    setIsAutoSummaryExpanded(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        caseId: string;
        isAutoSummaryExpanded: boolean;
    }>): import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>;
    /**
     * Function to remove autosummary card
     * @param state - CcfCopilotData
     * @param action - PayloadAction<string>
     * @example -
     * ```
     * dispatch(removeAutoSummaryCard(@param))
     * ```
     * @returns
     */
    removeAutoSummaryCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<string>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                isAutoSummaryExpanded: boolean;
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Adds an AutoSummary error card to the adaptive cards data for a given contact (case).
     *
     * This card indicates that an AutoSummary could not be generated.
     * A new error card is always appended to the adaptive cards list for the contact.
     * The updated adaptive cards data is also persisted to the Copilot IndexDB via the copilot service.
     *
     * @param state - The current slice state containing adaptive cards data.
     * @param action - The Redux action payload containing:
     *   - `contactId`: The unique identifier for the contact (case).
     *
     * @example
     * ```ts
     * dispatch(addAutoSummaryErrorCard({ contactId }));
     * ```
     *
     * @returns The updated state with the new AutoSummary error card appended.
     */
    addAutoSummaryErrorCard(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        isLoading?: boolean;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                acpAppElements: CopilotElement[];
                agentAssistSource: string;
                contactId: string;
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: import("immer/dist/internal").WritableDraft<DecisionTreeData>;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Updates the decision tree state for a specific contact in the copilot state.
     *
     * @param state - The current copilot state.
     * @param action - An action payload containing:
     *       - contactId: The contact (or case) identifier.
     *       - updates: Partial updates to the decision tree state, including isDecisionTreeOpen and/or decisionTreeData.
     * @returns The updated copilot state with the decision tree state updated.
     * @example
     * ```
     * dispatch(updateDecisionTreeState({ contactId: '12345', updates: { isDecisionTreeOpen: true, decisionTreeData: {...} } }));
     * ```
     */
    updateDecisionTreeState(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        updates: Partial<Pick<CopilotMessageData, 'isDecisionTreeOpen' | 'decisionTreeData'>>;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                isDecisionTreeOpen?: boolean | undefined;
                decisionTreeData: DecisionTreeData;
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
 * Updates only the decision tree sections for a specific contact.
 * Preserves existing sections and appends the new ones.
 * @example
 * ```
 * dispatch(updateDecisionTreeSectionsState({ contactId: '12345', data: { sections: [...] } }));
 * ```
 */
    updateDecisionTreeSectionsState(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>, action: PayloadAction<{
        contactId: string;
        updates: Partial<Pick<DecisionTreeData, 'sections' | 'title' | 'icon' | 'completeBtnTitle'>>;
    }>): {
        adaptiveCardsData: {
            [x: string]: import("immer/dist/internal").WritableDraft<CopilotMessageDataExtended> | {
                decisionTreeData: {
                    title: string;
                    icon: string;
                    sections: import("@nice-devone/common-sdk").DecisionTreeSection[];
                    completeBtnTitle: string;
                    taskSessionUid: string;
                    contactId: string;
                    decisionTreeId: string;
                    answeredQuestions: number;
                    totalNoOfQuestions: number;
                    currentSectionId: string;
                    suggestedQuestions: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").SuggestedQuestionSection>[];
                    capturedResponses: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CapturedSection>[];
                    showSubmit: boolean;
                    previousSection?: string | undefined;
                    visitedSections: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").BaseSection>[];
                    error: string | null;
                };
                agentAssistSource: string;
                contactId: string;
                acpAppElements: import("immer/dist/internal").WritableDraft<CopilotElement>[];
                utcTimestamp: Date;
                responseSent: string;
                isResponseInserted: boolean;
                insertedNBRId: string;
                isNBRAvailable: boolean;
                isNBROpen: boolean;
                isFinalSummaryGenerated: boolean;
                emailCards?: import("immer/dist/internal").WritableDraft<CopilotElement>[] | undefined;
                comprehensiveFeedback: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").OverallContactFeedbackData>;
                filterDetails?: import("immer/dist/internal").WritableDraft<import("@nice-devone/common-sdk").CopilotFilterDetails> | undefined;
                isEditorActionPerformed: boolean;
                isComprehensiveFeedbackSent: boolean;
                updateComprehensiveCard: boolean;
                generateComprehensiveCard: boolean;
                isJourneySummaryExpanded: boolean;
                contactHistory: import("immer/dist/internal").WritableDraft<ContactHistoryData>[];
                currentTaskAssistRequestStatus: string;
                copilotTaskAssistCardData: import("immer/dist/internal").WritableDraft<CopilotTaskAssistCardData>;
                isFinalSummaryRegenerating: boolean;
                isAutoSummaryExpanded?: boolean | undefined;
                isDecisionTreeOpen?: boolean | undefined;
                acpAppElement?: import("immer/dist/internal").WritableDraft<CopilotElement> | undefined;
                latestByType?: import("immer/dist/internal").WritableDraft<Partial<Record<AgentCopilotContentType, CopilotElement>>> | undefined;
            };
        };
        isCopilotAvailable: boolean;
    };
    /**
     * Function to return default state for middleware
     * @param state - AgentState
     * @returns It returns default state
     * @example -default()
     */
    default(state: import("immer/dist/internal").WritableDraft<CcfAgentCopilotData>): {
        adaptiveCardsData: import("immer/dist/internal").WritableDraft<CcfCopilotData>;
        isCopilotAvailable: boolean;
    };
}, "ccfCopilotData">;
/**
 * Function prepare send reply object
 * @param data - replyObject
 * @param response - response from copilot
 * @example -
 * ```
 * prepareCopilotReplyObject(copilotReplyObject,)
 * ```
 */
export declare const prepareCopilotReplyObject: (copilotReplyObject: replyMessageObject, response: string | DigitalFileAttachment) => CXoneDigitalReplyRequest;
/**
 * Function extract customer sentiment
 * @example -
 * ```
 * extractCustomerSentiment(inputStr)
 * ```
 * @returns - string
 */
export declare const extractCustomerSentiment: (inputStr: string) => string;
/**
 * Function to update visibility params of containers in adaptive cards schema
 * @param adapativeCardDetails - adaptive card data
 * @param comboCardDetails - combo card details
 * @example -
 * ```
 * updateContainerVisibility(adapativeCardDetails, comboCardDetails)
 * ```
 * @returns - adaptive card data
 */
export declare const updateContainerVisibility: (adapativeCardDetails: CopilotAdaptiveCard | CardData, comboCardDetails: ComboCard) => CopilotAdaptiveCard | CardData;
/**
 * Function to add adaptive card data having svgs
 * @param contactId - contactId
 * @param adaptiveCardToAdd - The adaptive card data to add(CcfCopilotData)
 * @param dispatch - The dispatch function to update the state
 * @param aahConfiguration - Optional configuration for the copilot profile
 * @example -
 * ```
 * addAdaptiveCard(contactId, adaptiveCardToAdd, dispatch, aahConfiguration)
 * ```
 */
export declare const addAdaptiveCard: (contactId: string, adaptiveCardToAdd: CcfCopilotData, dispatch: Dispatch<AnyAction>, aahConfiguration?: CopilotProfileConfig) => Promise<void>;
/**
 * Function to replace URLs in the adaptive card data
 * @param adaptiveCardToAdd - CcfCopilotData
 * @returns Updated CcfCopilotData
 * @example -
 * ```
 * replaceAllUrls(adaptiveCardToAdd)
 * ```
 */
export declare const replaceAllUrls: (adaptiveCardToAdd: CcfCopilotData) => CcfCopilotData;
/**
 * Function to get icons from the adaptive card schema.
 * @param adaptiveCardToAdd - CcfCopilotData
 * @returns Array of icons
 * @example -
 * ```
 * getIconsFromSchema(adaptiveCardToAdd)
 * ```
 */
export declare const getIconsFromSchema: (adaptiveCardSchema: CcfCopilotData) => string[];
/**
 * Function to fetch copilot data from index db to rehydrate copilot redux state
 * * @example -
  * ```
  *  fetchCopilotDataFromIndexDB();
  * ```
 */
export declare const fetchCopilotDataFromIndexDB: () => (dispatch: (copilotIndexDBAction: {
    payload: any;
    type: 'ccfCopilotData/rehydrateCopilotState';
}) => void) => Promise<void>;
/**
 * Used to get copilot email generation request status by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getCopilotEmailRequestStatus('123123');
 * ```
 */
export declare const getCopilotEmailRequestStatus: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => any) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => any> & {
    clearCache: () => void;
};
/**
 * Used to get contact history by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getContactHistory('123123');
 * ```
 */
export declare const getContactHistory: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => ContactHistoryData[]) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => ContactHistoryData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Selector to get the task assist form prefilled data for a given contact.
 *
 * This selector retrieves the prefilled data stored in the Redux state
 * by the `getCopilotTaskAssistCardData` action for the specified contact.
 * If no prefilled data exists, it returns `null`.
 *
 * @param caseId - The identifier of the contact/case.
 *
 * @example
 * const prefillData = useSelector(getCopilotTaskAssistCardData('12345'));
 *
 * @returns The `PrefilledData` object if present; otherwise, `null`.
 */
export declare const getCopilotTaskAssistCardData: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => CopilotTaskAssistCardData | null) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => CopilotTaskAssistCardData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Creates a selector to retrieve the current task assist request status for a given case ID.
 *
 * @param caseId - The unique identifier of the case for which to get the task assist request status.
 * @returns A selector function that, when called with the state, returns the current task assist request status
 *          for the specified case ID, or `undefined` if not available.
 *
 * @example
 * ```
 * const status = getIsTaskAssistRequestStatus('123123');
 * ```
 */
export declare const getIsTaskAssistRequestStatus: (caseId: string) => ((state: {
    ccfCopilotData: CcfAgentCopilotData;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfAgentCopilotData) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Initializes and connects the Copilot notification WebSocket, if not already connected.
 *
 * The connection can be *lazy-loaded* based on the `LAZY_LOAD_COPILOT_WEBSOCKET` feature toggle:
 * - When enabled, the WebSocket is only created if localStorage contains at least one key that includes
 *   `"_agentAssistAppConfig"`.
 * - When disabled, the WebSocket is created immediately.
 *
 * The agent identifier used for the connection is controlled by the `MULTI_ACD_WEBSOCKET` feature toggle:
 * - When enabled, `userId` is used as the connection identifier.
 * - When disabled, `icAgentId` is used as the connection identifier.
 *
 * On successful initiation, the function sets the Copilot WS connected flag via `CXoneClient.setCopilotWsConnected(true)`.
 * If the underlying connect call throws, the flag is reset to `false` and the function exits.
 *
 * @param userInfo - Current user context containing `icAgentId`, `userId`, and `icBUId`.
 * @param cxoneConfig - CXone configuration containing the base `aahNotificationWssUri`.
 * @returns void
 */
export declare const setupCopilotWebSocket: (userInfo: UserInfo, cxoneConfig: CXoneConfiguration) => void;
/**
 * Extracts the intent title from a TASK_ASSIST adaptive card.
 * @param card - Adaptive card element to extract the title from.
 * @returns The intent title text if found, otherwise `null`.
 * @example
 * ```
 * const title = getIntentTitle(card);
 * if (title) console.log(title);
 * ```
 */
export declare function getIntentTitle(card: CopilotElement): string;
export {};
