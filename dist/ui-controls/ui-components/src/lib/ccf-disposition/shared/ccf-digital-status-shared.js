import { __rest } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, MenuItem, Popper, TextField, Typography, useTheme, } from '@mui/material';
import { CcfAppToastMessage, useTranslator } from '@nice-devone/ui-controls';
import { AgentAssistCommand, DigitalContactStatus, MediaType, AgentAssistConfigACPParamsKeys, AutoSummaryErrorCode, } from '@nice-devone/common-sdk';
import { dispositionInteractionActions, generateAutoSummary, getDispositionData, getDispositionOutcomeResponse, getPendingDigitalStatus, saveDigitalStatus, getIsDigitalStatusToastOpen, } from '../ccf-disposition-slice';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAutoSummaryEnabled, } from '../../global.app.slice';
import { currentUserAgentId } from '../../ccf-agent-state/ccf-agent-state.slice';
import { toast } from 'react-toastify';
import { memo, useEffect, useRef, useState } from 'react';
import { CcfCopilotActions, getComprehensiveFeedbackData, getIsFinalSummaryGenerated, isAgentAssistConfigParamsEnabledForContact, isCopilotEnabledForContact, } from '../../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { CopilotService, CXoneClient } from '@nice-devone/agent-sdk';
import { getDigitalContactDetailsByCaseId, getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { Done } from '@mui/icons-material';
import CcfDigitalStatusSharedStyles from './ccf-digital-status-shared.styles';
;
const digitalOptions = [
    DigitalContactStatus.OPEN,
    DigitalContactStatus.PENDING,
    DigitalContactStatus.ESCALATED,
    DigitalContactStatus.RESOLVED,
    DigitalContactStatus.CLOSED
];
const helperTextChangeFailed = 'Error: Status change failed. Try again.';
const helperTextChangeSaved = 'Status change has been saved';
const helperTextDefault = ' ';
const cxoneClientInstance = CXoneClient.instance;
/**
 * Component displays Digital Disposition
 * @param statusFormParams - formData of currently selected status, handleChange function, digitalStatusRef, isDigitalContactClosed
 * @returns displays digital disposition status dropdown
 * @example <CcfDigitalStatusShared />
 */
export const CcfDigitalStatusShared = (statusFormParams) => {
    var _a, _b;
    const theme = useTheme();
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const { setFormInput } = dispositionInteractionActions;
    const [statusControlDisabled, setStatusControlDisabled] = useState(false);
    const [helperText, setHelperText] = useState(' ');
    const digitalStatusRef = useRef(null);
    const renderedInOutcomesPanel = statusFormParams.renderedInOutcomesPanel;
    const isShortWindow = statusFormParams.isShortWindow;
    const copilotService = new CopilotService();
    const activeToast = useRef();
    const activeContact = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const contactIdOrCaseId = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.DIGITAL ? activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId : activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId;
    const isDigitalContactClosed = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactStatus) === DigitalContactStatus.CLOSED;
    const selectedCaseId = activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId;
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId));
    const dispositionData = useSelector(getDispositionData);
    const agentId = useSelector(currentUserAgentId);
    const comprehensiveFeedbackData = useSelector(getComprehensiveFeedbackData(contactIdOrCaseId));
    const dispositionOutcomeResponse = useSelector(getDispositionOutcomeResponse);
    const isCopilotFinalSummaryGenerated = useSelector(getIsFinalSummaryGenerated(contactIdOrCaseId));
    const isAutoSummaryEnabled = useSelector(getIsAutoSummaryEnabled);
    const activeDisposition = dispositionData.dispositions[selectedCaseId];
    const formData = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs;
    const isSaving = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isDigitalStatusSaving;
    const pendingStatus = useSelector(getPendingDigitalStatus(selectedCaseId));
    const isToastOpen = useSelector(getIsDigitalStatusToastOpen(selectedCaseId));
    const hasDispositions = ((_a = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.dispositionData) === null || _a === void 0 ? void 0 : _a.length) > 0;
    const { getAgentAssistConfig } = cxoneClientInstance.copilotService;
    const aahConfiguration = getAgentAssistConfig === null || getAgentAssistConfig === void 0 ? void 0 : getAgentAssistConfig(`${activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId}`, true);
    const { Params } = aahConfiguration || {};
    const isCopilotFinalSummaryEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.FINAL_SUMMARY));
    const isPrivateFeedbackEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.PRIVATE_FEEDBACK));
    const isPublicFeedbackEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.PUBLIC_FEEDBACK));
    const isGuidanceFeedbackCardsEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.GUIDANCE_FEEDBACK_CARDS));
    const isOverallSubcardEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.OVERALL_SUBCARD));
    const isKHInputJsonFileEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.ENABLE_INPUT_JSON_FILE));
    const generateFinalSummaryEnabled = isCopilotFinalSummaryEnabled && ((Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.AUTOSUMMARY_TO_OUTCOME_PANEL]) !== false || (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.SHOW_AUTOSUMMARY_CARD]) !== false);
    const { copilotEnabled } = useSelector(isCopilotEnabledForContact);
    let statusValue = ((_b = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _b === void 0 ? void 0 : _b.status) || (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactStatus);
    const autoSummaryToOutcomePanel = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.AUTOSUMMARY_TO_OUTCOME_PANEL));
    const showAutoSummaryCard = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.SHOW_AUTOSUMMARY_CARD));
    useEffect(() => {
        const isDisabled = isDigitalContactClosed
            || (statusValue === DigitalContactStatus.CLOSED)
            || isSaving
            || isToastOpen
            || ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateFinalSummaryRequestSent) && !isCopilotFinalSummaryGenerated)
            || ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateAutoSummaryRequestSent) && pendingStatus === DigitalContactStatus.RESOLVED);
        setStatusControlDisabled(!!isDisabled);
    }, [activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateAutoSummaryRequestSent, activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateFinalSummaryRequestSent, isSaving,
        isToastOpen,
        statusValue,
        isDigitalContactClosed,
        isCopilotFinalSummaryGenerated]);
    // Enlighten Autosummary checks
    useEffect(() => {
        if (!isAutoSummaryEnabled)
            return;
        const autoSummaryErrorMessage = (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage) || '';
        if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryStatus) === AgentAssistCommand.message && (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateAutoSummaryRequestSent)) {
            dispatch(dispositionInteractionActions.setisGenerateAutoSummaryRequestSent({ contactId: contactIdOrCaseId, isSent: false }));
            sendSetStatusRequest(pendingStatus, true);
        }
        else if ((!(activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateAutoSummaryRequestSent))
            && [DigitalContactStatus.CLOSED, DigitalContactStatus.RESOLVED].includes(pendingStatus)
            && ![AutoSummaryErrorCode.noError, AutoSummaryErrorCode.callTooShort].includes(autoSummaryErrorMessage)
            || ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateAutoSummaryRequestSent) && (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasAutoSummaryTimedOut))) {
            displayAutoSummaryFailedToast(autoSummaryErrorMessage);
        }
    }, [
        activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateAutoSummaryRequestSent,
        activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasAutoSummaryTimedOut,
        activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryStatus,
        activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage
    ]);
    // Copilot Autosummary checks
    useEffect(() => {
        if (!isCopilotFinalSummaryEnabled)
            return;
        const copilotErrorMessage = (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage) || '';
        if (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout) {
            !autoSummaryToOutcomePanel && showAutoSummaryCard && dispatch(CcfCopilotActions.addAutoSummaryErrorCard({ contactId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId }));
        }
        if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateFinalSummaryRequestSent) && isCopilotFinalSummaryGenerated) {
            dispatch(dispositionInteractionActions.setIsGenerateFinalSummaryRequestSent({
                contactId: contactIdOrCaseId,
                isSent: false,
            }));
            sendSetStatusRequest(pendingStatus, true);
        }
        else if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateFinalSummaryRequestSent) === false &&
            !isCopilotFinalSummaryGenerated &&
            [DigitalContactStatus.CLOSED, DigitalContactStatus.RESOLVED].includes(pendingStatus) &&
            ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout) || copilotErrorMessage)) {
            displayAutoSummaryFailedToast(copilotErrorMessage);
        }
    }, [
        isCopilotFinalSummaryGenerated,
        activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateFinalSummaryRequestSent,
        activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout,
        activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage
    ]);
    // Update helper text based on the response from the status change request
    useEffect(() => {
        if (dispositionOutcomeResponse === null || dispositionOutcomeResponse === void 0 ? void 0 : dispositionOutcomeResponse.messageKey) {
            (dispositionOutcomeResponse === null || dispositionOutcomeResponse === void 0 ? void 0 : dispositionOutcomeResponse.isError)
                ? setHelperText('Error: Status change failed. Try again.')
                : setHelperText('Status change has been saved');
        }
    }, [dispositionOutcomeResponse]);
    /**
     * Displays a toast message prompting the user to confirm closing an action, and sends a status request when the user confirms the action.
     * @param event - The event object triggered by the status change.
     * @param passedVal - The value to be used in the primary handler when the user confirms the action.
     * @param isRetry - Indicates whether the status change is a retry action for autosummary.
     * @example handleStatusChange(event, passedVal, isRetry);
     */
    const handleStatusChange = (event, passedVal, isRetry) => {
        const target = event === null || event === void 0 ? void 0 : event.target;
        statusValue = passedVal !== undefined ? passedVal : target.value;
        if (statusValue === DigitalContactStatus.CLOSED) {
            isRetry && sendStatusAndOrAutoSummaryRequest();
            !isRetry && displayCloseConfirmationToast();
        }
        else if (statusValue === DigitalContactStatus.RESOLVED) {
            dispatch(setFormInput({ contactId: contactIdOrCaseId, formInput: 'status', value: statusValue }));
            sendStatusAndOrAutoSummaryRequest();
        }
        else if (statusValue) {
            dispatch(setFormInput({ contactId: contactIdOrCaseId, formInput: 'status', value: statusValue }));
            sendSetStatusRequest(statusValue, hasDispositions);
        }
        setHelperText(' ');
    };
    /**
     * Sends a status request or an auto summary request based on the enabled features.
     *
     * If `isEnlightenAutoSummaryEnabled` is true, it sends an Enlighten request.
     * If `isCopilotAutoSummaryEnabled` is true, it sends a Copilot auto summary request.
     * Otherwise, it sends a set status request.
     *
     * After sending the appropriate request, it dispatches an action to set the form input
     * with the provided contact ID or case ID and status value, and dismisses any active toasts.
     *
     * @example sendStatusAndOrAutoSummaryRequest();
     */
    const sendStatusAndOrAutoSummaryRequest = () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const hasCopilotGeneratedFromResolved = (((_a = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _a === void 0 ? void 0 : _a.status) === DigitalContactStatus.RESOLVED && isCopilotFinalSummaryGenerated);
        const contactResolved = ((_b = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _b === void 0 ? void 0 : _b.status) === DigitalContactStatus.RESOLVED;
        const openOutcomesOnResolvedOrClosed = !renderedInOutcomesPanel
            && [DigitalContactStatus.CLOSED, DigitalContactStatus.RESOLVED].includes(statusValue)
            && (isAutoSummaryEnabled || isCopilotFinalSummaryEnabled || ((_c = activeDisposition.dispositionData) === null || _c === void 0 ? void 0 : _c.length) > 0);
        if (isAutoSummaryEnabled
            && !contactResolved
            && [DigitalContactStatus.RESOLVED, DigitalContactStatus.CLOSED].includes(statusValue)
            && (activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.DIGITAL
            && contactIdOrCaseId && (dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.autoSummaryEnabledContacts)
            && ((_d = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.autoSummaryEnabledContacts) === null || _d === void 0 ? void 0 : _d.includes(contactIdOrCaseId))
            && !((_e = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactIdOrCaseId]) === null || _e === void 0 ? void 0 : _e.isGenerateAutoSummaryRequestSent)
            && ((_g = (_f = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactIdOrCaseId]) === null || _f === void 0 ? void 0 : _f.dispositionData) === null || _g === void 0 ? void 0 : _g.length) > 0) {
            sendEnlightenRequest();
            openOutcomesOnResolvedOrClosed && dispatch(dispositionInteractionActions.displayDispositionCard(true));
        }
        else if (isCopilotFinalSummaryEnabled && !hasCopilotGeneratedFromResolved) {
            sendCopilotAutoSummaryRequest();
            openOutcomesOnResolvedOrClosed && dispatch(dispositionInteractionActions.displayDispositionCard(true));
        }
        else {
            sendSetStatusRequest(statusValue, hasDispositions);
        }
        generateComprehensiveCard();
        if (statusValue) {
            dispatch(setFormInput({ contactId: contactIdOrCaseId, formInput: 'status', value: statusValue }));
        }
        setStatusControlDisabled(true);
        dispatch(dispositionInteractionActions.setPendingDigitalStatus({ contactId: contactIdOrCaseId, pendingDigitalStatus: statusValue }));
        closeToast();
    };
    /**
     * Sends an Enlighten request with the necessary payload and dispatches actions to handle auto summary.
     *
     * The function constructs a payload of type `CXoneAutoSummaryPayload` with various properties such as
     * `triggerReason`, `appType`, `direction`, `eventTime`, `mediaType`, `masterId`, and `agentUUId`.
     * It then dispatches two actions:
     * 1. `dispositionInteractionActions.setAutoSummaryTimeout` to set the auto summary timeout for the given contact.
     * 2. `generateAutoSummary` to generate an auto summary for the given case.
     *
     * @remarks
     * - The `triggerReason` is determined based on the `statusValue` being 'resolved' or not.
     * - The `direction` is determined based on whether the `activeContact` is outbound or inbound.
     *
     * @example sendEnlightenRequest();
     */
    const sendEnlightenRequest = () => {
        const autoSummaryPayload = {
            triggerReason: (statusValue === null || statusValue === void 0 ? void 0 : statusValue.toString()) === 'resolved' ? DigitalContactStatus.RESOLVED : DigitalContactStatus.CLOSED,
            appType: 'CXOneAgent',
            direction: (activeContact === null || activeContact === void 0 ? void 0 : activeContact.isOutbound) ? 'Outbound' : 'Inbound',
            eventTime: new Date().toISOString(),
            mediaType: MediaType.DIGITAL,
            masterId: '',
            agentUUId: agentId,
        };
        if (contactIdOrCaseId) {
            dispatch(generateAutoSummary({ caseId: contactIdOrCaseId, autoSummaryPayload }));
            dispatch(dispositionInteractionActions.setisGenerateAutoSummaryRequestSent({ contactId: contactIdOrCaseId, isSent: true }));
            dispatch(dispositionInteractionActions.setAutoSummaryTimeout({ contactId: contactIdOrCaseId, timeout: false }));
        }
    };
    /**
     * Sends a request to generate a final summary for the given contact.
     *
     * This function dispatches an action to set the `isFinalSummaryGenerated` flag to `false` and the `isGenerateFinalSummaryRequestSent` flag to `true`.
     * It then calls the `copilotService.generateFinalSummary` method to generate a final summary for the given contact.
     *
     * @example sendCopilotAutoSummaryRequest();
     */
    const sendCopilotAutoSummaryRequest = () => {
        if (generateFinalSummaryEnabled) {
            dispatch(CcfCopilotActions.setIsFinalSummaryGenerated({ caseId: contactIdOrCaseId, isFinalSummaryGenerated: false }));
            dispatch(dispositionInteractionActions.setFinalSummaryTimeout({ contactId: contactIdOrCaseId, timeout: false }));
            copilotService.generateFinalSummary(`${contactIdOrCaseId}`, statusValue).then(() => {
                dispatch(dispositionInteractionActions.setIsGenerateFinalSummaryRequestSent({ contactId: contactIdOrCaseId, isSent: true }));
            });
        }
    };
    /**
    * Generates comprehensive feedback card if the contact is resolved or closed and the channel is not email
    * @example generateComprehensiveCard();
    */
    const generateComprehensiveCard = () => {
        var _a;
        if (statusValue === DigitalContactStatus.RESOLVED || statusValue === DigitalContactStatus.CLOSED) {
            // DEV Comment - Checking for channel Email to not send this comprehensive feedback card
            if (copilotEnabled && (activeContact === null || activeContact === void 0 ? void 0 : activeContact.channelName) !== MediaType.EMAIL) {
                const knowledgeHubFeedbackEnabled = isKHInputJsonFileEnabled && ((_a = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.KNOWLEDGE_HUB_CONFIG]) === null || _a === void 0 ? void 0 : _a.feedbackEnabled);
                const showComprehensiveCard = isOverallSubcardEnabled || (isGuidanceFeedbackCardsEnabled && (isPublicFeedbackEnabled || isPrivateFeedbackEnabled)) || knowledgeHubFeedbackEnabled;
                if (showComprehensiveCard) {
                    dispatch(CcfCopilotActions.generateComprehensiveCard({ caseId: contactIdOrCaseId, generateComprehensiveCard: true }));
                }
            }
        }
    };
    /**
     * Sends a request to update the digital status of a contact.
     *
     * This function dispatches an action to save the digital status of a contact.
     * It includes the contact ID, the current status, the new status, and the selected digital contact details.
     *
     * @example sendSetStatusRequest();
     */
    const sendSetStatusRequest = (status, showOutcomes) => {
        var _a;
        statusValue = status || statusValue || '';
        closeToast();
        setStatusControlDisabled(true);
        if (!isSaving) {
            dispatch(saveDigitalStatus({
                contactId: contactIdOrCaseId || '',
                fromStatus: ((_a = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _a === void 0 ? void 0 : _a.status) || '',
                toStatus: statusValue,
                selectedDigitalContact: selectedDigitalContactDetails !== null && selectedDigitalContactDetails !== void 0 ? selectedDigitalContactDetails : {},
            }));
            dispatch(dispositionInteractionActions.setPendingDigitalStatus({ contactId: contactIdOrCaseId, pendingDigitalStatus: statusValue }));
        }
        (statusValue === DigitalContactStatus.CLOSED || statusValue === DigitalContactStatus.RESOLVED) && dispatch(dispositionInteractionActions.displayDispositionCard(showOutcomes));
    };
    /**
     * Displays a toast message prompting the user to confirm closing an action.
     *
     * @param value - The value to be used in the primary handler when the user confirms the action.
     * @returns - The JSX element representing the toast message.
     * @example - displayCloseConfirmationToast();
     */
    const displayCloseConfirmationToast = () => {
        closeToast();
        activeToast.current = toast.warn(_jsx(CcfAppToastMessage, { primaryBtnText: 'close', secondaryBtnText: 'cancel', titleKey: 'closeContact', messageKey: 'closeInteractionMessage', triggerPrimaryHandler: () => sendStatusAndOrAutoSummaryRequest(), triggerSecondaryHandler: () => closeToast(), type: 'warn alignButtonsRight primaryButtonAlertBackground' }), {
            autoClose: false,
            closeButton: false,
            containerId: 'AppToastContainer',
        });
        dispatch(dispositionInteractionActions.setIsDigitalStatusToastOpen({ contactId: contactIdOrCaseId, isDigitalStatusToastOpen: true }));
    };
    /**
     * Displays a toast message informing the user that auto summary has failed.
     *
     * @param value - The error message to display.
     * @returns - The JSX element representing the toast message.
     * @example - displayAutoSummaryFailedToast('Failed');
     */
    const displayAutoSummaryFailedToast = (errorMessage) => {
        closeToast();
        if (!renderedInOutcomesPanel) {
            const errorMessageTranslated = translateAutoSummaryError() || errorMessage;
            activeToast.current = toast.warn(_jsx(CcfAppToastMessage, { primaryBtnText: 'proceedWithout', secondaryBtnText: 'retry', titleKey: 'autoSummaryFailed', messageKey: 'autoSummaryFailedError', extraArgs: { format: errorMessageTranslated ? [errorMessageTranslated] : [] }, triggerPrimaryHandler: () => {
                    sendSetStatusRequest(pendingStatus, hasDispositions);
                    closeToast();
                }, triggerSecondaryHandler: () => {
                    handleStatusChange(undefined, pendingStatus, true);
                    closeToast();
                }, type: 'warn alignButtonsRight' }), {
                autoClose: false,
                closeButton: false,
                containerId: 'AppToastContainer',
            });
        }
        dispatch(dispositionInteractionActions.setIsDigitalStatusToastOpen({ contactId: contactIdOrCaseId, isDigitalStatusToastOpen: true }));
    };
    /**
     * Closes the close confirmation and or the auto summary failed toast.
     *
     * @example - closeToast();
     */
    const closeToast = () => {
        toast.dismiss(activeToast === null || activeToast === void 0 ? void 0 : activeToast.current);
        dispatch(dispositionInteractionActions.setIsDigitalStatusToastOpen({ contactId: contactIdOrCaseId, isDigitalStatusToastOpen: false }));
    };
    /**
     * Translates the auto summary error message based on the error code.
     *
     * @returns The translated error message or an empty string if no error.
     * @example
     * const errorMessage = translateAutoSummaryError();
     */
    const translateAutoSummaryError = () => {
        if (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasAutoSummaryTimedOut) {
            return translate('autoSummaryError');
        }
        else if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage) === AutoSummaryErrorCode.noError || isCopilotFinalSummaryGenerated) {
            return translate('autoSummaryCompleted');
        }
        else if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage) === AutoSummaryErrorCode.callTooShort) {
            return translate('autoSummaryTooShort');
        }
        else if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage) === AutoSummaryErrorCode.failedToGenerate || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout)) {
            return translate('autoSummaryNotAvailable');
        }
        return '';
    };
    /**
     * determines correct input color for the status dropdown
     *
     * @returns - correct color as enum
     * @example - determineInputColor()
     */
    const determineInputColor = (isHover) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        if (helperText === helperTextChangeFailed && !isHover) {
            return theme.palette.error.main;
        }
        if (statusControlDisabled) {
            return theme.palette.text.disabled;
        }
        switch (formData === null || formData === void 0 ? void 0 : formData.status) {
            case DigitalContactStatus.NEW:
                return isHover ? (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.digitalStatus) === null || _b === void 0 ? void 0 : _b.newHover : (_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.digitalStatus) === null || _d === void 0 ? void 0 : _d.newDark;
            case DigitalContactStatus.OPEN:
                return isHover ? (_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.digitalStatus) === null || _f === void 0 ? void 0 : _f.openHover : (_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.digitalStatus) === null || _h === void 0 ? void 0 : _h.openDark;
            case DigitalContactStatus.PENDING:
                return isHover ? (_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.digitalStatus) === null || _k === void 0 ? void 0 : _k.pendingHover : (_m = (_l = theme.palette) === null || _l === void 0 ? void 0 : _l.digitalStatus) === null || _m === void 0 ? void 0 : _m.pendingDark;
            case DigitalContactStatus.ESCALATED:
                return isHover ? (_p = (_o = theme.palette) === null || _o === void 0 ? void 0 : _o.digitalStatus) === null || _p === void 0 ? void 0 : _p.escalactedHover : (_r = (_q = theme.palette) === null || _q === void 0 ? void 0 : _q.digitalStatus) === null || _r === void 0 ? void 0 : _r.escalatedDark;
            case DigitalContactStatus.RESOLVED:
                return isHover ? (_t = (_s = theme.palette) === null || _s === void 0 ? void 0 : _s.digitalStatus) === null || _t === void 0 ? void 0 : _t.resolvedHover : (_v = (_u = theme.palette) === null || _u === void 0 ? void 0 : _u.digitalStatus) === null || _v === void 0 ? void 0 : _v.resolvedDark;
            case DigitalContactStatus.CLOSED:
                return isHover ? (_x = (_w = theme.palette) === null || _w === void 0 ? void 0 : _w.digitalStatus) === null || _x === void 0 ? void 0 : _x.closedHover : (_z = (_y = theme.palette) === null || _y === void 0 ? void 0 : _y.digitalStatus) === null || _z === void 0 ? void 0 : _z.closedDark;
            default:
                return '';
        }
    };
    /**
     * determines correct color for the colored dot in the status input and dropdown
     *
     * @returns - style object
     * @example - getTextAdornment()
     */
    const getTextAdornment = (option) => {
        const digitalStatusColors = theme.palette.digitalStatus;
        const colorFromStatusOption = digitalStatusColors[`${option}Dark`];
        const colorFromCurrentStatus = digitalStatusColors[`${formData === null || formData === void 0 ? void 0 : formData.status}Dark`];
        const colorOption = option ? colorFromStatusOption : colorFromCurrentStatus;
        const disableColor = statusControlDisabled && theme.palette.text.disabled;
        const errorColor = helperText === helperTextChangeFailed && !option && theme.palette.error.main;
        return (Object.assign(Object.assign({}, styles.statusTextStartAdornment), { backgroundColor: disableColor || errorColor || colorOption, marginLeft: option ? '5px' : '10px', marginRight: option ? '0.5rem' : '0' }));
    };
    /**
     * determines correct helper text content for the status dropdown
     *
     * @returns - correct helper text content
     * @example - determineHelperTextContent()
     */
    const determineHelperTextContent = () => {
        if (renderedInOutcomesPanel) {
            if (isSaving) {
                return 'Saving...';
            }
            else if (helperText === ' ' && isShortWindow) {
                //do not display space for helper text if helper text is empty string and window is short
                return '';
            }
            else {
                return helperText;
            }
        }
        else {
            return null;
        }
    };
    /**
     * determines when to display pending status and actual status
     *
     * @returns - correct status to display
     * @example - determineStatusDisplayValue()
     */
    const determineStatusDisplayValue = () => {
        const enlightenAutoSummaryPending = ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateAutoSummaryRequestSent)
            && !((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage)
                || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasAutoSummaryTimedOut)));
        const copilotAutoSummaryPending = ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateFinalSummaryRequestSent)
            && !((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage)
                || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout)));
        if ((enlightenAutoSummaryPending || copilotAutoSummaryPending || isToastOpen) && pendingStatus) {
            return pendingStatus;
        }
        else if (formData === null || formData === void 0 ? void 0 : formData.status) {
            return formData === null || formData === void 0 ? void 0 : formData.status;
        }
        else if (statusValue) {
            return statusValue;
        }
        return '';
    };
    const paddingSizes = renderedInOutcomesPanel ? '7.5px 4px 7.5px 6px' : '0px 4px 0px 6px';
    const styles = CcfDigitalStatusSharedStyles(!!renderedInOutcomesPanel, determineInputColor);
    return (_jsx(Autocomplete, { disablePortal: renderedInOutcomesPanel, disableClearable: true, disabled: statusControlDisabled, id: "digital-status-shared", "data-testid": "digital-status-shared", options: digitalOptions, getOptionLabel: (opt) => translate(opt), PopperComponent: (_a) => {
            var { children } = _a, props = __rest(_a, ["children"]);
            return (_jsx(Popper, Object.assign({ nonce: undefined, onResize: undefined, onResizeCapture: undefined }, props, { style: {
                    width: renderedInOutcomesPanel ? '90%' : 'fit-content',
                } }, { children: children })));
        }, renderOption: (props, option) => (_jsx(MenuItem, Object.assign({}, props, { children: _jsxs(_Fragment, { children: [option === (formData === null || formData === void 0 ? void 0 : formData.status) &&
                        _jsx(Done, {}), _jsx(Typography, Object.assign({ sx: { marginLeft: option === (formData === null || formData === void 0 ? void 0 : formData.status) ? 0 : '24px', '::before': Object.assign({}, getTextAdornment(option)),
                        } }, { children: translate(option) }))] }) }))), onChange: (e, value) => handleStatusChange(e, value), value: determineStatusDisplayValue(), sx: styles.menu, renderInput: (params) => (_jsx(TextField, Object.assign({}, params, { sx: {
                '& .MuiAutocomplete-inputRoot': {
                    '& .MuiAutocomplete-input': {
                        padding: paddingSizes,
                    },
                    '::before': Object.assign({}, getTextAdornment()),
                },
            }, helperText: determineHelperTextContent(), FormHelperTextProps: { sx: Object.assign(Object.assign({}, styles.statusHelperText), { color: helperText === helperTextChangeFailed ? theme.palette.error.main : '#008940', '&.Mui-disabled': {
                        color: helperText === helperTextChangeSaved && !isSaving ? '#008940' : theme.palette.text.disabled
                    } }) }, inputProps: Object.assign(Object.assign({}, params.inputProps), { maxLength: 25 }), inputRef: digitalStatusRef }))), ListboxProps: { style: Object.assign({}, styles.menuList) } }));
};
export default memo(CcfDigitalStatusShared, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
//# sourceMappingURL=ccf-digital-status-shared.js.map