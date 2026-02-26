import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, IconButton, Grow, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import PlayCircleSharpIcon from '@mui/icons-material/PlayCircleSharp';
import { CcfTypography } from '@nice-devone/ui-controls';
import { VoiceContactStatus } from '@nice-devone/common-sdk';
import { formatTime, getDurationInSeconds } from '../../../util/common';
import { voiceContactSelector } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import conferenceStyles from '../ccf-call-conference.styles';
/**
 * Component to be used to show user in Lobby
 * @param props - userProps
 * @example - <UserInLobby />
 * @returns
 */
export const UserInLobby = (props) => {
    var _a, _b;
    const { user, dispatchSwitchUserAction, animate, agentDetail, } = props;
    const timerRef = React.useRef(null);
    const currentVoiceContact = useSelector(voiceContactSelector);
    const { contact: { lastStateChangeTime } } = user;
    const hasConsultRinging = ((_a = currentVoiceContact === null || currentVoiceContact === void 0 ? void 0 : currentVoiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === VoiceContactStatus.DIALING;
    const currentTheme = useTheme();
    const conferenceStyle = conferenceStyles(currentTheme);
    useEffect(() => {
        const interval = setInterval(() => {
            if (timerRef.current) {
                timerRef.current.innerText = formatTime(getDurationInSeconds(lastStateChangeTime));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [lastStateChangeTime]);
    return (_jsx("div", { children: _jsx(Grow, Object.assign({ in: animate }, { children: _jsxs(Box, Object.assign({ sx: conferenceStyle.userInLobbyContainer, onClick: !hasConsultRinging
                    ? (e) => {
                        e.stopPropagation();
                        dispatchSwitchUserAction();
                    }
                    : (e) => {
                        e.stopPropagation();
                    }, "data-testid": "user-in-lobby" }, { children: [_jsxs(Box, Object.assign({ display: "flex", alignItems: "center" }, { children: [_jsx(CcfTypography, { variant: "caption", translationKey: "waitingOnHold" }), "\u00A0", _jsxs(CcfTypography, Object.assign({ variant: "caption" }, { children: ["(", _jsx("span", { ref: timerRef }), ")"] }))] })), _jsxs(Box, Object.assign({ display: "flex", sx: conferenceStyle.callControlHover, alignItems: "center", "data-testid": "user-in-lobby-call-controls" }, { children: [_jsx(IconButton, { children: _jsx(PlayCircleSharpIcon, { htmlColor: "grey", sx: conferenceStyle.holdIcon }) }), _jsxs(Box, Object.assign({ pl: 0.5, flex: "1" }, { children: [_jsx(Typography, Object.assign({ variant: "subtitle2", noWrap: true, sx: conferenceStyle.contentBoldText }, { children: user && user.contact && user.contact.skill === '0' ? (agentDetail === null || agentDetail === void 0 ? void 0 : agentDetail.firstName) + ' ' + (agentDetail === null || agentDetail === void 0 ? void 0 : agentDetail.lastName) : ((user === null || user === void 0 ? void 0 : user.name) || ((_b = user === null || user === void 0 ? void 0 : user.contact) === null || _b === void 0 ? void 0 : _b.skillName)) })), _jsx(Typography, Object.assign({ component: "div", noWrap: true, variant: "caption" }, { children: user === null || user === void 0 ? void 0 : user.designation }))] }))] }))] })) })) }));
};
//# sourceMappingURL=user-in-lobby.js.map