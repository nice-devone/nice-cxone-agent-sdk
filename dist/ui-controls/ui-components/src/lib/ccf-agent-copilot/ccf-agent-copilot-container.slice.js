import { __awaiter, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { getNonIncomingActiveContactInSelectedInteraction } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { AgentCopilotContentType, AgentCopilotCardType, AgentAssistConfigACPParamsKeys, TASK_ASSIST_STATUS } from '@nice-devone/common-sdk';
import { FeatureToggleService, Logger, ValidationUtils, LocalStorageHelper } from '@nice-devone/core-sdk';
import * as ACData from 'adaptivecards-templating';
import { AdaptiveCardType, ContentCurrentStatus, ContainerId, CcfAgentCopilotContainerFunctions, autoSummaryContainers } from './ccf-agent-copilot-helper';
import { toast } from 'react-toastify';
import { CcfAppToastMessage } from '@nice-devone/ui-controls';
import { createContactEndUserRecipients } from '../ccf-editor/ccf-contact-editor.slice';
import React from 'react';
import dayjs from 'dayjs';
import { copilotActionIcons, copilotSentimentIcons, copilotEmailIcons, copilotJourneySummaryIcons, copilotInformationCardIcons, copilotCustomCardsIcons, copilotTaskAssistIcons, copilotAutoSummaryicons, copilotCustomAdaptiveCardIcons } from './ccf-agent-copilot-icons';
import encodeSVG from '../ccf-app-space/ccf-customer-card/ccf-customer-card-contact-history/ccf-encode-svg';
import { DEFAULT_CXA_VERSION } from '../../util/common';
export const CCF_COPILOT_KEY = 'ccfCopilotData';
/**
 * LocalStorage key to override the maximum number of Copilot elements processed per selector.
 * Adheres to performance guidance to cap array scans while allowing runtime tuning.
 */
const COPILOT_MAX_ELEMENTS_KEY = 'COPILOT_MAX_ELEMENTS';
/**
 * Indicates whether the COPILOT_SUGGESTION_LIMIT_TO_CACHE feature toggle is enabled.
 * Used to determine the default maximum number of Copilot elements to cache and process.
 */
let isCopilotSuggestionCacheLimitEnabled = null;
/**
 * Returns the runtime cap for elements processed by selectors.
 * Falls back to MAX_ELEMENTS_DEFAULT when invalid or missing.
 * @example
 * const cap = getMaxElementsCap();
 * // cap is a positive number; defaults to MAX_ELEMENTS_DEFAULT if no valid override is found
 */
function getMaxElementsCap() {
    isCopilotSuggestionCacheLimitEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-agentcopilot-suggestions-limit-csa-52509" /* FeatureToggles.COPILOT_SUGGESTION_LIMIT_TO_CACHE */);
    /**
     * Default cap for elements processed in selectors when no override is present.
     * The effective default is determined by the COPILOT_SUGGESTION_LIMIT_TO_CACHE feature toggle:
     * 6 when the feature toggle is enabled and 200 when it is disabled.
     */
    const MAX_ELEMENTS_DEFAULT = isCopilotSuggestionCacheLimitEnabled ? 6 : 200;
    const stored = LocalStorageHelper.getItem(COPILOT_MAX_ELEMENTS_KEY, false);
    const parsed = typeof stored === 'string' ? parseInt(stored, 10) : Number(stored);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : MAX_ELEMENTS_DEFAULT;
}
export const initialCcfCopilotState = {
    adaptiveCardsData: {
        '0': {
            contactId: '0',
            agentAssistSource: '',
            utcTimestamp: new Date(),
            acpAppElement: undefined,
            acpAppElements: [],
            latestByType: {},
            responseSent: '',
            insertedNBRId: '',
            isNBRAvailable: false,
            isNBROpen: false,
            isResponseInserted: false,
            isFinalSummaryGenerated: false,
            emailCards: [],
            comprehensiveFeedback: {
                guidanceFeedbacks: [],
                contactFeedbackCard: {
                    overallFeedbackTitle: '',
                    feedback: '',
                },
            },
            filterDetails: {
                isFilterApplied: false,
                isFilterCardShown: false,
                shouldOpenFilterPopover: false,
                filters: {},
            },
            isEditorActionPerformed: false,
            isComprehensiveFeedbackSent: false,
            updateComprehensiveCard: false,
            generateComprehensiveCard: false,
            isJourneySummaryExpanded: false,
            contactHistory: [],
            currentTaskAssistRequestStatus: '',
            copilotTaskAssistCardData: {},
            isFinalSummaryRegenerating: false,
            isDecisionTreeOpen: false,
            decisionTreeData: {},
        },
    },
    isCopilotAvailable: true,
};
/**
 * This enum is for private KBAnswer Container
 */
export var PrivateContainer;
(function (PrivateContainer) {
    /**
     * private card title container
     */
    PrivateContainer["INTERNAL_USE_TITLE"] = "internalUseTitle";
})(PrivateContainer || (PrivateContainer = {}));
/**
 * This enum is for filter value types in copilot
 */
export var CopilotFilterValueType;
(function (CopilotFilterValueType) {
    CopilotFilterValueType["DEFAULT"] = "default";
    CopilotFilterValueType["ALL"] = "all";
    CopilotFilterValueType["ACTIVE"] = "active";
    CopilotFilterValueType["PREVIOUS"] = "previous";
})(CopilotFilterValueType || (CopilotFilterValueType = {}));
/**
 * This enum defines the schema order for kbcombo adaptive card containers
 */
export var AdaptiveCardContainerOrder;
(function (AdaptiveCardContainerOrder) {
    AdaptiveCardContainerOrder["KB_ANSWERS"] = "kbAnswers";
    AdaptiveCardContainerOrder["KB_INTERNAL_USE"] = "kbInternalUse";
    AdaptiveCardContainerOrder["FILTERS_USED_CONTAINER"] = "filtersUsedContainer";
    AdaptiveCardContainerOrder["KB_LINKS"] = "kbLinks";
    AdaptiveCardContainerOrder["KB_IMAGES"] = "kbImages";
    AdaptiveCardContainerOrder["KB_PROCESS_STEPS"] = "kbProcessSteps";
    AdaptiveCardContainerOrder["KB_PRIVATE_PROCESS_STEPS"] = "KbPrivateProcessSteps";
})(AdaptiveCardContainerOrder || (AdaptiveCardContainerOrder = {}));
const cxoneClientInstance = CXoneClient.instance;
const validationUtils = new ValidationUtils();
const logger = new Logger('ui-components', 'agentCopilotReduxSlice');
const adaptiveCardIcons = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, copilotSentimentIcons), copilotActionIcons), copilotEmailIcons), copilotJourneySummaryIcons), copilotInformationCardIcons), copilotCustomCardsIcons), copilotTaskAssistIcons), copilotAutoSummaryicons), copilotCustomAdaptiveCardIcons);
export const ccfCopilotSlice = createSlice({
    name: CCF_COPILOT_KEY,
    initialState: initialCcfCopilotState,
    reducers: {
        /**
         * Function to add card data to existing state
         * @param state - CcfCopilotData
         * @example -
         * ```
         * dispatch(addAdaptiveCardData(payload));
         * ```
         * @returns - this returns state
         */
        addAdaptiveCardData(state, action) {
            var _a, _b, _c, _d, _e, _f, _g;
            const caseId = action.payload && Object.keys(action.payload)[0];
            const payloadData = action.payload && Object.values(action.payload)[0];
            const adaptiveCardToAdd = payloadData.acpAppElements;
            const existingAdaptiveCards = [...((_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.acpAppElements) !== null && _b !== void 0 ? _b : [])];
            const adaptiveCardContentType = (_c = adaptiveCardToAdd[0]) === null || _c === void 0 ? void 0 : _c.contentType;
            // Legal Disclosure should appear only once per conversation; ignore duplicates
            if (adaptiveCardContentType === AgentCopilotContentType.DISCLOSURE) {
                const isDisclosureCardPresent = existingAdaptiveCards === null || existingAdaptiveCards === void 0 ? void 0 : existingAdaptiveCards.some((card) => card.contentType === AgentCopilotContentType.DISCLOSURE);
                if (isDisclosureCardPresent) {
                    return state;
                }
            }
            if (existingAdaptiveCards && adaptiveCardContentType === AgentCopilotContentType.SENTIMENT) {
                const sentimentAdaptiveCards = existingAdaptiveCards === null || existingAdaptiveCards === void 0 ? void 0 : existingAdaptiveCards.filter((card) => card.contentType === AgentCopilotContentType.SENTIMENT);
                const lastSentiment = sentimentAdaptiveCards[sentimentAdaptiveCards.length - 1];
                if (lastSentiment &&
                    extractCustomerSentiment(JSON.stringify(lastSentiment)) ===
                        extractCustomerSentiment(JSON.stringify(adaptiveCardToAdd[0]))) {
                    return state;
                }
            }
            if (existingAdaptiveCards && adaptiveCardContentType === AgentCopilotContentType.RT_SUMMARY) {
                const realtTimeSummaryIndex = existingAdaptiveCards.findIndex((card) => card.contentType === AgentCopilotContentType.RT_SUMMARY);
                realtTimeSummaryIndex > -1 && existingAdaptiveCards.splice(realtTimeSummaryIndex, 1);
            }
            let emailCardsData = (_e = (_d = state.adaptiveCardsData[caseId]) === null || _d === void 0 ? void 0 : _d.emailCards) !== null && _e !== void 0 ? _e : [];
            if (existingAdaptiveCards && adaptiveCardContentType === AgentCopilotContentType.EMAIL_RESPONSE_CARD) {
                const existingEmailCards = existingAdaptiveCards.findIndex((card) => (card.contentType === AgentCopilotContentType.EMAIL_CREATION_CARD));
                existingEmailCards > -1 && existingAdaptiveCards.splice(existingEmailCards, 1);
            }
            if (existingAdaptiveCards && adaptiveCardContentType === AgentCopilotContentType.COMPREHENSIVE_FEEDBACK) {
                const existingComprehensiveCards = existingAdaptiveCards.findIndex((card) => (card.contentType === AgentCopilotContentType.COMPREHENSIVE_FEEDBACK));
                existingComprehensiveCards > -1 && existingAdaptiveCards.splice(existingComprehensiveCards, 1);
            }
            if (existingAdaptiveCards && adaptiveCardContentType === AgentCopilotContentType.JOURNEY_SUMMARY) {
                const journeySummaryCardIndex = existingAdaptiveCards.findIndex((card) => (card.contentType === AgentCopilotContentType.JOURNEY_SUMMARY));
                journeySummaryCardIndex > -1 && existingAdaptiveCards.splice(journeySummaryCardIndex, 1);
            }
            let isFinalSummaryRegenerating = false;
            if (adaptiveCardContentType === AgentCopilotContentType.FINAL_SUMMARY_NOTES)
                isFinalSummaryRegenerating = true;
            let cardUpdated = false;
            let updatedAdaptiveCards = existingAdaptiveCards.map((card) => {
                var _a, _b;
                // Handle FINAL_SUMMARY_NOTES regeneration with simple replacement
                if (card.contentType === AgentCopilotContentType.FINAL_SUMMARY_NOTES && isFinalSummaryRegenerating) {
                    cardUpdated = true;
                    return adaptiveCardToAdd[0];
                }
                // Handle objectId matching with content merging
                if (card.objectId === ((_a = adaptiveCardToAdd[0]) === null || _a === void 0 ? void 0 : _a.objectId)) {
                    cardUpdated = true;
                    const existingContent = card.content || {};
                    const newContent = ((_b = adaptiveCardToAdd[0]) === null || _b === void 0 ? void 0 : _b.content) || {};
                    const mergedContent = Object.assign(Object.assign({}, existingContent), newContent);
                    // Special handling for body array - maintain schema order
                    if (Array.isArray(existingContent === null || existingContent === void 0 ? void 0 : existingContent.body) && Array.isArray(newContent === null || newContent === void 0 ? void 0 : newContent.body)) {
                        // Use enum values for schema order
                        const schemaOrder = Object.values(AdaptiveCardContainerOrder);
                        const existingItemsMap = new Map();
                        const newItemsMap = new Map();
                        existingContent.body.forEach((item) => {
                            if (item.id) {
                                existingItemsMap.set(item.id, item);
                            }
                        });
                        newContent.body.forEach((item) => {
                            if (item.id) {
                                newItemsMap.set(item.id, item);
                            }
                        });
                        const mergedBody = [];
                        schemaOrder.forEach(containerId => {
                            const newItem = newItemsMap.get(containerId);
                            const existingItem = existingItemsMap.get(containerId);
                            if (newItem && existingItem) {
                                // If new item is hidden but existing is visible, preserve existing
                                if (newItem.isVisible === false && existingItem.isVisible === true) {
                                    mergedBody.push(existingItem);
                                }
                                else {
                                    // Use new item (default behavior - new data should update)
                                    mergedBody.push(newItem);
                                }
                                newItemsMap.delete(containerId);
                                existingItemsMap.delete(containerId);
                            }
                            else if (newItem) {
                                mergedBody.push(newItem);
                                newItemsMap.delete(containerId);
                            }
                            else if (existingItem) {
                                mergedBody.push(existingItem);
                                existingItemsMap.delete(containerId);
                            }
                        });
                        // Add any remaining new items (not in schema order)
                        newItemsMap.forEach(item => mergedBody.push(item));
                        // Add any remaining existing items (not in schema order)
                        existingItemsMap.forEach(item => mergedBody.push(item));
                        mergedContent.body = mergedBody;
                    }
                    if (Array.isArray(existingContent.actions) && Array.isArray(newContent.actions)) {
                        mergedContent.actions = [...existingContent.actions, ...newContent.actions];
                    }
                    const mergedCard = Object.assign(Object.assign(Object.assign({}, card), adaptiveCardToAdd[0]), { content: mergedContent });
                    return mergedCard;
                }
                return card;
            });
            if (!cardUpdated) {
                if (adaptiveCardContentType === AgentCopilotContentType.DISCLOSURE) {
                    // First-time disclosure: add once (prepend to keep visibility priority)
                    updatedAdaptiveCards = [adaptiveCardToAdd[0], ...existingAdaptiveCards];
                }
                else {
                    updatedAdaptiveCards = [...existingAdaptiveCards, ...adaptiveCardToAdd];
                }
            }
            // Enforce write-time cap and set fast-path singular element
            const cap = getMaxElementsCap();
            const cappedAdaptiveCards = updatedAdaptiveCards.slice(-cap);
            const latestElement = cappedAdaptiveCards[cappedAdaptiveCards.length - 1];
            const updatedCopilotContactDetails = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { contactId: payloadData.contactId, agentAssistSource: payloadData.agentAssistSource, utcTimestamp: payloadData.utcTimestamp, acpAppElement: latestElement, acpAppElements: cappedAdaptiveCards, latestByType: Object.assign(Object.assign({}, ((_g = (_f = state.adaptiveCardsData[caseId]) === null || _f === void 0 ? void 0 : _f.latestByType) !== null && _g !== void 0 ? _g : {})), (adaptiveCardContentType && adaptiveCardToAdd[0] ? { [adaptiveCardContentType]: adaptiveCardToAdd[0] } : {})), isFinalSummaryGenerated: adaptiveCardContentType === AgentCopilotContentType.FINAL_SUMMARY_NOTES || false, isFinalSummaryRegenerating, emailCards: emailCardsData }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb && setCopilotIndexDb(updatedCopilotContactDetails.adaptiveCardsData);
            return updatedCopilotContactDetails;
        },
        /**
         * Function to add email adaptive card data
         * @param state - CcfCopilotData
         * @example -
         * ```
         * dispatch(addEmailAdaptiveCardData(payload));
         * ```
         * @returns - this returns state
         */
        addEmailAdaptiveCardData(state, action) {
            var _a, _b, _c, _d, _e;
            const caseId = action.payload && Object.keys(action.payload)[0];
            const payloadData = action.payload && Object.values(action.payload)[0];
            const adaptiveCardToAdd = payloadData.acpAppElements;
            const existingAdaptiveCards = [...((_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.acpAppElements) !== null && _b !== void 0 ? _b : [])];
            const updatedCopilotContactDetails = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { contactId: payloadData.contactId, agentAssistSource: payloadData.agentAssistSource, utcTimestamp: payloadData.utcTimestamp, emailCards: adaptiveCardToAdd, acpAppElements: existingAdaptiveCards, latestByType: Object.assign(Object.assign({}, ((_d = (_c = state.adaptiveCardsData[caseId]) === null || _c === void 0 ? void 0 : _c.latestByType) !== null && _d !== void 0 ? _d : {})), { [(_e = adaptiveCardToAdd[0]) === null || _e === void 0 ? void 0 : _e.contentType]: adaptiveCardToAdd[0] }) }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb && setCopilotIndexDb(updatedCopilotContactDetails.adaptiveCardsData);
            return updatedCopilotContactDetails;
        },
        /**
         * Function to update email adaptive card data in existing state
         * @param state - CcfCopilotData
         * @example -
         * ```
         * dispatch(updateAdaptiveCardsEmail(payload));
         * ```
         * @returns - this returns state
         */
        updateAdaptiveCardsEmail(state, action) {
            var _a, _b;
            const caseId = action.payload;
            const existingAdaptiveCards = state.adaptiveCardsData[caseId] === undefined ? [] : [...state.adaptiveCardsData[caseId].acpAppElements];
            if (existingAdaptiveCards) {
                const existingEmailCards = existingAdaptiveCards.findIndex((card) => (card.contentType === AgentCopilotContentType.EMAIL_CREATION_CARD));
                existingEmailCards > -1 && existingAdaptiveCards.splice(existingEmailCards, 1);
            }
            const existingEmailCard = (_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.emailCards) !== null && _b !== void 0 ? _b : [];
            const updatedCopilotContactDetails = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { acpAppElements: [...existingAdaptiveCards, ...existingEmailCard] }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb && setCopilotIndexDb(updatedCopilotContactDetails.adaptiveCardsData);
            return updatedCopilotContactDetails;
        },
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
        setNextBestResponse(state, action) {
            var _a, _b, _c, _d;
            const caseId = Object.keys(action.payload)[0];
            const payloadData = Object.values(action.payload)[0];
            const responsesToAdd = payloadData.acpAppElements[0];
            const existingAssistElements = state.adaptiveCardsData[caseId] === undefined
                ? []
                : (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.acpAppElements;
            const updatedItems = existingAssistElements === null || existingAssistElements === void 0 ? void 0 : existingAssistElements.filter((item) => !(item === null || item === void 0 ? void 0 : item.contentType.includes(AgentCopilotContentType === null || AgentCopilotContentType === void 0 ? void 0 : AgentCopilotContentType.NEXT_BEST_RESPONSE)));
            const cap = getMaxElementsCap();
            const cappedItems = (_b = updatedItems === null || updatedItems === void 0 ? void 0 : updatedItems.slice(-cap)) !== null && _b !== void 0 ? _b : [];
            const latest = responsesToAdd;
            const updatedCopilotContactDetails = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { contactId: payloadData.contactId, agentAssistSource: payloadData.agentAssistSource, utcTimestamp: payloadData.utcTimestamp, acpAppElement: latest, acpAppElements: [...cappedItems, latest].slice(-cap), latestByType: Object.assign(Object.assign({}, ((_d = (_c = state.adaptiveCardsData[caseId]) === null || _c === void 0 ? void 0 : _c.latestByType) !== null && _d !== void 0 ? _d : {})), { [latest.contentType]: latest }), isNBRAvailable: true }) }) });
            return updatedCopilotContactDetails;
        },
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
        setCurrentRequestStatus(state, action) {
            var _a, _b, _c, _d;
            const caseId = Object.keys(action.payload)[0];
            const payloadData = Object.values(action.payload)[0];
            const currentRequestStatus = payloadData.acpAppElements[0];
            const existingAssistElements = state.adaptiveCardsData[caseId] === undefined
                ? []
                : (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.acpAppElements;
            const updatedItems = existingAssistElements === null || existingAssistElements === void 0 ? void 0 : existingAssistElements.filter((item) => { var _a; return !((_a = item === null || item === void 0 ? void 0 : item.contentType) === null || _a === void 0 ? void 0 : _a.includes(AgentCopilotContentType === null || AgentCopilotContentType === void 0 ? void 0 : AgentCopilotContentType.COPILOT_REQUEST_STATUS)); });
            const maxElementsCap = getMaxElementsCap();
            const cappedItems = (_b = updatedItems === null || updatedItems === void 0 ? void 0 : updatedItems.slice(-maxElementsCap)) !== null && _b !== void 0 ? _b : [];
            const latestStatus = currentRequestStatus;
            const updatedCopilotContactDetails = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { contactId: payloadData.contactId, agentAssistSource: payloadData.agentAssistSource, utcTimestamp: payloadData.utcTimestamp, acpAppElement: latestStatus, 
                        // Keep only a single latest status entry; other non-status elements are preserved
                        acpAppElements: [...cappedItems, latestStatus], latestByType: Object.assign(Object.assign({}, ((_d = (_c = state.adaptiveCardsData[caseId]) === null || _c === void 0 ? void 0 : _c.latestByType) !== null && _d !== void 0 ? _d : {})), { [latestStatus.contentType]: latestStatus }) }) }) });
            return updatedCopilotContactDetails;
        },
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
        removeNextBestResponse(state, action) {
            var _a;
            const caseId = action.payload;
            const copilotData = state.adaptiveCardsData[caseId];
            const updatedItems = copilotData.acpAppElements.filter((item) => !(item === null || item === void 0 ? void 0 : item.contentType.includes(AgentCopilotContentType === null || AgentCopilotContentType === void 0 ? void 0 : AgentCopilotContentType.NEXT_BEST_RESPONSE)));
            const updatedNextBestResponses = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { acpAppElement: updatedItems[updatedItems.length - 1], acpAppElements: updatedItems, latestByType: Object.assign({}, (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.latestByType) }) }) });
            return updatedNextBestResponses;
        },
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
        clearCopilotRequestStatus(state, action) {
            var _a;
            const caseId = action.payload;
            const copilotData = state.adaptiveCardsData[caseId];
            const updatedItems = (_a = copilotData.acpAppElements) === null || _a === void 0 ? void 0 : _a.filter((item) => !(item === null || item === void 0 ? void 0 : item.contentType.includes(AgentCopilotContentType === null || AgentCopilotContentType === void 0 ? void 0 : AgentCopilotContentType.COPILOT_REQUEST_STATUS)));
            const updatedStatus = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { acpAppElements: updatedItems }) }) });
            return updatedStatus;
        },
        /**
         * Clears and removes all copilot data for a specific caseId from Redux and IndexedDB.
         * Call this when a case is unassigned or closed.
         * @example
         * ```ts
         * dispatch(CcfCopilotActions.clearCopilotCaseFromIndexedDb('12345'));
         * ```
         */
        clearCopilotCaseFromIndexedDb(state, action) {
            const caseId = action.payload;
            const _a = state.adaptiveCardsData, _b = caseId, _removed = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            const updated = Object.assign(Object.assign({}, state), { adaptiveCardsData: rest });
            const { removeCaseIdFromCopilotIndexDb } = cxoneClientInstance.copilotService;
            // Persist deletion by removing only the caseId from IndexedDB to avoid rewriting the whole map.
            removeCaseIdFromCopilotIndexDb && removeCaseIdFromCopilotIndexDb(caseId);
            return updated;
        },
        /**
         * updating responseSent state value after agent send text in editor
         * @param state - CcfCopilotData
         * @param action  - `PayloadAction<{ response: string; caseId: string }>`
         * @example -
         * ```
         * dispatch(updateSentBestResponse(@param))
         * ```
         */
        updateSentBestResponse(state, action) {
            const caseId = action.payload.caseId;
            const updatedResponseSentState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { responseSent: action.payload.response }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            action.payload.response.length === 0 && setCopilotIndexDb && setCopilotIndexDb(updatedResponseSentState.adaptiveCardsData);
            return updatedResponseSentState;
        },
        /**
         * updating isResponseInserted state value after sent out reply
         * @param state - CcfCopilotData
         * @param action - PayloadAction<boolean>
         * @example -
         * ```
         * dispatch(updateIsBestResponseSent(@param))
         * ```
         */
        updateIsBestResponseSent(state, action) {
            var _a, _b;
            const caseId = (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.caseId;
            const updatedResponseSentState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { isResponseInserted: (_b = action === null || action === void 0 ? void 0 : action.payload) === null || _b === void 0 ? void 0 : _b.isResponseInserted }) }) });
            return updatedResponseSentState;
        },
        /**
         * rehydrate state from index db data
         * @param state - CcfCopilotData
         * @param action - PayloadAction<CcfCopilotData>
         * @example -
         * ```
         * dispatch(rehydrateCopilotState(payload))
         * ```
         */
        rehydrateCopilotState(state, action) {
            const nextState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), action.payload) });
            return nextState;
        },
        /**
         * updating isCopilotAvailable state value
         * @param state - CcfCopilotData
         * @param action - PayloadAction<boolean>
         * @example -
         * ```
         * dispatch(setCopilotStatus(@param))
         * ```
         */
        setCopilotStatus(state, action) {
            const updatedState = Object.assign(Object.assign({}, state), { isCopilotAvailable: action.payload });
            return updatedState;
        },
        /**
         * updating isCopilotAvailable state value
         * @param state - CcfCopilotData
         * @param action - PayloadAction<boolean>
         * @example -
         * ```
         * dispatch(updateAdaptiveCardSchema(@param))
         * ```
         */
        updateAdaptiveCardSchema(state, action) {
            var _a, _b, _c, _d;
            const { updatedCopilotCard, caseId, cardId, containerId, containerCardId } = action.payload;
            const copilotData = state.adaptiveCardsData[caseId];
            const adaptiveCardsData = [];
            const textCardsData = [];
            copilotData.acpAppElements.forEach((item) => {
                if (item.cardType === AgentCopilotCardType.ADAPTIVE_CARD)
                    adaptiveCardsData.push(item);
                else
                    textCardsData.push(item);
            });
            const updatedElements = adaptiveCardsData.map((element, index) => {
                if (index === cardId) {
                    let updatedBody = element.content.body.map((container) => {
                        var _a, _b, _c, _d, _e, _f;
                        let internalUseTitleIndex = -1;
                        if (containerId === ContainerId.KB_INTERNAL) {
                            internalUseTitleIndex = (_b = (_a = container === null || container === void 0 ? void 0 : container.items) === null || _a === void 0 ? void 0 : _a.findIndex(element => element.id === PrivateContainer.INTERNAL_USE_TITLE)) !== null && _b !== void 0 ? _b : -1;
                            (_c = container === null || container === void 0 ? void 0 : container.items) === null || _c === void 0 ? void 0 : _c.find(item => item.id === ContainerId.INTERNAL_USE_CONTAINER);
                        }
                        if (containerId === ContainerId.COMPREHENSIVE_FEEDBACK_CONTAINER) {
                            if ((container === null || container === void 0 ? void 0 : container.id) === containerCardId) {
                                return Object.assign(Object.assign({}, container), { items: [...updatedCopilotCard] });
                            }
                        }
                        if (((_d = container === null || container === void 0 ? void 0 : container.id) === null || _d === void 0 ? void 0 : _d.includes(containerId)) && container.type === AdaptiveCardType.CONTAINER) {
                            if (((_e = container === null || container === void 0 ? void 0 : container.id) === null || _e === void 0 ? void 0 : _e.includes(ContainerId.KB_INTERNAL)) && internalUseTitleIndex > -1 && updatedCopilotCard.findIndex(copilotCard => copilotCard.id === PrivateContainer.INTERNAL_USE_TITLE) === -1) {
                                return Object.assign(Object.assign({}, container), { items: [(_f = container === null || container === void 0 ? void 0 : container.items) === null || _f === void 0 ? void 0 : _f.find(element => element.id === PrivateContainer.INTERNAL_USE_TITLE), ...updatedCopilotCard] });
                            }
                            return Object.assign(Object.assign({}, container), { items: [...updatedCopilotCard] });
                        }
                        return container;
                    });
                    if (containerId === ContainerId.REPLY_GENERATING_CONTAINER || containerId === ContainerId.SHOW_TOPIC_CONTAINER || containerId === ContainerId.JOURNEY_SUMMARY || containerId === ContainerId.AUTO_SUMMARY_CONTAINER) {
                        updatedBody = updatedCopilotCard;
                    }
                    return Object.assign(Object.assign({}, element), { content: Object.assign(Object.assign({}, element.content), { body: updatedBody }) });
                }
                return element;
            });
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { acpAppElements: [...textCardsData, ...updatedElements], isJourneySummaryExpanded: (_a = action.payload.isJourneySummaryExpanded) !== null && _a !== void 0 ? _a : false, isAutoSummaryExpanded: (_d = (_b = action.payload.isAutoSummaryExpanded) !== null && _b !== void 0 ? _b : (_c = state.adaptiveCardsData[caseId]) === null || _c === void 0 ? void 0 : _c.isAutoSummaryExpanded) !== null && _d !== void 0 ? _d : false }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb && setCopilotIndexDb(updatedState.adaptiveCardsData);
            return updatedState;
        },
        /**
         * Function to set error toast message
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setToastErrorMessage(`{ errorMessage: error }`));
         * @returns
         */
        setToastErrorMessage(_state, action) {
            var _a;
            const errorMessage = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.titleMessage;
            if (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.includes('Array should have at least 1 items')) {
                toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "outboundReplyGenericError" }), {
                    autoClose: 5000,
                    containerId: 'ComponentToastContainer',
                });
            }
            else {
                toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: errorMessage ? 'outboundReplyError' : 'outboundReplyGenericError', extraArgs: { format: errorMessage ? [errorMessage] : [] } }), {
                    autoClose: 5000,
                    containerId: 'ComponentToastContainer',
                });
            }
        },
        /**
         * set insertedNBRId state value
         * @param state - CcfCopilotData
         * @param action - PayloadAction<boolean>
         * @example -
         * ```
         * dispatch(setInsertedNBRId(@param))
         * ```
         */
        setInsertedNBRId(state, action) {
            var _a, _b;
            const caseId = (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.caseId;
            const updatedResponseSentState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { insertedNBRId: (_b = action === null || action === void 0 ? void 0 : action.payload) === null || _b === void 0 ? void 0 : _b.insertedNBRId }) }) });
            return updatedResponseSentState;
        },
        /**
         * set isNBRAvailable state value
         * @param state - CcfCopilotData
         * @param action - PayloadAction<boolean>
         * @example -
         * ```
         * dispatch(setIsNBRAvailable(@param))
         * ```
         */
        setIsNBRAvailable(state, action) {
            var _a, _b;
            const caseId = (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.caseId;
            const updatedResponseSentState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { isNBRAvailable: (_b = action === null || action === void 0 ? void 0 : action.payload) === null || _b === void 0 ? void 0 : _b.isNBRAvailable }) }) });
            return updatedResponseSentState;
        },
        /**
         * set isNBROpen state value
         * @param state - CcfCopilotData
         * @param action - PayloadAction<boolean>
         * @example -
         * ```
         * dispatch(setsetIsNBROpen(@param))
         * ```
         */
        setIsNBROpen(state, action) {
            var _a, _b;
            const caseId = (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.caseId;
            const updatedResponseSentState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { isNBROpen: (_b = action === null || action === void 0 ? void 0 : action.payload) === null || _b === void 0 ? void 0 : _b.isNBROpen }) }) });
            return updatedResponseSentState;
        },
        /**
         * updating feedbackData state value after Like/Dislike or KbAnswer feedback is not selected
         * @param state - CcfCopilotData
         * @param action - `PayloadAction<{ feedback: string; caseId: string; objectId: string; contactId: string; agentId: string; agentContactId: string, title: string, utteranceId: string, kbAnswerUid: string }>`
         * @example -
         * ```
         * dispatch(updateFeedbackData(@param))
         * ```
         */
        updateFeedbackData(state, action) {
            var _a, _b, _c, _d, _e, _f;
            const { feedback, caseId, contactId, objectId, agentId, agentContactId, title, utteranceId, kbAnswerUid } = action.payload;
            const cxoneClientInstance = CXoneClient.instance;
            const allExistingComprehensiveFeedbackData = [...((_b = (_a = state.adaptiveCardsData[caseId].comprehensiveFeedback) === null || _a === void 0 ? void 0 : _a.guidanceFeedbacks) !== null && _b !== void 0 ? _b : [])];
            const allExistingOverallSubcardData = Object.assign({}, ((_d = (_c = state.adaptiveCardsData[caseId].comprehensiveFeedback) === null || _c === void 0 ? void 0 : _c.contactFeedbackCard) !== null && _d !== void 0 ? _d : {}));
            const existingFeedbackObject = (_e = allExistingComprehensiveFeedbackData.find(obj => obj.objectId === objectId)) !== null && _e !== void 0 ? _e : {};
            const updatedUtteranceId = utteranceId !== null && utteranceId !== void 0 ? utteranceId : existingFeedbackObject.utteranceId;
            const updatedKbAnswerUid = kbAnswerUid !== null && kbAnswerUid !== void 0 ? kbAnswerUid : existingFeedbackObject === null || existingFeedbackObject === void 0 ? void 0 : existingFeedbackObject.kbAnswerUid;
            const updatedFeedback = {
                feedback,
                caseId,
                objectId,
                contactId,
                agentId,
                agentContactId,
                title,
                utteranceId: updatedUtteranceId !== null && updatedUtteranceId !== void 0 ? updatedUtteranceId : '',
                kbAnswerUid: updatedKbAnswerUid !== null && updatedKbAnswerUid !== void 0 ? updatedKbAnswerUid : '',
            };
            const comprehensiveCardFeedbacks = [];
            if (allExistingComprehensiveFeedbackData) {
                const existingComprehensiveCards = allExistingComprehensiveFeedbackData.findIndex(comprehensiveFeedback => (comprehensiveFeedback.objectId === objectId));
                existingComprehensiveCards > -1 && allExistingComprehensiveFeedbackData.splice(existingComprehensiveCards, 1);
                if (title && objectId && updatedKbAnswerUid) {
                    comprehensiveCardFeedbacks.push(updatedFeedback);
                }
            }
            const updatedResponseSentState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { comprehensiveFeedback: {
                            contactFeedbackCard: {
                                overallFeedbackTitle: 'Overall Experience',
                                feedback: (_f = allExistingOverallSubcardData === null || allExistingOverallSubcardData === void 0 ? void 0 : allExistingOverallSubcardData.feedback) !== null && _f !== void 0 ? _f : '',
                            },
                            guidanceFeedbacks: [...allExistingComprehensiveFeedbackData, ...comprehensiveCardFeedbacks],
                        } }) }) });
            const { sendGuidanceFeedback, setCopilotIndexDb } = cxoneClientInstance.copilotService;
            feedback && updatedKbAnswerUid && sendGuidanceFeedback && sendGuidanceFeedback([{ feedback, utteranceId: updatedUtteranceId !== null && updatedUtteranceId !== void 0 ? updatedUtteranceId : '', kbAnswerUid: updatedKbAnswerUid !== null && updatedKbAnswerUid !== void 0 ? updatedKbAnswerUid : '', contactId: caseId, objectId, agentId, agentContactId, title }]);
            setCopilotIndexDb && setCopilotIndexDb(updatedResponseSentState.adaptiveCardsData);
            return updatedResponseSentState;
        },
        /**
         * Add overall subcard data if no cardsa re geenrated
         * @param state - CcfCopilotData
         * @param action - Payload<string>
         * @example -
         * ```
         * dispatch(addOverallSubcardData(@param))
         * ```
         */
        addOverallSubcardData(state, action) {
            var _a;
            const { contactId } = action.payload;
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [contactId]: Object.assign(Object.assign({}, state.adaptiveCardsData[contactId]), { comprehensiveFeedback: Object.assign(Object.assign({}, (_a = state.adaptiveCardsData[contactId]) === null || _a === void 0 ? void 0 : _a.comprehensiveFeedback), { contactFeedbackCard: {
                                overallFeedbackTitle: 'Overall Experience',
                                feedback: '',
                            } }) }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb && setCopilotIndexDb(updatedState.adaptiveCardsData);
            return updatedState;
        },
        /**
         * set isEditorActionPerformed state value
         * @param state - CcfCopilotData
         * @param action - PayloadAction<boolean>
         * @example -
         * ```
         * dispatch(setIsEditorActionPerformed(@param))
         * ```
         */
        setIsEditorActionPerformed(state, action) {
            var _a, _b;
            const caseId = (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.caseId;
            const updatedResponseSentState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { isEditorActionPerformed: (_b = action === null || action === void 0 ? void 0 : action.payload) === null || _b === void 0 ? void 0 : _b.isEditorActionPerformed }) }) });
            return updatedResponseSentState;
        },
        /**
         * updating subcards property of comprehensiveFeedback state value after call/chat is closed
         * @param state - CcfCopilotData
         * @param action - PayloadAction<GuidanceFeedbackData>
         * @example -
         * ```
         * dispatch(updateComprehensiveSubcardsFeedback(@param))
         * ```
         */
        updateComprehensiveSubcardsFeedback(state, action) {
            var _a, _b, _c, _d, _e;
            const { caseId, feedbackData } = action.payload;
            const existingComprehensiveSubcardsFeedbackData = [...((_c = (_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.comprehensiveFeedback) === null || _b === void 0 ? void 0 : _b.guidanceFeedbacks) !== null && _c !== void 0 ? _c : [])];
            if (existingComprehensiveSubcardsFeedbackData.length > 0) {
                const feedbackObjectIndex = existingComprehensiveSubcardsFeedbackData.findIndex(item => item.objectId === feedbackData.objectId);
                if (feedbackObjectIndex > -1) {
                    existingComprehensiveSubcardsFeedbackData[feedbackObjectIndex] = feedbackData;
                }
            }
            const updatedResponseSentState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { comprehensiveFeedback: {
                            contactFeedbackCard: Object.assign({}, (_e = (_d = state.adaptiveCardsData[caseId]) === null || _d === void 0 ? void 0 : _d.comprehensiveFeedback) === null || _e === void 0 ? void 0 : _e.contactFeedbackCard),
                            guidanceFeedbacks: existingComprehensiveSubcardsFeedbackData,
                        } }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb && setCopilotIndexDb(updatedResponseSentState.adaptiveCardsData);
            return updatedResponseSentState;
        },
        /**
         * updating contactFeedbackCard property of comprehensiveFeedback state value after call/chat is closed
         * @param state - CcfCopilotData
         * @param action - PayloadAction<GuidanceFeedbackData>
         * @example -
         * ```
         * dispatch(updateOverSubcardsFeedback(@param))
         * ```
         */
        updateOverSubcardsFeedback(state, action) {
            var _a, _b;
            const { caseId, feedback, comment } = action.payload;
            const updatedResponseSentState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { comprehensiveFeedback: {
                            contactFeedbackCard: Object.assign(Object.assign({}, (_a = state.adaptiveCardsData[caseId].comprehensiveFeedback) === null || _a === void 0 ? void 0 : _a.contactFeedbackCard), { feedback: feedback !== null && feedback !== void 0 ? feedback : '', comment: comment !== null && comment !== void 0 ? comment : '' }),
                            guidanceFeedbacks: [...(((_b = state.adaptiveCardsData[caseId].comprehensiveFeedback) === null || _b === void 0 ? void 0 : _b.guidanceFeedbacks) || [])],
                        } }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb && setCopilotIndexDb(updatedResponseSentState.adaptiveCardsData);
            return updatedResponseSentState;
        },
        /**
         * updating isJourneySummaryExpanded state value
         * @param state - CcfCopilotData
         * @param action - PayloadAction<boolean>
         * @example -
         * ```
         * dispatch(updateIsJourneySummaryExpanded(@param))
         * ```
         */
        updateIsJourneySummaryExpanded(state, action) {
            const { caseId, isJourneySummaryExpanded } = action.payload;
            const updatedResponseState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { isJourneySummaryExpanded }) }) });
            return updatedResponseState;
        },
        /**
         * updating filters data isFilterApplied
         * @param state - CcfCopilotData
         * @param action - `PayloadAction<{caseId: string, isFilterApplied: boolean}>`
         * @example -
         * ```
         * dispatch(setFilterStatusForCase(@param))
         * ```
         */
        setFilterStatusForCase(state, action) {
            var _a;
            const { caseId, isFilterApplied } = action.payload;
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { filterDetails: Object.assign(Object.assign({}, (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.filterDetails), { isFilterApplied }) }) }) });
            return updatedState;
        },
        /**
         * updating filters data shouldOpenFilterPopover
         * @param state - CcfCopilotData
         * @param action - `PayloadAction<{caseId: string, shouldOpenFilterPopover: boolean}>`
         * @example -
         * ```
         * dispatch(setShouldOpenFilterPopoverForCase(@param))
         * ```
         */
        setShouldOpenFilterPopoverForCase(state, action) {
            var _a;
            const { caseId, shouldOpenFilterPopover } = action.payload;
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { filterDetails: Object.assign(Object.assign({}, (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.filterDetails), { shouldOpenFilterPopover }) }) }) });
            return updatedState;
        },
        /**
         * updating adaptive cards by removing filter card and setting isFilterCardShown to true, so that filter card is only displayed one time
         * @param state - CcfCopilotData
         * @param action - `PayloadAction<{caseId: string, isFilterCardShown: boolean}>`
         * @example -
         * ```
         * dispatch(updateAndHideFilterCard(@param))
         * ```
         */
        updateAndHideFilterCard(state, action) {
            var _a;
            const { caseId, isFilterCardShown } = action.payload;
            const copilotData = state.adaptiveCardsData[caseId];
            const updatedItems = copilotData.acpAppElements.filter((item) => !(item === null || item === void 0 ? void 0 : item.contentType.includes(AgentCopilotContentType === null || AgentCopilotContentType === void 0 ? void 0 : AgentCopilotContentType.COPILOT_FILTER_CARD)));
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { acpAppElements: updatedItems, filterDetails: Object.assign(Object.assign({}, (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.filterDetails), { isFilterCardShown }) }) }) });
            return updatedState;
        },
        /**
         * updating specific filter value set in adaptive cards data
         * @param state - CcfCopilotData
         * @param action - `PayloadAction<{caseId: string, filterType: 'all', filterValues: Array<{ id: string; name: string }>}>`
         * @example -
         * ```
         * dispatch(updateFilterValues(@param))
         * ```
         */
        updateFilterValues(state, action) {
            var _a, _b, _c, _d, _e, _f;
            const { caseId, filterType, filterValues } = action.payload;
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { filterDetails: Object.assign(Object.assign({}, (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.filterDetails), { filters: Object.assign(Object.assign({}, ((_c = (_b = state.adaptiveCardsData[caseId]) === null || _b === void 0 ? void 0 : _b.filterDetails) === null || _c === void 0 ? void 0 : _c.filters) || {}), { [filterType]: Object.assign(Object.assign({}, ((_f = (_e = (_d = state.adaptiveCardsData[caseId]) === null || _d === void 0 ? void 0 : _d.filterDetails) === null || _e === void 0 ? void 0 : _e.filters) === null || _f === void 0 ? void 0 : _f[filterType]) || {}), filterValues) }) }) }) }) });
            return updatedState;
        },
        /**
         * updating all filter values sets in adaptive cards data
         * @param state - CcfCopilotData
         * @param action - `PayloadAction<{caseId: string, filters:FilterValueSets}>`
         * @example -
         * ```
         * dispatch(updateAllFilterValueSets(@param))
         * ```
         */
        updateAllFilterValueSets(state, action) {
            var _a, _b, _c;
            const { caseId, filters } = action.payload;
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { filterDetails: Object.assign(Object.assign({}, (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.filterDetails), { filters: Object.assign(Object.assign({}, ((_c = (_b = state.adaptiveCardsData[caseId]) === null || _b === void 0 ? void 0 : _b.filterDetails) === null || _c === void 0 ? void 0 : _c.filters) || {}), filters) }) }) }) });
            return updatedState;
        },
        /**
         * set isComprehensiveFeedbackSent value
         * @param state - CcfCopilotData
         * @param action - `PayloadAction<{ caseId: string; isComprehensiveFeedbackSent: boolean }>`
         * @example -
         * ```
         * dispatch(setIsComprehensiveFeedbackSent(@param))
         * ```
         */
        setIsComprehensiveFeedbackSent(state, action) {
            const { caseId, isComprehensiveFeedbackSent } = action.payload;
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { isComprehensiveFeedbackSent }) }) });
            return updatedState;
        },
        /**
         * set updateComprehensiveCard value
         * @param state - CcfCopilotData
         * @param action - `PayloadAction<{ caseId: string; updateComprehensiveCard: boolean }>`
         * @example -
         * ```
         * dispatch(reRenderComprehensiveCard(@param))
         * ```
         */
        reRenderComprehensiveCard(state, action) {
            const { caseId, updateComprehensiveCard } = action.payload;
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { updateComprehensiveCard }) }) });
            return updatedState;
        },
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
        removeGenerateEmailCard(state, action) {
            var _a;
            const caseId = action.payload;
            const copilotData = state.adaptiveCardsData[caseId];
            const updatedItems = (_a = copilotData === null || copilotData === void 0 ? void 0 : copilotData.acpAppElements) === null || _a === void 0 ? void 0 : _a.filter((item) => {
                var _a, _b;
                return !(((_a = item === null || item === void 0 ? void 0 : item.contentType) === null || _a === void 0 ? void 0 : _a.includes(AgentCopilotContentType === null || AgentCopilotContentType === void 0 ? void 0 : AgentCopilotContentType.EMAIL_CREATION_CARD)) ||
                    ((_b = item === null || item === void 0 ? void 0 : item.contentType) === null || _b === void 0 ? void 0 : _b.includes(AgentCopilotContentType === null || AgentCopilotContentType === void 0 ? void 0 : AgentCopilotContentType.EMAIL_RESPONSE_CARD)));
            });
            const updatedAdaptiveCards = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { acpAppElements: updatedItems }) }) });
            return updatedAdaptiveCards;
        },
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
        addContactHistory(state, action) {
            const { caseId, contactHistory } = action.payload;
            const updatedAdaptiveCards = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { contactHistory: contactHistory }) }) });
            return updatedAdaptiveCards;
        },
        /**
         * generate comprehensive card value
         * @param state - CcfCopilotData
         * @param action - `PayloadAction<{ caseId: string; generateComprehensiveCard: boolean }>`
         * @example -
         * ```
         * dispatch(generateComprehensiveCard(@param))
         * ```
         */
        generateComprehensiveCard(state, action) {
            const { caseId, generateComprehensiveCard } = action.payload;
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { generateComprehensiveCard }) }) });
            return updatedState;
        },
        /**
         * Set isFinalSummaryGenerated after status is changed to Resolved/Closed
         * @param state - CcfCopilotData
         * @param action - `PayloadAction<{ caseId: string; isFinalSummaryGenerated: boolean }>`
         * @example
         * ```
         * dispatch(setIsFinalSummaryGenerated({ caseId: '123123', isFinalSummaryGenerated: true }))
         * ```
         */
        setIsFinalSummaryGenerated(state, action) {
            const { caseId, isFinalSummaryGenerated } = action.payload;
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { isFinalSummaryGenerated }) }) });
            return updatedState;
        },
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
        setIsTaskAssistRequestCompleted(state, action) {
            const caseId = action.payload.contactId;
            const currentTaskAssistRequestStatus = action.payload.status;
            return Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { currentTaskAssistRequestStatus: currentTaskAssistRequestStatus }) }) });
        },
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
        updateAutoSummaryCardContent(state, action) {
            var _a, _b;
            const { contactId, summary } = action.payload;
            const existingCards = (_b = (_a = state.adaptiveCardsData[contactId]) === null || _a === void 0 ? void 0 : _a.acpAppElements) !== null && _b !== void 0 ? _b : [];
            const updatedCards = existingCards.map((card) => {
                if (card.contentType === AgentCopilotContentType.FINAL_SUMMARY_NOTES) {
                    return Object.assign(Object.assign({}, card), { content: Object.assign(Object.assign({}, card.content), { summary }) });
                }
                return card;
            });
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [contactId]: Object.assign(Object.assign({}, state.adaptiveCardsData[contactId]), { acpAppElements: updatedCards }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb === null || setCopilotIndexDb === void 0 ? void 0 : setCopilotIndexDb(updatedState.adaptiveCardsData);
            return updatedState;
        },
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
        setIsTaskAssistRequestStatus(state, action) {
            const caseId = action.payload.contactId;
            const currentTaskAssistRequestStatus = action.payload.status;
            return Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { currentTaskAssistRequestStatus: currentTaskAssistRequestStatus }) }) });
        },
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
        addTaskAssistStatusCard(state, action) {
            var _a, _b, _c, _d;
            const { contactId: caseId, content } = action.payload;
            if (!content) {
                // Do not add a card if content is undefined
                return;
            }
            const existingAdaptiveCards = (_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.acpAppElements) !== null && _b !== void 0 ? _b : [];
            const taskAssistCard = CcfAgentCopilotContainerFunctions.getAdaptiveCardsByContentType(AgentCopilotContentType.TASK_ASSIST, content);
            const newCard = {
                contentType: AgentCopilotContentType.TASK_ASSIST,
                content: taskAssistCard,
                cardType: AgentCopilotCardType.ADAPTIVE_CARD,
                objectId: content === null || content === void 0 ? void 0 : content.objectId,
                formCapture: false,
            };
            // Check if a card with the same objectId already exists
            // Replace card with same objectId or add new card if not present
            const updatedCardsUncapped = [
                ...existingAdaptiveCards.filter(card => card.objectId !== newCard.objectId),
                newCard
            ];
            const cap = getMaxElementsCap();
            const updatedCards = updatedCardsUncapped.slice(-cap);
            const updatedCopilotContactDetails = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { acpAppElement: newCard, acpAppElements: updatedCards, latestByType: Object.assign(Object.assign({}, ((_d = (_c = state.adaptiveCardsData[caseId]) === null || _c === void 0 ? void 0 : _c.latestByType) !== null && _d !== void 0 ? _d : {})), { [AgentCopilotContentType.TASK_ASSIST]: newCard }) }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb === null || setCopilotIndexDb === void 0 ? void 0 : setCopilotIndexDb(updatedCopilotContactDetails.adaptiveCardsData);
            return updatedCopilotContactDetails;
        },
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
        addTaskAssistFormCard(state, action) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const { contactId: caseId, taskAssistFormData } = action.payload;
            const existingAdaptiveCards = (_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.acpAppElements) !== null && _b !== void 0 ? _b : [];
            if (!taskAssistFormData) {
                return state;
            }
            // Get previous data from state
            const previousData = ((_c = state.adaptiveCardsData[caseId]) === null || _c === void 0 ? void 0 : _c.copilotTaskAssistCardData) || {};
            const taskAssistCard = CcfAgentCopilotContainerFunctions.getAdaptiveCardsByContentType(taskAssistFormData === null || taskAssistFormData === void 0 ? void 0 : taskAssistFormData.intentName, Object.assign(Object.assign({}, ((_d = taskAssistFormData === null || taskAssistFormData === void 0 ? void 0 : taskAssistFormData.data) !== null && _d !== void 0 ? _d : previousData === null || previousData === void 0 ? void 0 : previousData.data)), ((_e = taskAssistFormData === null || taskAssistFormData === void 0 ? void 0 : taskAssistFormData.validationInfo) !== null && _e !== void 0 ? _e : previousData === null || previousData === void 0 ? void 0 : previousData.validationInfo)));
            const newCard = {
                contentType: AgentCopilotContentType.TASK_ASSIST,
                content: taskAssistCard,
                cardType: AgentCopilotCardType.ADAPTIVE_CARD,
                objectId: (_f = taskAssistFormData === null || taskAssistFormData === void 0 ? void 0 : taskAssistFormData.objectId) !== null && _f !== void 0 ? _f : previousData === null || previousData === void 0 ? void 0 : previousData.objectId,
                formCapture: true,
            };
            // Check if a card with the same objectId already exists
            // Replace card with same objectId or add new card if not present
            const updatedCardsUncapped = [
                ...existingAdaptiveCards.filter((card) => card.objectId !== newCard.objectId),
                newCard
            ];
            const cap = getMaxElementsCap();
            const updatedCards = updatedCardsUncapped.slice(-cap);
            const updatedCopilotContactDetails = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { acpAppElement: newCard, acpAppElements: updatedCards, formCapture: true, currentTaskAssistRequestStatus: TASK_ASSIST_STATUS.LOADING, copilotTaskAssistCardData: Object.assign(Object.assign({}, previousData), taskAssistFormData), latestByType: Object.assign(Object.assign({}, ((_h = (_g = state.adaptiveCardsData[caseId]) === null || _g === void 0 ? void 0 : _g.latestByType) !== null && _h !== void 0 ? _h : {})), { [AgentCopilotContentType.TASK_ASSIST]: newCard }) }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb === null || setCopilotIndexDb === void 0 ? void 0 : setCopilotIndexDb(updatedCopilotContactDetails.adaptiveCardsData);
            return updatedCopilotContactDetails;
        },
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
        removeTaskAssistCard(state, action) {
            var _a, _b;
            const { contactId, objectId } = action.payload;
            const existingAdaptiveCards = (_b = (_a = state.adaptiveCardsData[contactId]) === null || _a === void 0 ? void 0 : _a.acpAppElements) !== null && _b !== void 0 ? _b : [];
            const updatedCards = existingAdaptiveCards.filter((card) => {
                return !(card.contentType === AgentCopilotContentType.TASK_ASSIST && card.objectId === objectId);
            });
            const updatedCopilotContactDetails = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [contactId]: Object.assign(Object.assign({}, state.adaptiveCardsData[contactId]), { acpAppElements: updatedCards, currentTaskAssistRequestStatus: 'error' }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb === null || setCopilotIndexDb === void 0 ? void 0 : setCopilotIndexDb(updatedCopilotContactDetails.adaptiveCardsData);
            return updatedCopilotContactDetails;
        },
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
        updateAutoSummaryCard(state, action) {
            var _a;
            const { dispositionNotes, caseId } = action.payload;
            const copilotData = state.adaptiveCardsData[caseId];
            if (!copilotData)
                return state;
            const updatedAcpAppElements = (_a = copilotData === null || copilotData === void 0 ? void 0 : copilotData.acpAppElements) === null || _a === void 0 ? void 0 : _a.map((card) => {
                var _a;
                if (card.contentType === AgentCopilotContentType.FINAL_SUMMARY_NOTES) {
                    const oldContent = card.content;
                    const newBody = Array.isArray(oldContent.body)
                        ? (_a = oldContent === null || oldContent === void 0 ? void 0 : oldContent.body) === null || _a === void 0 ? void 0 : _a.map(item => updateSummaryText(item, dispositionNotes))
                        : oldContent === null || oldContent === void 0 ? void 0 : oldContent.body;
                    return Object.assign(Object.assign({}, card), { content: Object.assign(Object.assign({}, oldContent), { summary: dispositionNotes, body: newBody }) });
                }
                return card;
            });
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, copilotData), { acpAppElements: updatedAcpAppElements }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb && setCopilotIndexDb(updatedState.adaptiveCardsData);
            return updatedState;
        },
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
        expandAutoSummaryCard(state, action) {
            const caseId = action.payload;
            const copilotData = state.adaptiveCardsData[caseId];
            if (!copilotData)
                return state;
            const updatedAcpAppElements = copilotData.acpAppElements.map((card) => {
                if (card.contentType === AgentCopilotContentType.FINAL_SUMMARY_NOTES) {
                    const oldContent = card.content;
                    const bodyCopy = oldContent.body && JSON.parse(JSON.stringify(oldContent.body));
                    const autoSummaryContainer = CcfAgentCopilotContainerFunctions.getContainerById(bodyCopy, ContainerId.AUTO_SUMMARY_CONTAINER);
                    const updatedcard = CcfAgentCopilotContainerFunctions.toggleAutoSummaryHeaderVisibility(autoSummaryContainer);
                    return Object.assign(Object.assign({}, card), { content: Object.assign(Object.assign({}, oldContent), { body: [updatedcard] }) });
                }
                return card;
            });
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, copilotData), { acpAppElements: updatedAcpAppElements, isAutoSummaryExpanded: true }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb && setCopilotIndexDb(updatedState.adaptiveCardsData);
            return updatedState;
        },
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
        setIsAutoSummaryExpanded(state, action) {
            const { caseId, isAutoSummaryExpanded } = action.payload;
            const copilotData = state.adaptiveCardsData[caseId];
            if (!copilotData)
                return state;
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, copilotData), { isAutoSummaryExpanded }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb && setCopilotIndexDb(updatedState.adaptiveCardsData);
            return updatedState;
        },
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
        removeAutoSummaryCard(state, action) {
            var _a, _b;
            const caseId = action.payload;
            const existingAdaptiveCards = (_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.acpAppElements) !== null && _b !== void 0 ? _b : [];
            const updatedCards = existingAdaptiveCards.filter((card) => {
                return (card.contentType !== AgentCopilotContentType.FINAL_SUMMARY_NOTES ||
                    card.objectId.includes('autoSummaryErrorCard'));
            });
            const updatedAdaptiveCards = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { acpAppElements: updatedCards, isAutoSummaryExpanded: false }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb && setCopilotIndexDb(updatedAdaptiveCards.adaptiveCardsData);
            return updatedAdaptiveCards;
        },
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
        addAutoSummaryErrorCard(state, action) {
            var _a, _b, _c, _d;
            const { contactId: caseId, isLoading } = action.payload;
            const existingAdaptiveCards = (_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.acpAppElements) !== null && _b !== void 0 ? _b : [];
            const isFinalSummaryGenerated = (_d = (_c = state.adaptiveCardsData[caseId]) === null || _c === void 0 ? void 0 : _c.isFinalSummaryGenerated) !== null && _d !== void 0 ? _d : [];
            const autoSummaryErrorCardContent = {
                icon: isLoading ? 'AdaptiveCardRetryIcon' : 'AdaptiveCardTaskErrorIcon',
                title: isLoading ? 'adp_retryingAutoSummary' : 'adp_retryAutoSummaryTitlte',
                description: isLoading ? undefined : 'adp_retryAutoSummaryDescription',
                cardBackgroundColor: 'customCardDefaultBackground',
                loading: !!isLoading,
                cardActions: {
                    insert: false,
                    copy: false,
                    retry: !isLoading,
                },
            };
            const finalsummaryErrorCard = CcfAgentCopilotContainerFunctions.getAdaptiveCardsByContentType(AgentCopilotContentType.CUSTOM_CARD, autoSummaryErrorCardContent);
            const updatedfinalsummaryErrorCard = CcfAgentCopilotContainerFunctions.addIsFinalSummaryGenerated(finalsummaryErrorCard, isFinalSummaryGenerated);
            const newCard = {
                contentType: AgentCopilotContentType.FINAL_SUMMARY_NOTES,
                content: updatedfinalsummaryErrorCard,
                cardType: AgentCopilotCardType.ADAPTIVE_CARD,
                objectId: `autoSummaryErrorCard-${new Date().getTime()}`,
            };
            // Check if a FINAL_SUMMARY_NOTES card already exists (by contentType)
            const existingIndex = existingAdaptiveCards.findIndex((card) => card.contentType === AgentCopilotContentType.FINAL_SUMMARY_NOTES);
            let updatedCards;
            if (existingIndex > -1) {
                // Replace the existing card
                updatedCards = [
                    ...existingAdaptiveCards.slice(0, existingIndex),
                    newCard,
                    ...existingAdaptiveCards.slice(existingIndex + 1)
                ];
            }
            else {
                // Add as new card
                updatedCards = [...existingAdaptiveCards, newCard];
            }
            const updatedCopilotContactDetails = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [caseId]: Object.assign(Object.assign({}, state.adaptiveCardsData[caseId]), { acpAppElements: updatedCards }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb === null || setCopilotIndexDb === void 0 ? void 0 : setCopilotIndexDb(updatedCopilotContactDetails.adaptiveCardsData);
            return updatedCopilotContactDetails;
        },
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
        updateDecisionTreeState(state, action) {
            const { contactId, updates } = action.payload;
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [contactId]: Object.assign(Object.assign({}, state.adaptiveCardsData[contactId]), updates) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb === null || setCopilotIndexDb === void 0 ? void 0 : setCopilotIndexDb(updatedState.adaptiveCardsData);
            return updatedState;
        },
        /**
     * Updates only the decision tree sections for a specific contact.
     * Preserves existing sections and appends the new ones.
     * @example
     * ```
     * dispatch(updateDecisionTreeSectionsState({ contactId: '12345', data: { sections: [...] } }));
     * ```
     */
        updateDecisionTreeSectionsState(state, action) {
            var _a;
            const { contactId, updates } = action.payload;
            const updatedState = Object.assign(Object.assign({}, state), { adaptiveCardsData: Object.assign(Object.assign({}, state.adaptiveCardsData), { [contactId]: Object.assign(Object.assign({}, state.adaptiveCardsData[contactId]), { decisionTreeData: Object.assign(Object.assign({}, (_a = state.adaptiveCardsData[contactId]) === null || _a === void 0 ? void 0 : _a.decisionTreeData), updates) }) }) });
            const { setCopilotIndexDb } = cxoneClientInstance.copilotService;
            setCopilotIndexDb === null || setCopilotIndexDb === void 0 ? void 0 : setCopilotIndexDb(updatedState.adaptiveCardsData);
            return updatedState;
        },
        /**
         * Function to return default state for middleware
         * @param state - AgentState
         * @returns It returns default state
         * @example -default()
         */
        default(state) {
            return Object.assign({}, state);
        },
    },
});
/**
 * used to getcopilotDataState
 * @param rootState - CopilotData state
 * @example - const copilotDataState = getcopilotDataState(state)
 */
const getcopilotDataState = (rootState) => {
    return rootState[CCF_COPILOT_KEY];
};
/**
 * Used to get copilot running summary by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * selectRunningSummary('123123');
 * ```
 */
export const selectRunningSummary = (caseId) => createSelector(getcopilotDataState, (state) => {
    var _a;
    const caseData = state.adaptiveCardsData[caseId];
    const latestByType = caseData === null || caseData === void 0 ? void 0 : caseData.latestByType;
    const latestRT = latestByType === null || latestByType === void 0 ? void 0 : latestByType[AgentCopilotContentType.RT_SUMMARY];
    if (latestRT)
        return latestRT;
    const latestElement = caseData === null || caseData === void 0 ? void 0 : caseData.acpAppElement;
    if ((latestElement === null || latestElement === void 0 ? void 0 : latestElement.contentType) === AgentCopilotContentType.RT_SUMMARY) {
        return latestElement;
    }
    return ((_a = caseData === null || caseData === void 0 ? void 0 : caseData.acpAppElements) === null || _a === void 0 ? void 0 : _a.filter((card) => card.contentType === AgentCopilotContentType.RT_SUMMARY).pop()) || null;
});
/**
 * Used to get copilot adaptive cards by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getAdaptiveCards('123123');
 * ```
 */
export const getAdaptiveCards = (caseId) => createSelector(getcopilotDataState, (state) => {
    var _a;
    const acpAppElements = ((_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.acpAppElements) || [];
    const cap = getMaxElementsCap();
    const adaptiveCards = acpAppElements
        .slice(-cap)
        .filter((element) => element.cardType === AgentCopilotCardType.ADAPTIVE_CARD);
    return adaptiveCards;
});
/**
 * Base selector to retrieve case data once and derive other selectors from it.
 * Helps stabilize memoization and reduce repeated state lookups.
 * @example
 * const caseData = useSelector(selectCaseData('123'));
 */
export const selectCaseData = (caseId) => createSelector(getcopilotDataState, (state) => state.adaptiveCardsData[caseId]);
/**
 * Used to get copilot next best responses by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getNextBestResponses('123123');
 * ```
 */
export const getNextBestResponses = (caseId, isACPEnabled = true) => createSelector(getcopilotDataState, (state) => {
    var _a, _b, _c, _d, _e;
    if (!isACPEnabled) {
        return null;
    }
    const latestByType = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.latestByType;
    const latestNbr = latestByType === null || latestByType === void 0 ? void 0 : latestByType[AgentCopilotContentType.NEXT_BEST_RESPONSE];
    if (latestNbr) {
        const content = latestNbr.content;
        const filteredData = (_c = (_b = content === null || content === void 0 ? void 0 : content.nextBestResponses) === null || _b === void 0 ? void 0 : _b.bestResponse) === null || _c === void 0 ? void 0 : _c.filter((nextBestResponse) => nextBestResponse.trim() !== '');
        return filteredData !== null && filteredData !== void 0 ? filteredData : null;
    }
    const acpAppElements = ((_d = state.adaptiveCardsData[caseId]) === null || _d === void 0 ? void 0 : _d.acpAppElements) || {};
    const cap = getMaxElementsCap();
    const nextBestResponses = Object.values(acpAppElements)
        .slice(-cap)
        .filter((element) => { var _a; return (_a = element.contentType) === null || _a === void 0 ? void 0 : _a.includes(AgentCopilotContentType.NEXT_BEST_RESPONSE); });
    if (nextBestResponses.length > 0) {
        const content = nextBestResponses[0].content;
        if (content) {
            const data = {
                nextBestResponses: {
                    type: content.nextBestResponses.type,
                    bestResponse: content.nextBestResponses.bestResponse,
                },
            };
            const filteredData = (_e = data.nextBestResponses.bestResponse) === null || _e === void 0 ? void 0 : _e.filter((nextBestResponse) => nextBestResponse.trim() !== '');
            return filteredData;
        }
    }
    return null;
});
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
export const getNbrObjectDetails = (caseId, isACPEnabled) => createSelector(getcopilotDataState, (state) => {
    var _a, _b, _c;
    if (!isACPEnabled)
        return null;
    const latestByType = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.latestByType;
    const latestNbr = latestByType === null || latestByType === void 0 ? void 0 : latestByType[AgentCopilotContentType.NEXT_BEST_RESPONSE];
    if (latestNbr)
        return (_b = latestNbr.objectId) !== null && _b !== void 0 ? _b : null;
    const acpAppElements = ((_c = state.adaptiveCardsData[caseId]) === null || _c === void 0 ? void 0 : _c.acpAppElements) || {};
    const cap = getMaxElementsCap();
    const nextBestResponses = Object.values(acpAppElements)
        .slice(-cap)
        .filter((element) => element.contentType.includes(AgentCopilotContentType.NEXT_BEST_RESPONSE));
    return nextBestResponses.length > 0 ? nextBestResponses[0].objectId : null;
});
/**
 * Used to get responseSent by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getSentBestResponse('123123');
 * ```
 */
export const getSentBestResponse = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.responseSent; });
/**
 * Used to get isResponseInserted by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsResponseSent('123123');
 * ```
 */
export const getIsResponseSent = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.isResponseInserted; });
/**
 * Used to get currentStatus by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getCopilotRequestStatus('123123');
 * ```
 */
export const getCopilotRequestStatus = (caseId) => createSelector(getcopilotDataState, (state) => {
    var _a, _b;
    const latestByType = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.latestByType;
    const latestReq = latestByType === null || latestByType === void 0 ? void 0 : latestByType[AgentCopilotContentType.COPILOT_REQUEST_STATUS];
    if (latestReq) {
        const content = latestReq.content;
        return (content === null || content === void 0 ? void 0 : content.currentState) === ContentCurrentStatus.IN_PROGRESS ? true : false;
    }
    const acpAppElements = ((_b = state.adaptiveCardsData[caseId]) === null || _b === void 0 ? void 0 : _b.acpAppElements) || {};
    const cap = getMaxElementsCap();
    const currentStateElements = Object.values(acpAppElements)
        .slice(-cap)
        .filter((element) => { var _a; return (_a = element === null || element === void 0 ? void 0 : element.contentType) === null || _a === void 0 ? void 0 : _a.includes(AgentCopilotContentType.COPILOT_REQUEST_STATUS); });
    if (currentStateElements.length > 0) {
        const content = currentStateElements[currentStateElements.length - 1].content;
        if (content) {
            return (content === null || content === void 0 ? void 0 : content.currentState) === ContentCurrentStatus.IN_PROGRESS ? true : false;
        }
    }
    return false;
});
/**
 * Used to get copilot final summary by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * const copilotFinalSummary = useSelector(getFinalSummaryNotes('123123'));
 * ```
 */
export const getFinalSummaryNotes = (caseId, isCopilotAvailable) => createSelector(getcopilotDataState, (state) => {
    var _a, _b, _c, _d, _e;
    if (!isCopilotAvailable)
        return { summary: '' };
    const latestByType = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.latestByType;
    const latestAuto = latestByType === null || latestByType === void 0 ? void 0 : latestByType[AgentCopilotContentType.FINAL_SUMMARY_NOTES];
    const cardContent = (_b = latestAuto === null || latestAuto === void 0 ? void 0 : latestAuto.content) !== null && _b !== void 0 ? _b : (_e = (_d = (_c = state.adaptiveCardsData[caseId]) === null || _c === void 0 ? void 0 : _c.acpAppElements) === null || _d === void 0 ? void 0 : _d.filter((card) => card.contentType === AgentCopilotContentType.FINAL_SUMMARY_NOTES).pop()) === null || _e === void 0 ? void 0 : _e.content;
    if ((cardContent === null || cardContent === void 0 ? void 0 : cardContent.type) === AgentCopilotCardType.FINAL_SUMMARY)
        return cardContent;
    if ((cardContent === null || cardContent === void 0 ? void 0 : cardContent.type) === AgentCopilotCardType.ADAPTIVE_CARD) {
        const summaryColumnSet = cardContent.body
            .filter((container) => container.type === AdaptiveCardType.CONTAINER && Array.isArray(container.items))
            .flatMap((container) => container.items)
            .find((item) => item.type === AdaptiveCardType.COLUMNSET && item.id === autoSummaryContainers.SUMMARY_TEXT);
        if (summaryColumnSet) {
            const summaryTextBlock = summaryColumnSet.columns
                .flatMap((column) => column.items)
                .find((item) => item.type === AdaptiveCardType.TEXTBLOCK && item.id === autoSummaryContainers.FINAL_SUMMARY_TEXT);
            if (summaryTextBlock) {
                return { summary: summaryTextBlock.text };
            }
        }
    }
    return { summary: '' };
});
/**
 * Used to get isCopilotAvailable
 * @example -
 * ```
 * getCopilotStatus();
 * ```
 */
export const getCopilotStatus = () => createSelector(getcopilotDataState, (state) => state === null || state === void 0 ? void 0 : state.isCopilotAvailable);
/**
 * Used to get if acp is enabled
 * @example -
 * ```
 * const { copilotEnabled } = useSelector(isCopilotEnabledForContact);
 * ```
 */
export const isCopilotEnabledForContact = createSelector(getcopilotDataState, getNonIncomingActiveContactInSelectedInteraction || (() => []), (_state, isSelectedContact) => {
    const { getAgentAssistConfig } = cxoneClientInstance.copilotService;
    const isCopilotSupportsContactChannel = getAgentAssistConfig && !!getAgentAssistConfig(`${(isSelectedContact === null || isSelectedContact === void 0 ? void 0 : isSelectedContact.contactId) || (isSelectedContact === null || isSelectedContact === void 0 ? void 0 : isSelectedContact.caseId)}`);
    return {
        copilotEnabled: isCopilotSupportsContactChannel,
    };
});
/**
 * Used to get if ACP is enabled for a  specific disposition/contactId.
 * This is a selector factory; it returns a selector bound to the provided contactId.
 * @example -
 * const contactId = '123';
 * ```
 * const { copilotEnabled } = useSelector(selectHasCopilotConfig(contactId));
 * ```
 */
export const selectHasCopilotConfig = (contactId) => createSelector(getcopilotDataState, () => {
    const { getAgentAssistConfig } = cxoneClientInstance.copilotService;
    const copilotConfigForContact = getAgentAssistConfig && (getAgentAssistConfig === null || getAgentAssistConfig === void 0 ? void 0 : getAgentAssistConfig(`${contactId}`));
    return {
        copilotEnabled: !!copilotConfigForContact,
        copilotConfig: copilotConfigForContact,
    };
});
/**
 * Used to get insertedNBRId by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getInsertedNBRId('123123');
 * ```
 */
export const getInsertedNBRId = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.insertedNBRId; });
/**
 * Used to get isNBRAvailable by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsNBRAvailable('123123');
 * ```
 */
export const getIsNBRAvailable = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.isNBRAvailable; });
/**
 * Used to get isNBROpen by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsNBROpen('123123');
 * ```
 */
export const getIsNBROpen = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.isNBROpen; });
/**
 * Used to get isFinalSummaryGenerated by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsFinalSummaryGenerated('123123');
 * ```
 */
export const getIsFinalSummaryGenerated = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.isFinalSummaryGenerated; });
/**
 * Used to get isFilterApplied by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getFilterStatusForCase('123123');
 * ```
 */
export const getFilterStatusForCase = (caseId) => createSelector(getcopilotDataState, (state) => { var _a, _b, _c; return (_c = (_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.filterDetails) === null || _b === void 0 ? void 0 : _b.isFilterApplied) !== null && _c !== void 0 ? _c : true; });
/**
 * Used to get isFilterCardShown by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsFilterCardShown('123123');
 * ```
 */
export const getIsFilterCardShown = (caseId) => createSelector(getcopilotDataState, (state) => { var _a, _b, _c; return (_c = (_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.filterDetails) === null || _b === void 0 ? void 0 : _b.isFilterCardShown) !== null && _c !== void 0 ? _c : false; });
/**
 * Used to get shouldOpenFilterPopover by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getShouldOpenFilterPopover('123123');
 * ```
 */
export const getShouldOpenFilterPopover = (caseId) => createSelector(getcopilotDataState, (state) => { var _a, _b, _c; return (_c = (_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.filterDetails) === null || _b === void 0 ? void 0 : _b.shouldOpenFilterPopover) !== null && _c !== void 0 ? _c : false; });
/**
 * Used to get isJourneySummary by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsJourneySummaryExpanded('123123');
 * ```
 */
export const getIsJourneySummaryExpanded = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return ((_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.isJourneySummaryExpanded) || false; });
/**
 * Used to get copilot adaptive cards by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getJourneySummaryAdaptiveCard('123123');
 * ```
 */
export const getJourneySummaryAdaptiveCard = (caseId) => createSelector(getcopilotDataState, (state) => {
    const caseData = state.adaptiveCardsData[caseId];
    const latestByType = caseData === null || caseData === void 0 ? void 0 : caseData.latestByType;
    const latestJourney = latestByType === null || latestByType === void 0 ? void 0 : latestByType[AgentCopilotContentType.JOURNEY_SUMMARY];
    if (latestJourney) {
        return [latestJourney];
    }
    const latestElement = caseData === null || caseData === void 0 ? void 0 : caseData.acpAppElement;
    if ((latestElement === null || latestElement === void 0 ? void 0 : latestElement.contentType) === AgentCopilotContentType.JOURNEY_SUMMARY) {
        return [latestElement];
    }
    const acpAppElements = (caseData === null || caseData === void 0 ? void 0 : caseData.acpAppElements) || [];
    return acpAppElements.filter((element) => element.contentType === AgentCopilotContentType.JOURNEY_SUMMARY);
});
/**
 * Used to get  copilotFilterValues by caseId
 * @param caseId - Case Id
 * @param filterType - Filter Type
 * @example -
 * ```
 * getAllCopilotFilterValueSets('123123');
 * ```
 */
export const getAllCopilotFilterValueSets = (caseId) => createSelector(getcopilotDataState, (state) => {
    var _a, _b, _c;
    return ((_c = (_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.filterDetails) === null || _b === void 0 ? void 0 : _b.filters) !== null && _c !== void 0 ? _c : { default: {},
        all: {},
        active: {},
        previous: {},
    });
});
/**
 * Used to get comprehensive feedback Data by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getComprehensiveFeedbackData('123123');
 * ```
 */
export const getComprehensiveFeedbackData = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.comprehensiveFeedback; });
/**
 * Used to get updateComprehensiveCard by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getUpdatedComprehensiveCard('123123');
 * ```
 */
export const getUpdatedComprehensiveCard = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.updateComprehensiveCard; });
/* Agent search is available when enabled in AAH configuration
 * @example -
 * ```
 * const isAgentSearchAvailable = useSelector(isAgentSearchAvailable);
 * ```
 */
export const isAgentSearchAvailable = createSelector(() => [], // We don't need state as we are not consuming anything from it
getNonIncomingActiveContactInSelectedInteraction || (() => []), (_state, isSelectedContact) => {
    var _a, _b;
    const { getAgentAssistConfig } = cxoneClientInstance.copilotService;
    const aAHConfiguration = getAgentAssistConfig && getAgentAssistConfig(`${(isSelectedContact === null || isSelectedContact === void 0 ? void 0 : isSelectedContact.contactId) || (isSelectedContact === null || isSelectedContact === void 0 ? void 0 : isSelectedContact.caseId)}`, true); // Reading data from localStorage
    return (_b = (_a = aAHConfiguration === null || aAHConfiguration === void 0 ? void 0 : aAHConfiguration.Params) === null || _a === void 0 ? void 0 : _a.knowledgeBaseAgentManualQueryInput) !== null && _b !== void 0 ? _b : true; // Default true, if AAHConfiguration not present
});
/**
 * Used to get script params for contact
 * @returns script params value from AAHConfig.
 * @example -
 * ```
 * const flag = getScriptParamsForContact("finalSummary");
 * ```
 */
export const getScriptParamsForContact = createSelector(() => [], getNonIncomingActiveContactInSelectedInteraction || (() => []), (_state, isSelectedContact) => {
    var _a;
    const { getAgentAssistConfig } = cxoneClientInstance.copilotService;
    const aAHConfiguration = getAgentAssistConfig && getAgentAssistConfig(`${(isSelectedContact === null || isSelectedContact === void 0 ? void 0 : isSelectedContact.contactId) || (isSelectedContact === null || isSelectedContact === void 0 ? void 0 : isSelectedContact.caseId)}`, true); // Reading data from localStorage
    return ((_a = aAHConfiguration === null || aAHConfiguration === void 0 ? void 0 : aAHConfiguration.Params) === null || _a === void 0 ? void 0 : _a.scriptParams) || '{}';
});
/**
 * Used to get if flag enabled in AAH configuration
 * @param configKey - Flag indicating whether ACP is enabled.
 * @returns true is provided flag is enabled, otherwise false.
 * @example -
 * ```
 * const flag = isAgentAssistConfigParamsEnabledForContact("finalSummary");
 * ```
 */
export const isAgentAssistConfigParamsEnabledForContact = (configKey) => createSelector(() => [], getNonIncomingActiveContactInSelectedInteraction || (() => []), (_state, isSelectedContact) => {
    var _a;
    const { getAgentAssistConfig } = cxoneClientInstance.copilotService;
    const aAHConfiguration = getAgentAssistConfig && getAgentAssistConfig(`${(isSelectedContact === null || isSelectedContact === void 0 ? void 0 : isSelectedContact.contactId) || (isSelectedContact === null || isSelectedContact === void 0 ? void 0 : isSelectedContact.caseId)}`, true); // Reading data from localStorage
    if (!aAHConfiguration)
        return false;
    return (_a = aAHConfiguration === null || aAHConfiguration === void 0 ? void 0 : aAHConfiguration.Params[`${configKey}`]) !== null && _a !== void 0 ? _a : false; // Default false, if AAHConfiguration not present , TODO , need to make true 
});
/**
 * Selector factory to get multiple Agent Assist config params for the current contact/case.
 * @param keys - Array of config keys to fetch from Params
 * @returns Object with key-value pairs for each config key
 * * @example
 * ```
 * const params = useSelector(getAgentAssistConfigParamsForContact(['finalSummary', 'scriptParams']));
 * ```
 */
export const getAgentAssistConfigParamsForContact = (keys) => createSelector(() => [], getNonIncomingActiveContactInSelectedInteraction || (() => []), (_state, activeContact) => {
    const { getAgentAssistConfig } = CXoneClient.instance.copilotService;
    const contactIdOrCaseId = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId) || (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId);
    const aahConfiguration = getAgentAssistConfig && getAgentAssistConfig(`${contactIdOrCaseId}`, true);
    const { Params } = aahConfiguration || {};
    const result = {};
    keys.forEach((key) => {
        result[key] = Params === null || Params === void 0 ? void 0 : Params[key];
    });
    return result;
});
/**
   * Selector to get the array of AutoSummaryCardFeature for a given caseId.
   * @param caseId - Case Id
   * @example
   * ```
   * const features = useSelector(getAutoSummaryCardFeatures('123123'));
   * ```
   */
export const getAutoSummaryCardFeatures = (caseId) => createSelector(getcopilotDataState, (_state) => {
    var _a, _b, _c, _d;
    const aahConfig = (_b = (_a = CXoneClient.instance.copilotService).getAgentAssistConfig) === null || _b === void 0 ? void 0 : _b.call(_a, caseId, true);
    return (_d = (_c = aahConfig === null || aahConfig === void 0 ? void 0 : aahConfig.Params) === null || _c === void 0 ? void 0 : _c[AgentAssistConfigACPParamsKeys.AUTOSUMMARY_CARD_FEATURES]) !== null && _d !== void 0 ? _d : [];
});
/**
 * Used to get nested knowledge hub config property from AAH configuration
 * @param configKey - Property key within knowledgeHubConfig
 * @returns Value of the property if found, otherwise false.
 * @example -
 * ```
 * const enableDirectQuery = isKnowledgeHubConfigEnabledForContact('enableDirectQuery');
 * ```
 */
export const isKnowledgeHubConfigEnabledForContact = (configKey) => createSelector(() => [], getNonIncomingActiveContactInSelectedInteraction || (() => []), (_state, isSelectedContact) => {
    var _a, _b;
    const { getAgentAssistConfig } = cxoneClientInstance.copilotService;
    const aAHConfiguration = getAgentAssistConfig && getAgentAssistConfig(`${(isSelectedContact === null || isSelectedContact === void 0 ? void 0 : isSelectedContact.contactId) || (isSelectedContact === null || isSelectedContact === void 0 ? void 0 : isSelectedContact.caseId)}`, true);
    if (!aAHConfiguration)
        return false;
    const knowledgeHubConfig = (_a = aAHConfiguration === null || aAHConfiguration === void 0 ? void 0 : aAHConfiguration.Params) === null || _a === void 0 ? void 0 : _a.knowledgeHubConfig;
    return (_b = knowledgeHubConfig === null || knowledgeHubConfig === void 0 ? void 0 : knowledgeHubConfig[configKey]) !== null && _b !== void 0 ? _b : false;
});
/**
 * Used to get getEmailIdentifier by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getEmailIdentifier('123123');
 * ```
 */
export const getEmailIdentifier = (caseId) => createSelector(getcopilotDataState, (state) => { var _a, _b, _c; return ((_c = (_b = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.emailCards) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.objectId) || ''; });
/**
 * Used to get isEditorActionPerformed by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsEditorActionPerformed('123123');
 * ```
 */
export const getIsEditorActionPerformed = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.isEditorActionPerformed; });
/**
 * Used to get getCurrentTopicCardUid by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getCurrentTopicCardUid('123123');
 * ```
 */
export const getCurrentTopicCardUid = (caseId) => createSelector(getcopilotDataState, (state) => {
    var _a, _b, _c, _d;
    const latestByType = (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.latestByType;
    const latestEmailCreate = latestByType === null || latestByType === void 0 ? void 0 : latestByType[AgentCopilotContentType.EMAIL_CREATION_CARD];
    if (latestEmailCreate)
        return latestEmailCreate.objectId || '';
    const emailCreationCards = (_c = (_b = state.adaptiveCardsData[caseId]) === null || _b === void 0 ? void 0 : _b.acpAppElements) === null || _c === void 0 ? void 0 : _c.filter((card) => card.contentType === AgentCopilotContentType.EMAIL_CREATION_CARD);
    return ((_d = emailCreationCards === null || emailCreationCards === void 0 ? void 0 : emailCreationCards[0]) === null || _d === void 0 ? void 0 : _d.objectId) || '';
});
/**
 * Returns the latest Sentiment card for a case using O(1) lookup via latestByType
 * with array fallback capped by `getMaxElementsCap()`.
 * @param caseId - Case Id
 * @example
 * const sentiment = useSelector(getLatestSentimentCard('123'));
 */
export const getLatestSentimentCard = (caseId) => createSelector(getcopilotDataState, (state) => {
    const caseData = state.adaptiveCardsData[caseId];
    const latestByType = caseData === null || caseData === void 0 ? void 0 : caseData.latestByType;
    const latest = latestByType === null || latestByType === void 0 ? void 0 : latestByType[AgentCopilotContentType.SENTIMENT];
    if (latest)
        return latest;
    const cap = getMaxElementsCap();
    return ((caseData === null || caseData === void 0 ? void 0 : caseData.acpAppElements) || [])
        .slice(-cap)
        .filter(card => card.contentType === AgentCopilotContentType.SENTIMENT)
        .pop() || null;
});
/**
 * Returns the latest Disclosure card for a case using O(1) lookup via latestByType
 * with array fallback capped by `getMaxElementsCap()`.
 * @param caseId - Case Id
 * @example
 * const disclosure = useSelector(getLatestDisclosureCard('123'));
 */
export const getLatestDisclosureCard = (caseId) => createSelector(getcopilotDataState, (state) => {
    const caseData = state.adaptiveCardsData[caseId];
    const latestByType = caseData === null || caseData === void 0 ? void 0 : caseData.latestByType;
    const latest = latestByType === null || latestByType === void 0 ? void 0 : latestByType[AgentCopilotContentType.DISCLOSURE];
    if (latest)
        return latest;
    const cap = getMaxElementsCap();
    return ((caseData === null || caseData === void 0 ? void 0 : caseData.acpAppElements) || [])
        .slice(-cap)
        .filter(card => card.contentType === AgentCopilotContentType.DISCLOSURE)
        .pop() || null;
});
/**
 * Used to get isComprehensiveFeedbackSent by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsComprehensiveFeedbackSent('123123');
 * ```
 */
export const getIsComprehensiveFeedbackSent = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.isComprehensiveFeedbackSent; });
/**
 * Used to get generateComprehensiveCard by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getGenerateComprehensiveCard('123123');
 * ```
 */
export const getGenerateComprehensiveCard = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.generateComprehensiveCard; });
/**
 * Used to get isFinalSummaryRegenerating by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsFinalSummaryRegenerating('123123');
 * ```
 * @returns - boolean indicating if final summary is regenerating
 */
export const getIsFinalSummaryRegenerating = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.isFinalSummaryRegenerating; });
/**
 * Used to get isAutoSummaryExpanded by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getIsAutoSummaryExpanded('123123');
 * ```
 */
export const getIsAutoSummaryExpanded = (caseId) => createSelector(getcopilotDataState, (state) => { var _a; return ((_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.isAutoSummaryExpanded) || false; });
/**
 * Used to get isDecisionTreeOpen by caseId
 * @param caseId - Case Id
 * @returns - boolean indicating if decision tree is open
 * @example -
 * ```
 * getDecisionTreeOpenStatus('123123');
 * ```
 */
export const getDecisionTreeOpenStatus = (caseId) => createSelector(getcopilotDataState, (state) => {
    var _a;
    return ((_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.isDecisionTreeOpen) || false;
});
/**
   * Used to get decision tree data by caseId
   * @param caseId - Case Id
   * @returns - Decision tree data or null
   * @example -
   * ```
   * getDecisionTreeData('123123');
   * ```
   */
export const getDecisionTreeData = (caseId) => createSelector(getcopilotDataState, (state) => {
    var _a;
    return ((_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.decisionTreeData) || null;
});
/**
 * Used to get copilot adaptive cards by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getAutoSummaryAdaptiveCard('123123');
 * ```
 */
export const getAutoSummaryAdaptiveCard = (caseId) => createSelector(getcopilotDataState, (state) => {
    const caseData = state.adaptiveCardsData[caseId];
    const latestByType = caseData === null || caseData === void 0 ? void 0 : caseData.latestByType;
    const latestAuto = latestByType === null || latestByType === void 0 ? void 0 : latestByType[AgentCopilotContentType.FINAL_SUMMARY_NOTES];
    if (latestAuto) {
        return [latestAuto];
    }
    const latestElement = caseData === null || caseData === void 0 ? void 0 : caseData.acpAppElement;
    if ((latestElement === null || latestElement === void 0 ? void 0 : latestElement.contentType) === AgentCopilotContentType.FINAL_SUMMARY_NOTES) {
        return [latestElement];
    }
    const acpAppElements = (caseData === null || caseData === void 0 ? void 0 : caseData.acpAppElements) || [];
    return acpAppElements.filter((element) => element.contentType === AgentCopilotContentType.FINAL_SUMMARY_NOTES);
});
export const CcfCopilotReducer = ccfCopilotSlice.reducer;
export const CcfCopilotActions = ccfCopilotSlice.actions;
/**
 * Function prepare send reply object
 * @param data - replyObject
 * @param response - response from copilot
 * @example -
 * ```
 * prepareCopilotReplyObject(copilotReplyObject,)
 * ```
 */
export const prepareCopilotReplyObject = (copilotReplyObject, response) => {
    var _a, _b;
    const { activeContact, selectedDigitalContactDetails, wysiwygEnabled, isEditorOpen, selectedMessageReplyData, subject, receiverTo, receiverCc, receiverBcc, isOBContact, savedDigitalContactDetails, } = copilotReplyObject;
    const isRequestForApproval = false;
    const replyObject = {
        messageContent: {
            type: 'TEXT',
            payload: {
                text: typeof response === 'string' ? response : '',
            },
        },
        recipients: createContactEndUserRecipients({
            activeContact,
            selectedDigitalContactDetails,
            receiverTo,
            receiverCc,
            receiverBcc,
            wysiwygEnabled,
            isOBContact,
            isRequestForApproval,
        }),
        attachments: typeof response !== 'string' ? [response] : [],
    };
    if (((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _a === void 0 ? void 0 : _a.threadIdOnExternalPlatform) !== '') {
        if (isEditorOpen) {
            replyObject['thread'] = {
                idOnExternalPlatform: selectedMessageReplyData === null || selectedMessageReplyData === void 0 ? void 0 : selectedMessageReplyData.threadIdOnExternalPlatform,
            };
        }
        else {
            replyObject['thread'] = {
                idOnExternalPlatform: (_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _b === void 0 ? void 0 : _b.threadIdOnExternalPlatform,
            };
        }
    }
    if (wysiwygEnabled) {
        if (replyObject === null || replyObject === void 0 ? void 0 : replyObject.thread) {
            replyObject.thread['threadName'] = subject;
        }
        else {
            replyObject['thread'] = { threadName: subject };
        }
        if (!isOBContact) {
            replyObject.replyToMessage = { idOnExternalPlatform: savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.messageId };
        }
        replyObject.title = subject;
    }
    if (!isOBContact && isEditorOpen) {
        replyObject.replyToMessage = {
            idOnExternalPlatform: selectedMessageReplyData === null || selectedMessageReplyData === void 0 ? void 0 : selectedMessageReplyData.idOnExternalPlatform,
        };
    }
    //digital skillID is passed only if TS is ON and skill is mapped to digital channel
    if (selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.digitalSkillId) {
        replyObject.contact = Object.assign(Object.assign({}, replyObject.contact), { skillId: selectedDigitalContactDetails.digitalSkillId });
    }
    if (activeContact && replyObject.attachments && replyObject.attachments.length > 0) {
        const attachmentToAdd = response;
        const attachments = [];
        attachments.push({ friendlyName: attachmentToAdd.friendlyName, url: attachmentToAdd.url });
        replyObject.attachments = attachments;
    }
    return replyObject;
};
/**
 * Function extract customer sentiment
 * @example -
 * ```
 * extractCustomerSentiment(inputStr)
 * ```
 * @returns - string
 */
export const extractCustomerSentiment = (inputStr) => {
    const regex = /adp_(.*?)Sentiment/;
    const sentimentMatch = regex.exec(inputStr);
    if (sentimentMatch && sentimentMatch[1]) {
        return sentimentMatch[1];
    }
    return '';
};
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
export const updateContainerVisibility = (adapativeCardDetails, comboCardDetails) => {
    var _a;
    if (!(adapativeCardDetails === null || adapativeCardDetails === void 0 ? void 0 : adapativeCardDetails.body) || !comboCardDetails)
        return adapativeCardDetails;
    // Precompute which containers have content to avoid repeated object lookups
    const visibleContainerIds = new Set();
    for (const key in comboCardDetails) {
        const val = comboCardDetails[key];
        if (Array.isArray(val) && val.length > 0) {
            visibleContainerIds.add(key);
        }
    }
    if (visibleContainerIds.size === 0)
        return adapativeCardDetails; // early exit
    for (const container of adapativeCardDetails.body) {
        const rawId = (_a = container.id) !== null && _a !== void 0 ? _a : '';
        const normalizedId = (rawId === null || rawId === void 0 ? void 0 : rawId.includes(PrivateContainer.INTERNAL_USE_TITLE))
            ? PrivateContainer.INTERNAL_USE_TITLE
            : rawId;
        if (visibleContainerIds.has(normalizedId)) {
            container.isVisible = true;
        }
    }
    return adapativeCardDetails;
};
/**
 * Function to update card content of journey summary data
 * @param cardDetails - CopilotJourneySummaryCardData
 * @param aahConfiguration - agent assist Configuration
 * @example -
 * ```
 * updateJSCardDetails(cardDetails, aahConfiguration)
 * ```
 */
function updateJSCardDetails(cardDetails, aahConfiguration) {
    const updatedCardDetails = Object.assign({}, cardDetails);
    updatedCardDetails.interactionsData = cardDetails.interactionsData.map((interaction) => {
        var _a;
        const formattedDate = dayjs(interaction.contactDate).format('DD/MM/YYYY');
        const formattedTime = dayjs(interaction.contactDate).format('hh:mm A');
        const updatedInteraction = Object.assign(Object.assign({}, interaction), { contactDate: `${formattedDate} ${formattedTime}` });
        if (!((_a = aahConfiguration === null || aahConfiguration === void 0 ? void 0 : aahConfiguration.Params) === null || _a === void 0 ? void 0 : _a.journeySummaryDetailView)) {
            updatedInteraction.summary = '';
        }
        return updatedInteraction;
    });
    return updatedCardDetails;
}
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
export const addAdaptiveCard = (contactId, adaptiveCardToAdd, dispatch, aahConfiguration) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    try {
        const updatedAdaptiveCardToAdd = Object.assign({}, adaptiveCardToAdd);
        const messageData = updatedAdaptiveCardToAdd[contactId];
        const card = (_a = messageData.acpAppElement) !== null && _a !== void 0 ? _a : messageData.acpAppElements[0];
        const informationCardContentTypes = [
            AgentCopilotContentType.TRANSFER_SUMMARY,
            AgentCopilotContentType.SENTIMENT,
            AgentCopilotContentType.EMAIL_RESPONSE_CARD,
            AgentCopilotContentType.DISCLOSURE,
            AgentCopilotContentType.AUTOPILOT_TRANSFER_SUMMARY
        ];
        const isInformationCard = informationCardContentTypes.includes(card.contentType);
        const schemaKey = isInformationCard ? 'informationCard' : card.contentType;
        const allAdaptiveCardSchemas = yield cxoneClientInstance.copilotService.fetchCopilotAdaptiveCardSchemasFromBucket(((_b = process.env.NX_BRANCH_NAME) !== null && _b !== void 0 ? _b : DEFAULT_CXA_VERSION).split('-')[0]);
        const adaptiveCardTemplate = allAdaptiveCardSchemas[schemaKey];
        if (!adaptiveCardTemplate) {
            return;
        }
        let adaptiveCardSchema = adaptiveCardTemplate;
        let cardContent = Object.assign({}, card.content);
        if ((card.contentType === AgentCopilotContentType.KB_COMBO) && adaptiveCardToAdd) {
            const cardDetails = card.content;
            adaptiveCardSchema = updateContainerVisibility(adaptiveCardSchema, cardDetails);
        }
        if (card.contentType === AgentCopilotContentType.JOURNEY_SUMMARY) {
            const cardDetails = card.content;
            cardContent = updateJSCardDetails(cardDetails, aahConfiguration);
        }
        const template = new ACData.Template(adaptiveCardSchema);
        let contextForAdaptiveCard = {
            $root: cardContent,
        };
        if (card.contentType === AgentCopilotContentType.SENTIMENT) {
            const cardContent = Object.assign({}, card.content);
            contextForAdaptiveCard = {
                $root: cardContent,
            };
        }
        if (card.contentType === AgentCopilotContentType.FINAL_SUMMARY_NOTES) {
            const { Params } = aahConfiguration !== null && aahConfiguration !== void 0 ? aahConfiguration : {};
            const contentData = card.content;
            const SUMMARY_KEY = 'summary';
            const summary = card.content && SUMMARY_KEY in card.content
                ? card.content.summary
                : '';
            card.cardType = AgentCopilotCardType.ADAPTIVE_CARD;
            const autoSummaryFeatures = (_c = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.AUTOSUMMARY_CARD_FEATURES]) !== null && _c !== void 0 ? _c : [];
            const isEditable = hasAutoSummaryFeature(autoSummaryFeatures, 'editable');
            const isCopy = hasAutoSummaryFeature(autoSummaryFeatures, 'copyToClipboard');
            const isOpenAsExpanded = hasAutoSummaryFeature(autoSummaryFeatures, 'openAsExpanded');
            const cardContent = {
                summary: (_e = (_d = contentData.description) !== null && _d !== void 0 ? _d : summary) !== null && _e !== void 0 ? _e : '',
                showEditIcon: isEditable,
                showCopyIcon: isCopy,
                showExpandIcon: isOpenAsExpanded,
            };
            contextForAdaptiveCard = {
                $root: cardContent,
            };
            if (isOpenAsExpanded) {
                //Dev Note: To handle bug CSA-36675 we are collapsing journey summary when auto summary is expanded
                dispatch(CcfCopilotActions.updateIsJourneySummaryExpanded({ caseId: contactId, isJourneySummaryExpanded: false }));
                dispatch(CcfCopilotActions.setIsAutoSummaryExpanded({ caseId: contactId, isAutoSummaryExpanded: true }));
            }
        }
        if (card.contentType === AgentCopilotContentType.KB_COMBO) {
            const { Params } = aahConfiguration !== null && aahConfiguration !== void 0 ? aahConfiguration : {};
            const { kbAnswers, kbInternalUse } = contextForAdaptiveCard.$root;
            if (validationUtils.isNotNullOrUndefined(kbAnswers) && !(AgentAssistConfigACPParamsKeys.PUBLIC_FEEDBACK in kbAnswers)) {
                kbAnswers[AgentAssistConfigACPParamsKeys.PUBLIC_FEEDBACK] = ((_f = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.PUBLIC_FEEDBACK]) !== null && _f !== void 0 ? _f : false) || ((_h = (_g = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.KNOWLEDGE_HUB_CONFIG]) === null || _g === void 0 ? void 0 : _g.feedbackEnabled) !== null && _h !== void 0 ? _h : false);
            }
            if (validationUtils.isNotNullOrUndefined(kbInternalUse) && !(AgentAssistConfigACPParamsKeys.PRIVATE_FEEDBACK in kbInternalUse)) {
                kbInternalUse[AgentAssistConfigACPParamsKeys.PRIVATE_FEEDBACK] =
                    ((_j = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.PRIVATE_FEEDBACK]) !== null && _j !== void 0 ? _j : false) || ((_l = (_k = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.SECONDARY_KNOWLEDGE_HUB_CONFIG]) === null || _k === void 0 ? void 0 : _k.secondaryFeedbackEnabled) !== null && _l !== void 0 ? _l : false);
            }
        }
        let copilotCard = template.expand(contextForAdaptiveCard);
        copilotCard = replaceAllUrls(copilotCard);
        if (messageData.acpAppElement) {
            messageData.acpAppElement.content = copilotCard;
        }
        else {
            updatedAdaptiveCardToAdd[contactId].acpAppElements[0].content = copilotCard;
        }
        if (card.contentType === AgentCopilotContentType.EMAIL_CREATION_CARD) {
            dispatch(CcfCopilotActions.addEmailAdaptiveCardData(updatedAdaptiveCardToAdd));
        }
        else {
            dispatch(CcfCopilotActions.addAdaptiveCardData(updatedAdaptiveCardToAdd));
        }
    }
    catch (error) {
        logger.error('addAdaptiveCard', `${error}`);
    }
});
/**
 * Function to replace URLs in the adaptive card data
 * @param adaptiveCardToAdd - CcfCopilotData
 * @returns Updated CcfCopilotData
 * @example -
 * ```
 * replaceAllUrls(adaptiveCardToAdd)
 * ```
 */
export const replaceAllUrls = (adaptiveCardToAdd) => {
    const iconsToReplace = getIconsFromSchema(adaptiveCardToAdd);
    let updatedAdaptiveCardToAdd = JSON.stringify(adaptiveCardToAdd);
    iconsToReplace.forEach((icon) => {
        const iconData = adaptiveCardIcons[icon];
        if (React.isValidElement(iconData)) {
            const encodedIcons = encodeSVG(iconData, true);
            updatedAdaptiveCardToAdd = updatedAdaptiveCardToAdd.replace(new RegExp(icon, 'g'), encodedIcons);
        }
    });
    return JSON.parse(updatedAdaptiveCardToAdd);
};
/**
 * Function to get icons from the adaptive card schema.
 * @param adaptiveCardToAdd - CcfCopilotData
 * @returns Array of icons
 * @example -
 * ```
 * getIconsFromSchema(adaptiveCardToAdd)
 * ```
 */
export const getIconsFromSchema = (adaptiveCardSchema) => {
    // Set to store unique Icon names
    const newIconSet = new Set();
    traverseToGetUniqueIcons(adaptiveCardSchema, newIconSet);
    return Array.from(newIconSet);
};
/**
 * Helper function to traverse the adaptive card schema and get unique icons.
 * @param schemaObject - Adaptive card schema object
 * @param iconSet - Set to store unique icons
 * @example -
 * ```
 * traverseToGetUniqueIcons(adaptiveCardTSchema, iconSet)
 * ```
 */
const traverseToGetUniqueIcons = (schemaObject, iconSet) => {
    if (Array.isArray(schemaObject)) {
        schemaObject.forEach(element => {
            traverseToGetUniqueIcons(element, iconSet);
        });
    }
    else if (validationUtils.isValidObject(schemaObject) && validationUtils.isNotNullOrEmpty(schemaObject)) {
        Object.entries(schemaObject).forEach(([key, value]) => {
            if (key === 'url' || key === 'newImageUrl') {
                if (validationUtils.isNotNullOrEmpty(value)) {
                    iconSet.add(value);
                }
            }
            else {
                traverseToGetUniqueIcons(value, iconSet);
            }
        });
    }
};
/**
 * Function to fetch copilot data from index db to rehydrate copilot redux state
 * * @example -
  * ```
  *  fetchCopilotDataFromIndexDB();
  * ```
 */
export const fetchCopilotDataFromIndexDB = () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const copilotIndexDbDetails = yield cxoneClientInstance.copilotService.getCopilotIndexDb();
        dispatch(CcfCopilotActions.rehydrateCopilotState(copilotIndexDbDetails));
    }
    catch (error) {
        logger.error('fetchCopilotDataFromIndexDB', JSON.stringify(error));
    }
});
/**
 * Used to get copilot email generation request status by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getCopilotEmailRequestStatus('123123');
 * ```
 */
export const getCopilotEmailRequestStatus = (caseId) => createSelector(getcopilotDataState, (state) => {
    var _a, _b, _c;
    const acpAppElements = ((_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.acpAppElements) || {};
    const currentEmailCreationCards = (_b = Object.values(acpAppElements)) === null || _b === void 0 ? void 0 : _b.filter((element) => { var _a; return (_a = element === null || element === void 0 ? void 0 : element.contentType) === null || _a === void 0 ? void 0 : _a.includes(AgentCopilotContentType.EMAIL_CREATION_CARD); });
    if (currentEmailCreationCards.length === 0) {
        return;
    }
    const currentEmailCreationCard = currentEmailCreationCards[0].content;
    const replyGeneratingContainer = (_c = currentEmailCreationCard === null || currentEmailCreationCard === void 0 ? void 0 : currentEmailCreationCard.body) === null || _c === void 0 ? void 0 : _c.find((item) => item.id === ContainerId.REPLY_GENERATING_CONTAINER);
    return replyGeneratingContainer === null || replyGeneratingContainer === void 0 ? void 0 : replyGeneratingContainer.isVisible;
});
/**
 * Used to get contact history by caseId
 * @param caseId - Case Id
 * @example -
 * ```
 * getContactHistory('123123');
 * ```
 */
export const getContactHistory = (caseId) => createSelector(getcopilotDataState, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.contactHistory;
});
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
export const getCopilotTaskAssistCardData = (caseId) => createSelector(getcopilotDataState, (state) => {
    var _a;
    return ((_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.copilotTaskAssistCardData) || null;
});
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
export const getIsTaskAssistRequestStatus = (caseId) => createSelector(getcopilotDataState, (state) => {
    var _a;
    return (_a = state.adaptiveCardsData[caseId]) === null || _a === void 0 ? void 0 : _a.currentTaskAssistRequestStatus;
});
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
export const setupCopilotWebSocket = (userInfo, cxoneConfig) => {
    if (CXoneClient.getCopilotWsConnected()) {
        return;
    }
    let agentAssistConfigKeyNames = [];
    const { aahNotificationWssUri } = cxoneConfig;
    const { icAgentId, userId, icBUId } = userInfo;
    const shouldLazyLoadCopilotWS = FeatureToggleService.instance.getFeatureToggleSync("release-agentcopilot-lazy-load-websocket-CSA-58356" /* FeatureToggles.LAZY_LOAD_COPILOT_WEBSOCKET */);
    if (shouldLazyLoadCopilotWS) {
        const localStorageKeyNames = Object.keys(localStorage);
        agentAssistConfigKeyNames = localStorageKeyNames.filter((localStorageKeyName) => localStorageKeyName.includes('_agentAssistAppConfig'));
    }
    if (!shouldLazyLoadCopilotWS || (agentAssistConfigKeyNames === null || agentAssistConfigKeyNames === void 0 ? void 0 : agentAssistConfigKeyNames.length) > 0) {
        const isMultiACDWebsocketEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-agentcopilot-multiacd-websocket-CSA-28481" /* FeatureToggles.MULTI_ACD_WEBSOCKET */);
        const connectionIdentifier = isMultiACDWebsocketEnabled ? userId : icAgentId;
        const copilotNotificationWssUri = `${aahNotificationWssUri}?agentId=${connectionIdentifier}&BUid=${icBUId}`;
        CXoneClient.setCopilotWsConnected(true);
        try {
            cxoneClientInstance.copilotNotificationClient.connect(copilotNotificationWssUri, connectionIdentifier);
        }
        catch (_a) {
            CXoneClient.setCopilotWsConnected(false);
            return;
        }
    }
};
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
export function getIntentTitle(card) {
    var _a;
    const content = card.content;
    if (!Array.isArray(content === null || content === void 0 ? void 0 : content.body))
        return '';
    for (const container of content.body) {
        if ((container === null || container === void 0 ? void 0 : container.type) === 'Container' && Array.isArray(container.items)) {
            for (const item of container.items) {
                if ((item === null || item === void 0 ? void 0 : item.type) === 'ColumnSet' && Array.isArray(item.columns)) {
                    for (const column of item.columns) {
                        const columnItem = ((_a = column.items) !== null && _a !== void 0 ? _a : []).find((colItem) => colItem.type === 'TextBlock' && colItem.size === 'Small' && colItem.weight === 'Bolder');
                        if (columnItem) {
                            return columnItem.text;
                        }
                    }
                }
            }
        }
    }
    return '';
}
/**
 * Recursively updates the summary text in a CardElement if its id matches 'finalSummaryText' or 'editedSummary'.
 * Also traverses nested items and columns to update matching elements.
 *
 * @param element - The CardElement to update.
 * @example -  updateSummaryText(id: 'finalSummaryText', text: 'Old Summary');
 * @returns The updated CardElement.
 */
function updateSummaryText(element, dispositionNotes) {
    if (element.id === 'finalSummaryText' || element.id === 'editedSummary') {
        if (element.text !== dispositionNotes) {
            return Object.assign(Object.assign({}, element), { text: dispositionNotes });
        }
        return element;
    }
    if (Array.isArray(element.items) && element.items.length > 0) {
        let changed = false;
        const newItems = element.items.map((it) => {
            const updated = updateSummaryText(it, dispositionNotes);
            if (updated !== it)
                changed = true;
            return updated;
        });
        if (changed)
            return Object.assign(Object.assign({}, element), { items: newItems });
    }
    if (Array.isArray(element.columns) && element.columns.length > 0) {
        let changed = false;
        const newColumns = element.columns.map((col) => {
            const updated = updateSummaryText(col, dispositionNotes);
            if (updated !== col)
                changed = true;
            return updated;
        });
        if (changed)
            return Object.assign(Object.assign({}, element), { columns: newColumns });
    }
    return element;
}
/**
 * Checks if a specific auto summary feature is enabled in the provided features array.
 * This function searches through an array of feature objects to determine if a particular
 * feature is available/enabled based on its value property.
 *
 * @param autoSummaryFeatures - Array of feature objects, each containing a value property
 * @param featureKey - The feature key to search for (e.g., 'editable', 'copyToClipboard', 'openAsExpanded')
 *
 * @returns `true` if the feature is found in the array, `false` otherwise
 * @example -  hasAutoSummaryFeature(features, 'editable');
 */
const hasAutoSummaryFeature = (autoSummaryFeatures, featureKey) => autoSummaryFeatures.some((feature) => feature.value === featureKey);
//# sourceMappingURL=ccf-agent-copilot-container.slice.js.map