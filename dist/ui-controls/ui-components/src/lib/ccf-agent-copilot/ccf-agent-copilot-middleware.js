import { __awaiter } from "tslib";
import { CXoneClient } from '@nice-devone/agent-sdk';
import { AgentAssistCommand, DigitalContactStatus, AgentCopilotContentType, MediaType, DispositionConstants, AgentCopilotCardType, TASK_ASSIST_STATUS, } from '@nice-devone/common-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { filter, first, map } from 'rxjs/operators';
import { batch } from 'react-redux';
import { uuid } from 'uuidv4';
import { CcfCopilotActions, addAdaptiveCard, prepareCopilotReplyObject, } from './ccf-agent-copilot-container.slice';
import { timer } from 'rxjs';
import { LocalStorageHelper, Logger, StorageKeys, ValidationUtils } from '@nice-devone/core-sdk';
import { CcfContactEditorAction, getSelectedDigitalContactDetails, updateContactDraftMessage, getActiveContactState } from '../ccf-editor/ccf-contact-editor.slice';
import { AgentCopilotAsyncAction } from '../../enums/agent-copilot-async-action';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { dispositionInteractionActions, setDispositionToLocalStorage } from '../ccf-disposition/ccf-disposition-slice';
import { CcfAuthenticationActions } from '../ccf-authentication/ccf-authentication.slice';
import { CcfAgentCopilotContainerFunctions } from './ccf-agent-copilot-helper';
const cxoneClientInstance = CXoneClient.instance;
const cxoneDigitalClient = CXoneDigitalClient.instance;
const validationUtilService = new ValidationUtils();
let healthCheckSubscribtion;
const HEALTH_CHECK_INTERVAL = 300000; //copilot health check api will be called after every 5 minutes
const logger = new Logger('ui-state', 'acp-middleware');
/**
 * Middleware for agent copilot app
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export const agentCopilotMiddleware = (actions$, _, { store }) => {
    // Micro-batching: buffer incoming notifications and flush within next frame
    const pendingNotifications = [];
    let flushScheduled = false;
    /**
     * Process a single Agent Assist notification and dispatch appropriate actions to the store.
     *
     * @param msg - The AgentAssistBaseResponse message received from the Copilot notification client.
     * @returns A promise that resolves when processing of the notification is complete.
     * @example
     * ```typescript
     * // Example usage: process a Copilot message with a single adaptive card element
     * const exampleMessage: AgentAssistBaseResponse = {
     *   command: AgentAssistCommand.message,
     *   body: {
     *     contactId: '12345',
     *     acpAppElements: [
     *       {
     *         contentType: AgentCopilotContentType.CUSTOM_CARD,
     *         cardType: AgentCopilotCardType.ADAPTIVE_CARD,
     *         objectId: 'obj-1',
     *         content: { foo: 'bar' }
     *       }
     *     ]
     *   }
     * };
     * await processNotification(exampleMessage);
     * ```
     */
    const processNotification = (msg) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (msg.command === AgentAssistCommand.closed) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            store.dispatch(getCopilotHealth(''));
            return;
        }
        if (!((_a = msg.body) === null || _a === void 0 ? void 0 : _a.acpAppElements)) {
            return;
        }
        const { resolveAgentAssistConfig } = cxoneClientInstance.copilotService;
        const aAHConfiguration = resolveAgentAssistConfig && (yield resolveAgentAssistConfig(`${(_b = msg.body) === null || _b === void 0 ? void 0 : _b.contactId}`));
        msg.body.acpAppElements.forEach((element) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
            const copilotData = msg.body;
            const { contactId } = copilotData;
            const copilotMessageData = Object.assign(Object.assign({}, copilotData), { 
                // Single-element path for latest card
                acpAppElement: element, acpAppElements: [element] });
            const adaptiveCardToAdd = {
                [contactId]: copilotMessageData,
            };
            const { contentType, content, objectId } = element;
            switch (contentType) {
                case AgentCopilotContentType.SENTIMENT:
                case AgentCopilotContentType.TRANSFER_SUMMARY:
                case AgentCopilotContentType.AUTOPILOT_TRANSFER_SUMMARY:
                case AgentCopilotContentType.CUSTOM_CARD: {
                    addAdaptiveCard(contactId, adaptiveCardToAdd, store.dispatch);
                    break;
                }
                case AgentCopilotContentType.JOURNEY_SUMMARY: {
                    addAdaptiveCard(contactId, adaptiveCardToAdd, store.dispatch, aAHConfiguration);
                    break;
                }
                case AgentCopilotContentType.EMAIL_CREATION_CARD: {
                    if ((_b = (_a = aAHConfiguration === null || aAHConfiguration === void 0 ? void 0 : aAHConfiguration.Params) === null || _a === void 0 ? void 0 : _a.emailChannel) !== null && _b !== void 0 ? _b : false) {
                        addAdaptiveCard(contactId, adaptiveCardToAdd, store.dispatch);
                    }
                    break;
                }
                case AgentCopilotContentType.EMAIL_RESPONSE_CARD: {
                    if ((_d = (_c = aAHConfiguration === null || aAHConfiguration === void 0 ? void 0 : aAHConfiguration.Params) === null || _c === void 0 ? void 0 : _c.emailChannel) !== null && _d !== void 0 ? _d : false) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        store.dispatch(getDraftEmail({ contactId }));
                        addAdaptiveCard(contactId, adaptiveCardToAdd, store.dispatch);
                    }
                    break;
                }
                case AgentCopilotContentType.KB_COMBO: {
                    addAdaptiveCard(contactId, adaptiveCardToAdd, store.dispatch, aAHConfiguration);
                    const { privateFeedback, publicFeedback, knowledgeHubConfig } = (aAHConfiguration === null || aAHConfiguration === void 0 ? void 0 : aAHConfiguration.Params) || {};
                    const utteranceId = (_e = content === null || content === void 0 ? void 0 : content.utteranceId) !== null && _e !== void 0 ? _e : '';
                    const kbAnswerUid = (_g = (_f = content === null || content === void 0 ? void 0 : content.kbAnswers) === null || _f === void 0 ? void 0 : _f.kbAnswerUid) !== null && _g !== void 0 ? _g : '';
                    const kbPrivateAnswerUid = (_j = (_h = content === null || content === void 0 ? void 0 : content.kbInternalUse) === null || _h === void 0 ? void 0 : _h.kbAnswerUid) !== null && _j !== void 0 ? _j : '';
                    const agentId = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)['icAgentId'];
                    if (utteranceId && (privateFeedback || publicFeedback || (knowledgeHubConfig === null || knowledgeHubConfig === void 0 ? void 0 : knowledgeHubConfig.feedbackEnabled))) {
                        // Dev Comment - The title is being extracted from kbAnswer description to display the text in the comprehensive guidance feedback cards
                        const titleToStore = (_k = content === null || content === void 0 ? void 0 : content.kbAnswers) === null || _k === void 0 ? void 0 : _k.description.split('.')[0];
                        const privateTitleToStore = ((_l = content === null || content === void 0 ? void 0 : content.kbInternalUse) === null || _l === void 0 ? void 0 : _l.title) || ((_m = content === null || content === void 0 ? void 0 : content.kbInternalUse) === null || _m === void 0 ? void 0 : _m.description.split('.')[0]);
                        if (content && 'kbInternalUse' in content && (content === null || content === void 0 ? void 0 : content.kbInternalUse)) {
                            store.dispatch(CcfCopilotActions.updateFeedbackData({ feedback: '', caseId: contactId, objectId: `${objectId}_kbInternalUse`, contactId: contactId, agentId: agentId, agentContactId: 'agentContactId', title: privateTitleToStore, utteranceId: utteranceId, kbAnswerUid: kbPrivateAnswerUid }));
                        }
                        if (content && 'kbAnswers' in content && (content === null || content === void 0 ? void 0 : content.kbAnswers)) {
                            store.dispatch(CcfCopilotActions.updateFeedbackData({ feedback: '', caseId: contactId, objectId: objectId, contactId: contactId, agentId: agentId, agentContactId: 'agentContactId', title: titleToStore, utteranceId: utteranceId, kbAnswerUid: kbAnswerUid }));
                        }
                    }
                    break;
                }
                case AgentCopilotContentType.RT_SUMMARY:
                    store.dispatch(CcfCopilotActions.addAdaptiveCardData(adaptiveCardToAdd));
                    break;
                case AgentCopilotContentType.FINAL_SUMMARY_NOTES: {
                    const state = store.getState().ccfCopilotData;
                    const existingCardData = state.adaptiveCardsData[contactId];
                    const isFinalSummaryGenerated = existingCardData === null || existingCardData === void 0 ? void 0 : existingCardData.isFinalSummaryGenerated;
                    const { showAutoSummaryCard } = (aAHConfiguration === null || aAHConfiguration === void 0 ? void 0 : aAHConfiguration.Params) || {};
                    if (!isFinalSummaryGenerated) {
                        store.dispatch(CcfCopilotActions.addAdaptiveCardData(adaptiveCardToAdd));
                        if (showAutoSummaryCard) {
                            let cardToAdd = adaptiveCardToAdd;
                            if (element.cardType === AgentCopilotCardType.TEXT) {
                                const convertedElement = Object.assign(Object.assign({}, element), { cardType: AgentCopilotCardType.ADAPTIVE_CARD });
                                const copilotMessageDataConverted = Object.assign(Object.assign({}, copilotData), { acpAppElement: convertedElement, acpAppElements: [convertedElement] });
                                cardToAdd = {
                                    [contactId]: copilotMessageDataConverted,
                                };
                            }
                            addAdaptiveCard(contactId, cardToAdd, store.dispatch, aAHConfiguration);
                        }
                    }
                    break;
                }
                case AgentCopilotContentType.NEXT_BEST_RESPONSE:
                case AgentCopilotContentType.NEXT_BEST_RESPONSE_LLM:
                case AgentCopilotContentType.NEXT_BEST_RESPONSE_EXPERT: {
                    const responsesToAdd = {
                        [copilotMessageData.contactId]: copilotMessageData,
                    };
                    // Add next best responses to state
                    store.dispatch(CcfCopilotActions.setNextBestResponse(responsesToAdd));
                    break;
                }
                case AgentCopilotContentType.COPILOT_REQUEST_STATUS: {
                    const requestStatus = {
                        [copilotMessageData.contactId]: copilotMessageData,
                    };
                    store.dispatch(CcfCopilotActions.setCurrentRequestStatus(requestStatus));
                    break;
                }
                case AgentCopilotContentType.DISCLOSURE: {
                    if (((_p = (_o = aAHConfiguration === null || aAHConfiguration === void 0 ? void 0 : aAHConfiguration.Params) === null || _o === void 0 ? void 0 : _o.legalDisclosure) !== null && _p !== void 0 ? _p : false)) {
                        addAdaptiveCard(contactId, adaptiveCardToAdd, store.dispatch);
                    }
                    break;
                }
                case AgentCopilotContentType.TASK_ASSIST: {
                    const taskAssistContent = typeof content === 'string' ? JSON.parse(content) : content;
                    const status = taskAssistContent === null || taskAssistContent === void 0 ? void 0 : taskAssistContent.status;
                    const intentName = taskAssistContent.intentName;
                    const taskAssistCfg = (_q = aAHConfiguration === null || aAHConfiguration === void 0 ? void 0 : aAHConfiguration.Params) === null || _q === void 0 ? void 0 : _q.taskAssistConfig;
                    const formCaptureEnabled = taskAssistCfg
                        ? CcfAgentCopilotContainerFunctions.isFormCaptureEnabled(intentName !== null && intentName !== void 0 ? intentName : '', taskAssistCfg)
                        : false;
                    store.dispatch(CcfCopilotActions.setIsTaskAssistRequestStatus({ contactId, status: status }));
                    const taskAssistCardData = {
                        objectId,
                        formCapture: formCaptureEnabled,
                        botName: (_r = taskAssistCfg === null || taskAssistCfg === void 0 ? void 0 : taskAssistCfg.botName) !== null && _r !== void 0 ? _r : '',
                        intentName: intentName !== null && intentName !== void 0 ? intentName : '',
                        status: status !== null && status !== void 0 ? status : '',
                        isOpenButton: taskAssistContent === null || taskAssistContent === void 0 ? void 0 : taskAssistContent.isOpenButton,
                        isRunButton: taskAssistContent === null || taskAssistContent === void 0 ? void 0 : taskAssistContent.isRunButton,
                    };
                    /**
                     * Assigns a value to taskAssistCardData when the provided value is neither undefined nor null.
                     * @param key - Key to assign in the taskAssistCardData record.
                     * @param value - Value to assign if defined.
                     * @example
                     * assignIfDefined('intentTitle', taskAssistContent.intentTitle);
                     */
                    const assignIfDefined = (key, value) => {
                        if (validationUtilService.isNotNullOrUndefined(value)) {
                            taskAssistCardData[key] = value;
                        }
                    };
                    const fieldsToAssign = [
                        'mediaType',
                        'intentTitle',
                        'intentResponse',
                        'utteranceId',
                        'virtualAgentId',
                        'errorMessage',
                        'validationInfo',
                        'status',
                        'isOpenButton',
                        'isRunButton',
                        'intentName',
                        'insertIconVisible',
                        'sendIconVisible'
                    ];
                    fieldsToAssign.forEach((fieldName) => {
                        assignIfDefined(fieldName, taskAssistContent[fieldName]);
                    });
                    if (taskAssistContent.data) {
                        Object.entries(taskAssistContent.data).forEach(([key, value]) => assignIfDefined(key, value));
                    }
                    if (!formCaptureEnabled || (formCaptureEnabled && (status === TASK_ASSIST_STATUS.LOADING || status === TASK_ASSIST_STATUS.SUCCESS))) {
                        store.dispatch(CcfCopilotActions.addTaskAssistStatusCard({ contactId, content: taskAssistCardData }));
                    }
                    else if (status === TASK_ASSIST_STATUS.VALIDATION_ERROR) {
                        store.dispatch(CcfCopilotActions.addTaskAssistFormCard({
                            contactId,
                            taskAssistFormData: {
                                formCapture: formCaptureEnabled,
                                intentName: intentName !== null && intentName !== void 0 ? intentName : '',
                                status: status,
                                objectId: objectId,
                                validationInfo: Object.assign({}, taskAssistContent === null || taskAssistContent === void 0 ? void 0 : taskAssistContent.validationInfo),
                                isOpenButton: false,
                                isRunButton: false,
                                insertIconVisible: false,
                                sendIconVisible: false,
                            },
                        }));
                    }
                    break;
                }
                case AgentCopilotContentType.DECISION_TREE: {
                    const decisionTreeData = content;
                    const decisionTreeId = decisionTreeData.decisionTreeId;
                    const { ccfCopilotData } = store.getState();
                    const adaptiveCardDataForContact = ccfCopilotData.adaptiveCardsData[contactId];
                    const existingDecisionTreeData = adaptiveCardDataForContact === null || adaptiveCardDataForContact === void 0 ? void 0 : adaptiveCardDataForContact.decisionTreeData;
                    const existingSections = (_s = existingDecisionTreeData === null || existingDecisionTreeData === void 0 ? void 0 : existingDecisionTreeData.sections) !== null && _s !== void 0 ? _s : [];
                    const existingSectionIds = new Set(existingSections.map((section) => section.sectionId));
                    // Determine the first relevant item to infer section metadata (suggested or captured)
                    const firstSuggestedQuestion = (_t = decisionTreeData === null || decisionTreeData === void 0 ? void 0 : decisionTreeData.suggestedQuestions) === null || _t === void 0 ? void 0 : _t[0];
                    const firstCapturedResponse = (_u = decisionTreeData === null || decisionTreeData === void 0 ? void 0 : decisionTreeData.capturedResponses) === null || _u === void 0 ? void 0 : _u[0];
                    const firstRelevantItem = firstSuggestedQuestion !== null && firstSuggestedQuestion !== void 0 ? firstSuggestedQuestion : firstCapturedResponse;
                    // Merge sections by appending the inferred section only if it does not already exist
                    let mergedSections = existingSections;
                    if (firstRelevantItem && !existingSectionIds.has(firstRelevantItem.sectionId)) {
                        const inferredSection = {
                            sectionId: firstRelevantItem.sectionId,
                            sectionTitle: firstRelevantItem.sectionName,
                            sectionDescription: '',
                            preCondition: { conditionType: 'Display always' },
                            fields: [],
                        };
                        mergedSections = [...existingSections, inferredSection];
                    }
                    // Check if we already fetched API data for this decision tree
                    // The key indicator is if we have sections with populated 'fields' arrays (questions)
                    const hasSectionsWithFields = (_v = existingDecisionTreeData === null || existingDecisionTreeData === void 0 ? void 0 : existingDecisionTreeData.sections) === null || _v === void 0 ? void 0 : _v.some((section) => section.fields && section.fields.length > 0);
                    const hasApiData = !!((existingDecisionTreeData === null || existingDecisionTreeData === void 0 ? void 0 : existingDecisionTreeData.decisionTreeId) === decisionTreeId && hasSectionsWithFields);
                    if (hasApiData) {
                        updateDecisionTreeState({ contactId, existingDecisionTreeData, decisionTreeData, sections: existingSections });
                    }
                    else if (decisionTreeId) {
                        cxoneClientInstance.copilotService
                            .getDecisionTreeElement(decisionTreeId)
                            .then((decisionTreeElement) => {
                            var _a;
                            const config = (_a = decisionTreeElement === null || decisionTreeElement === void 0 ? void 0 : decisionTreeElement.config) !== null && _a !== void 0 ? _a : {};
                            const { sections: apiSections = [], title = '', icon = '', completeBtnTitle = '' } = config;
                            // Merge inferred sections with API sections (deduplicate by sectionId)
                            const mergedSectionIds = new Set(mergedSections.map((section) => section.sectionId));
                            const sectionsToAppend = apiSections.filter((apiSection) => !mergedSectionIds.has(apiSection.sectionId));
                            const finalMergedSections = [...mergedSections, ...sectionsToAppend];
                            updateDecisionTreeState({ contactId, existingDecisionTreeData, decisionTreeData, sections: finalMergedSections, extraData: { title, icon, completeBtnTitle } });
                        })
                            .catch((error) => {
                            const errorMessage = error instanceof Error ? error.message : String(error);
                            logger.error('getDecisionTreeElement', errorMessage);
                            // Fallback to mergedSections on API failure
                            updateDecisionTreeState({ contactId, existingDecisionTreeData, decisionTreeData, sections: mergedSections, error: errorMessage });
                        });
                    }
                    else {
                        // No decisionTreeId - use mergedSections only
                        updateDecisionTreeState({ contactId, existingDecisionTreeData, decisionTreeData, sections: mergedSections });
                    }
                    break;
                }
            }
        });
    });
    /**
     * Helper to dispatch decision tree state update
     * @param params - Object containing parameters for updating decision tree state
     *
     * @example
     * ```typescript
     * updateDecisionTreeState({ contactId, existingDecisionTreeData: existing, decisionTreeData: newData, sections });
     * updateDecisionTreeState({ contactId, existingDecisionTreeData: existing, decisionTreeData: newData, sections, extraData: { title: 'My Tree' } });
     * ```
     */
    const updateDecisionTreeState = (params) => {
        const { contactId, existingDecisionTreeData, decisionTreeData, sections, extraData, error = null } = params;
        store.dispatch(CcfCopilotActions.updateDecisionTreeState({
            contactId,
            updates: {
                isDecisionTreeOpen: true,
                decisionTreeData: Object.assign(Object.assign(Object.assign(Object.assign({}, existingDecisionTreeData), decisionTreeData), extraData), { sections,
                    error }),
            },
        }));
    };
    /**
     * Schedules a single flush of any pending copilot notifications using requestAnimationFrame to batch dispatches.
     *
     * This prevents redundant flushes by gating with a flag and processes buffered messages in one batched update.
     * @example
     * ```typescript
     * // Add a message to the buffer and trigger a batched flush on the next frame
     * pendingNotifications.push({ command: AgentAssistCommand.message, body: { contactId: '123', acpAppElements: [] } } as AgentAssistBaseResponse);
     * scheduleFlush();
     * ```
     */
    const scheduleFlush = () => {
        if (flushScheduled)
            return;
        flushScheduled = true;
        // Use RAF to align with browser paint cycles
        requestAnimationFrame(() => {
            flushScheduled = false;
            const notificationsToProcess = pendingNotifications.splice(0);
            batch(() => {
                notificationsToProcess.forEach((notification) => {
                    // No await to keep dispatches grouped; async work continues
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    processNotification(notification);
                });
            });
        });
    };
    return actions$.pipe(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter((action) => action.type === CcfAuthenticationActions.logUserIn.type), first(), map(() => {
        CXoneClient.instance.copilotNotificationClient.onMessageNotification.subscribe((msg) => {
            pendingNotifications.push(msg);
            scheduleFlush();
        });
        return CcfCopilotActions === null || CcfCopilotActions === void 0 ? void 0 : CcfCopilotActions.default;
    }));
};
/**
* Thunk action creator to handle async requests while getting info for agent query through
* @example
* ```
* dispatch(copilotSearch(searchText, activeCaseId));
* ```
*/
export const copilotSearch = createAsyncThunk(AgentCopilotAsyncAction.COPILOT_SEARCH, ({ searchText, activeCaseId }) => __awaiter(void 0, void 0, void 0, function* () {
    yield cxoneClientInstance.copilotService.search(searchText, activeCaseId);
}));
/**
* Thunk action creator to handle async requests while getting copilot adaptive card schema
* @param cxaVersion - branch name indicating UI version
* @example -
* ```
* dispatch(getAllCopilotAdaptiveCardSchemas());
* ```
* @returns
*/
export const getAllCopilotAdaptiveCardSchemas = createAsyncThunk(AgentCopilotAsyncAction.GET_ALL_COPILOT_ADAPTIVE_CARD_SCHEMA, (cxaVersion) => __awaiter(void 0, void 0, void 0, function* () {
    yield cxoneClientInstance.copilotService.fetchCopilotAdaptiveCardSchemasFromBucket(cxaVersion);
}));
/**
 * Thunk action creator to handle async requests while getting copilot healthcheck
 * @param contactId - contact Id of current active contact
 * @example dispatch(getCopilotHealth('1234'));
 */
export const getCopilotHealth = createAsyncThunk(AgentCopilotAsyncAction.HEALTH_CHECK_FOR_COPILOT, (contactId, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    if (healthCheckSubscribtion) {
        healthCheckSubscribtion.unsubscribe();
    }
    try {
        healthCheckSubscribtion = timer(0, HEALTH_CHECK_INTERVAL)
            .subscribe(() => {
            cxoneClientInstance.copilotService.healthCheck(contactId)
                .then(() => {
                dispatch(CcfCopilotActions.setCopilotStatus(true));
            })
                .catch((error) => {
                dispatch(CcfCopilotActions.setCopilotStatus(false));
                logger.error('healthCheck', error instanceof Error ? error.message : String(error));
            });
        });
    }
    catch (error) {
        logger.error('getCopilotHealth', error instanceof Error ? error.message : String(error));
    }
}));
/**
 * Thunk action creator to handle async requests while sending copilot reply
 * @example -
 * ```
 * dispatch(sendCopilotReply(caseId, response));
 * ```
 */
export const sendCopilotReply = createAsyncThunk('agentCopilot/sendReply', ({ caseId, response }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const state = getState();
    const { inbox, contactEditor } = state;
    const activeContact = getActiveContactState(inbox);
    const selectedDigitalContactDetails = getSelectedDigitalContactDetails(activeContact, inbox);
    const wysiwygEnabled = !!((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.wysiwygEnabled);
    const isOBContact = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.isOutbound) &&
        ((_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _b === void 0 ? void 0 : _b.status) === DigitalContactStatus.DRAFT
        ? true
        : false;
    const digitalContactUserSavedProperties = inbox === null || inbox === void 0 ? void 0 : inbox.cxoneDigitalContactUserSavedProperties;
    const savedDigitalContactDetails = digitalContactUserSavedProperties[(_c = selectedDigitalContactDetails.case) === null || _c === void 0 ? void 0 : _c.id];
    const { subject, isEditorOpen, editorState, selectedMessageReplyData, receiverTo, receiverCc, receiverBcc, messageDraftId, parsedLexicalString, fromAddress } = contactEditor[caseId];
    // If messageDraftId is available then will update the draft message and send the approval
    if (messageDraftId) {
        updateContactDraftMessage(selectedDigitalContactDetails, wysiwygEnabled, parsedLexicalString, messageDraftId, fromAddress);
        return;
    }
    const sendCopilotReplyObj = prepareCopilotReplyObject({
        activeContact,
        selectedDigitalContactDetails,
        wysiwygEnabled,
        editorState,
        isEditorOpen,
        selectedMessageReplyData,
        subject,
        receiverTo,
        receiverCc,
        receiverBcc,
        isOBContact,
        savedDigitalContactDetails,
        parsedLexicalString,
    }, response);
    selectedDigitalContactDetails
        .reply(sendCopilotReplyObj, (_d = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _d === void 0 ? void 0 : _d.id, uuid())
        .catch((err) => {
        var _a, _b, _c;
        const errorMessage = (_c = (_b = (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.errors[0]) === null || _c === void 0 ? void 0 : _c.message;
        dispatch(CcfCopilotActions.setToastErrorMessage({ type: 'error', titleMessage: errorMessage }));
        dispatch(CcfContactEditorAction.setIsContactEditorFocused({ caseId, isEditorFocused: true }));
        logger.error('agentCopilot/sendReply', errorMessage || (err instanceof Error ? err.message : String(err)));
        dispatch(CcfContactEditorAction.updateSendButtonEnabled({ caseId, isSendButtonEnabled: true })); // in case of an error the button will be enabled so that user can again retry sending
        dispatch(CcfContactEditorAction.setEditorDiscardDisabled({ caseId, isDiscardDisabled: false }));
    });
}));
/**
* Thunk action creator to handle async requests while generating email
* @example -
* ```
* dispatch(generateEmail('123','emailIdentifier', topics));
* ```
* @returns
*/
export const generateEmail = createAsyncThunk(AgentCopilotAsyncAction.COPILOT_EMAIL, ({ contactId, emailIdentifier, topics }) => __awaiter(void 0, void 0, void 0, function* () {
    yield cxoneClientInstance.copilotService.generateEmail(contactId, emailIdentifier, topics);
}));
/**
* Thunk action creator to handle async requests while getting draft email
* @example -
* ```
* dispatch(getDraftEmail('123','emailIdentifier'));
* ```
* @returns
*/
export const getDraftEmail = createAsyncThunk(AgentCopilotAsyncAction.COPILOT_EMAIL, ({ contactId }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const state = getState();
    const { emailCards } = state.ccfCopilotData.adaptiveCardsData[contactId];
    const emailIdentifier = ((_e = emailCards === null || emailCards === void 0 ? void 0 : emailCards[0]) === null || _e === void 0 ? void 0 : _e.objectId) || '';
    cxoneClientInstance.copilotService.getDraftEmail(contactId, emailIdentifier).then((response) => {
        dispatch(CcfContactEditorAction.upsertEditorStateForEmail({
            caseId: contactId,
            contentToAdd: response === null || response === void 0 ? void 0 : response.emailContent,
        }));
    });
}));
/**
* Thunk action creator to handle async requests while getting last gnereated topics
* @example -
* ```
* dispatch(getLastGeneratedTopics('123'));
* ```
* @returns
*/
export const getLastGeneratedTopics = createAsyncThunk(AgentCopilotAsyncAction.COPILOT_EMAIL, ({ contactId }) => __awaiter(void 0, void 0, void 0, function* () {
    yield cxoneClientInstance.copilotService.getLastGeneratedTopics(contactId);
}));
/**
 * Thunk action creator to handle async requests while getting copilot journey summary
 * @param contactId - contact Id of current active contact
 * @param customerId - customer Id of current active contact
 * @example dispatch(getJourneySummaryData('1234','5678', aahConfiguration));
 */
export const getJourneySummaryData = createAsyncThunk(AgentCopilotAsyncAction.COPILOT_JOURNEY_SUMMARY, (({ activeCaseId, activeContactInSelectedInteraction }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j, _k, _l;
    const state = getState();
    const { inbox, ccfAgentContactHistory } = state;
    const activeContact = getActiveContactState(state.inbox);
    const voiceContactDetails = inbox.cxoneVoiceContactDetails;
    const voiceMailContactDetails = inbox.cxoneVoiceMailContactDetails;
    const voiceSkillName = (voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.skillName) || (voiceMailContactDetails === null || voiceMailContactDetails === void 0 ? void 0 : voiceMailContactDetails.skillName);
    const cxoneRoutingQueueId = ccfAgentContactHistory.routingQueueIds;
    const aahConfiguration = cxoneClientInstance.copilotService.getAgentAssistConfig(`${activeCaseId}`, true);
    let response;
    let customerId = '';
    const digitalContactDetails = inbox.cxoneDigitalContactDetails;
    if ((voiceContactDetails || voiceMailContactDetails) && (activeContact && (activeContact.media === MediaType.VOICE || activeContact.media === MediaType.VOICEMAIL))) {
        const voiceContactData = activeContact;
        if (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.customerCardUrl) {
            const queryParams = new URLSearchParams(decodeURIComponent(voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.customerCardUrl));
            customerId = queryParams.get('customerId');
        }
        else if (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.customerName) {
            customerId = 'voice_' + voiceContactData.contactMode;
        }
        response = yield cxoneDigitalClient.digitalService.getContactHistory(customerId !== null && customerId !== void 0 ? customerId : '', '');
    }
    else {
        if (digitalContactDetails || activeContactInSelectedInteraction) {
            if ((activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.interactionId) && (digitalContactDetails[activeContactInSelectedInteraction.interactionId] && Object.keys(digitalContactDetails[activeContactInSelectedInteraction.interactionId]).length) && (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.customerName) && (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId)) {
                const digitalCase = digitalContactDetails[activeContactInSelectedInteraction.interactionId][activeContactInSelectedInteraction.caseId].case;
                customerId = ((_f = digitalCase === null || digitalCase === void 0 ? void 0 : digitalCase.authorEndUserIdentity) === null || _f === void 0 ? void 0 : _f.id) || '';
            }
            response = yield cxoneDigitalClient.digitalService.getContactHistory(customerId !== null && customerId !== void 0 ? customerId : '', '');
        }
    }
    const contactHistoryData = [];
    let customerName = '';
    response && contactHistoryData.push(response.cxoneCase);
    const mergedContactsData = contactHistoryData.flat(1);
    if (mergedContactsData && mergedContactsData.length > 0) {
        const firstContact = mergedContactsData[0];
        if (((_g = firstContact === null || firstContact === void 0 ? void 0 : firstContact.authorEndUserIdentity) === null || _g === void 0 ? void 0 : _g.externalPlatformId) !== 'chat') {
            customerName =
                ((_k = (_j = (_h = firstContact.endUser) === null || _h === void 0 ? void 0 : _h.identities) === null || _j === void 0 ? void 0 : _j.find((identity) => {
                    var _a;
                    return identity.externalPlatformId === ((_a = firstContact === null || firstContact === void 0 ? void 0 : firstContact.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.externalPlatformId);
                })) === null || _k === void 0 ? void 0 : _k.idOnExternalPlatform) || '';
        }
        else {
            customerName = ((_l = firstContact === null || firstContact === void 0 ? void 0 : firstContact.authorEndUserIdentity) === null || _l === void 0 ? void 0 : _l.fullName) || '';
        }
        const contactHistory = mergedContactsData.map((contact) => {
            var _a, _b, _c;
            const channelType = activeContact && activeContact.media;
            const routingQueueId = cxoneRoutingQueueId === null || cxoneRoutingQueueId === void 0 ? void 0 : cxoneRoutingQueueId.filter((element) => {
                return contact.routingQueueId === element.id;
            });
            contact.skill = (_c = (_b = (routingQueueId && ((_a = routingQueueId[0]) === null || _a === void 0 ? void 0 : _a.name))) !== null && _b !== void 0 ? _b : voiceSkillName) !== null && _c !== void 0 ? _c : '';
            const contactId = channelType === MediaType.VOICE ? contact.threadIdOnExternalPlatform : contact.id;
            return {
                contactNumber: contactId || '',
                channelType: channelType || '',
                contactDate: contact.createdAt,
                skill: contact.skill || '',
                status: contact.status,
            };
        });
        dispatch(CcfCopilotActions.addContactHistory({ caseId: activeCaseId, contactHistory }));
        yield cxoneClientInstance.copilotService.getJourneySummary(contactHistory, activeCaseId, customerId !== null && customerId !== void 0 ? customerId : '', aahConfiguration, customerName);
    }
})));
/**
* Thunk action creator to handle async requests while getting generated final summary
* @example -
* ```
* dispatch(fetchGeneratedFinalSummary('123'));
* ```
* @returns
*/
export const fetchGeneratedFinalSummary = createAsyncThunk(AgentCopilotAsyncAction.COPILOT_FINAL_SUMMARY, ({ contactId }, { getState, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _m, _o;
    try {
        const response = yield cxoneClientInstance.copilotService.fetchGeneratedFinalSummary(contactId);
        const state = getState();
        const { disposition, ccfCopilotData } = state;
        const dispositionData = ((_m = disposition === null || disposition === void 0 ? void 0 : disposition.dispositions[contactId]) === null || _m === void 0 ? void 0 : _m.formInputs) || {};
        const isFinalSummaryGenerated = (_o = ccfCopilotData === null || ccfCopilotData === void 0 ? void 0 : ccfCopilotData.adaptiveCardsData[contactId]) === null || _o === void 0 ? void 0 : _o.isFinalSummaryGenerated;
        const httpResponse = response;
        const { body: { conversationSummary } = { conversationSummary: '' } } = httpResponse;
        if ((httpResponse === null || httpResponse === void 0 ? void 0 : httpResponse.status) === 200 && conversationSummary && !isFinalSummaryGenerated) {
            dispatch(dispositionInteractionActions.setFormInput({
                contactId: contactId,
                formInput: DispositionConstants.NOTES,
                value: conversationSummary,
            }));
            dispatch(CcfCopilotActions.setIsFinalSummaryGenerated({ caseId: contactId, isFinalSummaryGenerated: true }));
            const adaptiveCardToAdd = {
                [contactId]: {
                    contactId,
                    agentAssistSource: '',
                    utcTimestamp: new Date(),
                    acpAppElements: [
                        {
                            contentType: AgentCopilotContentType.FINAL_SUMMARY_NOTES,
                            cardType: AgentCopilotCardType.TEXT,
                            objectId: `FinalSummaryCard_${contactId}`,
                            content: {
                                type: 'finalSummary',
                                summary: conversationSummary,
                            },
                        }
                    ],
                    responseSent: '',
                    isResponseInserted: false,
                    insertedNBRId: '',
                    isNBRAvailable: false,
                    isNBROpen: false,
                    isFinalSummaryGenerated: true,
                    comprehensiveFeedback: {
                        guidanceFeedbacks: [],
                        contactFeedbackCard: {
                            overallFeedbackTitle: '',
                            feedback: '',
                        },
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
                    decisionTreeData: {},
                },
            };
            const { getAgentAssistConfig } = cxoneClientInstance.copilotService;
            const aAHConfiguration = getAgentAssistConfig && getAgentAssistConfig(contactId, true);
            addAdaptiveCard(contactId, adaptiveCardToAdd, dispatch, aAHConfiguration);
            (dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.type) === MediaType.DIGITAL && setDispositionToLocalStorage(dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.disposition, contactId, conversationSummary);
        }
    }
    catch (error) {
        logger.error('fetchGeneratedFinalSummary', error instanceof Error ? error.message : String(error));
    }
}));
/**
 * Thunk action creator to handle async requests for executing a Task Assist action.
 *
 * @param intentConfig - The configuration object for the intent, including metadata such as name and display name.
 * @param activeCaseId - The contact ID of the currently active interaction.
 * @param formCapturedata - Optional form data captured from user input, passed to the backend service.
 * @param taskSessionUid - Optional unique identifier for the task session, useful for tracking requests.
 *
 * @returns A Promise that resolves when the Task Assist request has been completed.
 */
export const executeTaskAssist = createAsyncThunk(AgentCopilotAsyncAction.COPILOT_TASK_ASSIST, ({ intentConfig, activeCaseId, formCapturedata, taskSessionUid, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield cxoneClientInstance.copilotService.getTaskResponse(activeCaseId, intentConfig, formCapturedata, taskSessionUid);
}));
/**
 * Thunk action creator to get the task assist form schema
 * @param intentName - Name of the intent.
 * @param contactId - Contact ID for the active session.
 * @example -
 * ```
 * dispatch(getTaskAssistFormSchema({ intentName, contactId }));
 * ```
 * @returns
 */
export const getTaskAssistFormSchema = createAsyncThunk(AgentCopilotAsyncAction.COPILOT_TASK_ASSIST, ({ intentName, contactId }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cxoneClientInstance.copilotService.getTaskAssistFormSchema(intentName, contactId);
}));
/**
 * Thunk action creator to get the task assist form pre filled data
 * @param IntentConfig - The intent configuration.
 * @param customerId - customer Id of current active contact
 * @example -
 * ```
 * dispatch(getTaskAssistFormPreFilledData({ intentName }));
 * ```
 * @returns
 */
export const getTaskAssistFormPreFilledData = createAsyncThunk(AgentCopilotAsyncAction.COPILOT_TASK_ASSIST, ({ intentConfig, activeCaseId, objectId }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cxoneClientInstance.copilotService.getTaskAssistFormPreFilledData(intentConfig, activeCaseId, objectId);
}));
/**
 * Thunk action creator to save the edited summary
 * @param channel - Channel of the contact
 * @param contactNumber - Contact number of the contact
 * @param summary - Edited summary text
 * @example -
 * ```
 * dispatch(saveEditedSummary({ channel, contactNumber, summary }));
 * ```
 * @returns
 */
export const saveEditedSummary = createAsyncThunk(AgentCopilotAsyncAction.COPILOT_AUTO_SUMMARY, ({ channel, contactNumber, summary }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cxoneClientInstance.copilotService.saveEditedSummary(channel, contactNumber, summary);
}));
export const skipDecisionTreeQuestion = createAsyncThunk('agentCopilot/skipDecisionTreeQuestion', // TO-DO: Use AgentCopilotAsyncAction enum
({ taskSessionUid, contactId, decisionTreeId, questionId, sectionId }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cxoneClientInstance.copilotService.skipDecisionTreeQuestion(taskSessionUid, contactId, decisionTreeId, questionId, sectionId);
}));
/**
 * Thunk action creator to fetch decision tree element by ID
 * @param decisionTreeId - The ID of the decision tree element
 * @example
 * ```ts
 * dispatch(getDecisionTreeElement('dt-001'));
 * ```
 * @returns
 */
export const getDecisionTreeElement = createAsyncThunk('agentCopilot/getDecisionTreeElement', (decisionTreeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cxoneClientInstance.copilotService.getDecisionTreeElement(decisionTreeId);
}));
/**
 * Thunk action creator to send Decision Tree section-change event
 *
 * @param params - `{ contactId, decisionTreeId, sectionId }`
 * @example
 * ```ts
 * dispatch(applyDecisionTreeSectionChange({
 *   contactId: '203444780887',
 *   decisionTreeId: 'a75bf9bb-203c-4850-b743-35e31f2f4421',
 *   sectionId: '12414-4141-4141-4141'
 * }));
 * ```
 */
export const applyDecisionTreeSectionChange = createAsyncThunk('agentCopilot/postDecisionTreeSectionChange', (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskSessionUid, contactId, decisionTreeId, sectionId } = params;
    return yield cxoneClientInstance.copilotService.postDecisionTreeSectionChange(taskSessionUid, contactId, decisionTreeId, sectionId);
}));
/**
 * Thunk action: update a Decision Tree response
 *
 * @example
 */
export const updateDecisionTreeResponseThunk = createAsyncThunk('agentCopilot/updateDecisionTreeResponse', (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskSessionUid, contactId, decisionTreeId, sectionId, questionId, newResponse } = params;
    return yield cxoneClientInstance.copilotService.updateDecisionTreeResponse({
        taskSessionUid,
        contactId,
        decisionTreeId,
        sectionId,
        questionId,
        newResponse,
    });
}));
/**
 * Thunk to submit a completed Decision Tree
 */
export const submitDecisionTreeThunk = createAsyncThunk('agentCopilot/submitDecisionTree', ({ taskSessionUid, contactId, decisionTreeId, }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield cxoneClientInstance.copilotService.submitDecisionTree(taskSessionUid, contactId, decisionTreeId);
        return response;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}));
/**
 * Thunk to cancel an ongoing Decision Tree
 *
 * @param taskSessionUid - The unique identifier for the task session.
 * @param contactId - The contact ID associated with the decision tree.
 * @param decisionTreeId - The ID of the decision tree to be canceled.
 * @example
 * ```ts
 * dispatch(cancelDecisionTreeThunk({
 *   taskSessionUid
 *  contactId,
 *  decisionTreeId
 * }));
 * ```
 */
export const cancelDecisionTreeThunk = createAsyncThunk('agentCopilot/cancelDecisionTree', ({ taskSessionUid, contactId, decisionTreeId, }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield cxoneClientInstance.copilotService.cancelDecisionTree(taskSessionUid, contactId, decisionTreeId);
        return response;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}));
//# sourceMappingURL=ccf-agent-copilot-middleware.js.map