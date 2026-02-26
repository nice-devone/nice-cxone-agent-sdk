import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, MenuItem, Select, useTheme, } from '@mui/material';
import { CcfAgentIcon, CcfButton, CcfFavouriteIcon, CcfTooltip, CcfTransferArrowsIcon, CcfTypography, CCfToggleIconButton, getUnifiedStatusIcon, useTranslator, withHover, CcfAppToastMessage, CcfUnfavoredIcon, } from '@nice-devone/ui-controls';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agentDirectoryActions, AgentStatus, DirectoryDropdownValues, DirectoryUserAgentStates, selectAgentSkills, selectDropDownQueryValue, toggleFavoriteForSingleAgent, toggleFavoriteForMultipleAgents, getCurrentFavsInDirectory, getFavoritesToastReference, } from '../+state/ccf-directory.slice';
import { dialCallAndColdTransfer, transferDigitalContact, transferVoicemail, callConferenceActions, holdCall, transferWorkItem, conferenceNo, } from '../../ccf-call-conference/ccf-call-conference.slice';
import { voiceContactSelector, voiceMailContactSelector, workItemContactSelector, selectUserInConference, selectUserInConsult, getActiveContactInSelectedInteraction, getNonIncomingActiveContactInSelectedInteraction, getActiveVoiceContact } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getStateName, getStatusIcon, getUnifiedStateName } from '../ccf-directory-utils';
import ccfDirectoryStyles from '../ccf-directory.styles';
import { MediaType, VoiceContactStatus } from '@nice-devone/common-sdk';
import { getPanelAppNavigationItems } from '../../global.app.slice';
import { selectMaxConference } from '../../ccf-acd-session/ccf-acd-session.slice';
import { getTitleForDialAgent, getIconForDialAgent, holdAndAddAgentToConsult } from '../ccf-directory-item/ccf-directory-item-user-section';
import { useThrottleClick } from '../../../hooks/useThrottleClick';
import { isFeatureEnabled } from '../../../util/featureToggleUtils';
import { UnifiedDirectoryAgentStates, FeatureToggleService } from '@nice-devone/agent-sdk';
import { toast } from 'react-toastify';
import { getFavoritesStatesToastReference } from '../../ccf-agent-state/ccf-agent-state.slice';
import { getAgentProfileSettings } from '../../ccf-agent-setting/ccf-agent-setting-slice';
const TIMER_DELAY = 2000;
const DIRECTORY_MAX_FAVS_ALLOWED = 25;
/**
 * renders the select skills dropdown
 * @param props - AgentSkillSetArr
 * @example agentMultiSkillHoverDropDownView
 * @returns
 */
const agentMultiSkillHoverDropDownView = (data, updatedeboucedHover, customStyle, translate) => {
    var _a;
    return (_jsxs(Box, Object.assign({ width: '100%' }, { children: [_jsx(Select, Object.assign({ sx: customStyle.skillSelect, fullWidth: true, defaultValue: (_a = data[0]) === null || _a === void 0 ? void 0 : _a.skillName }, { children: data && data.map((item) => (_jsxs(MenuItem, Object.assign({ sx: { padding: '3%' }, value: item.skillName }, { children: [" ", item.skillName] }), item.skillName))) })), _jsxs(Box, Object.assign({ display: 'flex', padding: '5px', justifyContent: 'flex-end' }, { children: [_jsx(CcfButton, Object.assign({ style: { padding: '2px' }, onClick: () => {
                            updatedeboucedHover(false);
                        } }, { children: translate('cancel') })), _jsx(CcfButton, Object.assign({ primary: true, sx: { marginLeft: '5px' } }, { children: translate('call') }))] }))] })));
};
/**
 * Component to be used for directory item
 * @param props - Agent
 * @example <CcfDirectoryAgent />
 * @returns
 */
const CcfDirectoryAgent = (props) => {
    var _a;
    const theme = useTheme();
    const { user, isHovering, isFullView, onMouseEnter, onMouseOut } = props;
    const [toggleCall, setToggleCall] = useState(false);
    const [_deboucedHover, updatedeboucedHover] = useState(false);
    const voiceContact = useSelector(voiceContactSelector);
    const voiceMailContact = useSelector(voiceMailContactSelector);
    const workItemContact = useSelector(workItemContactSelector);
    const [translate] = useTranslator();
    const multipleSkillRes = useSelector(selectAgentSkills);
    const dispatch = useDispatch();
    const directoryStyles = ccfDirectoryStyles(theme);
    const [agentMultiSkillFlg, setAgentMultiSkillFlg] = useState(false);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const selectedQueryValue = useSelector(selectDropDownQueryValue);
    const userInConsult = useSelector(selectUserInConsult);
    const usersInConference = useSelector(selectUserInConference);
    const maxConference = useSelector(selectMaxConference);
    const isMaxContactsInConference = usersInConference && (usersInConference.length === maxConference);
    const isAgentInConference = usersInConference && usersInConference.length > 1;
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const currentConferenceNo = useSelector(conferenceNo);
    const activeVoiceContact = useSelector(getActiveVoiceContact);
    const currentFavsInDirectory = useSelector(getCurrentFavsInDirectory);
    const favoritesToastReference = useSelector(getFavoritesToastReference);
    const appToastContainer = useRef();
    const favoritesToastReferenceFortState = useSelector(getFavoritesStatesToastReference);
    const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
    const isDigitalWorkingStateFeatureToggleEnabled = isFeatureEnabled("release-cx-directory-agent-state-working-digital-AW-28472" /* FeatureToggles.DIRECTORY_AGENT_STATE_WORKING_DIGITAL_FEATURE_TOGGLE */);
    const noConsultAgentStates = [
        DirectoryUserAgentStates.InboundContact,
        DirectoryUserAgentStates.OutboundContact,
        DirectoryUserAgentStates.InboundConsult,
        DirectoryUserAgentStates.OutboundConsult,
        DirectoryUserAgentStates.LoggedOut
    ];
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const isTargetAgentInACW = user.skillName && (isDigitalWorkingStateFeatureToggleEnabled
        ? (user === null || user === void 0 ? void 0 : user.agentStateName) === UnifiedDirectoryAgentStates.AGENT_STATE_UNAVAILABLE
        : user.agentStateName === DirectoryUserAgentStates.Unavailable);
    const showDialAgentButton = isDigitalWorkingStateFeatureToggleEnabled
        ? ((user === null || user === void 0 ? void 0 : user.canDialAgent) || !((user === null || user === void 0 ? void 0 : user.agentStateName) === UnifiedDirectoryAgentStates.AGENT_STATE_WORKING_CONTACTS || (user === null || user === void 0 ? void 0 : user.agentStateName) === UnifiedDirectoryAgentStates.AGENT_STATE_ENDED)) && !isTargetAgentInACW
        : !noConsultAgentStates.includes(user.agentStateName) && !isTargetAgentInACW;
    const showTransferAgentButton = isDigitalWorkingStateFeatureToggleEnabled
        ? (user === null || user === void 0 ? void 0 : user.agentStateName) !== UnifiedDirectoryAgentStates.AGENT_STATE_ENDED
        : user.agentStateName !== DirectoryUserAgentStates.LoggedOut;
    const styles = {
        displayFlex: 'flex',
        flexDirection: 'row',
        paddingX: 1.5,
        paddingY: 1,
        padding: 1.5,
        boxMaxWidth: '100%',
        alignItemsCenter: 'center',
        justifyContentStart: 'flex-start',
        justifyContentBetween: 'space-between',
        size: 'small',
        iconSize: 'small',
    };
    useEffect(() => {
        const timeout = setTimeout(() => updatedeboucedHover(() => isHovering), 1000);
        return () => {
            updatedeboucedHover(() => false);
            setAgentMultiSkillFlg(() => false);
            setToggleCall(false);
            dispatch(agentDirectoryActions.updateAgentMultiSkillFlag(false));
            return clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHovering]);
    useEffect(() => {
        if (multipleSkillRes !== undefined) {
            setAgentMultiSkillFlg(multipleSkillRes.agentHasMultipleSkillsFlg);
        }
    }, [multipleSkillRes]);
    /**
     * Function to add agent to consult
     * @param user - Agent
     * @example addAgentToConsult(user)
     */
    const addAgentToConsult = (agent) => {
        holdAndAddAgentToConsult(agent, isAgentInConference, currentConferenceNo, voiceContact, dispatch);
    };
    /**
     * Function to dial a call to an Agent
     * @param user - Agent
     * @example dialAnAgent(user)
     */
    const dialAnAgent = useThrottleClick((agent) => {
        let activeContact = nonIncomingActiveContactInSelectedInteraction;
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.elevatedFrom) && props.transferContactType === MediaType.VOICE) {
            if (activeVoiceContact && activeVoiceContact.interactionId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId)) {
                activeContact = activeVoiceContact;
            }
        }
        const activeContactId = String(activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId);
        if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.DIGITAL) {
            dispatch(transferDigitalContact({ contactId: activeContactId, cxoneUserId: agent.userId, navPanelItems: panelAppNavigationItems }));
        }
        else if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.VOICEMAIL) {
            dispatch(transferVoicemail({ voiceMailContact, agent }));
        }
        else if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.WORKITEM) {
            dispatch(transferWorkItem({ workItemContact, agent }));
        }
        else if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status.toLowerCase()) === VoiceContactStatus.ACTIVE) {
            //This flag is required to know if we pressed cold transfer button in middleware while reading from get next
            dispatch(callConferenceActions.coldTransferredBtnClicked({ isColdTransferClicked: true, agent: agent }));
            dispatch(holdCall({ voiceContact, agent }));
        }
        else if (voiceContact.status.toLowerCase() === VoiceContactStatus.HOLDING) {
            dispatch(dialCallAndColdTransfer({ voiceContact, agent }));
        }
    }, TIMER_DELAY);
    const fontSizes = {
        small: 'small',
        smaller: 'smaller',
    };
    /**
     * Function to toggle favorite option for selected Agent
     * @param user - Agent
     * @example toggleFavorite(user)
     */
    const toggleFavorite = (agent) => {
        var _a;
        if (isFavoritesFTEnabled) {
            const totalFavoritesCount = Object.values(currentFavsInDirectory).reduce((sumOfFavs, favsArray) => sumOfFavs + ((favsArray === null || favsArray === void 0 ? void 0 : favsArray.length) || 0), 0);
            if (totalFavoritesCount >= DIRECTORY_MAX_FAVS_ALLOWED && !((_a = currentFavsInDirectory === null || currentFavsInDirectory === void 0 ? void 0 : currentFavsInDirectory.agents) === null || _a === void 0 ? void 0 : _a.includes(agent === null || agent === void 0 ? void 0 : agent.agentId))) {
                favoritesToastReference && toast.dismiss(favoritesToastReference);
                favoritesToastReferenceFortState && toast.dismiss(favoritesToastReferenceFortState);
                appToastContainer.current = toast.error(_jsx(CcfAppToastMessage, { type: "any", messageKey: 'favsLimitExceeded', extraArgs: { format: [DIRECTORY_MAX_FAVS_ALLOWED || ''] } }), {
                    autoClose: false,
                    closeOnClick: true,
                    position: 'top-center',
                    containerId: 'AppToastContainer',
                });
                dispatch(agentDirectoryActions.updateFavsToastReference(appToastContainer.current));
            }
            else {
                dispatch(toggleFavoriteForMultipleAgents({ agent: [agent] }));
            }
        }
        else {
            dispatch(toggleFavoriteForSingleAgent(agent));
        }
    };
    /**
     * Function to narrate favorite option for selected Agent
     * @example narrationForFavorite()
     */
    const narrationForFavorite = () => {
        const agentFullName = `${user === null || user === void 0 ? void 0 : user.firstName} ${user === null || user === void 0 ? void 0 : user.lastName}`;
        return (user === null || user === void 0 ? void 0 : user.isFavorite) ? `${translate('remove')} ${agentFullName} ${translate('agentLabel')} ${translate('from')} ${translate('favorites')}` : `${translate('add')} ${agentFullName} ${translate('agentLabel')} ${translate('to')} ${translate('favorites')}`;
    };
    return (_jsxs(Box, Object.assign({ component: 'li', sx: directoryStyles.directoryItemElement, onMouseEnter: onMouseEnter, onMouseLeave: onMouseOut, onClick: () => {
            props.click(user);
        }, "data-testid": "with-hover", tabIndex: 0, onKeyDown: onMouseEnter }, { children: [_jsxs(Box, Object.assign({ sx: directoryStyles.directoryUser }, { children: [_jsx(CcfAgentIcon, {}), _jsx(CcfTypography, Object.assign({ sx: isFullView
                            ? [directoryStyles.ellipsisWithTooltip, directoryStyles.fullViewText]
                            : [directoryStyles.directoryUserNameLabel, directoryStyles.ellipsisWithTooltip], title: `${user === null || user === void 0 ? void 0 : user.firstName} ${user === null || user === void 0 ? void 0 : user.lastName}` }, { children: `${user === null || user === void 0 ? void 0 : user.firstName} ${user === null || user === void 0 ? void 0 : user.lastName}` })), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryFavorites) && _jsx(CcfTooltip, Object.assign({ title: translate('favorites'), arrow: true }, { children: _jsx("div", Object.assign({ role: 'presentation', "aria-hidden": 'true' }, { children: selectedQueryValue !== DirectoryDropdownValues.TeamList && (_jsx(CCfToggleIconButton, { sx: [directoryStyles.hoverDisabledButton, directoryStyles.focussedElement], icon: _jsx(CcfFavouriteIcon, { id: 'dirAgentavoriteIcon', htmlColor: (_a = theme.palette.digitalStatus) === null || _a === void 0 ? void 0 : _a.openDark }), isToggled: user === null || user === void 0 ? void 0 : user.isFavorite, disableRipple: true, disableFocusRipple: true, disableTouchRipple: true, size: fontSizes.small, toggleIcon: _jsx(CcfUnfavoredIcon, { id: 'dirAgentToggleFavoriteIcon' }), onClick: () => toggleFavorite(user), tabIndex: 0, "data-testid": "favorite-toggle", onKeyDown: (e) => { if (e.key === 'Enter')
                                    toggleFavorite(user); }, "aria-label": narrationForFavorite() })) })) }))] })), _jsxs(Box, Object.assign({ sx: !isFullView
                    ? directoryStyles.directoryItemUserStatus
                    : directoryStyles.fullDirectoryItemUserStatus }, { children: [_jsxs(Box, Object.assign({ display: styles.displayFlex, alignItems: styles.alignItemsCenter, minHeight: 40, marginBottom: '2px' }, { children: [isDigitalWorkingStateFeatureToggleEnabled ? getUnifiedStatusIcon(user === null || user === void 0 ? void 0 : user.agentStateName, directoryStyles.icon) : getStatusIcon(user === null || user === void 0 ? void 0 : user.agentStateName, directoryStyles.icon), _jsx(CcfTypography, Object.assign({ noWrap: true, sx: isFullView ? directoryStyles.fullViewSecondoryText : directoryStyles.statusText }, { children: isDigitalWorkingStateFeatureToggleEnabled ? getUnifiedStateName(user === null || user === void 0 ? void 0 : user.agentStateName, translate) : getStateName(user === null || user === void 0 ? void 0 : user.agentStateName, translate) }))] })), _jsx(Box, Object.assign({ sx: directoryStyles.directoryItemUserStatus }, { children: isHovering && (_jsxs(Box, Object.assign({ display: styles.displayFlex, justifyContent: styles.justifyContentStart, flex: "1", ml: 1 }, { children: [showDialAgentButton && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBAgentConsult) &&
                                    _jsx(CcfTooltip, Object.assign({ title: getTitleForDialAgent(isMaxContactsInConference, isAgentInConference, userInConsult ? true : false, translate), arrow: true }, { children: _jsx("div", Object.assign({ role: 'presentation', "aria-hidden": 'true' }, { children: _jsx(CcfButton, Object.assign({ id: "disable-call-button", color: "secondary", sx: directoryStyles.phoneIconFullViewDirectory, className: clsx((user === null || user === void 0 ? void 0 : user.status) === AgentStatus.WORKING), size: styles.size, disabled: ((userInConsult ? true : false) || isMaxContactsInConference), onClick: () => addAgentToConsult(user), onKeyDown: (e) => { if (e.key === 'Enter')
                                                    addAgentToConsult(user); }, "data-testid": "phone-icon", tabIndex: 0, "aria-label": `${translate('call')} ${user === null || user === void 0 ? void 0 : user.firstName} ${user === null || user === void 0 ? void 0 : user.lastName} ${translate('agentLabel')}` }, { children: getIconForDialAgent(isMaxContactsInConference, userInConsult ? true : false, 'medium') })) })) })), showTransferAgentButton && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBTransfer) &&
                                    _jsx(CcfTooltip, Object.assign({ title: (activeContactInSelectedInteraction && (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.VOICE && (userInConsult || isAgentInConference)) ? translate('disableTransferMessage') : translate('transferContact'), arrow: true }, { children: _jsx("div", { children: nonIncomingActiveContactInSelectedInteraction && _jsx(CcfButton, Object.assign({ color: "secondary", sx: directoryStyles.phoneIconFullViewDirectory, "aria-label": (activeContactInSelectedInteraction && (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.VOICE && (userInConsult || isAgentInConference)) ? translate('disableTransferMessage') : translate('transferContact'), size: styles.size, "data-testid": "transfer-icon", onClick: () => dialAnAgent(user), onKeyDown: (e) => { if (e.key === 'Enter')
                                                    dialAnAgent(user); }, tabIndex: 0, disabled: activeContactInSelectedInteraction ? (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.VOICE && ((userInConsult ? true : false) || isAgentInConference) : undefined }, { children: _jsx(CcfTransferArrowsIcon, {}) })) }) }))] }))) })), _jsx(Box, Object.assign({ display: styles.displayFlex, marginTop: '0%', width: styles.boxMaxWidth }, { children: multipleSkillRes &&
                            multipleSkillRes.res &&
                            multipleSkillRes.res.length > 0 &&
                            agentMultiSkillFlg &&
                            toggleCall &&
                            agentMultiSkillHoverDropDownView(multipleSkillRes.res, updatedeboucedHover, directoryStyles, translate) }))] }))] })));
};
export default withHover(CcfDirectoryAgent);
//# sourceMappingURL=ccf-directory-agent.js.map