import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import { TripOrigin } from '@mui/icons-material';
import { CcfAvailableIcon, CcfAvatar, CcfBadge, CcfBox, CcfUnavailableIcon, CcfWorkingIcon } from '@nice-devone/ui-controls';
import { AgentStates } from '@nice-devone/agent-sdk';
import agentStateAvatarStyles from './ccf-agent-state-avatar.styles';
/**
 * Component displays Avatar for intials and with agent state badge
 * @param agentCurrentStatus -agentCurrentStatus,classes - cssClasses
 * @returns CcfIcon for agent state
 * @example `getAgentStatusIcon ('working','greenBadgeColor: {fill: theme.palette?.success.main }')`
 */
const getAgentStatusIcon = (agentCurrentStatus, sxStyles) => {
    switch (agentCurrentStatus.toLowerCase()) {
        case 'working':
            return (_jsx(CcfWorkingIcon, {}));
        case AgentStates.Available:
            return (_jsx(CcfAvailableIcon, { sx: [sxStyles.fillGreenBadge, sxStyles.greenBadgeColor] }));
        case AgentStates.Dialer || AgentStates.DialerPending:
            return (_jsx(TripOrigin, { sx: [sxStyles.fillRedBadge, sxStyles.orangeBadgeColor] }));
        default:
            return (_jsx(CcfUnavailableIcon, { id: 'unavailableAgentAvatarId', sx: [sxStyles.fillRedBadge, sxStyles.redBadgeColor] }));
    }
};
/**
 * Component displays Avatar for intials and with agent state badge
 * @param props -CcfAgentStateAvatarProps
 * @returns Avatar component with badge for agent state
 * @example `<CcfAgentStateAvatar agentCurrentStatus={agentCurrentStatus} initials={initials} />`
 */
export function CcfAgentStateAvatar(props) {
    const theme = useTheme();
    const sxStyles = agentStateAvatarStyles(theme);
    return (_jsx(CcfBox, Object.assign({ sx: [
            sxStyles.agentStateAvatar,
            ...(props.agentCurrentStatus ? [sxStyles.avatarMain] : [sxStyles.myProfile, sxStyles.myProfileBg])
        ] }, { children: _jsx(CcfBadge, Object.assign({ label: props.agentCurrentStatus, overlap: "circular", anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, badgeContent: props.agentCurrentStatus ?
                getAgentStatusIcon(props.agentCurrentStatus, sxStyles) : '' }, { children: _jsx(CcfAvatar, Object.assign({ "aria-label": props.initials, alt: props.initials, sx: [sxStyles.avatarHeaderBg, sxStyles.avatarHeader] }, { children: props.initials })) })) })));
}
export default CcfAgentStateAvatar;
//# sourceMappingURL=ccf-agent-state-avatar.js.map