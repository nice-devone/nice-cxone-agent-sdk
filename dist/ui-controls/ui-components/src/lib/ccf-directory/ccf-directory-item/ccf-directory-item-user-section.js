import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, useTheme } from '@mui/material';
import { CcfButton, CcfTransferIcon, CcfDisableCallIcon, CcfTooltip, useTranslator, CcfPhoneOutboundIcon, } from '@nice-devone/ui-controls';
import { DirectoryUserAgentStates } from '../+state/ccf-directory.slice';
import { useDispatch, useSelector } from 'react-redux';
import { voiceContactSelector, selectUserInConference, selectUserInConsult, getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { addConsultAgentByAgentId, callConferenceActions, dialCallAndColdTransfer, holdCall, conferenceHold, conferenceNo, } from '../../ccf-call-conference/ccf-call-conference.slice';
import { VoiceContactStatus } from '@nice-devone/common-sdk';
import { selectMaxConference } from '../../ccf-acd-session/ccf-acd-session.slice';
import contactControlStyles from '../../../styles/ccf-contact-control.style';
/**
 * CcfDirectoryItemUserSection used to display agent details section
 * * @param param - CcfDirectoryItemUserSection
 * @example <CcfDirectoryItemUserSection />
 */
export function CcfDirectoryItemUserSection(_a) {
    var _b, _c, _d, _e, _f;
    var rest = __rest(_a, []);
    const theme = useTheme();
    const controlStyles = contactControlStyles(theme);
    const voiceContact = useSelector(voiceContactSelector);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const userInConsult = useSelector(selectUserInConsult);
    const usersInConference = useSelector(selectUserInConference);
    const maxConference = useSelector(selectMaxConference);
    const isMaxContactsInConference = usersInConference && (usersInConference.length === maxConference);
    const isAgentInConference = usersInConference && usersInConference.length > 1;
    const currentConferenceNo = useSelector(conferenceNo);
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const styling = {
        displayFlex: 'flex',
        flexDirection: 'row',
        columnDirection: 'column',
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
    const dialAnAgent = (agent) => {
        if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status.toLowerCase()) === VoiceContactStatus.ACTIVE) {
            dispatch(callConferenceActions.coldTransferredBtnClicked({ isColdTransferClicked: true, agent: agent }));
            dispatch(holdCall({ voiceContact, agent }));
        }
        else if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status.toLowerCase()) === VoiceContactStatus.HOLDING) {
            dispatch(dialCallAndColdTransfer({ voiceContact, agent }));
        }
    };
    return (_jsxs(Box, Object.assign({ display: "flex", flexDirection: "column", padding: '2%' }, { children: [_jsx(Box, Object.assign({ display: styling.displayFlex }, { children: _jsx(Typography, Object.assign({ noWrap: true, sx: controlStyles.directoryItemAgentLabel }, { children: rest.user.firstName + ' ' + rest.user.lastName })) })), _jsx(Box, Object.assign({ sx: controlStyles.fullViewDirectoryIcons, display: styling.displayFlex, justifyContent: styling.justifyContentStart, flex: "1", ml: 1 }, { children: !(((_b = rest.user) === null || _b === void 0 ? void 0 : _b.agentStateName) === DirectoryUserAgentStates.OutboundConsult ||
                    ((_c = rest.user) === null || _c === void 0 ? void 0 : _c.agentStateName) === DirectoryUserAgentStates.InboundConsult ||
                    ((_d = rest.user) === null || _d === void 0 ? void 0 : _d.agentStateName) === DirectoryUserAgentStates.LoggedOut ||
                    ((_e = rest.user) === null || _e === void 0 ? void 0 : _e.agentStateName) === DirectoryUserAgentStates.InboundContact ||
                    ((_f = rest.user) === null || _f === void 0 ? void 0 : _f.agentStateName) === DirectoryUserAgentStates.OutboundContact) &&
                    (_jsxs(Box, Object.assign({ display: styling.displayFlex, justifyContent: styling.justifyContentStart, flex: "1", ml: 1 }, { children: [_jsx(CcfTooltip, Object.assign({ title: getTitleForDialAgent(isMaxContactsInConference, isAgentInConference, userInConsult ? true : false, translate), arrow: true }, { children: _jsx("div", { children: _jsx(CcfButton, Object.assign({ color: "secondary", size: styling.size, sx: controlStyles.phoneIconFullViewDirectory, disabled: (userInConsult ? true : false) || isMaxContactsInConference, "data-testid": "phone-icon", onClick: () => addAgentToConsult(rest.user) }, { children: getIconForDialAgent(isMaxContactsInConference, userInConsult ? true : false, styling.iconSize) })) }) })), _jsx(CcfTooltip, Object.assign({ title: (userInConsult || isAgentInConference) ? translate('disableTransferMessage') : translate('transferContact'), arrow: true }, { children: _jsx("div", { children: nonIncomingActiveContactInSelectedInteraction && _jsx(CcfButton, Object.assign({ color: "secondary", size: styling.size, sx: controlStyles.phoneIconFullViewDirectory, onClick: () => dialAnAgent(rest.user), "data-testid": "transfer-icon", disabled: ((userInConsult ? true : false) || isAgentInConference) }, { children: _jsx(CcfTransferIcon, {}) })) }) }))] }))) }))] })));
}
/**
 * getTitleForDialAgent used to get the tooltip for dial in the Directory
 * * @param param - isMaxContactsInConference
 * * @param param - isAgentInConference
 * * @param param - isUserInConsult
 * * @param param - translate
 * @example getTitleForDialAgent(true,true,true, useTranslator)
 */
export const getTitleForDialAgent = (isMaxContactsInConference, _isAgentInConference, isUserInConsult, translate) => {
    let title;
    if (isMaxContactsInConference)
        title = translate('maxConferenceLimitMessage');
    else if (isUserInConsult)
        title = translate('consultMessage');
    else
        title = translate('call');
    return title;
};
/**
 * getIconForDialAgent used to get the icon for dial in the Directory
 * * @param param - isMaxContactsInConference
 * * @param param - isUserInConsult
 * * @param param - fontSize
 * @example getIconForDialAgent(true,true,true,'small' as size)
 */
export const getIconForDialAgent = (isMaxContactsInConference, isUserInConsult, fontSize) => {
    let icon;
    if (isUserInConsult || isMaxContactsInConference)
        icon = _jsx(CcfDisableCallIcon, { id: 'disableCallIcnDir', fontSize: fontSize, "data-testid": 'call-disable-icon' });
    else
        icon = _jsx(CcfPhoneOutboundIcon, { fontSize: fontSize, "data-testid": 'call-icon' });
    return icon;
};
/**
 * Function to hold current call/conference and add an agent to consult
 * * @param agent - agent object
 * * @param isAgentInConference - Agent in Conference or not
 * * @param currentConferenceNo - current conference number
 * * @param voiceContact - CXoneVoiceContact object
 * * @param dispatch - dispatch
 * @example holdAndAddAgentToConsult(agent, isAgentInConference, currentConferenceNo, voiceContact, dispatch)
 */
export const holdAndAddAgentToConsult = (agent, isAgentInConference, currentConferenceNo, voiceContact, dispatch) => {
    var _a;
    if (isAgentInConference && currentConferenceNo) {
        dispatch(callConferenceActions.consultCallByAgentBtnClicked({ isConsultCallByAgentIdClicked: true, agent: agent }));
        dispatch(conferenceHold(currentConferenceNo));
    }
    else if (((_a = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === VoiceContactStatus.ACTIVE) {
        dispatch(callConferenceActions.consultCallByAgentBtnClicked({ isConsultCallByAgentIdClicked: true, agent: agent }));
        dispatch(holdCall({ voiceContact }));
    }
    else {
        dispatch(addConsultAgentByAgentId({ voiceContact, agent }));
    }
};
//# sourceMappingURL=ccf-directory-item-user-section.js.map