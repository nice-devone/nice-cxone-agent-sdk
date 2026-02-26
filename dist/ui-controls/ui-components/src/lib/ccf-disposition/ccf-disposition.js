import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllACDContactDetails, getNonIncomingActiveContactInSelectedInteraction, selectUserInCall, selectUserInConsult, voiceContactCardSelector, voiceContactSelector, voiceMailContactDetailsSelector, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { adjustTimeBasedOnOffset, dispositionInteractionActions, getDispositionData, getDispositionErrorResponseById, getDispositionOutcomeResponse, getDispositionType, getIsDispositionOpen, saveDigitalDisposition, sendTags, } from './ccf-disposition-slice';
import CcfDispositionHeader from './ccf-disposition-header';
import { DigitalChannelStatus, DigitalContactStatus, MediaType, AgentAssistCommand, VoiceContactStatus, AgentAssistConfigACPParamsKeys, DigitalChannelType, } from '@nice-devone/common-sdk';
import { CcfButton, CcfTypography, CcfAppToastMessage, useTranslator } from '@nice-devone/ui-controls';
import CcfDispositionAccordionDetails from './ccf-disposition-accordion-details';
import { CallContactEventStatus, StorageKeys, VoiceMailContactEventStatus, LocalStorageHelper, ValidationUtils, } from '@nice-devone/core-sdk';
import CcfDispositionStyles from './ccf-disposition.styles';
import { Box, Stack, useTheme, Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { CallType, CcfLogger, CXoneClient } from '@nice-devone/agent-sdk';
import { CcfCustomerCardActions, cxoneCCActivity, cxoneCCActivitySearch, cxoneDigitalContactDetails, cxoneVoiceContactDetails, getStoredCustomEventDetails, invokeTimelineAndDataMemo, updateActivityData, } from '../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { CloseDispositionOnOutsideEvent } from './close-disposition-on-outside-event/close-disposition-on-outside-event';
import { fetchTimeZones, getTimeZones } from '../ccf-commitment/ccf-commitment.slice';
import { cxoneRoutingQueuId } from '../ccf-app-space/ccf-agent-contact-history/ccf-agent-contact-history.slice';
import { CXoneAgentIntegrationTransformer } from '../ccf-app-space/ccf-customer-card/ccf-customer-card-activity/cxone-agent-integration-transformer';
import { extendedSkillDetailsById, phoneOBSkillsSelector } from '../ccf-agent-skill/ccf-agent-skill-details-slice';
import { AcwType } from '../ccf-assignment-panel/ccf-assignment-card/acw-type';
import { stringCompareIgnoreCase } from '../../util/stringUtils';
import { isPreviewContact, getPreviewSkillProps } from '../ccf-voice-contact/ccf-voice-contact-methods';
import { formatPhoneForApiSend } from '../../util/uiValidationUtils';
import { getIsFinalSummaryGenerated, isAgentAssistConfigParamsEnabledForContact, CcfCopilotActions, selectHasCopilotConfig, } from '../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { fetchGeneratedFinalSummary, saveEditedSummary } from '../ccf-agent-copilot/ccf-agent-copilot-middleware';
import { isFeatureEnabled } from '../../util/featureToggleUtils';
import { syncExperienceRecord, selectIsLvInteractionsSyncEnabled } from '../lv-app-space/lv-app-space.slice';
import { getUpdateExperienceRecordPayload, getDispositionExperienceRecordPayloadForACD, getMostRecentMessage, } from '../lv-app-space/lv-interactions/lv-interactions-utility';
import { CXoneUser } from '@nice-devone/auth-sdk';
import useLVAppSpacePermission from '../lv-app-space/hooks/useLVAppSpacePermission';
import { CcfRegexPatterns } from '@nice-devone/shared-apps-lib';
import { agentStateActions, setAgentState } from '../ccf-agent-state/ccf-agent-state.slice';
import CCFSaveRedialButton from './shared/ccf-save-redial-button';
import { useAutoSummary } from './forms/useAutoSummary';
import { getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
let clickedResolved;
/**
 * Function to validate retry number
 * @returns - boolean
 * @example - validateRetryNumber(9991112222)
 * The API used to schedule a dialer retry uses a unique phone number validation, that is matched here.
 * Since he platform uses servral variations, that its APIs use, for phone number validations a
 * standard cannot be used in CXA until those validations are unified.
 */
export function validateRetryNumber(retryNumber) {
    return !!formatPhoneForApiSend(retryNumber);
}
/**
 * Component displays dispositions with multiple options to mark it as resolved
 * @param props - none
 * @returns displays dispositions with multiple options to mark it as resolved
 * @example <CcfDispositionInteraction/>
 */
export const CcfDispositionInteraction = (props) => {
    var _a, _b, _c, _d, _e, _f;
    const dispatch = useDispatch();
    const [isSaveDisabled, setSaveDisable] = useState(true);
    const theme = useTheme();
    const validationUtils = new ValidationUtils();
    const isDispositionOpen = useSelector(getIsDispositionOpen);
    const dispositionStyles = CcfDispositionStyles(theme, isDispositionOpen);
    const dispositionType = useSelector(getDispositionType);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const [activeContactForDisposition, setActiveContactForDisposition] = useState(null);
    const digitalContactDetails = useSelector(cxoneDigitalContactDetails);
    const voicemailContact = useSelector(voiceMailContactDetailsSelector) || {};
    const selectedDigitalContact = (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.interactionId) &&
        (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.caseId) &&
        (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.media) === MediaType.DIGITAL &&
        Object.keys(digitalContactDetails).length &&
        digitalContactDetails[activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.interactionId] &&
        Object.keys(digitalContactDetails[activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.interactionId]).length
        ? digitalContactDetails[activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.interactionId][activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.caseId]
        : {};
    const dispositionData = useSelector(getDispositionData);
    const dispositionOutcomeResponse = useSelector(getDispositionOutcomeResponse);
    const dispositionErrorResponse = useSelector(getDispositionErrorResponseById(activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.caseId)); // For now we are showing this error message for Digital contacts
    const { sendDisposition, displayDispositionCard, readyDisposition } = dispositionInteractionActions;
    const timeZones = useSelector(getTimeZones);
    const voiceContact = useSelector(voiceContactSelector);
    const agentOBPhoneSkills = useSelector(phoneOBSkillsSelector);
    const activityData = useSelector(cxoneCCActivity);
    const selectedActivityData = activityData === null || activityData === void 0 ? void 0 : activityData.find((item) => (item === null || item === void 0 ? void 0 : item.contactId) === (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactId));
    const activitySearchData = useSelector(cxoneCCActivitySearch);
    const selectedActivityConfig = (activitySearchData === null || activitySearchData === void 0 ? void 0 : activitySearchData.find((item) => (item === null || item === void 0 ? void 0 : item.ContactID) === (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactId))) ||
        JSON.parse(localStorage.getItem(StorageKeys.CXONE_ACTIVITY_CONFIG) || '[]').find((item) => (item === null || item === void 0 ? void 0 : item.ContactID) === (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactId));
    const voiceContactDetails = useSelector(cxoneVoiceContactDetails);
    const getCxoneRoutingQueuId = useSelector(cxoneRoutingQueuId);
    const currentUser = JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '{}');
    const availableCustomeEvents = useSelector(getStoredCustomEventDetails);
    let activeDisposition = null;
    const contactIdOrCaseId = (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.media) === MediaType.DIGITAL
        ? activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.caseId
        : activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactId; //in case of digital contact caseID is the actual contactID
    if (contactIdOrCaseId !== undefined && (dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactIdOrCaseId]) !== undefined) {
        activeDisposition = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactIdOrCaseId];
    }
    const skillId = parseInt((activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.skillOrQueueId) || '0', 10);
    const extendedSkillDetailsSelector = useSelector(extendedSkillDetailsById(skillId));
    const activeMediaType = activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.media;
    const contactDetails = useSelector(getAllACDContactDetails);
    const [showDispositionsPanel, setShowDispositionsPanel] = useState(false);
    const isPreviewCall = isPreviewContact(voiceContact);
    const previewSkillProps = getPreviewSkillProps(voiceContact, extendedSkillDetailsSelector === null || extendedSkillDetailsSelector === void 0 ? void 0 : extendedSkillDetailsSelector.deliveryParameters);
    const isAutoSummaryLoading = contactIdOrCaseId &&
        (dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.autoSummaryEnabledContacts) &&
        ((_a = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.autoSummaryEnabledContacts) === null || _a === void 0 ? void 0 : _a.includes(contactIdOrCaseId)) &&
        !((_b = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactIdOrCaseId]) === null || _b === void 0 ? void 0 : _b.hasAutoSummaryTimedOut) &&
        (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryStatus) !== AgentAssistCommand.message;
    const { copilotEnabled, copilotConfig } = useSelector(selectHasCopilotConfig(contactIdOrCaseId));
    const isFinalSummaryGenerated = useSelector(getIsFinalSummaryGenerated(contactIdOrCaseId)) || false;
    const TIMER_FOR_FINAL_SUMMARY = 25000; //If final summary is not generated within 25 seconds, then we will enable the save button
    const [fetchFromApi, setFetchFromApi] = useState(false);
    const timerForFinalSummary = useRef(null);
    const timerForFallbackFinalSummary = useRef(null);
    const TIMER_FOR_POLLING_FALLBACK_FS_API = 5000; // Poll fallback final summary API every 5 seconds till TIMER_FOR_FINAL_SUMMARY is reached
    const { Params } = copilotConfig || {};
    const isFinalSummaryEnabled = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.FINAL_SUMMARY];
    const generateFinalSummaryEnabled = isFinalSummaryEnabled && ((Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.AUTOSUMMARY_TO_OUTCOME_PANEL]) !== false || (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.SHOW_AUTOSUMMARY_CARD]) !== false);
    const ENLIGHTEN_REQUEST_TIMEOUT = 15000;
    // ToDo: Temporary work around fix for Data memorialization call for Voice contacts (when Copilot menu in focus on App Space)
    // ToDo: Codes need to removed/refactored later through proper Epic
    const voiceContactCard = useSelector(voiceContactCardSelector);
    const usersInCall = useSelector(selectUserInCall);
    const userInConsult = useSelector(selectUserInConsult);
    const { isLvCustomerCardEnabled } = useLVAppSpacePermission();
    const isLvInteractionsSyncEnabled = useSelector(selectIsLvInteractionsSyncEnabled);
    const userId = CXoneUser.instance.getUserInfo().userId;
    const ccfLogger = new CcfLogger('App.consumer', 'App.consumer.ccf-disposition-interaction');
    const showAutoSummary = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.SHOW_AUTOSUMMARY_CARD));
    const autoSummaryToOutcomePanel = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.AUTOSUMMARY_TO_OUTCOME_PANEL));
    const isSaveAndRedialFeatureToggleEnabled = isFeatureEnabled("release-cxa-save-and-redial-button-AW-39949" /* FeatureToggles.SAVE_AND_REDIAL_BUTTON_FEATURE_TOGGLE */);
    const agentOutboundSkills = useSelector(phoneOBSkillsSelector);
    const isVoicemailContactAssigned = Object.keys(voicemailContact).length > 0;
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const saveAndRedialIsEnabled = (agentOutboundSkills === null || agentOutboundSkills === void 0 ? void 0 : agentOutboundSkills.length) > 0 && isSaveAndRedialFeatureToggleEnabled && !isVoicemailContactAssigned && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBSaveAndRedial);
    const [isDisplayRedialPanel, setIsDisplayRedialPanel] = useState(false);
    const [selectedOBSkill, setSelectedOBSkill] = useState(-1);
    const isSaveRedialButtonDisabled = isSaveDisabled || (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) !== CallContactEventStatus.DISCONNECTED || (isDisplayRedialPanel && selectedOBSkill === -1);
    const { handleRetry, isCoolingDown, attemptCount, retryCountdown, maxRetryCount } = useAutoSummary(activeContactForDisposition);
    const [translate] = useTranslator();
    useEffect(() => {
        var _a;
        const isElevatedWithVoice = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.elevatedFrom) &&
            (voiceContactCard === null || voiceContactCard === void 0 ? void 0 : voiceContactCard.length) > 0 &&
            ((_a = voiceContactCard[0]) === null || _a === void 0 ? void 0 : _a.interactionId) === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId);
        let timeoutId;
        if (!isDispositionOpen &&
            isElevatedWithVoice &&
            voiceContactCard[0].contactStatus !== VoiceContactStatus.DISCONNECTED) {
            ccfLogger.info('AW-25-CCFDisposition', 'Setting both Voice and Digital contact as active for Elevated contact');
            setActiveContactForDisposition(voiceContactCard[0]);
            timeoutId = setTimeout(() => {
                setActiveContactForDisposition(nonIncomingActiveContactInSelectedInteraction);
            }, 0);
        }
        else {
            if (isDispositionOpen && dispositionType && dispositionType === MediaType.VOICE && (voiceContactCard === null || voiceContactCard === void 0 ? void 0 : voiceContactCard.length) > 0) {
                ccfLogger.info('AW-25-CCFDisposition', `Setting active voice contact for OPEN disposition - Contact Id: ${voiceContactCard[0].contactId}`);
                setActiveContactForDisposition(voiceContactCard[0]);
            }
            else {
                ccfLogger.info('AW-25-CCFDisposition', `Setting regular nonIncomingActiveContact for disposition - Contact Id: ${nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId}`);
                setActiveContactForDisposition(nonIncomingActiveContactInSelectedInteraction);
            }
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId,
        nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId,
        isDispositionOpen,
        voiceContactCard
    ]);
    useEffect(() => {
        var _a;
        if (!(timeZones === null || timeZones === void 0 ? void 0 : timeZones.length) &&
            ((_a = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.dispositionData) === null || _a === void 0 ? void 0 : _a.some((disposition) => disposition === null || disposition === void 0 ? void 0 : disposition.requireRescheduleDate))) {
            dispatch(fetchTimeZones());
        }
    }, [activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.dispositionData, dispatch, timeZones]);
    // Validate fields
    useEffect(() => {
        if (activeDisposition === null || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === undefined)
            return;
        validateFields(activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs);
    }, [
        activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.callType,
        activeDisposition,
        activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs,
        contactIdOrCaseId,
        dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.autoSummaryEnabledContacts,
        dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions,
        selectedDigitalContact,
        isFinalSummaryGenerated
    ]);
    /**
     * This useEffect will handle the error message to be shown for the disposition success and error
     * and also for the case status updated for the digital contacts
     */
    useEffect(() => {
        // Ensure both disposition response and active contact exist before showing the toast
        if ((dispositionOutcomeResponse === null || dispositionOutcomeResponse === void 0 ? void 0 : dispositionOutcomeResponse.messageKey) && activeContactForDisposition) {
            const messageComponent = (_jsx(CcfAppToastMessage, { type: dispositionOutcomeResponse.isError ? 'error' : 'success', messageKey: dispositionOutcomeResponse === null || dispositionOutcomeResponse === void 0 ? void 0 : dispositionOutcomeResponse.messageKey, extraArgs: { format: [(dispositionOutcomeResponse === null || dispositionOutcomeResponse === void 0 ? void 0 : dispositionOutcomeResponse.placeholder) || ''] } }));
            const toastOptions = {
                autoClose: 2000,
                containerId: 'AppToastContainer',
                onClose: () => dispatch(dispositionInteractionActions.clearDispositionOutcomeResponse()),
            };
            toast[dispositionOutcomeResponse.isError ? 'error' : 'success'](messageComponent, toastOptions);
        }
    }, [dispositionOutcomeResponse]);
    useEffect(() => {
        /**
         * This useEffect will handle the Data Memorialization and Timeline call
         * for closed cases based on disposition response and contact status change
         */
        if ((activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactStatus) === DigitalChannelStatus.CLOSED &&
            activeContactForDisposition.media === MediaType.DIGITAL &&
            selectedActivityData) {
            if (activeContactForDisposition &&
                activeContactForDisposition.contactStatus === DigitalChannelStatus.CLOSED &&
                activeContactForDisposition.media === MediaType.DIGITAL) {
                const availableCustomeEventsData = availableCustomeEvents.filter((item) => {
                    return (item === null || item === void 0 ? void 0 : item.contactId) !== (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactId);
                });
                const timelineDataMappingfromLS = CXoneAgentIntegrationTransformer.cxoneRemoveTimelineDMInfo(activeContactForDisposition, activityData, activitySearchData, availableCustomeEventsData);
                dispatch(updateActivityData(timelineDataMappingfromLS));
                const args = CXoneAgentIntegrationTransformer.cxoneExecuteTimelineDataMapping(activeContactForDisposition, dispositionData, selectedActivityData, selectedActivityConfig, activeContactForDisposition, digitalContactDetails, getCxoneRoutingQueuId, currentUser, voiceContactDetails);
                dispatch(invokeTimelineAndDataMemo(args));
            }
        }
    }, [dispositionOutcomeResponse, activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactStatus]);
    /**
     * This useEffect will handle the error message getting while fetching the disposition list
     */
    useEffect(() => {
        if (dispositionErrorResponse === null || dispositionErrorResponse === void 0 ? void 0 : dispositionErrorResponse.messageKey) {
            const messageComponent = (_jsx(CcfAppToastMessage, { type: 'error', messageKey: dispositionErrorResponse === null || dispositionErrorResponse === void 0 ? void 0 : dispositionErrorResponse.messageKey, extraArgs: { format: [(dispositionErrorResponse === null || dispositionErrorResponse === void 0 ? void 0 : dispositionErrorResponse.placeholder) || ''] } }));
            const toastOptions = {
                autoClose: 2000,
                containerId: 'AppToastContainer',
                onClose: () => dispatch(dispositionInteractionActions.updateDispositionErrorResponse({
                    contactId: contactIdOrCaseId,
                    errorDetails: {},
                })),
            };
            toast['error'](messageComponent, toastOptions);
        }
    }, [dispositionErrorResponse]);
    useEffect(() => {
        var _a;
        if (((_a = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _a === void 0 ? void 0 : _a.type) === MediaType.VOICE && contactIdOrCaseId) {
            const autofillPhoneNumber = /\d/.test(voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.dnis) ? voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.dnis : '';
            dispatch(dispositionInteractionActions.setFormInput({
                contactId: contactIdOrCaseId,
                formInput: 'retryNumber',
                value: autofillPhoneNumber,
            }));
        }
    }, [(_c = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _c === void 0 ? void 0 : _c.type, contactIdOrCaseId, dispatch, voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.dnis]);
    useEffect(() => {
        if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.finalState) && voiceContactCard && (usersInCall || userInConsult)) {
            voiceContactCard.map((voiceContactData) => {
                if (voiceContactData.contactStatus === VoiceContactStatus.DISCONNECTED) {
                    const availableCustomEventData = availableCustomeEvents === null || availableCustomeEvents === void 0 ? void 0 : availableCustomeEvents.filter((item) => {
                        return (item === null || item === void 0 ? void 0 : item.contactId) !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId);
                    });
                    /**
                     * Once timeline or DM flow is completed we no more require custom event information for case.
                     */
                    dispatch(CcfCustomerCardActions.removeStoredCustomEvent(availableCustomEventData));
                    const timelineDataMappingfromLS = CXoneAgentIntegrationTransformer.cxoneRemoveTimelineDMInfo(voiceContactData, activityData, activitySearchData, availableCustomeEvents);
                    dispatch(updateActivityData(timelineDataMappingfromLS));
                    const timelineDataMemoData = CXoneAgentIntegrationTransformer.cxoneExecuteTimelineDataMapping(voiceContactData, dispositionData, selectedActivityData, selectedActivityConfig, activeContactForDisposition !== null && activeContactForDisposition !== void 0 ? activeContactForDisposition : undefined, digitalContactDetails, getCxoneRoutingQueuId, currentUser, voiceContactDetails);
                    dispatch(invokeTimelineAndDataMemo(timelineDataMemoData));
                    /**
                     * Dev note - This code is written to remove data kept in localstorage, as we are providing backward compatability with elastic cache and custom events.
                     * will be removed by next release.
                     */
                    const agentWorkflowEventDetails = LocalStorageHelper.getItem(StorageKeys.AGENT_WORKFLOW_EVENT, true) || [];
                    const isAgentWorkflowEventDetails = agentWorkflowEventDetails instanceof Array &&
                        (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        agentWorkflowEventDetails === null || agentWorkflowEventDetails === void 0 ? void 0 : agentWorkflowEventDetails.filter((item) => {
                            return (item === null || item === void 0 ? void 0 : item.contactId) !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId);
                        }));
                    LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_EVENT, isAgentWorkflowEventDetails);
                    const agentWorkflowConfigurationDetails = LocalStorageHelper.getItem(StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, true) || [];
                    const isAgentWorkflowConfigurationEventDetails = agentWorkflowConfigurationDetails instanceof Array &&
                        (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        agentWorkflowConfigurationDetails === null || agentWorkflowConfigurationDetails === void 0 ? void 0 : agentWorkflowConfigurationDetails.filter((item) => {
                            return (item === null || item === void 0 ? void 0 : item.contactId) !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId);
                        }));
                    LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, isAgentWorkflowConfigurationEventDetails);
                    /**
                     * Localstorage clearing for pin Records.
                     */
                    const pinRecordsDetails = LocalStorageHelper.getItem(StorageKeys.CRM_PIN_RECORDS, true) || [];
                    const isPinRecordsDetails = pinRecordsDetails instanceof Array &&
                        (pinRecordsDetails === null || pinRecordsDetails === void 0 ? void 0 : pinRecordsDetails.filter((item) => {
                            return (item === null || item === void 0 ? void 0 : item.contactId) !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId);
                        }));
                    LocalStorageHelper.setItem(StorageKeys.CRM_PIN_RECORDS, isPinRecordsDetails);
                }
            });
        }
    }, [dispositionOutcomeResponse, voiceContactCard]);
    useEffect(() => {
        //clears redial state when disposition is closed
        if (!isDispositionOpen) {
            setIsDisplayRedialPanel(false);
            setSelectedOBSkill(-1);
        }
    }, [isDispositionOpen]);
    /**
     * Handles the redial action for voice contacts.
     * @example setupPendingRedial()
     */
    const setupPendingRedial = () => {
        const { skill, dnis, ani } = voiceContact;
        const skillNumber = parseFloat(skill);
        const determinePhoneNumber = voiceContact.isInbound ? ani : dnis;
        const phoneNumber = determinePhoneNumber || (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactMode) || '0';
        const determineSkill = agentOBPhoneSkills.length === 1 ? agentOBPhoneSkills[0].skillId : selectedOBSkill;
        const contactDetails = {
            skillId: determineSkill || skillNumber,
            phoneNumber: phoneNumber.toString().replace(CcfRegexPatterns.specialCharFormat, ''),
        };
        dispatch(dispositionInteractionActions.setPendingVoiceContactForRedial({
            contactId: voiceContact.contactID,
            skillId: contactDetails.skillId,
            isOutbound: true,
            toAddr: contactDetails.phoneNumber,
            status: 'pending',
        }));
        //set agent to unavailable state so they are not routed new incoming calls after clicking redial
        const setSelectedState = agentStateActions.setSelectedState;
        const agentCode = {
            state: 'Unavailable',
        };
        dispatch(setSelectedState({ selectedState: agentCode }));
        dispatch(setAgentState({ selectedState: agentCode }));
    };
    /**
     * Function to handle on click of mark as reolved options
     * @example onClickSaveButton
     */
    const onClickSaveButton = (isRedial) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (activeContactForDisposition === undefined ||
            activeContactForDisposition === null ||
            contactIdOrCaseId === undefined)
            return;
        if (activeContactForDisposition.media === MediaType.VOICE ||
            activeContactForDisposition.media === MediaType.VOICEMAIL ||
            activeContactForDisposition.media === MediaType.WORKITEM) {
            if (isLvCustomerCardEnabled &&
                isLvInteractionsSyncEnabled &&
                activeContactForDisposition.media === MediaType.VOICE) {
                const isContactElevated = (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.elevatedFrom) ? true : false;
                const dispositionNotes = (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactId)
                    ? (_b = (_a = dispositionData.dispositions[activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactId]) === null || _a === void 0 ? void 0 : _a.formInputs) === null || _b === void 0 ? void 0 : _b.notes
                    : '';
                const dispositionTags = (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactId)
                    ? (_d = (_c = dispositionData.dispositions[activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactId]) === null || _c === void 0 ? void 0 : _c.formInputs) === null || _d === void 0 ? void 0 : _d.tags
                    : [];
                const data = getDispositionExperienceRecordPayloadForACD(activeContactForDisposition, userId, dispositionNotes, dispositionTags);
                if (data && !isContactElevated) {
                    dispatch(syncExperienceRecord(data));
                }
            }
            dispatch(sendTags(contactIdOrCaseId));
            // send the disposition if contact is ended
            if (stringCompareIgnoreCase(activeContactForDisposition.contactStatus, CallContactEventStatus.DISCONNECTED) ||
                stringCompareIgnoreCase(activeContactForDisposition.contactStatus, VoiceMailContactEventStatus.DISCARDED)) {
                dispatch(sendDisposition(contactIdOrCaseId));
            }
            else if (activeContactForDisposition.media === MediaType.VOICE &&
                isPreviewCall &&
                !voiceContact.isLinked &&
                (previewSkillProps === null || previewSkillProps === void 0 ? void 0 : previewSkillProps.disposition)) {
                dispatch(sendDisposition(contactIdOrCaseId));
            }
            else {
                dispatch(readyDisposition(contactIdOrCaseId));
            }
        }
        else if (activeContactForDisposition.media === MediaType.DIGITAL &&
            (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs.type) === MediaType.DIGITAL &&
            selectedDigitalContact) {
            dispatch(saveDigitalDisposition({
                contactId: contactIdOrCaseId,
                activeDisposition,
                selectedDigitalContact,
            }));
            if (isLvCustomerCardEnabled && isLvInteractionsSyncEnabled) {
                const isContactElevated = (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.elevatedFrom) ? true : false;
                const dispositionNotes = (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.caseId) ? (_e = activeDisposition.formInputs) === null || _e === void 0 ? void 0 : _e.notes : '';
                let externalInteractionId = null;
                if (selectedDigitalContact.channelType === ((_f = DigitalChannelType.EMAIL) === null || _f === void 0 ? void 0 : _f.toLowerCase()) ||
                    selectedDigitalContact.channelType === ((_g = DigitalChannelType.SMS) === null || _g === void 0 ? void 0 : _g.toLowerCase())) {
                    externalInteractionId =
                        (selectedDigitalContact === null || selectedDigitalContact === void 0 ? void 0 : selectedDigitalContact.messages) && ((_h = getMostRecentMessage(selectedDigitalContact === null || selectedDigitalContact === void 0 ? void 0 : selectedDigitalContact.messages)) === null || _h === void 0 ? void 0 : _h.id);
                }
                else {
                    externalInteractionId = selectedDigitalContact === null || selectedDigitalContact === void 0 ? void 0 : selectedDigitalContact.caseId;
                }
                if (externalInteractionId) {
                    const data = getUpdateExperienceRecordPayload({
                        detailsObject: selectedDigitalContact,
                        agentId: userId,
                        externalInteractionId,
                        dispositionNotes,
                        sendFinishTime: false,
                    });
                    if (data && !isContactElevated) {
                        dispatch(syncExperienceRecord(data));
                    }
                }
            }
        }
        const dispositionNotes = (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactId)
            ? (_k = (_j = dispositionData.dispositions[activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactId]) === null || _j === void 0 ? void 0 : _j.formInputs) === null || _k === void 0 ? void 0 : _k.notes
            : '';
        if (copilotEnabled && isFinalSummaryEnabled && autoSummaryToOutcomePanel) {
            if (showAutoSummary) {
                dispatch(CcfCopilotActions.updateAutoSummaryCard({
                    dispositionNotes: dispositionNotes || '',
                    caseId: contactIdOrCaseId,
                }));
            }
            dispatch(saveEditedSummary({
                channel: activeContactForDisposition.media,
                contactNumber: Number(contactIdOrCaseId),
                summary: dispositionNotes || '',
            }));
        }
        dispatch(displayDispositionCard(false));
        if (isRedial) {
            setupPendingRedial();
        }
    };
    /**
     * Function to validate if disposition save button should be enabled
     * @returns
     * @example - validateFields
     */
    const validateFields = (formInputs) => {
        var _a, _b, _c, _d, _e, _f;
        if (formInputs) {
            if (formInputs.type === MediaType.VOICE ||
                formInputs.type === MediaType.VOICEMAIL ||
                formInputs.type === MediaType.WORKITEM) {
                if (((_a = formInputs === null || formInputs === void 0 ? void 0 : formInputs.tags) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    setSaveDisable(false);
                }
                // Dev Comment - If copilot is enabled, for voice, the fallback FS API should be triggered even if disposition is not selected
                else if ((formInputs === null || formInputs === void 0 ? void 0 : formInputs.disposition) || copilotEnabled) {
                    if (copilotEnabled &&
                        isFinalSummaryEnabled &&
                        ((_b = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === VoiceContactStatus.DISCONNECTED) {
                        saveDisabledForCopilotSummary();
                        setFetchFromApi(true);
                    }
                    else if (copilotEnabled && isFinalSummaryEnabled && ((_c = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === VoiceContactStatus.ACTIVE) {
                        setSaveDisable(true);
                    }
                    else if (isAutoSummaryLoading) {
                        setSaveDisable(true);
                    }
                    else if (
                    /**
                     * if selected disposition is outbound and requires a commitment amount, check that the amount field has been filled
                     */
                    (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.callType) === CallType.NATURAL_CALLING &&
                        ((_d = formInputs === null || formInputs === void 0 ? void 0 : formInputs.disposition) === null || _d === void 0 ? void 0 : _d.requireCommitmentAmount)) {
                        const amount = Number(formInputs === null || formInputs === void 0 ? void 0 : formInputs.amount);
                        setSaveDisable(isNaN(amount) || amount <= 0);
                    }
                    else if ((activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.callType) === CallType.NATURAL_CALLING &&
                        ((_e = formInputs === null || formInputs === void 0 ? void 0 : formInputs.disposition) === null || _e === void 0 ? void 0 : _e.requireRescheduleDate)) {
                        const isRetryNumberValid = validateRetryNumber(formInputs === null || formInputs === void 0 ? void 0 : formInputs.retryNumber);
                        const dateTime = formInputs === null || formInputs === void 0 ? void 0 : formInputs.retryDateTime;
                        const timeZone = formInputs === null || formInputs === void 0 ? void 0 : formInputs.retryTimeZone;
                        let retryTimeZone;
                        if (dateTime && (timeZone === null || timeZone === void 0 ? void 0 : timeZone.offset)) {
                            retryTimeZone = adjustTimeBasedOnOffset(dateTime, timeZone.offset);
                        }
                        const validDateTime = retryTimeZone && new Date(retryTimeZone).valueOf() > Date.now().valueOf();
                        setSaveDisable(!isRetryNumberValid || dateTime === '' || (timeZone === null || timeZone === void 0 ? void 0 : timeZone.standardName) === '' || !validDateTime);
                    }
                    else {
                        setSaveDisable(false);
                    }
                }
            }
            else if (formInputs.type === MediaType.DIGITAL && selectedDigitalContact) {
                if (isAutoSummaryLoading &&
                    (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.dispositionData) &&
                    ((_f = activeDisposition.dispositionData) === null || _f === void 0 ? void 0 : _f.length) > 0) {
                    setSaveDisable(true);
                }
                else if (selectedDigitalContact.isAssignedToAgentInbox) {
                    // Save should be enabled only for Assigned Digital contacts
                    // Save should be disabled when Assigned Digital contact require disposition is true, but nothing filled in the dropdown
                    // For Co-Pilot, Save should be disabled when contact status is Resolved or Closed so that the Summary loader is displayed
                    // First if condition is for Co-Pilot AutoSummary only, then regular CXA conditions handled in else block
                    if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.dispositionData) &&
                        (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.dispositionData.length) > 0 &&
                        copilotEnabled &&
                        isFinalSummaryEnabled &&
                        ((formInputs === null || formInputs === void 0 ? void 0 : formInputs.status) === DigitalContactStatus.CLOSED || (formInputs === null || formInputs === void 0 ? void 0 : formInputs.status) === DigitalContactStatus.RESOLVED)) {
                        setFetchFromApi(true);
                        saveDisabledForCopilotSummary();
                    }
                    else {
                        // When there is no disposition attached to the flow, contact is moved to closed status, no more status change allowed.
                        // Hence save button is disabled for this scenario below in if
                        if (selectedDigitalContact.status === DigitalContactStatus.CLOSED &&
                            validationUtils.isNullOrEmpty(formInputs === null || formInputs === void 0 ? void 0 : formInputs.disposition) &&
                            validationUtils.isNullOrEmpty(formInputs === null || formInputs === void 0 ? void 0 : formInputs.requireDisposition)) {
                            setSaveDisable(true);
                        }
                        else {
                            // When require disposition is true, but no disposition selected
                            // Also when require disposition is false, save button should always be enabled
                            setSaveDisable(!(((formInputs === null || formInputs === void 0 ? void 0 : formInputs.requireDisposition) &&
                                Object.keys((formInputs === null || formInputs === void 0 ? void 0 : formInputs.disposition) || {}).length > 0) ||
                                !(formInputs === null || formInputs === void 0 ? void 0 : formInputs.requireDisposition)));
                        }
                    }
                }
                else if (!(activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.isAssignedToAgentInbox)) {
                    setSaveDisable(true);
                }
                else {
                    // For preview contacts, no disposition save will be applicable irrespective of their current status
                    // However disposition screen is used for changing digital contact status, so that needs to be allowed
                    // Once Digital contact is closed, then Button enablement not needed
                    setSaveDisable(selectedDigitalContact.status === DigitalContactStatus.CLOSED);
                }
            }
        }
    };
    //for adding maunal auto summary retry adaptive card if fetch from api timeout in case of voice 
    useEffect(() => {
        if (!isFinalSummaryGenerated && (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout)) {
            !autoSummaryToOutcomePanel &&
                showAutoSummary &&
                dispatch(CcfCopilotActions.addAutoSummaryErrorCard({ contactId: contactIdOrCaseId }));
        }
    }, [isFinalSummaryGenerated, activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout]);
    useEffect(() => {
        if (fetchFromApi) {
            if (isFinalSummaryGenerated) {
                if (timerForFallbackFinalSummary.current) {
                    clearInterval(timerForFallbackFinalSummary.current);
                    timerForFallbackFinalSummary.current = null;
                }
                if (timerForFinalSummary.current) {
                    clearInterval(timerForFinalSummary.current);
                    timerForFinalSummary.current = null;
                }
                return;
            }
            if (!timerForFallbackFinalSummary.current) {
                timerForFallbackFinalSummary.current = setInterval(() => {
                    generateFinalSummaryEnabled && dispatch(fetchGeneratedFinalSummary({ contactId: contactIdOrCaseId }));
                }, TIMER_FOR_POLLING_FALLBACK_FS_API);
            }
        }
        return () => {
            timerForFallbackFinalSummary.current && clearInterval(timerForFallbackFinalSummary.current);
            timerForFallbackFinalSummary.current = null;
        };
    }, [fetchFromApi, isFinalSummaryGenerated]);
    /**
     * Function to setSaveDisable for copilot final summary
     * @example saveDisabledForCopilotSummary
     */
    const saveDisabledForCopilotSummary = () => {
        if (!isFinalSummaryGenerated) {
            if (timerForFinalSummary && timerForFinalSummary.current) {
                setSaveDisable(false);
            }
            else {
                setSaveDisable(true);
                timerForFinalSummary.current = setTimeout(() => {
                    setSaveDisable(false);
                    dispatch(dispositionInteractionActions.setFinalSummaryTimeout({ contactId: contactIdOrCaseId, timeout: true }));
                    setFetchFromApi(false);
                }, generateFinalSummaryEnabled ? TIMER_FOR_FINAL_SUMMARY : 0);
            }
        }
        else {
            //if final summary is generated within 20 seconds then we will clear the timeout, refer to ILLUM-9440
            timerForFinalSummary.current && clearTimeout(timerForFinalSummary.current);
            timerForFinalSummary.current = null;
            setSaveDisable(false);
            setFetchFromApi(false);
        }
    };
    /**
     * Function to sort sortTagsListData alphabetically by tagName
     * @returns
     * @example - sortTagsListData
     */
    const sortTagsListData = (tagsListData) => {
        return [...tagsListData].sort((a, b) => a.tagName.localeCompare(b.tagName));
    };
    useEffect(() => {
        var _a, _b;
        let timerId;
        if (contactIdOrCaseId &&
            ((activeMediaType === MediaType.VOICE &&
                (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactStatus) === VoiceContactStatus.DISCONNECTED) ||
                (activeMediaType === MediaType.DIGITAL && (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateAutoSummaryRequestSent))) &&
            (dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.autoSummaryEnabledContacts) &&
            ((_a = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.autoSummaryEnabledContacts) === null || _a === void 0 ? void 0 : _a.includes(contactIdOrCaseId)) &&
            !((_b = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactIdOrCaseId]) === null || _b === void 0 ? void 0 : _b.hasAutoSummaryTimedOut)) {
            timerId = setTimeout(() => {
                var _a;
                if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryStatus) !== AgentAssistCommand.message) {
                    dispatch(dispositionInteractionActions.setAutoSummaryTimeout({ contactId: contactIdOrCaseId, timeout: true }));
                    if (activeMediaType === MediaType.DIGITAL) {
                        dispatch(dispositionInteractionActions.setisGenerateAutoSummaryRequestSent({
                            contactId: contactIdOrCaseId,
                            isSent: false,
                        }));
                    }
                    else
                        (_a = CXoneClient.instance.autoSummaryService) === null || _a === void 0 ? void 0 : _a.disconnectWebsocket();
                }
            }, ENLIGHTEN_REQUEST_TIMEOUT);
        }
        return () => {
            timerId && clearTimeout(timerId);
        };
    }, [
        activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactStatus,
        contactIdOrCaseId,
        dispatch,
        dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.autoSummaryEnabledContacts,
        dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions,
        activeMediaType,
        activeMediaType === MediaType.DIGITAL && (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateAutoSummaryRequestSent)
    ]);
    useEffect(() => {
        var _a, _b, _c, _d, _e;
        if (contactIdOrCaseId) {
            const isPreview = isPreviewCall &&
                stringCompareIgnoreCase(activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactStatus, VoiceContactStatus.PREVIEW);
            let activeContactAcwTypeID = 0;
            contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.forEach((detail) => {
                if ((detail === null || detail === void 0 ? void 0 : detail.skill) === (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.skillOrQueueId)) {
                    activeContactAcwTypeID = (detail === null || detail === void 0 ? void 0 : detail.acwTypeId) || 0;
                }
            });
            let tagsListData = [];
            let dispositionListData = [];
            // Voice call
            if (stringCompareIgnoreCase(activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.media, MediaType.VOICE)) {
                tagsListData = (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.tagsData) || [];
                dispositionListData = ((_a = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.dispositionData) === null || _a === void 0 ? void 0 : _a.filter((dispo) => !dispo.isPreviewDisposition)) || [];
                if (isPreview && !(voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.isLinked)) {
                    tagsListData = [];
                    if (previewSkillProps === null || previewSkillProps === void 0 ? void 0 : previewSkillProps.disposition) {
                        dispositionListData =
                            ((_b = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.dispositionData) === null || _b === void 0 ? void 0 : _b.filter((dispo) => dispo.isPreviewDisposition)) || [];
                    }
                    else {
                        dispositionListData = [];
                    }
                }
                else if (!isPreview && activeContactAcwTypeID !== AcwType.DISPOSITION) {
                    dispositionListData = [];
                }
                // Sort tagsListData alphabetically by tagsName
                tagsListData = sortTagsListData(tagsListData);
                setShowDispositionsPanel((dispositionListData === null || dispositionListData === void 0 ? void 0 : dispositionListData.length) > 0 || (tagsListData === null || tagsListData === void 0 ? void 0 : tagsListData.length) > 0);
            }
            // Voicemail and workItem
            else if (((activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.media) === MediaType.VOICEMAIL ||
                (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.media) === MediaType.WORKITEM) &&
                (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs)) {
                tagsListData = (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.tagsData) || [];
                dispositionListData = ((_c = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.dispositionData) === null || _c === void 0 ? void 0 : _c.filter((dispo) => !dispo.isPreviewDisposition)) || [];
                if (activeContactAcwTypeID !== AcwType.DISPOSITION) {
                    dispositionListData = [];
                }
                // Sort tagsListData alphabetically by tagsName
                tagsListData = sortTagsListData(tagsListData);
                setShowDispositionsPanel((dispositionListData === null || dispositionListData === void 0 ? void 0 : dispositionListData.length) > 0 || (tagsListData === null || tagsListData === void 0 ? void 0 : tagsListData.length) > 0);
            }
            // Digital
            else if ((activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.media) === MediaType.DIGITAL) {
                //Hide Outcome panel if contact status is in draft mode
                if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) &&
                    (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactStatus) !== DigitalContactStatus.DRAFT) {
                    setShowDispositionsPanel(true);
                }
                else {
                    setShowDispositionsPanel(false);
                }
            }
            // Clear disposition selection if the dispo list changes and dispo was previously set
            if (dispositionListData &&
                (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.dispositionData) &&
                !((_d = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.dispositionList) === null || _d === void 0 ? void 0 : _d.every((dispo) => dispositionListData === null || dispositionListData === void 0 ? void 0 : dispositionListData.find((list) => list.dispositionId === dispo.dispositionId))) &&
                ((_e = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _e === void 0 ? void 0 : _e.disposition)) {
                dispatch(dispositionInteractionActions.setFormInput({
                    contactId: contactIdOrCaseId,
                    formInput: 'disposition',
                    value: null,
                }));
            }
            dispatch(dispositionInteractionActions.setDispositionOrTagList({
                contactId: contactIdOrCaseId,
                key: 'dispositionList',
                value: dispositionListData,
            }));
            dispatch(dispositionInteractionActions.setDispositionOrTagList({
                contactId: contactIdOrCaseId,
                key: 'tagList',
                value: tagsListData,
            }));
        }
    }, [
        activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.media,
        activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.skillOrQueueId,
        activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.dispositionData,
        activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs,
        activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.tagsData,
        contactDetails,
        contactIdOrCaseId,
        dispatch,
        previewSkillProps === null || previewSkillProps === void 0 ? void 0 : previewSkillProps.disposition,
        voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.confirmationRequired,
        voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.complianceRecord,
        voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.isLinked
    ]);
    const isVoiceContact = (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.media) === MediaType.VOICE;
    const isContactResolved = isVoiceContact
        ? stringCompareIgnoreCase(activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.contactStatus, CallContactEventStatus.DISCONNECTED)
        : (((_d = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _d === void 0 ? void 0 : _d.status) === DigitalContactStatus.RESOLVED ||
            ((_e = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _e === void 0 ? void 0 : _e.status) === DigitalContactStatus.CLOSED);
    const hasTimedOut = (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout) === true;
    const canRetry = autoSummaryToOutcomePanel && !isFinalSummaryGenerated && isContactResolved && hasTimedOut && attemptCount < maxRetryCount;
    return activeDisposition &&
        showDispositionsPanel &&
        (props.showDispositionHeaderWhenCollapsed || isDispositionOpen) ? (_jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, dispositionStyles.dispositionWrapper), { maxHeight: '80vh' }) }, { children: _jsxs(Box, Object.assign({ className: "dispositionsDetailsWrapper", sx: dispositionStyles.dispositionsDetailsWrapper }, { children: [_jsx(Box, Object.assign({ sx: dispositionStyles.dispositionsDetailsHeader, onClick: () => dispatch(displayDispositionCard(!isDispositionOpen)) }, { children: _jsx(CcfDispositionHeader, { isDispositionCompleted: (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isReadyToSend) || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isResolved), isDispositionOpen: isDispositionOpen, activeContact: activeContactForDisposition !== null && activeContactForDisposition !== void 0 ? activeContactForDisposition : undefined }) })), isDispositionOpen && (_jsxs(_Fragment, { children: [_jsx(CloseDispositionOnOutsideEvent, { componentId: 'disposition-panel-wrapper', outcomesButtonId: 'disposition-outcomes' }), _jsxs(Box, Object.assign({ id: "disposition-panel-wrapper", sx: { overflow: 'hidden' } }, { children: [_jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, dispositionStyles.displayAccordionDetails), { marginBottom: 0 }) }, { children: _jsx(CcfDispositionAccordionDetails, { clickedResolved: clickedResolved, contactMedia: activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.media, activeContact: activeContactForDisposition !== null && activeContactForDisposition !== void 0 ? activeContactForDisposition : undefined, onClickSaveButton: onClickSaveButton, isSaveDisabled: isSaveDisabled, isDisplayRedialPanel: isDisplayRedialPanel, setIsDisplayRedialPanel: setIsDisplayRedialPanel, selectedOBSkill: selectedOBSkill, setSelectedOBSkill: setSelectedOBSkill }) })), (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.media) !== MediaType.DIGITAL && !isDisplayRedialPanel && (_jsxs(Stack, Object.assign({ sx: Object.assign(Object.assign({}, dispositionStyles.markAsResolved), { padding: '0px 40px 12px 12px' }), direction: 'row', alignItems: 'center', spacing: 1 }, { children: [saveAndRedialIsEnabled &&
                                            (activeContactForDisposition === null || activeContactForDisposition === void 0 ? void 0 : activeContactForDisposition.media) === MediaType.VOICE &&
                                            _jsx(CCFSaveRedialButton, { isSaveRedialDisabled: isSaveRedialButtonDisabled, isDisplayRedialPanel: isDisplayRedialPanel, selectedOBSkill: selectedOBSkill, setIsDisplayRedialPanel: setIsDisplayRedialPanel, setupPendingRedial: setupPendingRedial, onClickSaveButton: onClickSaveButton, activeDisposition: activeDisposition }), 
                                        // Only show retry button if the final summary is not generated successfully
                                        canRetry && (_jsx(Tooltip, Object.assign({ title: isCoolingDown ? `${translate('youCanRetryAfter')} ${retryCountdown} ${translate('seconds')}` : '', arrow: true }, { children: _jsx("span", { children: _jsx(CcfButton, Object.assign({ sx: dispositionStyles.retryButton, variant: "contained", color: "inherit", onClick: handleRetry, disabled: isCoolingDown || attemptCount >= maxRetryCount, "data-testid": "retry-autosummary-button", "aria-label": translate('retryAutoSummary') }, { children: _jsx(CcfTypography, { variant: "inherit", translationKey: "retryAutoSummary" }) })) }) }))), _jsx(CcfButton, Object.assign({ sx: isSaveDisabled || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isResolved)
                                                ? dispositionStyles.disabledButton
                                                : Object.assign(Object.assign({}, dispositionStyles.markAsResolvedButton), { mr: 0 }), variant: "contained", color: "inherit", onClick: () => onClickSaveButton(), disabled: isSaveDisabled || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isResolved) || (copilotConfig && !validationUtils.isNotNullOrUndefined((_f = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _f === void 0 ? void 0 : _f.disposition)), "data-testid": "dispositions-save-button", primary: !isSaveDisabled }, { children: _jsx(CcfTypography, { variant: "inherit", sx: dispositionStyles.markAsResolvedText, translationKey: isSaveAndRedialFeatureToggleEnabled ? 'saveAndClose' : 'save' }) }))] }))), isDisplayRedialPanel && (_jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, dispositionStyles.markAsResolved), { padding: '0px 24px 12px 12px' }) }, { children: [_jsx(CcfButton, Object.assign({ variant: "outlined", size: "small", color: "inherit", onClick: () => {
                                                setIsDisplayRedialPanel(false);
                                                setSelectedOBSkill(-1);
                                            }, "data-testid": "dispositions-cancel-redial-button", sx: Object.assign(Object.assign({}, dispositionStyles.markAsResolvedOutlinedButton), { mr: 1 }) }, { children: _jsx(CcfTypography, { variant: "inherit", sx: isSaveDisabled || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isResolved)
                                                    ? {}
                                                    : Object.assign(Object.assign({}, dispositionStyles.markAsResolvedText), { color: theme.palette.text.clearText }), translationKey: "cancel" }) })), _jsx(CCFSaveRedialButton, { isSaveRedialDisabled: isSaveRedialButtonDisabled, isDisplayRedialPanel: isDisplayRedialPanel, selectedOBSkill: selectedOBSkill, setIsDisplayRedialPanel: setIsDisplayRedialPanel, setupPendingRedial: setupPendingRedial, onClickSaveButton: onClickSaveButton, activeDisposition: activeDisposition })] })))] }))] }))] })) }))) : null;
};
export default memo(CcfDispositionInteraction);
//# sourceMappingURL=ccf-disposition.js.map