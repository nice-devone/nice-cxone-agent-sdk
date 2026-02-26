import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CcfAssignmentCollapseIcon, CcfTypography, CcfOutboundAssignmentIcon, CcfInboundAssignmentIcon, useTranslator, CcfTooltip, CcfSeeMoreIcon, CcfNoAssignmentIcon, CcfSortItems, CcfAppToastMessage, CcfIconButton, isFeatureEnabled, } from '@nice-devone/ui-controls';
import { CcfAssignmentAction, selectInboxCollapsedState, allDigitalContactCard, nonIncomingDigitalContactCards, getPersonalQueue, digitalContactSelector, getSortingParameters, getDigitalMessageTagsByPageNumber, getContactDetailsForSelectedContact, PREVIEW_CASES, getAllInteractions, getAssignmentPanelMetadata, getNonIncomingActiveContactInSelectedInteraction, getActiveContactInSelectedInteraction, setSortingParametersInLocalStorage, getTime, voiceContactSelector, getInteractionNavKeyPressedStatus, getSelectedInteraction, getSelectedContactRoot, focusContact, } from '../ccf-assignment-panel.slice';
import { getSelectedMenuName, globalActions, updateExternalProdURL } from '../../global.app.slice';
import { MediaType, CXoneLeaderElector, WorkflowTypes, SLAIndicatorType, DigitalContactStatus, VoiceContactStatus, InteractionType, } from '@nice-devone/common-sdk';
import { useTheme, useMediaQuery, Box } from '@mui/material';
import { getAgentSkills, isOutboundSkillSelector } from '../../ccf-agent-skill/ccf-agent-skill-details-slice';
import { getAgentProfileSettings, getmchSettings, requestInteraction } from '../../ccf-agent-setting/ccf-agent-setting-slice';
import { Navigation } from '../../../enums/navigation-menus';
import { CallType, CcfLogger } from '@nice-devone/agent-sdk';
import { getAgentOBChannels, userHaveObChannelSelector } from './ccf-channel-details-slice';
import { ACDSessionManager, LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CcfCustomerCardActions, cxoneCCActivity, fetchActivityData, updateAgentWorkflowResponseWithIcon, getStoredCustomEventDetails, getAgentWorkflowConfigurationReceived, getAgentWorkflowResponseReceived, getCRMDataForTransferedContact, } from '../../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import * as CcfCustomerCardSlice from '../../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { agentDirectoryActions } from '../../ccf-directory/+state/ccf-directory.slice';
import { getScheduledCommitment } from '../../ccf-commitment/ccf-commitment.slice';
import { AgentStates, triggerCRMScreenPop } from '@nice-devone/shared-apps-lib';
import { SortingCriteria, calculateSLATime, TimerTitle, resolveAndUnassignContacts, setAgentWorkflowResponseDetails, getResetCRTFromLocalStorage, removePreviousContactFocus, } from '../ccf-assignment-utils';
import ccfContactAssignmentStyles from './ccf-contact-assignment.style';
import { toast } from 'react-toastify';
import { CXoneDigitalContact, SortOrder } from '@nice-devone/digital-sdk';
import CcfInteraction from '../ccf-interaction/ccf-interaction';
import { callConferenceActions, dialExternalNumber, hasErrorState } from '../../ccf-call-conference/ccf-call-conference.slice';
import { agentSelectedVoicePreference } from '../../ccf-acd-session/ccf-acd-session.slice';
import { CXoneVoiceClientWrapper } from '../../../services/cxone-voice-client-wrapper';
import useSyncLvInteractions from '../../lv-app-space/lv-interactions/hooks/useSyncLvInteractions';
import { agentStateActions, selectcurrentStatus, setAgentState } from '../../ccf-agent-state/ccf-agent-state.slice';
import { dispositionInteractionActions, getContactPendingRedial } from '../../ccf-disposition/ccf-disposition-slice';
const SLA_TRACKING_INTERVAL = 1000; //sla tracking interval duration in milliseconds
let contactsActivityReceived = [];
/**
 * Component to display assignment box on UI
 * @example - <CcfAssignmentPanel/>
 */
export function CcfContactAssignment() {
    var _a, _b;
    const theme = useTheme();
    const personalQueue = useSelector(getPersonalQueue);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const isInboxCollapsed = useSelector(selectInboxCollapsedState);
    const digitalContactCards = useSelector(allDigitalContactCard);
    const digitalContacts = useSelector(nonIncomingDigitalContactCards);
    const selectedMenuName = useSelector(getSelectedMenuName);
    const isOutboundSkillsAssigned = useSelector(isOutboundSkillSelector);
    const isRequestInteractionEnabled = useSelector(getmchSettings).requestContact;
    const isNewInteractionIconRequired = isOutboundSkillsAssigned || isRequestInteractionEnabled;
    const digitalContactDetails = useSelector(digitalContactSelector);
    const voiceContactDetails = useSelector(voiceContactSelector);
    const cxoneCcActivity = useSelector(cxoneCCActivity);
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const { setSelectedMenu } = globalActions;
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const userHaveOBChannel = useSelector(userHaveObChannelSelector);
    const scheduledContact = useSelector(getScheduledCommitment);
    const cardsDivRef = useRef(null);
    const interactionRefs = useRef([]);
    const cardScrollHeight = cardsDivRef.current !== null ? cardsDivRef.current['scrollHeight'] : 0;
    const sortingParameters = getSortingParameters();
    const sortingCriteriaList = Object.values(SortingCriteria);
    const getAgentWorkflowConfigurationDetails = useSelector(getAgentWorkflowConfigurationReceived);
    const agentWorkflowResponseReceived = useSelector(getAgentWorkflowResponseReceived);
    const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-contact-assignment');
    const assignmentClasses = ccfContactAssignmentStyles(theme);
    const slaTimer = useRef(null); // interval to track the SLA timer for all the cases present in the assignment space
    const selectedInteractionId = useSelector(getSelectedInteraction);
    const selectedContactRoot = useSelector(getSelectedContactRoot);
    const [isTop, setIsTop] = useState(false);
    const [isBottom, setIsBottom] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    const [scrollAutoHeight, setScrollAutoHeight] = useState('');
    const [sortedInteractions, setSortedInteractions] = useState([]);
    const assignmentMetadata = useSelector(getAssignmentPanelMetadata);
    const allInteractions = useSelector(getAllInteractions);
    const voiceContactsLength = assignmentMetadata.voiceInteractionId
        ? Object.keys((_a = allInteractions[assignmentMetadata.voiceInteractionId]) !== null && _a !== void 0 ? _a : {}).length
        : 0;
    const getStoredCustomEventData = useSelector(getStoredCustomEventDetails);
    const hasError = useSelector(hasErrorState);
    const isInteractionNavigationKeyPressed = useSelector(getInteractionNavKeyPressedStatus);
    const agentSelectedVoicePref = useSelector(agentSelectedVoicePreference);
    const isInitialRender = useRef(true);
    const [vmCallbackSelected, setVmCallbackSelected] = useState(false);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const defaultHomeApp = (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideContactHistory) ? Navigation.DIRECTORY : Navigation.CONTACTHISTORY;
    const collapseAssignment = translate('collapseAssignments');
    const expandAssignment = translate('expandAssignments');
    const collapseIconRef = useRef(null);
    const expandIconRef = useRef(null);
    const contactPendingRedial = useSelector(getContactPendingRedial);
    const currentAgentState = useSelector(selectcurrentStatus);
    const { setSelectedState } = agentStateActions;
    const isCumulativeLimitEnabled = isFeatureEnabled("release-cxa-cumulative-file-size-limit-AW-43847" /* FeatureToggles.CUMULATIVE_FILE_SIZE_VALIDATION */);
    useEffect(() => {
        dispatch(getAgentSkills());
        dispatch(getAgentOBChannels(false));
        dispatch(getDigitalMessageTagsByPageNumber(1));
        loadDraftAndPreviewMessages();
    }, []);
    useEffect(() => {
        if (agentSelectedVoicePref === 'WebRTC') {
            window.removeEventListener('message', triggerAutoAccept, false);
            window.addEventListener('message', triggerAutoAccept);
        }
        return () => {
            window.removeEventListener('message', triggerAutoAccept, false);
        };
    }, [agentSelectedVoicePref]);
    useEffect(() => {
        if (hasError === null || hasError === void 0 ? void 0 : hasError.hasErrorForDialPhone) {
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "dialCallError" }), {
                autoClose: 2000,
                containerId: 'AppToastContainer',
            });
            dispatch(callConferenceActions.resetContactErrorState());
        }
    }, [hasError === null || hasError === void 0 ? void 0 : hasError.hasErrorForDialPhone]);
    useEffect(() => {
        sortAssignmentInteractions();
    }, [allInteractions]);
    useEffect(() => {
        var _a, _b, _c, _d;
        if (isInteractionNavigationKeyPressed) {
            let nextIndex = 0;
            const allInterActionIds = (_a = interactionRefs === null || interactionRefs === void 0 ? void 0 : interactionRefs.current) === null || _a === void 0 ? void 0 : _a.map((myRef) => myRef.dataset.testid);
            const currentIndex = allInterActionIds === null || allInterActionIds === void 0 ? void 0 : allInterActionIds.indexOf('interaction-' + (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.interactionId));
            // check if current selected interaction is last in list. if yes navigate to top else move to next interaction
            if (currentIndex === (((_b = interactionRefs === null || interactionRefs === void 0 ? void 0 : interactionRefs.current) === null || _b === void 0 ? void 0 : _b.length) - 1)) {
                nextIndex = 0;
            }
            else {
                nextIndex = currentIndex + 1;
            }
            if (allInterActionIds) {
                const nextInteractionId = (_c = allInterActionIds[nextIndex]) === null || _c === void 0 ? void 0 : _c.substring(((_d = allInterActionIds[nextIndex]) === null || _d === void 0 ? void 0 : _d.indexOf('-')) + 1);
                dispatch(CcfAssignmentAction.setSelectedInteraction(nextInteractionId));
                LocalStorageHelper.setItem(StorageKeys.SELECTED_INTERACTION_ID, nextInteractionId);
                dispatch(globalActions.setSelectedMenu({ name: Navigation.INTERACTION }));
                updateExternalProdURL(null, Navigation.INTERACTION, null);
            }
            dispatch(CcfAssignmentAction.setInteractionKeyboardNavKeyPressed(false));
        }
    }, [isInteractionNavigationKeyPressed]);
    useEffect(() => {
        setSelectedInteraction();
        expandAssignmentPanel();
        removeReferencesToUnAssignedInteractions();
        startSlaTracking();
        updateVmCallbackIsSelected();
    }, [sortedInteractions]);
    useEffect(() => {
        expandAssignmentPanel();
    }, [!isSmView]);
    /**
     * Function to sort interactions within assignment panel
     * @example sortAssignmentInteractions
     */
    const sortAssignmentInteractions = () => {
        if (Object.values(allInteractions).length === 0) {
            if (selectedMenuName === Navigation.CONFERENCE && isSmView) {
                dispatch(setSelectedMenu({ name: defaultHomeApp }));
            }
            setSortedInteractions([]);
            return;
        }
        const sortedInteractions = [];
        const digitalInteractions = [];
        if (assignmentMetadata.voiceInteractionId && allInteractions[assignmentMetadata.voiceInteractionId]) {
            sortedInteractions.unshift(allInteractions[assignmentMetadata.voiceInteractionId]);
        }
        if (assignmentMetadata.voiceMailInteractionId && allInteractions[assignmentMetadata.voiceMailInteractionId]) {
            sortedInteractions.push(allInteractions[assignmentMetadata.voiceMailInteractionId]);
        }
        if (assignmentMetadata.incommingAcdInteractionId && allInteractions[assignmentMetadata.incommingAcdInteractionId]) {
            sortedInteractions.push(allInteractions[assignmentMetadata.incommingAcdInteractionId]);
        }
        if (assignmentMetadata.incommingDfoInteractionId && allInteractions[assignmentMetadata.incommingDfoInteractionId]) {
            sortedInteractions.push(allInteractions[assignmentMetadata.incommingDfoInteractionId]);
        }
        Object.values(allInteractions).forEach((interaction) => {
            if (interaction.interactionId !== assignmentMetadata.voiceInteractionId &&
                interaction.interactionId !== assignmentMetadata.voiceMailInteractionId &&
                interaction.interactionId !== assignmentMetadata.incommingAcdInteractionId &&
                interaction.interactionId !== assignmentMetadata.incommingDfoInteractionId) {
                if (interaction.interactionType === InteractionType.DIGITAL ||
                    interaction.interactionType === InteractionType.ELEVATED) {
                    digitalInteractions.push(interaction);
                }
                else {
                    sortedInteractions.push(interaction);
                }
            }
        });
        const sortingParameters = getSortingParameters();
        orderDigitalAssignments(sortedInteractions, digitalInteractions, sortingParameters);
    };
    /**
     * @example - updateSelection(interactionId)
     * A function to update redux and local storage with interaction ID
     */
    const updateSelection = (id) => {
        dispatch(CcfAssignmentAction.setSelectedInteraction(id));
        LocalStorageHelper.setItem(StorageKeys.SELECTED_INTERACTION_ID, id);
    };
    /**
     * Method to move focus or select the required interaction
     * @example setSelectedInteraction();
     */
    const setSelectedInteraction = () => {
        var _a;
        if (selectedInteractionId && sortedInteractions.length === 0) {
            dispatch(CcfAssignmentAction.setSelectedInteraction(selectedInteractionId));
        }
        else if (selectedInteractionId && sortedInteractions.length > 0) {
            const interactionIndex = sortedInteractions.findIndex((interaction) => interaction.interactionId === selectedInteractionId);
            const voiceContactWithParentID = voiceContactDetails && voiceContactDetails.parentContactId;
            const parentContactIsVoicemail = sortedInteractions.find((interaction) => interaction.interactionId === voiceContactWithParentID &&
                interaction.interactionType === InteractionType.VOICEMAIL);
            if (interactionIndex === -1) {
                updateSelection(sortedInteractions[0].interactionId);
                isInitialRender.current = false;
            }
            else if (parentContactIsVoicemail && !vmCallbackSelected) {
                //outbound callback from voicemail 
                updateSelection(voiceContactDetails.interactionId);
                setVmCallbackSelected(true);
            }
        }
        else {
            if (!selectedInteractionId && sortedInteractions.length > 0) {
                const selectedInteractionLS = LocalStorageHelper.getItem(StorageKeys.SELECTED_INTERACTION_ID);
                if (selectedInteractionLS) {
                    const interaction = (_a = sortedInteractions.find(interaction => interaction.interactionId === selectedInteractionLS)) === null || _a === void 0 ? void 0 : _a.interactionId;
                    if (selectedInteractionLS === interaction) {
                        updateSelection(interaction);
                    }
                    else {
                        updateSelection(sortedInteractions[0].interactionId);
                    }
                }
                else {
                    updateSelection(sortedInteractions[0].interactionId);
                }
                isInitialRender.current = false;
            }
            if (sortedInteractions.length === 0) {
                if (!isInitialRender.current) {
                    removePreviousContactFocus(dispatch);
                    LocalStorageHelper.removeItem(StorageKeys.SELECTED_INTERACTION_ID);
                    LocalStorageHelper.removeItem(StorageKeys.FOCUSED_CONTACT_ID);
                    LocalStorageHelper.removeItem(StorageKeys.FOCUSED_CONTACT_MEDIA_TYPE);
                    dispatch(CcfAssignmentAction.setSelectedContactRoot(''));
                }
                selectedMenuName === Navigation.INTERACTION && dispatch(setSelectedMenu({ name: defaultHomeApp }));
            }
        }
        const results = contactsActivityReceived === null || contactsActivityReceived === void 0 ? void 0 : contactsActivityReceived.filter(activity => { var _a; return activity.contactId === ((_a = digitalContacts.find(contactDetail => activity.contactId === contactDetail.contactId)) === null || _a === void 0 ? void 0 : _a.contactId); });
        if (results.length >= 0) {
            contactsActivityReceived = results;
        }
    };
    useEffect(() => {
        var _a, _b, _c, _d, _e;
        const currentFocused = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID);
        if (selectedContactRoot &&
            nonIncomingActiveContactInSelectedInteraction &&
            (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL &&
            (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) === selectedContactRoot) {
            // Find previous focused case assignment status from allInteractions
            let isAssignedCurrent = false;
            if (currentFocused && currentFocused !== selectedContactRoot) {
                for (const interaction of Object.values(allInteractions)) {
                    if (((interaction === null || interaction === void 0 ? void 0 : interaction.interactionType) === InteractionType.DIGITAL || (interaction === null || interaction === void 0 ? void 0 : interaction.interactionType) === InteractionType.ELEVATED) &&
                        ((_b = (_a = interaction === null || interaction === void 0 ? void 0 : interaction.digitalContacts) === null || _a === void 0 ? void 0 : _a[currentFocused]) === null || _b === void 0 ? void 0 : _b.isAssignedToAgentInbox)) {
                        isAssignedCurrent = true;
                        break;
                    }
                }
            }
            // Only assigned digital cases can have focus/defocus
            const digitalInteractions = sortedInteractions.filter((interactions) => (interactions === null || interactions === void 0 ? void 0 : interactions.interactionType) === InteractionType.DIGITAL ||
                (interactions === null || interactions === void 0 ? void 0 : interactions.interactionType) === InteractionType.ELEVATED);
            const interaction = digitalInteractions.find((interaction) => (interaction === null || interaction === void 0 ? void 0 : interaction.interactionId) === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
            const isAssignedSelected = (_d = (_c = interaction === null || interaction === void 0 ? void 0 : interaction.digitalContacts) === null || _c === void 0 ? void 0 : _c[selectedContactRoot]) === null || _d === void 0 ? void 0 : _d.isAssignedToAgentInbox;
            // Defocus only if currentFocused is assigned, not the same as selected, and selected is assigned
            if (isAssignedCurrent && currentFocused && currentFocused !== selectedContactRoot) {
                removePreviousContactFocus(dispatch, true, true);
            }
            // Focus only if selected is assigned, not draft, and not already focused
            if (isAssignedSelected &&
                (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) !== DigitalContactStatus.DRAFT &&
                currentFocused !== selectedContactRoot) {
                const previewCasesStored = (_e = LocalStorageHelper.getItem(PREVIEW_CASES, true)) !== null && _e !== void 0 ? _e : [];
                if (!previewCasesStored.includes(selectedContactRoot) &&
                    currentFocused !== selectedContactRoot &&
                    currentFocused !== '') {
                    dispatch(getContactDetailsForSelectedContact({ contactId: selectedContactRoot, forceFetch: true }));
                }
                dispatch(focusContact(selectedContactRoot));
            }
            LocalStorageHelper.setItem(StorageKeys.FOCUSED_CONTACT_ID, selectedContactRoot);
            LocalStorageHelper.setItem(StorageKeys.FOCUSED_CONTACT_MEDIA_TYPE, nonIncomingActiveContactInSelectedInteraction.media);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedContactRoot, nonIncomingActiveContactInSelectedInteraction]);
    useEffect(() => {
        //this useEffect dials the pending redial contact
        const workingState = 'working';
        if ((contactPendingRedial === null || contactPendingRedial === void 0 ? void 0 : contactPendingRedial.status) === 'pending' &&
            (contactPendingRedial === null || contactPendingRedial === void 0 ? void 0 : contactPendingRedial.skillId) &&
            (contactPendingRedial === null || contactPendingRedial === void 0 ? void 0 : contactPendingRedial.toAddr) &&
            ((currentAgentState === null || currentAgentState === void 0 ? void 0 : currentAgentState.currentState.state) === AgentStates.Unavailable ||
                //getting inconsistent capitalization from api, so converting to lower case for comparison
                ((currentAgentState === null || currentAgentState === void 0 ? void 0 : currentAgentState.currentState.state) || '').toLowerCase() === workingState) &&
            voiceContactsLength === 0) {
            //dial number for pending redial
            dispatch(dialExternalNumber({
                skillId: contactPendingRedial.skillId,
                phoneNumber: contactPendingRedial.toAddr,
                triggerType: MediaType.VOICE,
            }));
            dispatch(dispositionInteractionActions.setPendingVoiceContactForRedial(Object.assign(Object.assign({}, contactPendingRedial), { status: 'dialed' })));
        }
    }, [contactPendingRedial, currentAgentState, voiceContactsLength]);
    useEffect(() => {
        //this useEffect waits for the pending redial contact to be connected or the dial to error, then sets the next agent state to available and clears the pending redial state
        if ((contactPendingRedial === null || contactPendingRedial === void 0 ? void 0 : contactPendingRedial.status) === 'dialed') {
            if (voiceContactDetails.dnis === (contactPendingRedial === null || contactPendingRedial === void 0 ? void 0 : contactPendingRedial.toAddr)) {
                const availableState = {
                    id: 'available',
                    isActive: true,
                    isAcw: false,
                    isFavourite: false,
                    isPersonalConnection: false,
                    reason: 'Available',
                    skillName: '',
                    state: 'Available',
                };
                //if no pending redial, set agent state to available after redial is completed
                dispatch(setAgentState({ selectedState: availableState }));
                dispatch(setSelectedState({ selectedState: availableState }));
                dispatch(dispositionInteractionActions.clearPendingVoiceContactForRedial());
            }
            if (hasError === null || hasError === void 0 ? void 0 : hasError.hasErrorForDialPhone) {
                //if there is an error while dialing the pending redial contact, clear the pending redial state
                dispatch(dispositionInteractionActions.clearPendingVoiceContactForRedial());
            }
        }
    }, [voiceContactDetails, contactPendingRedial, hasError === null || hasError === void 0 ? void 0 : hasError.hasErrorForDialPhone]);
    /**
     * Method to expand assignment panel for specific conditions
     * @example expandAssignmentPanel();
     */
    const expandAssignmentPanel = () => {
        if (!isSmView) {
            if (assignmentMetadata.voiceInteractionId ||
                assignmentMetadata.voiceMailInteractionId ||
                assignmentMetadata.incommingAcdInteractionId ||
                assignmentMetadata.incommingDfoInteractionId) {
                dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: false, isLargeView: true }));
            }
        }
    };
    /**
  * Updates SLA indicators for assigned contact cards and resolves and unassigns contacts if necessary.
  * @param assignedContactCards - Array of contact cards assigned to agents.
  * @example - updateSLA(assignedContactCards);
  */
    const updateSLA = (assignedContactCards) => {
        const updatedSLAWarning = {};
        const expiredSlaContacts = [];
        Object.values(assignedContactCards).forEach((interaction) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (interaction.interactionType !== InteractionType.ELEVATED) {
                const digitalContact = Object.values(interaction.digitalContacts)[0];
                if ((interaction === null || interaction === void 0 ? void 0 : interaction.interactionId) && (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId)) {
                    //Get reset customer response timestamp for each contact from local storage
                    const contactDetail = digitalContactDetails[interaction.interactionId][digitalContact.caseId];
                    const resetCRT = getResetCRTFromLocalStorage(digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId);
                    const routingQueue = contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.routingQueue;
                    if (((_a = contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.messages) === null || _a === void 0 ? void 0 : _a.length) &&
                        contactDetail.status !== DigitalContactStatus.CLOSED &&
                        ((routingQueue === null || routingQueue === void 0 ? void 0 : routingQueue.agentResponseEnabled) || (routingQueue === null || routingQueue === void 0 ? void 0 : routingQueue.customerResponseEnabled))) {
                        // if sla flag is enabled and case status is not closed then only we will calculate the SLA for that contact
                        const calculatedSLA = calculateSLATime(contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.messages, (_b = contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.case) === null || _b === void 0 ? void 0 : _b.inboxAssigneeLastAssignedAt, routingQueue, resetCRT);
                        if ((calculatedSLA === null || calculatedSLA === void 0 ? void 0 : calculatedSLA.slaIndicator) && (interaction === null || interaction === void 0 ? void 0 : interaction.slaIndicator) !== (calculatedSLA === null || calculatedSLA === void 0 ? void 0 : calculatedSLA.slaIndicator)) {
                            // if the calculated slaIndicator is different from the existing slaIndicator then only we need to perform next set of actions
                            updatedSLAWarning[interaction === null || interaction === void 0 ? void 0 : interaction.interactionId] = calculatedSLA.slaIndicator;
                            //if timer is expired in case of customer response time only then we will update the expiredSlaContacts object
                            if ((calculatedSLA === null || calculatedSLA === void 0 ? void 0 : calculatedSLA.slaIndicator) === SLAIndicatorType.CRITICAL &&
                                calculatedSLA.title === TimerTitle.CUSTOMER_TIMER)
                                expiredSlaContacts.push(contactDetail);
                        }
                    }
                }
            }
        }));
        // if we got any contact SLA warning to update then we will dispatch the action to let the contact card component know about this update
        if (Object.keys(updatedSLAWarning).length)
            dispatch(CcfAssignmentAction.updateSlaIndicator(updatedSLAWarning));
        // if we have expiredSlaContact the we will changes their status to resolve and then unassign them
        if (expiredSlaContacts === null || expiredSlaContacts === void 0 ? void 0 : expiredSlaContacts.length)
            resolveAndUnassignContacts(expiredSlaContacts, handleToast);
    };
    /**
     * Used to start the slaTracking for the contacts assigned to the agent
     * @example
     * ```
     * startSlaTracking()
     * ```
     */
    const startSlaTracking = () => {
        const assignedDigitalContactCards = {};
        const digitalInteractions = sortedInteractions.filter((int) => int.interactionType === InteractionType.DIGITAL);
        if (slaTimer.current)
            clearInterval(slaTimer.current); // clear the previous sla timer instance before creating the new one
        digitalInteractions.forEach((interaction) => {
            var _a, _b;
            //SLA Timer will only run for assigned cases not view only cases
            const caseId = Object.keys(interaction.digitalContacts)[0];
            if (((_a = interaction.digitalContacts[caseId]) === null || _a === void 0 ? void 0 : _a.isAssignedToAgentInbox) && !((_b = interaction.digitalContacts[caseId]) === null || _b === void 0 ? void 0 : _b.elevatedFrom)) {
                assignedDigitalContactCards[interaction.interactionId] = Object.assign(Object.assign({}, interaction), { digitalContacts: Object.assign({}, interaction.digitalContacts) });
            }
        });
        if (Object.keys(assignedDigitalContactCards).length > 0) {
            // if we have cases then only we will start the SLA timer interval
            // SLA timer interval to track te SLA for each contacts
            slaTimer.current = setInterval(() => {
                updateSLA(assignedDigitalContactCards);
            }, SLA_TRACKING_INTERVAL);
        }
    };
    /* remove references to unassigned interactions  */
    /**
     * Function to remove unused refs
     * @example removeReferencesToUnAssignedInteractions()
     */
    const removeReferencesToUnAssignedInteractions = () => {
        var _a;
        if (((_a = interactionRefs === null || interactionRefs === void 0 ? void 0 : interactionRefs.current) === null || _a === void 0 ? void 0 : _a.length) > sortedInteractions.length) {
            const indexToRemove = interactionRefs.current.findIndex((x) => x === null);
            interactionRefs.current.splice(indexToRemove, 1);
        }
    };
    useEffect(() => {
        var _a, _b, _c;
        //update inline images from local storage after refresh
        const attachmentsFromLocalStorage = LocalStorageHelper.getItem(StorageKeys.DIGITAL_ATTACHMENTS + selectedContactRoot || '', true);
        const currentInteraction = selectedInteractionId && selectedContactRoot && ((_b = (_a = allInteractions[selectedInteractionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts) === null || _b === void 0 ? void 0 : _b[selectedContactRoot]);
        const inlineAttachments = ((_c = attachmentsFromLocalStorage === null || attachmentsFromLocalStorage === void 0 ? void 0 : attachmentsFromLocalStorage.attachments) === null || _c === void 0 ? void 0 : _c.filter((attachment) => attachment.isInline)) || [];
        if (currentInteraction && !currentInteraction.inlineImages && inlineAttachments.length > 0 && isCumulativeLimitEnabled) {
            dispatch(CcfAssignmentAction.updateInlineImages({ inlineImages: inlineAttachments, isLoadFromLocalStorage: true }));
        }
    }, [selectedContactRoot, dispatch, isCumulativeLimitEnabled]);
    /**
     * On page refresh, load draft OB contacts or preview contacts for Digital
     * @example - loadDraftPreviewMessage();
     */
    const loadDraftAndPreviewMessages = () => {
        const currentObContact = LocalStorageHelper.getItem(StorageKeys.OUTBOUND_DIGITAL_CONTACTS, true);
        if (currentObContact && currentObContact.length > 0) {
            currentObContact.forEach((contact) => {
                var _a;
                const obDigitalContact = new CXoneDigitalContact();
                Object.assign(obDigitalContact, contact);
                const attachmentsFromLocalStorage = LocalStorageHelper.getItem(StorageKeys.DIGITAL_ATTACHMENTS + obDigitalContact.caseId || '', true);
                const normalAttachments = ((_a = attachmentsFromLocalStorage === null || attachmentsFromLocalStorage === void 0 ? void 0 : attachmentsFromLocalStorage.attachments) === null || _a === void 0 ? void 0 : _a.filter((attachment) => !attachment.isInline)) || [];
                obDigitalContact.attachments = { attachments: normalAttachments };
                dispatch(CcfAssignmentAction.handleCaseAssignedDigitalContactEvent(obDigitalContact));
            });
        }
        // to load the preview cases open on page refresh
        const previewCasesStored = LocalStorageHelper.getItem(PREVIEW_CASES, true);
        if (previewCasesStored === null || previewCasesStored === void 0 ? void 0 : previewCasesStored.length) {
            // if any preview case is present in the localStorage then we will request for the details
            previewCasesStored === null || previewCasesStored === void 0 ? void 0 : previewCasesStored.forEach((contactId) => {
                dispatch(getContactDetailsForSelectedContact({
                    contactId: contactId,
                    isAssignedToAgentInbox: false,
                }));
            });
        }
    };
    /**
     * Used to show the toast
     * @param isError - whether the toast is for error or success
     * @param messageKey - translation toast message key
     * @param placeholder - extra argument ot pass in the translation string
     * @example
     * ```
     * handleToast(false, 'caseStatusChanged', DigitalContactStatus.RESOLVED);
     * ```
     */
    const handleToast = (isError, messageKey, placeholder) => {
        const messageComponent = (_jsx(CcfAppToastMessage, { type: isError ? 'error' : 'success', messageKey: messageKey, extraArgs: { format: [placeholder || ''] } }));
        const toastOptions = { autoClose: 2000, containerId: 'AppToastContainer' };
        toast[isError ? 'error' : 'success'](messageComponent, toastOptions);
    };
    /**
     * Method to toggle Collapse assignment box
     * @example toggleCollapse(true);
     */
    const toggleCollapse = (updatedCollapsedState) => {
        dispatch(CcfAssignmentAction.updateInboxCollapsed({
            isInboxCollapsed: updatedCollapsedState,
            isLargeView: !isSmView,
        }));
        // Retain focus on the correct icon after toggling, if still in DOM
        setTimeout(() => {
            var _a, _b, _c, _d;
            if (updatedCollapsedState) {
                (_b = (_a = expandIconRef === null || expandIconRef === void 0 ? void 0 : expandIconRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.focus();
            }
            else {
                (_d = (_c = collapseIconRef === null || collapseIconRef === void 0 ? void 0 : collapseIconRef.current) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.focus();
            }
        }, 0);
    };
    /**
     * Function is called on clicking Intitate outbound.
     * @example -outboundCallInitiate()
     */
    const outboundCallInitiate = () => {
        dispatch(globalActions.setOutboundBtnCliked(true));
        if (isSmView) {
            dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: true, isLargeView: !isSmView }));
        }
        dispatch(setSelectedMenu({ name: 'Directory' }));
        dispatch(agentDirectoryActions.setFocusInDirectory(true));
    };
    /**
     * Function is called on clicking fetch interaction. It will fetch for new interactions and add in assignment section
     * @example fetchInteraction()
     */
    const fetchInteraction = () => {
        const workItemCount = sortedInteractions.filter((int) => int.interactionType === InteractionType.WORKITEM).length;
        dispatch(requestInteraction({ workItemCount: workItemCount, userRequest: true }));
    };
    /**
     * Function to detect div bottom and top reached on scroll
     * @example handlescroll
     */
    const handleScroll = (e) => {
        const scrollElement = e.target;
        const downArrowDiv = document.getElementById('downArrow');
        const upArrowDiv = document.getElementById('upArrow');
        const isScrolledToBottom = scrollElement.scrollHeight - scrollElement.clientHeight <= scrollElement.scrollTop + 4;
        if (isScrolledToBottom) {
            setIsBottom(true);
            setIsTop(false);
            if (downArrowDiv !== null)
                downArrowDiv.style.display = 'none';
        }
        else {
            setIsBottom(false);
            if (downArrowDiv !== null)
                downArrowDiv.style.display = 'flex';
        }
        if (downArrowDiv !== null)
            downArrowDiv.style.marginBottom = '1px';
        if (scrollElement.scrollTop === 0) {
            setIsTop(true);
            setIsBottom(false);
            if (upArrowDiv !== null)
                upArrowDiv.style.display = 'none';
        }
        else {
            setIsTop(false);
            if (upArrowDiv !== null)
                upArrowDiv.style.display = 'flex';
        }
    };
    useEffect(() => {
        const downArrowDiv = document.getElementById('downArrow');
        const upArrowDiv = document.getElementById('upArrow');
        if (cardsDivRef.current !== null) {
            if (cardsDivRef.current['scrollHeight'] > cardsDivRef.current['clientHeight'] &&
                (Object.keys(allInteractions).length > 0 || personalQueue.length > 0)) {
                setIsScroll(true);
                setIsTop(true);
                if (downArrowDiv !== null)
                    downArrowDiv.style.display = 'flex';
            }
            else {
                setIsScroll(false);
                if (downArrowDiv !== null) {
                    downArrowDiv.style.display = 'none';
                }
                if (upArrowDiv !== null)
                    upArrowDiv.style.display = 'none';
            }
        }
        else {
            setIsScroll(false);
            setIsBottom(true);
            setIsTop(true);
            if (downArrowDiv !== null)
                downArrowDiv.style.display = 'none';
            if (upArrowDiv !== null)
                upArrowDiv.style.display = 'none';
        }
    }, [cardScrollHeight]);
    useEffect(() => {
        if (isScroll) {
            if (!isTop && !isBottom && (Object.keys(allInteractions).length > 0 || personalQueue.length > 0))
                setScrollAutoHeight('upAndDownArrow');
            else if ((isTop || isBottom) && (Object.keys(allInteractions).length > 0 || personalQueue.length > 0))
                setScrollAutoHeight('upOrDownArrow');
            else
                setScrollAutoHeight('noArrow');
        }
        else
            setScrollAutoHeight('noArrow');
    }, [isScroll]);
    useEffect(() => {
        /**
         * Dev note - As we are restricting the rerender method if we have received Agent workflow response.
         * Handling it by adding entry in localstorage and depedning on it calling rerenderActivity Mehtod.
         * We need to discuss with Product and remove this code as going forward we won't provide backward compatibity of custom event.
         */
        try {
            const availableCustomEventData = LocalStorageHelper.getItem(StorageKeys.AGENT_WORKFLOW_EVENT, true) || [];
            const isCustomEventAvailable = setAgentWorkflowResponseDetails(availableCustomEventData, nonIncomingActiveContactInSelectedInteraction);
            if (agentWorkflowResponseReceived && isCustomEventAvailable) {
                isCustomEventAvailable.isConfigAvailable = false;
            }
            const availableAgentWorkflowData = LocalStorageHelper.getItem(StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, true) || [];
            const isAgentWorkflowAvailable = setAgentWorkflowResponseDetails(availableAgentWorkflowData, nonIncomingActiveContactInSelectedInteraction);
            if ((isAgentWorkflowAvailable === null || isAgentWorkflowAvailable === void 0 ? void 0 : isAgentWorkflowAvailable.isAgentWFConfigAvailable) && !(isCustomEventAvailable === null || isCustomEventAvailable === void 0 ? void 0 : isCustomEventAvailable.isConfigAvailable)) {
                if (!CXoneLeaderElector.instance.isLeader) {
                    reRenderActivity();
                }
                else if ((assignmentMetadata.voiceInteractionId &&
                    voiceContactsLength &&
                    Object.keys(allInteractions[assignmentMetadata.voiceInteractionId].acdContacts).length > 0) ||
                    (digitalContactCards && digitalContactCards.length > 0)) {
                    reRenderActivity();
                }
            }
        }
        catch (err) {
            ccfLogger.error('Rerender Activity Failed -', JSON.stringify(err));
        }
    }, [voiceContactsLength, digitalContactCards.length, getAgentWorkflowConfigurationDetails, nonIncomingActiveContactInSelectedInteraction]);
    const selectedContactId = (assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.selectedInteractionId) && ((_b = allInteractions[assignmentMetadata.selectedInteractionId]) === null || _b === void 0 ? void 0 : _b.selectedContactId);
    const activeContactStatusForVoice = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus;
    useEffect(() => {
        if (voiceContactDetails &&
            voiceContactDetails.isInbound &&
            nonIncomingActiveContactInSelectedInteraction &&
            nonIncomingActiveContactInSelectedInteraction.media === MediaType.VOICE &&
            activeContactStatusForVoice === VoiceContactStatus.ACTIVE) {
            if (nonIncomingActiveContactInSelectedInteraction.contactId !== voiceContactDetails.masterID ||
                nonIncomingActiveContactInSelectedInteraction.callType === CallType.CONSULT) {
                dispatch(getCRMDataForTransferedContact({
                    interactionId: voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.interactionId,
                    contactId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId,
                }));
            }
        }
    }, [activeContactStatusForVoice, assignmentMetadata.selectedInteractionId, selectedContactId]);
    /* istanbul ignore next  */
    /**
     * Function to handle rerendering of activity
     * @example reRenderActivity
     */
    const reRenderActivity = () => {
        try {
            const storedActivityConfig = LocalStorageHelper.getItem(StorageKeys.CXONE_ACTIVITY_CONFIG, true);
            const activeContact = (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.VOICE ||
                (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.DIGITAL
                ? activeContactInSelectedInteraction
                : undefined;
            const activeContactConfig = storedActivityConfig &&
                storedActivityConfig instanceof Array &&
                (storedActivityConfig === null || storedActivityConfig === void 0 ? void 0 : storedActivityConfig.find((item) => (item === null || item === void 0 ? void 0 : item.ContactID) === (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId)));
            dispatch(CcfCustomerCardActions.setActivitySearchInformation(activeContactConfig));
            // trigger multiple api to get all activity data
            if (storedActivityConfig.length > 0 && activeContact) {
                storedActivityConfig.map((data) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    const isDataAvailable = cxoneCcActivity === null || cxoneCcActivity === void 0 ? void 0 : cxoneCcActivity.find((item) => {
                        return (item === null || item === void 0 ? void 0 : item.contactId) === (data === null || data === void 0 ? void 0 : data.ContactID);
                    });
                    if (!isDataAvailable) {
                        let searchConfig;
                        if (data === null || data === void 0 ? void 0 : data.request) {
                            searchConfig = (_a = data === null || data === void 0 ? void 0 : data.request) === null || _a === void 0 ? void 0 : _a.find((item) => { var _a, _b; return ((_a = item.workflowType) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = WorkflowTypes.SEARCH) === null || _b === void 0 ? void 0 : _b.toLowerCase()); });
                        }
                        else if (data === null || data === void 0 ? void 0 : data.searchWorkflow) {
                            searchConfig = data === null || data === void 0 ? void 0 : data.searchWorkflow[0][0];
                        }
                        let email = '';
                        let contactNumber = '';
                        const workflowInput = (_b = searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.workflowParam) === null || _b === void 0 ? void 0 : _b.workflowInput;
                        if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId) && activeContact.contactId && activeContact.channelName === 'Email') {
                            email =
                                (_e = (_d = (_c = digitalContactDetails[activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId][activeContact.contactId]) === null || _c === void 0 ? void 0 : _c.case) === null || _d === void 0 ? void 0 : _d.authorEndUserIdentity) === null || _e === void 0 ? void 0 : _e.idOnExternalPlatform;
                        }
                        else if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactMode) === '' &&
                            (activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId) &&
                            activeContact.contactId &&
                            activeContact.media === MediaType.DIGITAL) {
                            contactNumber =
                                (_h = (_g = (_f = digitalContactDetails[activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId][activeContact.contactId]) === null || _f === void 0 ? void 0 : _f.case) === null || _g === void 0 ? void 0 : _g.authorEndUserIdentity) === null || _h === void 0 ? void 0 : _h.idOnExternalPlatform;
                        }
                        else if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.VOICE || (activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.VOICEMAIL) {
                            contactNumber = activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactMode;
                        }
                        if (email || contactNumber) {
                            const checkIfApiInvoked = contactsActivityReceived.filter((item) => (item.email === email || item.phoneNumber === (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactMode)) &&
                                item.contactId === (data === null || data === void 0 ? void 0 : data.ContactID));
                            if (checkIfApiInvoked.length === 0) {
                                contactsActivityReceived.push({
                                    email: email,
                                    phoneNumber: contactNumber || '',
                                    interactionId: data === null || data === void 0 ? void 0 : data.interactionId,
                                    contactId: data === null || data === void 0 ? void 0 : data.ContactID,
                                });
                                (data === null || data === void 0 ? void 0 : data.ContactID) === (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId) &&
                                    dispatch(CcfCustomerCardActions.setActivityLoading(true));
                                const reqPayload = {
                                    workflowInput: Object.assign(Object.assign({}, (email !== '' && { email: email })), (contactNumber !== '' && { phoneNumber: contactNumber })),
                                    contactID: data === null || data === void 0 ? void 0 : data.ContactID,
                                    configurationId: (searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.configurationId) || '',
                                    workflowId: (searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.workflowId) || '',
                                    action: '',
                                    cacheKey: (searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.cacheKey) || '',
                                    customSearch: workflowInput || '',
                                    dynamicDataMappingId: (_j = searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.workflowParam) === null || _j === void 0 ? void 0 : _j.dynamicDataMappingId,
                                };
                                dispatch(fetchActivityData(reqPayload));
                            }
                        }
                    }
                });
            }
            else {
                dispatch(CcfCustomerCardActions.setActivityLoading(false));
            }
        }
        catch (err) {
            ccfLogger.error('getCXoneAuthSettings', JSON.stringify(err));
        }
    };
    /**
     * Function to initiate screen pop in CRM for single match record
     * @param activityData - activity data response received from the workflow
     * @example - initiateCrmScreenPop(agentWorkflowResponse);
     */
    const initiateCrmScreenPop = (activityData) => {
        var _a, _b;
        const userDetails = (_a = JSON.parse(localStorage.getItem(StorageKeys.USER_DETAILS) || '{}')) !== null && _a !== void 0 ? _a : {};
        const agentIntegrationsEnabled = (_b = userDetails === null || userDetails === void 0 ? void 0 : userDetails.customAttributes) === null || _b === void 0 ? void 0 : _b.agentIntegrations;
        // if agentIntegrationsEnabled is true then only we will perform screen pop
        if (agentIntegrationsEnabled === 'true') {
            triggerCRMScreenPop(activityData);
            dispatch(CcfCustomerCardActions.storeCustomEventFlag({
                contactId: activityData.contactId,
                isCustomEventReceived: false,
                isScreenPopInitiated: true,
            }));
        }
    };
    /**
     * Function to sort digital assignments
     * @param args - sorting criteria received from child
     * @example - sortDigitalAssignments(SortingParameters);
     */
    const sortDigitalAssignments = (args) => {
        setSortingParametersInLocalStorage(args);
        sortAssignmentInteractions();
    };
    /**
     * Function to sort digital assignments in given order
     * @param args - sorting criteria received as input
     * @example - orderDigitalAssignments(state,sortingCriteria);
     */
    const orderDigitalAssignments = (sortedInteractions, orderInteractions, sortCriteria) => {
        let interactions = [...orderInteractions];
        switch (sortCriteria === null || sortCriteria === void 0 ? void 0 : sortCriteria.sortingOrder) {
            case SortOrder.ASC: {
                interactions = sortDigitalAssignmentsAscending(interactions, sortCriteria === null || sortCriteria === void 0 ? void 0 : sortCriteria.sortingCriteria);
                break;
            }
            case SortOrder.DESC: {
                interactions = sortDigitalAssignmentsDescending(interactions, sortCriteria === null || sortCriteria === void 0 ? void 0 : sortCriteria.sortingCriteria);
                break;
            }
        }
        setSortedInteractions([...sortedInteractions, ...interactions]);
    };
    /**
     * Function to sort digital assignments in ascending order
     * @param args - sorting criteria received from child
     * @example - sortDigitalAssignmentsAscending(sortingCriteria);
     */
    const sortDigitalAssignmentsAscending = (sortInteractions, sortingCriteriaItem) => {
        let digitalContactAssignmentList = [...sortInteractions];
        switch (sortingCriteriaItem) {
            case SortingCriteria.CREATEDDATE: {
                digitalContactAssignmentList = digitalContactAssignmentList
                    .slice()
                    .sort((a, b) => getTime(a.interactionReceivedTime) - getTime(b.interactionReceivedTime));
                break;
            }
            case SortingCriteria.LASTUPDATED: {
                digitalContactAssignmentList = digitalContactAssignmentList
                    .slice()
                    .sort((a, b) => getTime(a.interactionUpdatedTime) - getTime(b.interactionUpdatedTime));
                break;
            }
        }
        return digitalContactAssignmentList;
    };
    /**
     * Function to sort digital assignments in ascending order
     * @param args - sorting criteria received from child
     * @example - sortDigitalAssignmentsDescending(sortingCriteria);
     */
    const sortDigitalAssignmentsDescending = (sortInteractions, sortingCriteriaItem) => {
        let digitalContactAssignmentList = [...sortInteractions];
        switch (sortingCriteriaItem) {
            case SortingCriteria.CREATEDDATE: {
                digitalContactAssignmentList = digitalContactAssignmentList
                    .slice()
                    .sort((a, b) => getTime(b.interactionReceivedTime) - getTime(a.interactionReceivedTime));
                break;
            }
            case SortingCriteria.LASTUPDATED: {
                digitalContactAssignmentList = digitalContactAssignmentList
                    .slice()
                    .sort((a, b) => getTime(b.interactionUpdatedTime) - getTime(a.interactionUpdatedTime));
                break;
            }
        }
        return digitalContactAssignmentList;
    };
    /**
     * Function to store and dispatch activity data after getnext event
     * @param data - data response received as part of custom getnext event
     * @example - onAgentWorkflowRequestEvent(data);
     */
    const onAgentWorkflowRequestEvent = (data) => {
        var _a;
        dispatch(CcfCustomerCardActions.setActivitySearchInformation(data));
        /**
         * storing/updating workflow configuration in localStorage, when new assignment receives
         */
        let storedActivityConfig = LocalStorageHelper.getItem(StorageKeys.CXONE_ACTIVITY_CONFIG, true);
        const isActivityStored = storedActivityConfig &&
            storedActivityConfig.length > 0 &&
            !((_a = storedActivityConfig.find((item) => (item === null || item === void 0 ? void 0 : item.ContactID) === data.ContactID)) === null || _a === void 0 ? void 0 : _a.contactId);
        if (isActivityStored && storedActivityConfig && storedActivityConfig.length > 0) {
            storedActivityConfig.push(data);
        }
        else {
            storedActivityConfig = [data];
        }
        LocalStorageHelper.setItem(StorageKeys.CXONE_ACTIVITY_CONFIG, storedActivityConfig);
        const agentWorkflowEventDetails = LocalStorageHelper.getItem(StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, true) || [];
        if (agentWorkflowEventDetails.length >= 0) {
            agentWorkflowEventDetails.push({
                contactId: data === null || data === void 0 ? void 0 : data.ContactID,
                isAgentWFConfigAvailable: true,
            });
        }
        LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, agentWorkflowEventDetails);
        dispatch(CcfCustomerCardActions.storeConfigforAgentWorkflow({
            contactId: data.ContactID,
            isConfigAvailable: true,
        }));
    };
    useEffect(() => {
        const acdSession = ACDSessionManager.instance;
        const agentWorkflowResponseSubscription = acdSession.agentWorkflowEvent.subscribe((data) => {
            var _a;
            const agentWorkflowResponse = updateAgentWorkflowResponseWithIcon(data);
            dispatch(CcfCustomerCardActions.setActivityInformation(agentWorkflowResponse));
            dispatch(CcfCustomerCardActions.storeCustomEventFlag({
                contactId: agentWorkflowResponse === null || agentWorkflowResponse === void 0 ? void 0 : agentWorkflowResponse.contactId,
                isCustomEventReceived: true,
                isScreenPopInitiated: false,
            }));
            dispatch(CcfCustomerCardActions.setPinRecords((_a = agentWorkflowResponse === null || agentWorkflowResponse === void 0 ? void 0 : agentWorkflowResponse.result) === null || _a === void 0 ? void 0 : _a.pinRecords));
            // Dev note: adding event data to local storage for custom event this will be used to check if screen pop is initiated or not
            const screenPopDetails = LocalStorageHelper.getItem(StorageKeys.CUSTOMEVENT_DATA, true) || [];
            screenPopDetails.push({
                contactId: agentWorkflowResponse === null || agentWorkflowResponse === void 0 ? void 0 : agentWorkflowResponse.contactId,
                isCustomEventReceived: true,
                isScreenPopInitiated: true,
            });
            LocalStorageHelper.setItem(StorageKeys.CUSTOMEVENT_DATA, screenPopDetails);
            initiateCrmScreenPop(agentWorkflowResponse);
            dispatch(CcfCustomerCardActions.storeConfigforWorkflowResponse({
                contactId: agentWorkflowResponse === null || agentWorkflowResponse === void 0 ? void 0 : agentWorkflowResponse.contactId,
                isConfigAvailable: true,
            }));
            const agentWorkflowEventDetails = LocalStorageHelper.getItem(StorageKeys.AGENT_WORKFLOW_EVENT, true) || [];
            if (agentWorkflowEventDetails.length >= 0) {
                agentWorkflowEventDetails.push({
                    contactId: agentWorkflowResponse === null || agentWorkflowResponse === void 0 ? void 0 : agentWorkflowResponse.contactId,
                    isConfigAvailable: true,
                });
            }
            LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_EVENT, agentWorkflowEventDetails);
        });
        const agentWorkflowRequestEventSubscription = acdSession.agentWorkflowRequestEvent.subscribe((data) => {
            onAgentWorkflowRequestEvent(data);
        });
        const subscriptionForAgentWorkflowCreatePayloadEvent = acdSession.agentWorkflowCreatePayloadEvent.subscribe((data) => {
            dispatch(CcfCustomerCardSlice.thunks.createEntity.handleEvent({ data }));
            dispatch(CcfCustomerCardSlice.thunks.createEntity.setPopoverList());
        });
        return () => {
            agentWorkflowResponseSubscription.unsubscribe();
            agentWorkflowRequestEventSubscription.unsubscribe();
            subscriptionForAgentWorkflowCreatePayloadEvent.unsubscribe();
        };
    }, []);
    /**
     * Use Effect to handle the screen pop incase of custom event not received
     */
    useEffect(() => {
        const isCustomEventAvailable = getStoredCustomEventData.find((item) => {
            return (item.contactId == (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId) ||
                item.contactId == (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId));
        });
        if (isCustomEventAvailable && !(isCustomEventAvailable === null || isCustomEventAvailable === void 0 ? void 0 : isCustomEventAvailable.isScreenPopInitiated)) {
            const agentWorkflowResponse = cxoneCcActivity.filter((item) => {
                if (item.contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId) ||
                    item.contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId)) {
                    return item;
                }
            });
            const screenPopDetails = LocalStorageHelper.getItem(StorageKeys.CUSTOMEVENT_DATA, true) || [];
            const isScreenPopDetails = screenPopDetails instanceof Array &&
                (screenPopDetails === null || screenPopDetails === void 0 ? void 0 : screenPopDetails.find((item) => {
                    return (item.contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId) ||
                        item.contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId));
                }));
            if (agentWorkflowResponse.length > 0 && !(isScreenPopDetails === null || isScreenPopDetails === void 0 ? void 0 : isScreenPopDetails.isScreenPopInitiated)) {
                dispatch(CcfCustomerCardActions.storeCustomEventFlag({
                    contactId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId,
                    isCustomEventReceived: true,
                    isScreenPopInitiated: true,
                }));
                if (screenPopDetails.length >= 0) {
                    screenPopDetails.push({
                        contactId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId,
                        isCustomEventReceived: true,
                        isScreenPopInitiated: true,
                    });
                }
                LocalStorageHelper.setItem(StorageKeys.CUSTOMEVENT_DATA, screenPopDetails);
                initiateCrmScreenPop(agentWorkflowResponse[0]);
            }
        }
    }, [getStoredCustomEventData, nonIncomingActiveContactInSelectedInteraction]);
    /**
     * Enables SDK user to auto accept the call in CXone Agent
     * @param event - input event with agentLegId
     * @example
     * ```
     * triggerAutoAccept(event);
     * ```
     */
    const triggerAutoAccept = (event) => {
        var _a;
        if ((event === null || event === void 0 ? void 0 : event.data['messageType']) === 'AutoAccept') {
            const agentLegId = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.agentLegId;
            if (agentLegId) {
                CXoneVoiceClientWrapper.instance.connectAgentLeg(agentLegId);
            }
        }
    };
    /**
     * Function to reset state for when a callback call is placed from a voicemail contact
     * @example updateVmCallbackIsSelected();
     */
    const updateVmCallbackIsSelected = () => {
        if (vmCallbackSelected
            && !(sortedInteractions === null || sortedInteractions === void 0 ? void 0 : sortedInteractions.find((interaction) => interaction.interactionType === InteractionType.VOICEMAIL))) {
            setVmCallbackSelected(false);
        }
    };
    useSyncLvInteractions();
    return (_jsx(Box, Object.assign({ component: "section", sx: assignmentClasses.container }, { children: _jsxs(Box, Object.assign({ component: "div", sx: isInboxCollapsed ? assignmentClasses.collapsedInbox : assignmentClasses.expandedInbox }, { children: [isInboxCollapsed ? (_jsxs(Box, Object.assign({ component: "div", "data-testid": "collapsed-popover-icon", sx: assignmentClasses.assignmentHeaderCollapsed }, { children: [_jsx(CcfTooltip, Object.assign({ "aria-label": expandAssignment, title: expandAssignment, arrow: true }, { children: _jsx(Box, Object.assign({ component: "div" }, { children: _jsx(CcfIconButton, Object.assign({ "data-testid": "expandIcon", disableRipple: true, "aria-label": translate('expandLabel'), sx: Object.assign(Object.assign({}, assignmentClasses === null || assignmentClasses === void 0 ? void 0 : assignmentClasses.focussedElement), { padding: 0 }), "aria-expanded": !isInboxCollapsed, onClick: () => toggleCollapse(false) }, { children: _jsx(CcfAssignmentCollapseIcon, { ref: expandIconRef, sx: assignmentClasses === null || assignmentClasses === void 0 ? void 0 : assignmentClasses.expandIcon }) })) })) })), isRequestInteractionEnabled && (_jsx(CcfTooltip, Object.assign({ "aria-label": translate('requestInteraction'), title: translate('requestInteraction'), arrow: true }, { children: _jsx(Box, Object.assign({ component: "div", sx: assignmentClasses.inboundOutbound, "data-testid": "requestInteraction", onClick: fetchInteraction, tabIndex: 0, onKeyUp: (e) => {
                                    if (e.key === 'Enter')
                                        fetchInteraction();
                                }, role: "button" }, { children: _jsx(CcfInboundAssignmentIcon, { "data-testid": "inboundAssignmentIcon", sx: assignmentClasses.inboundOutboundIconsModified, viewBox: "-2 0 24 24" }) })) }))), (isNewInteractionIconRequired || userHaveOBChannel) && (_jsx(CcfTooltip, Object.assign({ "aria-label": translate('newOutbound'), title: translate('newOutbound'), arrow: true }, { children: _jsx(Box, { children: _jsx(Box, Object.assign({ component: "div", sx: assignmentClasses.inboundOutbound, "data-testid": "newOutbound", onClick: outboundCallInitiate, tabIndex: 0, onKeyDown: (e) => {
                                        if (e.key === 'Enter')
                                            outboundCallInitiate();
                                    }, role: "button", id: "main-content" }, { children: _jsx(CcfOutboundAssignmentIcon, { "data-testid": "ccfOutboundAssignmentIcon", sx: assignmentClasses.newInboundOutboundIcons, viewBox: '0 0 24 24' }) })) }) }))), digitalContacts && digitalContacts.length > 1 && sortingCriteriaList.length && (_jsx(CcfSortItems, { anchorPosition: { top: 110, left: 65 }, sortItemTxt: translate('sortBy'), sortCriteriaList: sortingCriteriaList, defaultSortCriteria: sortingParameters.sortingCriteria, defaultSortOrder: sortingParameters.sortingOrder, paperStyles: {
                                xs: assignmentClasses.popOverCollapsed,
                                xl: assignmentClasses.popOverCollapsedNotSmView,
                            }, performSorting: sortDigitalAssignments }))] }))) : (_jsxs(Box, Object.assign({ component: "div", "data-testid": "expanded-interaction-icons", sx: assignmentClasses.assignmentHeaderExpanded }, { children: [_jsxs(Box, Object.assign({ sx: { display: 'flex' } }, { children: [isRequestInteractionEnabled && (_jsx(CcfTooltip, Object.assign({ "aria-label": translate('requestInteraction'), title: translate('requestInteraction'), arrow: true }, { children: _jsx(Box, Object.assign({ component: "div", sx: assignmentClasses.inboundOutbound, "data-testid": "requestInteraction", onClick: fetchInteraction, tabIndex: 0, onKeyUp: (e) => {
                                            if (e.key === 'Enter')
                                                fetchInteraction();
                                        }, role: "button" }, { children: _jsx(CcfInboundAssignmentIcon, { "data-testid": "inboundAssignmentIcon", sx: assignmentClasses.inboundOutboundIcons, viewBox: "0 1 23 20" }) })) }))), (isOutboundSkillsAssigned || userHaveOBChannel) && (_jsx(CcfTooltip, Object.assign({ "aria-label": translate('newOutbound'), title: translate('newOutbound'), arrow: true }, { children: _jsx(Box, { children: _jsx(Box, Object.assign({ component: "div", sx: assignmentClasses.inboundOutbound, "data-testid": "newOutbound", onClick: outboundCallInitiate, tabIndex: 0, onKeyDown: (e) => {
                                                if (e.key === 'Enter')
                                                    outboundCallInitiate();
                                            }, role: "button", id: "main-content", "aria-label": translate('newOutbound') }, { children: _jsx(CcfOutboundAssignmentIcon, { "data-testid": "ccfOutboundAssignmentIcon", sx: assignmentClasses.inboundOutboundIcons, viewBox: "0 0 24 24" }) })) }) }))), digitalContacts && digitalContacts.length > 1 && (_jsx(CcfSortItems, { anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }, sortItemTxt: translate('sortBy'), sortCriteriaList: sortingCriteriaList, defaultSortCriteria: sortingParameters.sortingCriteria, defaultSortOrder: sortingParameters.sortingOrder, paperStyles: isInboxCollapsed ? assignmentClasses.popOverCollapsed : assignmentClasses.popOver, performSorting: sortDigitalAssignments }))] })), ((!isSmView && !(assignmentMetadata.voiceInteractionId || assignmentMetadata.voiceMailInteractionId)) ||
                            isSmView) && (_jsx(CcfTooltip, Object.assign({ "aria-label": collapseAssignment, title: collapseAssignment, arrow: true }, { children: _jsx(Box, Object.assign({ id: "main-content-collapseIcon" }, { children: _jsx(CcfIconButton, Object.assign({ "data-testid": "collapseIcon", disableRipple: true, "aria-label": translate('collapseLabel'), sx: Object.assign(Object.assign({}, assignmentClasses === null || assignmentClasses === void 0 ? void 0 : assignmentClasses.focussedElement), { padding: 0 }), "aria-expanded": !isInboxCollapsed, onClick: () => toggleCollapse(true) }, { children: _jsx(CcfAssignmentCollapseIcon, { ref: collapseIconRef, sx: assignmentClasses === null || assignmentClasses === void 0 ? void 0 : assignmentClasses.collapseIcon }) })) })) })))] }))), _jsx(Box, Object.assign({ component: "div", id: "upArrow", sx: [assignmentClasses.iconUpArrowContainer, assignmentClasses.ovrflowUpArrow] }, { children: _jsx(CcfSeeMoreIcon, { sx: assignmentClasses.svgIcon }) })), _jsx(Box, Object.assign({ component: "div", ref: cardsDivRef, "data-testid": "scroll-container", onScroll: handleScroll, sx: [
                        assignmentClasses.cardsContainer,
                        isInboxCollapsed ? assignmentClasses.cardContainerCollpased : assignmentClasses.cardContainerExpanded
                    ], className: `${scrollAutoHeight}
            ${digitalContacts && digitalContacts.length > 1 && 'isSortIconPresent'}`, style: {
                        display: (sortedInteractions === null || sortedInteractions === void 0 ? void 0 : sortedInteractions.length) || (personalQueue === null || personalQueue === void 0 ? void 0 : personalQueue.length) || !!scheduledContact ? 'block' : '',
                    } }, { children: sortedInteractions.length > 0 || personalQueue.length > 0 || !!scheduledContact ? (_jsxs(_Fragment, { children: [!!scheduledContact && !isSmView && (_jsx(CcfInteraction, { ref: (el) => ((interactionRefs === null || interactionRefs === void 0 ? void 0 : interactionRefs.current) && (interactionRefs.current = el)), interaction: {
                                    interactionId: scheduledContact.contactId,
                                    interactionType: InteractionType.VOICE,
                                    selectedContactId: '',
                                    slaIndicator: SLAIndicatorType.NORMAL,
                                    interactionReceivedTime: '',
                                    interactionUpdatedTime: '',
                                    digitalContacts: {},
                                    acdContacts: {
                                        [scheduledContact.contactId]: Object.assign({}, scheduledContact),
                                    },
                                } }, scheduledContact.contactId)), personalQueue.map((card, index) => {
                                const interaction = {
                                    interactionId: card.contactId,
                                    interactionType: InteractionType.PERSONALQUEUE,
                                    selectedContactId: card.contactId,
                                    slaIndicator: SLAIndicatorType.NORMAL,
                                    interactionReceivedTime: card.lastUpdateTime.toString(),
                                    interactionUpdatedTime: card.lastUpdateTime.toString(),
                                    acdContacts: {},
                                    digitalContacts: {},
                                    queueDetails: card,
                                };
                                return _jsx(CcfInteraction, { ref: (el) => ((interactionRefs === null || interactionRefs === void 0 ? void 0 : interactionRefs.current) && (interactionRefs.current[index] = el)), interaction: interaction }, card === null || card === void 0 ? void 0 : card.contactId);
                            }), sortedInteractions === null || sortedInteractions === void 0 ? void 0 : sortedInteractions.map((interaction, index) => (_jsx(CcfInteraction, { ref: (el) => ((interactionRefs === null || interactionRefs === void 0 ? void 0 : interactionRefs.current) && (interactionRefs.current[index] = el)), interaction: interaction }, interaction.interactionId)))] })) : (_jsx(Box, Object.assign({ component: "div", "data-testid": "no-active-interactions", sx: isInboxCollapsed
                            ? assignmentClasses.noAssignmentDivCollapsed
                            : assignmentClasses.noAssignmentDivExpanded }, { children: isInboxCollapsed ? (_jsx(CcfTooltip, Object.assign({ title: translate('noAssignments'), arrow: true }, { children: _jsx("div", { children: _jsx(CcfNoAssignmentIcon, {}) }) }))) : (_jsxs(_Fragment, { children: [_jsx(CcfTooltip, Object.assign({ title: translate('noAssignments'), arrow: true }, { children: _jsx("div", { children: _jsx(CcfNoAssignmentIcon, {}) }) })), _jsx(CcfTypography, Object.assign({ variant: "inherit", sx: [assignmentClasses.noAssignmentTextCommon, assignmentClasses.noAssignmentExpanded] }, { children: translate('noAssignments') }))] })) }))) })), _jsx(Box, Object.assign({ component: "div", id: "downArrow", sx: [assignmentClasses.iconDownArrowContainer, assignmentClasses.ovrflowDownArrow] }, { children: _jsx(CcfSeeMoreIcon, { sx: assignmentClasses.svgIcon }) }))] })) })));
}
export default memo(CcfContactAssignment);
//# sourceMappingURL=ccf-contact-assignment.js.map