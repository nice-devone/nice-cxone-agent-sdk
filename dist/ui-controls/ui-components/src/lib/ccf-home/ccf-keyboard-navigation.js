import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo } from 'react';
import { Navigation } from '../../enums/navigation-menus';
import { getAppSpaceMoreMenuStatus, getMoreMenuStatus, getPanelAppNavigationItems, getQuickAppNavigationItems, globalActions, updateExternalProdURL } from '../global.app.slice';
import { updateAppSpaceTabStatus } from '../ccf-app-space/ccf-app-space.slice';
import { CcfAssignmentAction, getActiveContactInSelectedInteraction, selectUserInConference, selectUserInConsult, voiceContactSelector, getNonIncomingActiveContactInSelectedInteraction } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getActiveContactScreenPop } from '../ccf-screen-pop/ccf-screen-pop.slice';
import { endTheVoiceContact, holdVoiceContact, maskVoiceContact, muteVoiceContact, recordVoiceContact } from '../ccf-voice-contact/ccf-voice-contact-methods';
import { AgentLegStatus, contactButtons } from '@nice-devone/common-sdk';
import { dispositionInteractionActions } from '../ccf-disposition/ccf-disposition-slice';
import { agentStateActions, connectAgentLeg, agentLegConnectionStatus } from '../ccf-agent-state/ccf-agent-state.slice';
import { agentWemNotificationsActions } from '../ccf-agent-notification/ccf-agent-notification.slice';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { isCopilotEnabledForContact } from '../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
import { toast } from 'react-toastify';
import { CcfTypography } from '@nice-devone/ui-controls';
/**
 * Handles Keyboard Navigation for CXA
 * @param props - CcfKeyboardNavigationProps
 * @example - CcfKeyboardNavigation(props)
 */
export function CcfKeyboardNavigation(props) {
    const { appHelpUrl } = props;
    const dispatch = useDispatch();
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const userInConsult = useSelector(selectUserInConsult);
    const usersInConference = useSelector(selectUserInConference);
    const screenPops = useSelector(getActiveContactScreenPop);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const hasCaseIdOrContactId = useMemo(() => activeContactInSelectedInteraction && (activeContactInSelectedInteraction.caseId || activeContactInSelectedInteraction.contactId), [activeContactInSelectedInteraction]);
    const quickAppNavigationItemsLS = useSelector(getQuickAppNavigationItems);
    const navigationItemLS = useSelector(getPanelAppNavigationItems);
    const voiceContact = useSelector(voiceContactSelector);
    const openMoreMenu = useSelector(getMoreMenuStatus);
    const openAppSpaceMoreMenu = useSelector(getAppSpaceMoreMenuStatus);
    const agentLegConnectedStatus = useSelector(agentLegConnectionStatus);
    const { copilotEnabled } = useSelector(isCopilotEnabledForContact);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const helpUrl = appHelpUrl || '';
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    /**
     * handles Keyboard Event
     * @param event - any
     * @example - handleKeyboardNavigation(event)
     */
    const handleKeyboardNavigation = (event) => {
        /**
       * Change the selected menu in the global state
       * @param navItem - Navigation
       * @example - changeSelectedMenu(Navigation.CALENDAR)
       */
        const changeSelectedMenu = (navItem) => {
            const menu = quickAppNavigationItemsLS.find((item) => item.menuName === navItem);
            if (menu && menu.isActive) {
                dispatch(globalActions.setSelectedMenu({ name: navItem }));
                updateExternalProdURL(null, navItem, null);
            }
        };
        /**
       * Change the AppSpace Tab in the global state
       * @param navItem - Navigation
       * @example - changeAppSpaceTab(Navigation.CALENDAR)
       */
        const changeAppSpaceTab = (navItem) => {
            const menu = navigationItemLS.find((item) => item.menuName === navItem);
            if (menu && menu.isActive) {
                dispatch(updateAppSpaceTabStatus({ index: navItem, tab: navItem }));
                updateExternalProdURL(null, navItem, null);
            }
        };
        /**
         * Handles recording control with error handling
         * @param voiceContact - The voice contact instance
         * @example
         * ```
         * handleRecordControl(voiceContact)
         * ```
         */
        const handleRecordControl = (voiceContact) => __awaiter(this, void 0, void 0, function* () {
            const resultAction = yield dispatch(recordVoiceContact(voiceContact));
            if (recordVoiceContact.rejected.match(resultAction)) {
                toast.error(_jsx(CcfTypography, { translationKey: "stopRecordingError" }), {
                    autoClose: 2000,
                    containerId: 'AppToastContainer',
                });
            }
        });
        /**
       * Perform contact buttons action
       * @param control - contactButtons
       * @example -   controlClicked('hold')
       */
        const controlClicked = (control) => {
            if (voiceContact) {
                switch (control) {
                    case contactButtons.keypad:
                        dispatch(CcfAssignmentAction.toggleIVRKeyPad(true));
                        break;
                    case contactButtons.hold:
                        dispatch(holdVoiceContact(voiceContact));
                        break;
                    case contactButtons.mute:
                        dispatch(muteVoiceContact(voiceContact));
                        break;
                    case contactButtons.mask:
                        dispatch(maskVoiceContact(voiceContact));
                        break;
                    case contactButtons.record:
                        handleRecordControl(voiceContact);
                        break;
                    case 'back':
                        dispatch(CcfAssignmentAction.toggleIVRKeyPad(false));
                        break;
                    case contactButtons.hungup:
                        if (!(userInConsult || usersInConference.length > 1)) {
                            dispatch(endTheVoiceContact(voiceContact));
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        /**
       * Handle Keyboard Navigation using Control+Shift+Key
       * @param keyValue - string
       * @example handleControlShiftKey('KeyH')
       */
        const handleControlShiftKey = (event) => {
            switch (event.code) {
                case 'Digit2':
                case 'Numpad2':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideWEM)) && changeSelectedMenu(Navigation.WEM);
                    break;
                case 'KeyF':
                    event.preventDefault();
                    (screenPops.length && hasCaseIdOrContactId) && isSmView && changeSelectedMenu(Navigation.SCREEN_POP);
                    break;
                case 'KeyH':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideContactHistory)) && changeSelectedMenu(Navigation.CONTACTHISTORY);
                    break;
                case 'KeyK':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideCustomWorkspace)) && changeSelectedMenu(Navigation.CUSTOMWORKSPACE);
                    break;
                case 'Digit6':
                case 'Numpad6':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideLaunch)) && dispatch(globalActions.focusLaunchButton(true));
                    break;
                case 'KeyQ':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideQueueCounter)) && changeSelectedMenu(Navigation.QUEUE);
                    break;
                case 'Digit1':
                case 'Numpad1':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSearch)) && changeSelectedMenu(Navigation.SEARCH);
                    break;
                case 'KeyU':
                    event.preventDefault();
                    isSmView && changeSelectedMenu(Navigation.CUSTOMERCARD);
                    break;
                case 'KeyV':
                    event.preventDefault();
                    (userInConsult || usersInConference.length > 1) && isSmView && changeSelectedMenu(Navigation.CONFERENCE);
                    break;
                case 'KeyX':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSchedule)) && changeSelectedMenu(Navigation.CALENDAR);
                    break;
                case 'KeyY':
                    event.preventDefault();
                    copilotEnabled && isSmView && changeSelectedMenu(Navigation.COPILOT);
                    break;
                case 'KeyZ':
                    event.preventDefault();
                    changeSelectedMenu(Navigation.DIRECTORY);
                    break;
                case 'Digit3':
                case 'Numpad3':
                    event.preventDefault();
                    isSmView && changeSelectedMenu(Navigation.QUICK_REPLY);
                    break;
                case 'Digit4':
                case 'Numpad4':
                    event.preventDefault();
                    changeSelectedMenu(Navigation.SETTINGS);
                    break;
                case 'Digit5':
                case 'Numpad5':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideReporting)) && changeSelectedMenu(Navigation.REPORTING);
                    break;
                case 'KeyM':
                    event.preventDefault();
                    dispatch(globalActions.openAppSpaceMoreMenu(true));
                    break;
                default:
                    break;
            }
        };
        /**
       * Handle Keyboard Navigation using Control+Alt+Key
       * @param keyValue - string
       * @example handleControlAltKey('KeyH')
       */
        const handleControlAltKey = (event) => {
            switch (event.code) {
                case 'Digit2':
                case 'Numpad2':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideWEM)) && changeAppSpaceTab(Navigation.WEM);
                    break;
                case 'KeyF':
                    event.preventDefault();
                    (screenPops.length && hasCaseIdOrContactId) && changeAppSpaceTab(Navigation.SCREEN_POP);
                    break;
                case 'KeyH':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideContactHistory)) && changeAppSpaceTab(Navigation.CONTACTHISTORY);
                    break;
                case 'KeyK':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideCustomWorkspace)) && changeAppSpaceTab(Navigation.CUSTOMWORKSPACE);
                    break;
                case 'KeyQ':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideQueueCounter)) && changeAppSpaceTab(Navigation.QUEUE);
                    break;
                case 'Digit1':
                case 'Numpad1':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSearch)) && changeAppSpaceTab(Navigation.SEARCH);
                    break;
                case 'KeyU':
                    event.preventDefault();
                    changeAppSpaceTab(Navigation.CUSTOMERCARD);
                    break;
                case 'KeyV':
                    event.preventDefault();
                    (userInConsult || usersInConference.length > 1) && changeAppSpaceTab(Navigation.CONFERENCE);
                    break;
                case 'KeyX':
                    event.preventDefault();
                    (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSchedule)) && changeAppSpaceTab(Navigation.CALENDAR);
                    break;
                case 'KeyY':
                    event.preventDefault();
                    copilotEnabled && changeAppSpaceTab(Navigation.COPILOT);
                    break;
                case 'KeyZ':
                    event.preventDefault();
                    changeAppSpaceTab(Navigation.DIRECTORY);
                    break;
                case 'Digit3':
                case 'Numpad3':
                    event.preventDefault();
                    changeAppSpaceTab(Navigation.QUICK_REPLY);
                    break;
                case 'KeyI':
                    event.preventDefault();
                    dispatch(CcfAssignmentAction.setInteractionKeyboardNavKeyPressed(true));
                    break;
                case 'KeyA':
                    event.preventDefault();
                    dispatch(CcfAssignmentAction.setInteractionAcceptKeyPressed(true));
                    break;
                case 'KeyR':
                    event.preventDefault();
                    dispatch(CcfAssignmentAction.setInteractionRejectKeyPressed(true));
                    break;
                case 'KeyD':
                    event.preventDefault();
                    if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) || (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId))
                        dispatch(dispositionInteractionActions.displayDispositionCard(true));
                    break;
                case 'KeyO':
                    event.preventDefault();
                    dispatch(agentStateActions.focusAgentState(true));
                    break;
                case 'KeyC':
                    event.preventDefault();
                    if (agentLegConnectedStatus.status === AgentLegStatus.DISCONNECTED)
                        dispatch(connectAgentLeg());
                    break;
                case 'KeyN':
                    event.preventDefault();
                    dispatch(agentWemNotificationsActions.focusNotification(true));
                    break;
                default:
                    break;
            }
        };
        /**
       * Handle Keyboard Navigation using Control Key
       * @param keyValue - string
       * @example handleControlKey('KeyH')
       */
        const handleControlKey = (event) => {
            switch (event.code) {
                case 'KeyM':
                    event.preventDefault();
                    dispatch(globalActions.openMoreMenu(true));
                    break;
                case 'F2':
                    event.preventDefault();
                    window.open(helpUrl, '_blank', 'noopener noreferrer');
                    break;
                default:
                    break;
            }
        };
        /**
       * Handle Keyboard Navigation using Alt+Key
       * @param keyValue - string
       * @example handleAltKey('KeyH')
       */
        const handleAltKey = (event) => {
            switch (event.code) {
                case 'KeyH':
                    event.preventDefault();
                    controlClicked(contactButtons.hold);
                    break;
                case 'KeyM':
                    event.preventDefault();
                    controlClicked(contactButtons.mute);
                    break;
                case 'KeyN':
                    event.preventDefault();
                    controlClicked(contactButtons.mask);
                    break;
                case 'KeyR':
                    event.preventDefault();
                    controlClicked(contactButtons.record);
                    break;
                case 'KeyK':
                    event.preventDefault();
                    controlClicked(contactButtons.keypad);
                    break;
                case 'KeyL':
                    event.preventDefault();
                    controlClicked('back');
                    break;
                case 'KeyT':
                    event.preventDefault();
                    dispatch(globalActions.focusTopNavBar(true));
                    break;
                case 'Backslash':
                case 'IntlBackslash':
                    event.preventDefault();
                    controlClicked(contactButtons.hungup);
                    break;
                default:
                    break;
            }
        };
        if (event.ctrlKey) {
            if (event.shiftKey) {
                handleControlShiftKey(event);
            }
            else if (event.altKey) {
                handleControlAltKey(event);
            }
            else {
                handleControlKey(event);
            }
        }
        else if (event.altKey) {
            handleAltKey(event);
        }
    };
    const handleKeyPress = useCallback((event) => {
        return handleKeyboardNavigation(event);
    }, [quickAppNavigationItemsLS, navigationItemLS, userInConsult, usersInConference, screenPops, hasCaseIdOrContactId, voiceContact, nonIncomingActiveContactInSelectedInteraction, openMoreMenu, openAppSpaceMoreMenu, agentLegConnectedStatus, isSmView, copilotEnabled, agentProfileSettings]);
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);
    return (_jsx(Box, {}));
}
export default CcfKeyboardNavigation;
//# sourceMappingURL=ccf-keyboard-navigation.js.map