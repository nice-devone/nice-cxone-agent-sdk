import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { voiceContactSelector, getDigitalContactDetailsByCaseId, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { DigitalContactStatus, MediaType, AgentAssistConfigACPParamsKeys, VoiceContactStatus, } from '@nice-devone/common-sdk';
import { dispositionInteractionActions, getDispositionData, generateAutoSummary, setDispositionToLocalStorage, getDispositionLocalStorageData, } from './ccf-disposition-slice';
import { getIsAutoSummaryEnabled, } from '../global.app.slice';
import { CcfLogger, CopilotService, } from '@nice-devone/agent-sdk';
import { currentUserAgentId, } from '../ccf-agent-state/ccf-agent-state.slice';
import AcdDisposition from './forms/AcdDisposition';
import CcfDispositionStyles from './ccf-disposition.styles';
import { CcfCopilotActions, getComprehensiveFeedbackData, getFinalSummaryNotes, isAgentAssistConfigParamsEnabledForContact, selectHasCopilotConfig } from '../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import CcfDigitalDispositionCaseSeparation from './forms/ccf-digital-disposition-case-separation';
import CcfRedialPanel from './forms/ccf-redial-panel';
import { ValidationUtils } from '@nice-devone/core-sdk';
/**
 * Component displays accordion details for disposition
 * @param props -CcfDispositionInteractionAccordionDetailsProps
 * @returns displays accordion details for disposition
 * @example <CcfDispositionAccordionDetails/>
 */
export function CcfDispositionAccordionDetails({ clickedResolved, contactMedia, activeContact, onClickSaveButton, isSaveDisabled, isDisplayRedialPanel, setIsDisplayRedialPanel, selectedOBSkill, setSelectedOBSkill, }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const dispositionData = useSelector(getDispositionData);
    const isAutoSummaryEnabled = useSelector(getIsAutoSummaryEnabled);
    const currentAgentId = useSelector(currentUserAgentId);
    const voiceContact = useSelector(voiceContactSelector);
    const theme = useTheme();
    const dispositionStyles = CcfDispositionStyles(theme);
    const contactIdOrCaseId = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.DIGITAL ? activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId : activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId; //in case of digital contact caseID is the actual contactID
    const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-disposition-accordion');
    const copilotService = new CopilotService();
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId));
    const comprehensiveFeedbackData = useSelector(getComprehensiveFeedbackData(contactIdOrCaseId));
    const dispatch = useDispatch();
    const { setFormInput, reloadDispositionData, updateIsDispositionSaved } = dispositionInteractionActions;
    const cxoneAcdClient = CXoneAcdClient.instance;
    const isACDContact = contactMedia === MediaType.VOICE || contactMedia === MediaType.VOICEMAIL || contactMedia === MediaType.WORKITEM;
    const validationUtils = new ValidationUtils();
    const { copilotEnabled, copilotConfig } = useSelector(selectHasCopilotConfig(contactIdOrCaseId));
    const { Params } = copilotConfig || {};
    const shouldAutoSummaryMapToOutcomePanel = copilotEnabled && ((Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.AUTOSUMMARY_TO_OUTCOME_PANEL]) !== false);
    const finalSummaryNotes = useSelector(getFinalSummaryNotes(typeof contactIdOrCaseId === 'string' ? contactIdOrCaseId : '', copilotEnabled));
    const isPrivateFeedbackEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.PRIVATE_FEEDBACK));
    const isPublicFeedbackEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.PUBLIC_FEEDBACK));
    const isGuidanceFeedbackCardsEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.GUIDANCE_FEEDBACK_CARDS));
    const isOverallSubcardEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.OVERALL_SUBCARD));
    const isKHInputJsonFileEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.ENABLE_INPUT_JSON_FILE));
    let formData = null;
    let isResolved = false;
    if (activeContact &&
        contactIdOrCaseId &&
        dispositionData.dispositions[contactIdOrCaseId]) {
        formData = dispositionData.dispositions[contactIdOrCaseId].formInputs || null;
        isResolved = dispositionData.dispositions[contactIdOrCaseId].isResolved;
    }
    const isFinalSummaryEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.FINAL_SUMMARY));
    const generateFinalSummaryEnabled = isFinalSummaryEnabled && ((Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.AUTOSUMMARY_TO_OUTCOME_PANEL]) !== false || (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.SHOW_AUTOSUMMARY_CARD]) !== false);
    /**
     * Function to handle change of dropdown
     * @param event - a disposition form input change
     * @param field - field that we are saving values too
     * @param passedVal - value that we are saving to passed in field
     * @example - handleChange
     */
    const handleChange = (event, field, passedVal) => {
        var _a, _b, _c, _d, _e, _f;
        const target = event.target;
        const value = passedVal !== undefined ? passedVal : target.value;
        if (activeContact === undefined || formData === null)
            return;
        const isResolvedOrClosedDigitalContact = passedVal === DigitalContactStatus.RESOLVED || passedVal === DigitalContactStatus.CLOSED;
        if (isResolvedOrClosedDigitalContact || ((_a = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(VoiceContactStatus.DISCONNECTED))) {
            if (generateFinalSummaryEnabled && isResolvedOrClosedDigitalContact) {
                dispatch(CcfCopilotActions.setIsFinalSummaryGenerated({ caseId: contactIdOrCaseId, isFinalSummaryGenerated: false }));
                dispatch(dispositionInteractionActions.setFinalSummaryTimeout({ contactId: contactIdOrCaseId, timeout: false }));
                copilotService.generateFinalSummary(`${contactIdOrCaseId}`, passedVal).then(() => {
                    dispatch(dispositionInteractionActions.setIsGenerateFinalSummaryRequestSent({ contactId: contactIdOrCaseId, isSent: true }));
                });
            }
            // DEV Comment - Checking for channel Email to not send this comprehensive feedback card
            if (copilotEnabled && activeContact.channelName !== MediaType.EMAIL) {
                const knowledgeHubFeedbackEnabled = isKHInputJsonFileEnabled && ((_b = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.KNOWLEDGE_HUB_CONFIG]) === null || _b === void 0 ? void 0 : _b.feedbackEnabled);
                const showComprehensiveCard = isOverallSubcardEnabled || (isGuidanceFeedbackCardsEnabled && (isPublicFeedbackEnabled || isPrivateFeedbackEnabled)) || knowledgeHubFeedbackEnabled;
                if (showComprehensiveCard) {
                    dispatch(CcfCopilotActions.generateComprehensiveCard({ caseId: contactIdOrCaseId, generateComprehensiveCard: true }));
                }
            }
        }
        //Call summarize API for a digital contact when the agent selects closed/resolved and the contact type is digital and autosummary enabled in FT, BU and dispositions configured in the skill.
        if (isAutoSummaryEnabled && field === 'status'
            && [DigitalContactStatus.RESOLVED, DigitalContactStatus.CLOSED].includes(passedVal)
            && (activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.DIGITAL
            && contactIdOrCaseId && (dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.autoSummaryEnabledContacts) && ((_c = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.autoSummaryEnabledContacts) === null || _c === void 0 ? void 0 : _c.includes(contactIdOrCaseId))
            && !((_d = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactIdOrCaseId]) === null || _d === void 0 ? void 0 : _d.isGenerateAutoSummaryRequestSent)
            && ((_f = (_e = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactIdOrCaseId]) === null || _e === void 0 ? void 0 : _e.dispositionData) === null || _f === void 0 ? void 0 : _f.length) > 0) {
            const caseId = (contactIdOrCaseId === null || contactIdOrCaseId === void 0 ? void 0 : contactIdOrCaseId.toString()) || '';
            const autoSummaryPayload = {
                triggerReason: (passedVal === null || passedVal === void 0 ? void 0 : passedVal.toString()) === 'resolved' ? DigitalContactStatus.RESOLVED : DigitalContactStatus.CLOSED,
                appType: 'CXOneAgent',
                direction: (activeContact === null || activeContact === void 0 ? void 0 : activeContact.isOutbound) ? 'Outbound' : 'Inbound',
                eventTime: new Date().toISOString(),
                mediaType: MediaType.DIGITAL,
                masterId: (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.masterID) || '',
                agentUUId: currentAgentId,
            };
            dispatch(dispositionInteractionActions.setAutoSummaryTimeout({ contactId: contactIdOrCaseId, timeout: false }));
            dispatch(generateAutoSummary({ caseId, autoSummaryPayload }));
        }
        dispatch(setFormInput({ contactId: contactIdOrCaseId, formInput: field, value: validationUtils.isNotNullOrUndefined(value) ? value : '' }));
    };
    /**
     * Function to handle accordion change
     * @example - handleAccordionChange
     */
    const handleAccordionChange = () => {
        setIsExpanded(!isExpanded);
    };
    useEffect(() => {
        setIsExpanded(true);
    }, [clickedResolved]);
    useEffect(() => {
        // Once page gets rendered load data from local storage/ save API
        updateSavedDisposition();
    }, []);
    useEffect(() => {
        var _a;
        const digitalContactId = selectedDigitalContactDetails.caseId;
        //Check the stored disposition only for digital contact
        const disposition = dispositionData.dispositions[digitalContactId];
        if (disposition) {
            const { disposition: currentDispositionData, notes } = (_a = disposition.formInputs) !== null && _a !== void 0 ? _a : {};
            // for preview contact since disposition is disabled, we don't need to save into the local storage
            if (activeContact === null || activeContact === void 0 ? void 0 : activeContact.isAssignedToAgentInbox) {
                setDispositionToLocalStorage(currentDispositionData, digitalContactId, notes);
            }
        }
    }, [dispositionData]);
    /**
     * Function to update dispositions from local storage or save API
     * @example updateSavedDisposition();
     */
    const updateSavedDisposition = () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        // get data from local storage
        const parsedDataFromLocalStorage = getDispositionLocalStorageData();
        const digitalContactId = selectedDigitalContactDetails.caseId;
        if (parsedDataFromLocalStorage) {
            const currentSelectedDispositionId = (_a = parsedDataFromLocalStorage.dispositionContacts[digitalContactId]) === null || _a === void 0 ? void 0 : _a.dispositionId;
            // Get selected disposition list from redux store
            const currentSelectedDispositionData = (_b = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[digitalContactId]) === null || _b === void 0 ? void 0 : _b.dispositionData;
            if (currentSelectedDispositionData) {
                // Get selected disposition from the current selected disposition data list
                const currentSelectedData = currentSelectedDispositionData === null || currentSelectedDispositionData === void 0 ? void 0 : currentSelectedDispositionData.find((dispositionData) => dispositionData.dispositionId === currentSelectedDispositionId);
                // If saved disposition available in local storage then will show those details
                if (currentSelectedData) {
                    const formInputs = {
                        notes: shouldAutoSummaryMapToOutcomePanel ? ((finalSummaryNotes === null || finalSummaryNotes === void 0 ? void 0 : finalSummaryNotes.summary) || ((_c = parsedDataFromLocalStorage === null || parsedDataFromLocalStorage === void 0 ? void 0 : parsedDataFromLocalStorage.dispositionContacts[digitalContactId]) === null || _c === void 0 ? void 0 : _c.note) || '') : ((_d = parsedDataFromLocalStorage === null || parsedDataFromLocalStorage === void 0 ? void 0 : parsedDataFromLocalStorage.dispositionContacts[digitalContactId]) === null || _d === void 0 ? void 0 : _d.note) || '',
                        disposition: Object.assign({}, currentSelectedData),
                    };
                    dispatch(reloadDispositionData({ contactId: digitalContactId, formInputs }));
                }
                else if (currentSelectedDispositionData.length > 0) {
                    //else If disposition list available for this contact id then only will call the API
                    cxoneAcdClient.contactManager.dispositionService
                        .getSavedDisposition(digitalContactId)
                        .then((response) => {
                        const dispositionData = response;
                        const formInputs = {
                            notes: dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.notes,
                            disposition: Object.assign({}, dispositionData),
                        };
                        dispatch(reloadDispositionData({ contactId: digitalContactId, formInputs }));
                        dispatch(updateIsDispositionSaved({ contactId: digitalContactId, isSaved: true }));
                    })
                        .catch((error) => ccfLogger.error('getSavedDisposition', `error while fetching saved disposition - ${JSON.stringify(error)}`));
                }
            }
        }
    });
    return (_jsx(Accordion, Object.assign({ sx: dispositionStyles.dispositionCardsAccordion, expanded: isExpanded, onChange: handleAccordionChange }, { children: _jsxs(AccordionDetails, Object.assign({ sx: dispositionStyles.accordionDetails }, { children: [isACDContact && !isDisplayRedialPanel &&
                    contactIdOrCaseId &&
                    formData !== null && (_jsx(AcdDisposition, { contactId: contactIdOrCaseId, formData: formData, handleChange: handleChange, isResolved: isResolved, voiceContact: voiceContact })), contactMedia === MediaType.VOICE && isDisplayRedialPanel && (_jsx(CcfRedialPanel, { setIsDisplayRedialPanel: setIsDisplayRedialPanel, selectedOBSkill: selectedOBSkill, setSelectedOBSkill: setSelectedOBSkill })), contactMedia === MediaType.DIGITAL && formData !== null && !isDisplayRedialPanel && (_jsx(CcfDigitalDispositionCaseSeparation, { formData: formData, isResolved: isResolved, onClickSaveButton: onClickSaveButton, isSaveDisabled: isSaveDisabled }))] })) })));
}
export default CcfDispositionAccordionDetails;
//# sourceMappingURL=ccf-disposition-accordion-details.js.map