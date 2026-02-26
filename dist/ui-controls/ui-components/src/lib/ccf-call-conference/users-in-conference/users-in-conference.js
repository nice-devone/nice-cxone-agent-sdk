import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, IconButton, useTheme, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { VoiceContactStatus, ConferenceStatus } from '@nice-devone/common-sdk';
import { CcfCallHungUpIcon, CcfConferenceAgentIcon, CcfTooltip, useTranslator, CcfCallMergeIcon, CcfPhoneOutboundRevampedIcon, CcfPhoneInboundRevampedIcon, } from '@nice-devone/ui-controls';
import { endTheVoiceContact, holdVoiceContact } from '../../ccf-voice-contact/ccf-voice-contact-methods';
import { consultedAgentDetails, selectUserInConference, selectUserInConsult, switchAgentUser } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfLaunchButton } from '../../ccf-launch-button/ccf-launch-button';
import CcfHoldResumeButton from '../../ccf-hold-resume-button/ccf-hold-resume-button';
import conferenceStyles from '../ccf-call-conference.styles';
import { conferenceStatus, isConsult, conferenceJoin } from '../ccf-call-conference.slice';
/**
 * Function for showing hover box in conference
 * @param param0 - user
 * @example <HoverBox />
 * @returns
 */
export const HoverBox = ({ user, isSingleConsult, isConferenceConsult, currentConferenceStatus, isConsultContact, conferenceNo, onHoldResumeClick, }) => {
    var _a, _b, _c, _d, _e;
    const dispatch = useDispatch();
    const theme = useTheme();
    const [translate] = useTranslator();
    const consultedAgents = useSelector(consultedAgentDetails);
    const currentTheme = useTheme();
    const conferenceStyle = conferenceStyles(currentTheme);
    const isDialing = ((_a = user === null || user === void 0 ? void 0 : user.contact) === null || _a === void 0 ? void 0 : _a.status.toLowerCase()) === VoiceContactStatus.DIALING.toLowerCase();
    const fontColor = isDialing ? theme.palette.text.lightGrey : undefined;
    /**
     * function to get icon for the user in the conference
     * @example - renderUserIcon()
     * @returns icon
     */
    const renderUserIcon = () => {
        var _a;
        if (user.designation === 'Agent') {
            return _jsx(CcfConferenceAgentIcon, { "data-testid": "agent-icon", viewBox: '-4 -4 24 24' });
        }
        else if ((_a = user === null || user === void 0 ? void 0 : user.contact) === null || _a === void 0 ? void 0 : _a.isInbound) {
            return _jsx(CcfPhoneInboundRevampedIcon, { "data-testid": "inbound-icon" });
        }
        else {
            return _jsx(CcfPhoneOutboundRevampedIcon, { "data-testid": "outbound-icon" });
        }
    };
    /**
     * function to get agent name
     * @example - getAgentName('28321')
     * @returns string
     */
    const getAgentName = (agentId) => {
        const agentInfo = consultedAgents.find(agent => agent.agentId.toString() === agentId);
        return agentInfo ? ((agentInfo === null || agentInfo === void 0 ? void 0 : agentInfo.firstName) + ' ' + (agentInfo === null || agentInfo === void 0 ? void 0 : agentInfo.lastName)) : '';
    };
    /**
     * Function to get subtitle for user in conference call
     * @example getSubtitle()
     */
    const getSubtitle = () => {
        var _a;
        if (user && user.contact && user.contact.skill === '0') {
            return getAgentName(user.name);
        }
        return (user === null || user === void 0 ? void 0 : user.name) || (((user === null || user === void 0 ? void 0 : user.contact) && user.contact.ani === 'RESKILL') ? user.contact.skillName : (_a = user === null || user === void 0 ? void 0 : user.contact) === null || _a === void 0 ? void 0 : _a.contactID);
    };
    /**
     * Function to dispatch add user to conference action
     * @example dispatchAddUserToConference(contactId)
     */
    function dispatchAddUserToConference(contactId) {
        if (conferenceNo) {
            dispatch(conferenceJoin({ contactId, conferenceNo }));
        }
    }
    return (_jsxs(Box, Object.assign({ display: "flex", sx: {
            padding: '5px 5px',
            margin: '8px',
            '&:hover': {
                backgroundColor: `${(_b = theme.palette) === null || _b === void 0 ? void 0 : _b.background.main}`,
            },
        }, alignItems: "center", justifyContent: "space-between", "data-testid": `${user.designation.toLowerCase()}-in-conference` }, { children: [_jsxs(Box, Object.assign({ display: "flex", alignItems: 'center' }, { children: [renderUserIcon(), _jsx(Typography, Object.assign({ variant: "subtitle2", noWrap: true, sx: conferenceStyle.userInConferenceTypography, style: { marginLeft: '10px', color: fontColor } }, { children: getSubtitle() }))] })), _jsxs(Stack, Object.assign({ alignItems: "center", direction: "row" }, { children: [isDialing && (_jsx(Typography, Object.assign({ style: { color: fontColor } }, { children: translate('ringing') + '...' }))), isConferenceConsult && isConsultContact && !isDialing &&
                        _jsx(CcfTooltip, Object.assign({ title: '', translationKey: 'conference', arrow: true }, { children: _jsx(IconButton, Object.assign({ sx: conferenceStyle.buttonStyle, color: "secondary", onClick: () => dispatchAddUserToConference(user.contact.contactID) }, { children: _jsx(CcfCallMergeIcon, {}) })) })), _jsx(CcfLaunchButton, { sx: conferenceStyle.buttonStyle, contactId: user.contact.contactID, anchorOrigin: { vertical: 'top', horizontal: 'left' }, transformOrigin: { vertical: 'bottom', horizontal: 'right' } }), (isSingleConsult || currentConferenceStatus === ConferenceStatus.HOLD || (isConferenceConsult && currentConferenceStatus === ConferenceStatus.JOINED)) && !isDialing && (_jsx(CcfHoldResumeButton, { sx: conferenceStyle.buttonStyle, contact: user.contact, onClick: () => { onHoldResumeClick && onHoldResumeClick(user.contact); }, disabled: isSingleConsult ? false : true })), _jsx(CcfTooltip, Object.assign({ title: "hungup", translationKey: "hungup", arrow: true }, { children: _jsx(IconButton, Object.assign({ sx: Object.assign(Object.assign({}, conferenceStyle.buttonStyle), { color: `${theme.palette.endCall}` }), "data-testid": `${user.designation.toLowerCase()}-in-conference-btn`, size: "small", onClick: () => dispatch(endTheVoiceContact(user.contact)), disabled: !((_e = (_d = (_c = user.contact) === null || _c === void 0 ? void 0 : _c.callControlButton) === null || _d === void 0 ? void 0 : _d.end) === null || _e === void 0 ? void 0 : _e.isEnable) }, { children: _jsx(CcfCallHungUpIcon, { viewBox: '-2 -2 24 24' }) })) }))] }))] })));
};
/**
 * Component to be used to show user in conference
 * @param props - UsersInConferenceProps
 * @example - <UsersInConference />
 * @returns
 */
export function UsersInConference(props) {
    const { users } = props;
    const sortedUsers = users === null || users === void 0 ? void 0 : users.slice().sort((firstParticipant, secondParticipant) => {
        var _a, _b;
        return ((_a = secondParticipant.contact.startTime) === null || _a === void 0 ? void 0 : _a.getTime()) - ((_b = firstParticipant.contact.startTime) === null || _b === void 0 ? void 0 : _b.getTime());
    });
    const dispatch = useDispatch();
    const userInConsult = useSelector(selectUserInConsult);
    const usersInConference = useSelector(selectUserInConference);
    const confStatus = useSelector(conferenceStatus);
    const isConferenceConsult = useSelector(isConsult);
    // only show the hold or resume button for contacts if they are in consult mode, not for conference
    const isSingleConsult = !!userInConsult && (usersInConference === null || usersInConference === void 0 ? void 0 : usersInConference.length) <= 1;
    /**
     * onHoldResumeClick - handle click for Ho
     * @param clickedUser - Participant on whom the resume / hold button was clicked
     * @example - onResumeHoldClick(clickedUser)
     * @returns
     */
    const onHoldResumeClick = (clickedContact) => __awaiter(this, void 0, void 0, function* () {
        const activeUser = users.find((user) => {
            var _a;
            return user.contact.contactID !== clickedContact.contactID &&
                ((_a = user.contact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== VoiceContactStatus.HOLDING;
        });
        // swap statuses if clicked contact is holding and the other user is already active,
        // can't have two active contacts in consult mode
        if (activeUser && clickedContact.status.toLowerCase() === VoiceContactStatus.HOLDING) {
            dispatch(switchAgentUser({ userInLobby: clickedContact, userInConsult: activeUser.contact }));
        }
        else {
            dispatch(holdVoiceContact(clickedContact));
        }
    });
    return (sortedUsers === null || sortedUsers === void 0 ? void 0 : sortedUsers.length) > 0 ? (_jsx(Box, { children: sortedUsers.map((user, index) => (_jsx(HoverBox, { user: user, isSingleConsult: isSingleConsult, currentConferenceStatus: confStatus, isConferenceConsult: isConferenceConsult, onHoldResumeClick: onHoldResumeClick }, `${user.name}_${index}`))) })) : null;
}
;
//# sourceMappingURL=users-in-conference.js.map