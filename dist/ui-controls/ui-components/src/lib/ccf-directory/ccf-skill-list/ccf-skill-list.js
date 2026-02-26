import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme, } from '@mui/material';
import { CcfPhoneOutboundIcon, CcfButton, CcfTypography, CcfAvailableIcon, CcfUnavailableIcon, CcfWorkingIcon, CcfSkillIcon, CcfTransferArrowsIcon, CcfTooltip, useTranslator, CcfFavouriteIcon, CCfToggleIconButton, CcfAppToastMessage, CcfUnfavoredIcon, } from '@nice-devone/ui-controls';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureToggleService } from '@nice-devone/agent-sdk';
import { getElapsedMinutes, MediaTypeId, VoiceContactStatus, MediaType } from '@nice-devone/common-sdk';
import { addConsultAgentBySkillId, callConferenceActions, holdCall, transferDigitalSkill, transferVoiceMailSkill, transferWorkItemSkill, conferenceHold, conferenceNo, } from '../../ccf-call-conference/ccf-call-conference.slice';
import { voiceContactSelector, selectUserInConference, selectUserInConsult, getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getPanelAppNavigationItems } from '../../global.app.slice';
import ccfDirectoryStyles from '../ccf-directory.styles';
import { selectMaxConference } from '../../ccf-acd-session/ccf-acd-session.slice';
import contactControlStyles from '../../../styles/ccf-contact-control.style';
import ccfSkillListStyles from './ccf-skill-list.styles';
import { agentDirectoryActions, getCurrentFavsInDirectory, getFavoritesToastReference, toggleFavoriteForDigitalSkills, toggleFavoriteForSkills } from '../+state/ccf-directory.slice';
import { toast } from 'react-toastify';
import { getFavoritesStatesToastReference } from '../../ccf-agent-state/ccf-agent-state.slice';
import { getAgentProfileSettings } from '../../ccf-agent-setting/ccf-agent-setting-slice';
/**
 * Component to be used for directory item
 * @param props - Skill
 * @example <DirectorySkills />
 * @returns
 */
const DirectorySkills = (props) => {
    var _a;
    const theme = useTheme();
    const controlStyles = contactControlStyles(theme);
    const directoryStyles = ccfDirectoryStyles(theme);
    const skillListStyles = ccfSkillListStyles(theme);
    const { skill } = props;
    const [hover, setHover] = useState(false);
    const [translate] = useTranslator();
    const voiceContact = useSelector(voiceContactSelector);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const dispatch = useDispatch();
    const userInConsult = useSelector(selectUserInConsult);
    const usersInConference = useSelector(selectUserInConference);
    const maxConference = useSelector(selectMaxConference);
    const isMaxContactsInConference = usersInConference && (usersInConference.length >= maxConference);
    const isAgentInConference = usersInConference && usersInConference.length > 1;
    const currentConferenceNo = useSelector(conferenceNo);
    const currentFavsInDirectory = useSelector(getCurrentFavsInDirectory);
    const favoritesToastReference = useSelector(getFavoritesToastReference);
    const favoritesToastReferenceFortState = useSelector(getFavoritesStatesToastReference);
    const appToastContainer = useRef();
    const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const DIRECTORY_MAX_FAVS_ALLOWED = 25;
    const skillMediaTypeName = skill === null || skill === void 0 ? void 0 : skill.mediaTypeName;
    const skillMediaTypeId = skill === null || skill === void 0 ? void 0 : skill.mediaTypeId;
    const fontSizes = {
        small: 'small',
        smaller: 'smaller',
    };
    /**
   * Function to show phone icon on mouse over
   * @param user -Agent
   * @example onHover
   */
    const onHover = () => {
        setHover(true);
    };
    /**
  * Function to hide phone icon on mouse out
  * @param user -Agent
  * @example onLeave
  */
    const onLeave = () => {
        setHover(false);
    };
    /**
  * Function to get status icon
  * @param agent - skill state
  * @example getStatusIcon(skill)
  */
    const getStatusIcon = (skill) => {
        if (skill.agentsUnavailable === 0 && skill.agentsLoggedIn === 0) {
            return _jsxs(_Fragment, { children: [_jsx(CcfUnavailableIcon, { id: 'UnavailableSkillListId', sx: directoryStyles.icon }), _jsx(CcfTypography, Object.assign({ noWrap: true, variant: 'h6' }, { children: translate('unavailable') }))] });
        }
        else if (skill.agentsAvailable > 0) {
            return _jsxs(_Fragment, { children: [_jsx(CcfAvailableIcon, { sx: directoryStyles.icon }), _jsx(CcfTypography, Object.assign({ noWrap: true, variant: 'h6' }, { children: translate('available') }))] });
        }
        else if (skill.agentsAvailable === 0 && skill.agentsWorking > 0) {
            return _jsxs(_Fragment, { children: [_jsx(CcfWorkingIcon, { sx: directoryStyles.icon }), _jsx(CcfTypography, Object.assign({ noWrap: true, variant: 'h6' }, { children: translate('working') }))] });
        }
        else {
            return _jsxs(_Fragment, { children: [_jsx(CcfUnavailableIcon, { id: 'unavailableIconListId', sx: directoryStyles.icon }), _jsx(CcfTypography, Object.assign({ noWrap: true, variant: 'h6' }, { children: translate('unavailable') }))] });
        }
    };
    /**
     * Function to add agent to consult
     * @param user - SkillActivityEvent
     * @example addSkillToConsult(user)
     */
    const addSkillToConsult = (agent) => {
        var _a;
        if (isAgentInConference && currentConferenceNo) {
            dispatch(callConferenceActions.consultCallBySkillBtnClicked({ isConsultCallBySkillIdClicked: true, agent: agent }));
            dispatch(conferenceHold(currentConferenceNo));
        }
        else if (((_a = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === VoiceContactStatus.ACTIVE) {
            dispatch(callConferenceActions.consultCallBySkillBtnClicked({ isConsultCallBySkillIdClicked: true, agent: agent }));
            dispatch(holdCall({ voiceContact }));
        }
        else {
            dispatch(addConsultAgentBySkillId({ voiceContact, agent }));
        }
    };
    /**
     * Function to tranfer skill
     * @param user - transferSkill
     * @example transferSkill(user)
     */
    const transferSkill = (agent) => {
        const activeContactId = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId;
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL) {
            dispatch(transferDigitalSkill({ contactId: activeContactId, cxoneSkillId: agent.skillId.toString(), navPanelItems: panelAppNavigationItems }));
        }
        else if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.WORKITEM) {
            dispatch(transferWorkItemSkill({ contactId: nonIncomingActiveContactInSelectedInteraction.contactId, skillName: agent.skillName }));
        }
        else if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.VOICEMAIL) {
            dispatch(transferVoiceMailSkill({ contactId: nonIncomingActiveContactInSelectedInteraction.contactId, skillId: Number(agent.skillId) }));
        }
    };
    /**
     *
     * @example getTooltipTitle()
     */
    const getConsultTitle = () => {
        if (isMaxContactsInConference) {
            return translate('maxConferenceLimitMessage');
        }
        if (userInConsult) {
            return translate('consultMessage');
        }
        return translate('call');
    };
    /**
     * Function to toggle favorite option for selected Agent
     * @param skill - Skills
     * @example toggleFavorite(skill)
     */
    const toggleFavorite = (skill) => {
        var _a;
        const totalFavoritesCount = Object.values(currentFavsInDirectory).reduce((sumOfFavs, favsArray) => sumOfFavs + ((favsArray === null || favsArray === void 0 ? void 0 : favsArray.length) || 0), 0);
        const skillType = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL ? 'digitalSkills' : 'skills';
        if (totalFavoritesCount >= DIRECTORY_MAX_FAVS_ALLOWED && !((_a = currentFavsInDirectory === null || currentFavsInDirectory === void 0 ? void 0 : currentFavsInDirectory[skillType]) === null || _a === void 0 ? void 0 : _a.includes(skill === null || skill === void 0 ? void 0 : skill.skillId))) {
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
            if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL) {
                dispatch(toggleFavoriteForDigitalSkills({ skills: [skill] }));
            }
            else {
                dispatch(toggleFavoriteForSkills({ skills: [skill] }));
            }
        }
    };
    /**
   * Function to narrate favorite option for selected Agent
   * @example narrationForFavorite()
   */
    const narrationForFavorite = () => {
        const skillName = `${skill === null || skill === void 0 ? void 0 : skill.skillName}`;
        if ('isFavorite' in skill) {
            return skill.isFavorite
                ? `${translate('remove')} ${skillName} ${translate('skill')} ${translate('from')} ${translate('favorites')}`
                : `${translate('add')} ${skillName} ${translate('skill')} ${translate('to')} ${translate('favorites')}`;
        }
        return '';
    };
    /**
     * Returns the call icon button wrapped in a tooltip for consulting a skill.
     * @returns JSX.Element
     * @example getCallIconToolTip()
     * // Usage in render for positioning in two differenct places based on feature toggle
     *
     */
    const getCallIconToolTip = () => {
        return _jsx(CcfTooltip, Object.assign({ title: getConsultTitle(), arrow: true }, { children: _jsx("div", Object.assign({ style: isFavoritesFTEnabled ? { paddingLeft: 20 } : undefined }, { children: _jsx(CcfButton, Object.assign({ color: "secondary", sx: { textSecondary: `${skillListStyles.phoneIconBox}`, disabled: `${controlStyles.disabled}` }, onClick: () => addSkillToConsult(skill), "data-testid": "ccf-button-skill", onKeyPress: (e) => { if (e.key === 'Enter') {
                        addSkillToConsult(skill);
                    } }, tabIndex: 0, disabled: ((userInConsult ? true : false) || isMaxContactsInConference) }, { children: _jsx(CcfPhoneOutboundIcon, { "data-testid": 'call-outbound-icon' }) })) })) }));
    };
    return (_jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, directoryStyles.directoryItem), directoryStyles.outerContainerSkills), "data-testid": "ccf-skill-list", onMouseEnter: onHover, onMouseLeave: onLeave, tabIndex: 0, onKeyDown: onHover, onClick: onHover }, { children: [_jsxs(Box, Object.assign({ sx: directoryStyles.skillNametopContainer }, { children: [_jsxs(Box, Object.assign({ sx: directoryStyles.iconContainerInsideList }, { children: [_jsx(CcfSkillIcon, {}), _jsx(CcfTypography, Object.assign({ sx: skillListStyles.headerText, title: `${skill === null || skill === void 0 ? void 0 : skill.skillName}` }, { children: skill.skillName }))] })), !isFavoritesFTEnabled && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBSkillConsult) && 'skillQueueCount' in skill && hover && skill.mediaTypeId === MediaTypeId.PhoneCall && (getCallIconToolTip()), hover && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBTransfer) &&
                        (skillMediaTypeId !== MediaTypeId.PhoneCall && skillMediaTypeName === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media)) &&
                        ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL ||
                            (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.WORKITEM ||
                            (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.VOICEMAIL) &&
                        (_jsx(CcfTooltip, Object.assign({ title: translate('transferContact'), arrow: true }, { children: _jsx("div", { children: _jsx(CcfButton, Object.assign({ color: "secondary", sx: { textSecondary: `${skillListStyles.phoneIconBox}` }, "data-testid": "ccf-transfer-skill", onClick: () => transferSkill(skill), onKeyPress: (e) => { if (e.key === 'Enter') {
                                        transferSkill(skill);
                                    } }, tabIndex: 0 }, { children: _jsx(CcfTransferArrowsIcon, {}) })) }) }))), isFavoritesFTEnabled && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryFavorites) && _jsx(CcfTooltip, Object.assign({ title: translate('favorites'), arrow: true }, { children: _jsx("div", Object.assign({ role: 'presentation', "aria-hidden": 'true' }, { children: _jsx(CCfToggleIconButton, { sx: [directoryStyles.hoverDisabledButton, directoryStyles.focussedElement], icon: _jsx(CcfFavouriteIcon, { id: 'dirSkillFavoriteIcon', htmlColor: (_a = theme.palette.digitalStatus) === null || _a === void 0 ? void 0 : _a.openDark }), isToggled: skill.isFavorite, disableRipple: true, disableFocusRipple: true, disableTouchRipple: true, size: fontSizes.small, toggleIcon: _jsx(CcfUnfavoredIcon, { id: 'dirSkillToggleFavoriteIcon' }), onClick: () => toggleFavorite(skill), tabIndex: 0, "data-testid": "favorite-toggle", onKeyDown: (e) => { if (e.key === 'Enter')
                                    toggleFavorite(skill); }, "aria-label": narrationForFavorite() }) })) }))] })), 'skillQueueCount' in skill && (_jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, directoryStyles.skillActivity), { height: isFavoritesFTEnabled ? '3.1rem' : 'auto' }) }, { children: [_jsx(Box, Object.assign({ sx: directoryStyles.displayContent }, { children: getStatusIcon(skill) })), _jsx(CcfTypography, { sx: directoryStyles.labelText, translationKey: "skillQueue", variant: "h6" }), ': ', _jsx(CcfTypography, Object.assign({ sx: directoryStyles.skillText, variant: "h6" }, { children: skill.skillQueueCount })), _jsx(CcfTypography, { sx: directoryStyles.waitlabelText, translationKey: "skillWait", variant: "h6" }), ': ', _jsxs(CcfTypography, Object.assign({ sx: directoryStyles.skillText, variant: "h6" }, { children: [skill.earliestQueueTime
                                ? `< ${getElapsedMinutes(new Date(skill.earliestQueueTime))}`
                                : 0, ' ', translate('minutes')] })), isFavoritesFTEnabled && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBSkillConsult) && 'skillQueueCount' in skill && hover && skill.mediaTypeId === MediaTypeId.PhoneCall && (getCallIconToolTip())] })))] })));
};
export default DirectorySkills;
//# sourceMappingURL=ccf-skill-list.js.map