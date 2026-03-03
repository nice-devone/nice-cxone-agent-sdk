import { jsx as _jsx } from "react/jsx-runtime";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CcfAvailableIcon from '../icons/ccf-available-icon/ccf-available-icon';
import CcfUnavailableIcon from '../icons/ccf-unavailable-icon/ccf-unavailable-icon';
import CcfWorkingIcon from '../icons/ccf-working-icon/ccf-working-icon';
import { FeatureToggleService, UnifiedDirectoryAgentStates } from '@nice-devone/agent-sdk';
export var DirectoryUserAgentStates;
(function (DirectoryUserAgentStates) {
    DirectoryUserAgentStates["Available"] = "Available";
    DirectoryUserAgentStates["Unavailable"] = "Unavailable";
    DirectoryUserAgentStates["InboundContact"] = "InboundContact";
    DirectoryUserAgentStates["OutboundContact"] = "OutboundContact";
    DirectoryUserAgentStates["InboundConsult"] = "InboundConsult";
    DirectoryUserAgentStates["OutboundConsult"] = "OutboundConsult";
    DirectoryUserAgentStates["Dialer"] = "Dialer";
    DirectoryUserAgentStates["DialerPending"] = "DialerPending";
    DirectoryUserAgentStates["LoggedOut"] = "LoggedOut";
    DirectoryUserAgentStates["Working"] = "Working";
})(DirectoryUserAgentStates || (DirectoryUserAgentStates = {}));
export var DirectoryEntryStates;
(function (DirectoryEntryStates) {
    DirectoryEntryStates["Green"] = "Green";
    DirectoryEntryStates["Orange"] = "Orange";
    DirectoryEntryStates["Grey"] = "Grey";
    DirectoryEntryStates["Red"] = "Red";
    DirectoryEntryStates["Yellow"] = "Yellow";
})(DirectoryEntryStates || (DirectoryEntryStates = {}));
/**
 * Function to getStatusIcon
 * @param getStatusIcon -status: string
 * @returns icon
 * @example getStatusIcon
 */
export const getStatusIcon = (status, style) => {
    switch (status) {
        case DirectoryUserAgentStates.Available:
        case DirectoryEntryStates.Green:
            return _jsx(CcfAvailableIcon, { id: 'availableStatusIconId', sx: style });
        case DirectoryEntryStates.Red:
        case DirectoryUserAgentStates.Unavailable:
            return _jsx(CcfUnavailableIcon, { id: 'unavailableStatusIconId', sx: style });
        case DirectoryUserAgentStates.LoggedOut:
        case DirectoryEntryStates.Grey:
            return _jsx(HighlightOffIcon, { id: 'highlightOffIconId', sx: style, color: "action" });
        case DirectoryEntryStates.Orange:
        case DirectoryEntryStates.Yellow:
            return _jsx(CcfWorkingIcon, { id: 'workingStatusIconId', sx: style });
        default:
            return _jsx(CcfWorkingIcon, { id: 'workingDefaultIconId', sx: style });
    }
};
/**
 * Function to getUnifiedStatusIcon
 * @param getUnifiedStatusIcon - status: string
 * @returns icon
 * @example getStatusIcon
 */
export const getUnifiedStatusIcon = (status, style) => {
    switch (status) {
        case UnifiedDirectoryAgentStates.AGENT_STATE_AWAITING_CONTACTS:
            return _jsx(CcfAvailableIcon, { id: 'availableStatusIconId', sx: style });
        case UnifiedDirectoryAgentStates.AGENT_STATE_UNAVAILABLE:
            return _jsx(CcfUnavailableIcon, { id: 'unavailableStatusIconId', sx: style });
        case UnifiedDirectoryAgentStates.AGENT_STATE_ENDED:
            return _jsx(HighlightOffIcon, { id: 'highlightOffIconId', sx: style, color: "action" });
        case UnifiedDirectoryAgentStates.AGENT_STATE_WORKING_CONTACTS:
            return _jsx(CcfWorkingIcon, { id: 'workingStatusIconId', sx: style });
        default:
            return _jsx(CcfUnavailableIcon, { id: 'unavailableStatusIconId', sx: style });
    }
};
/**
 * Util to get feature toggle enablement
 * @param featureName - feature toggle Name
 * @returns - boolean
 * @example -
 * ```
 * isFeatureEnabled('release-ccf-digital_Dispostion-AW-2806');
 * ```
 */
export const isFeatureEnabled = (featureName) => {
    return FeatureToggleService.instance.getFeatureToggleSync(featureName);
};
//# sourceMappingURL=ccf-directory-utils.js.map