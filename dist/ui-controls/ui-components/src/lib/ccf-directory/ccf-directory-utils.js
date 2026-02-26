import { jsx as _jsx } from "react/jsx-runtime";
import { CcfAvailableIcon, CcfUnavailableIcon, CcfWorkingIcon } from '@nice-devone/ui-controls';
import { DirectoryEntryStates, DirectoryUserAgentStates } from './+state/ccf-directory.slice';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { UnifiedDirectoryAgentStates } from '@nice-devone/agent-sdk';
export var AddressType;
(function (AddressType) {
    AddressType["CITY"] = "city";
    AddressType["STATE"] = "state";
})(AddressType || (AddressType = {}));
export var ProfileType;
(function (ProfileType) {
    ProfileType["PHONE"] = "phone";
    ProfileType["EMAIL"] = "email";
    ProfileType["JOB_TITLE"] = "job title";
    ProfileType["DEPARTMENT"] = "department";
    ProfileType["COMPANY"] = "company";
    ProfileType["ADDRESS"] = "address";
})(ProfileType || (ProfileType = {}));
export var FieldType;
(function (FieldType) {
    FieldType["PRESENCE"] = "presence";
    FieldType["OFFICE_LOCATION"] = "officelocation";
    FieldType["CITY"] = "city";
    FieldType["STATE"] = "state";
    FieldType["POSTAL_CODE"] = "postalcode";
})(FieldType || (FieldType = {}));
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
 * Function to getStateName
 * @param getStateName -agentStateName: string
 * @example getStateName('available')
 * returns localized state
 */
export const getStateName = (state, translate) => {
    switch (state) {
        case DirectoryUserAgentStates.Available:
        case DirectoryEntryStates.Green:
            return getStateText('available', DirectoryUserAgentStates.Available, translate);
        case DirectoryUserAgentStates.Unavailable:
        case DirectoryEntryStates.Orange:
        case DirectoryEntryStates.Yellow:
        case DirectoryEntryStates.Red:
            return getStateText('unavailable', DirectoryUserAgentStates.Unavailable, translate);
        case DirectoryUserAgentStates.InboundContact:
        case DirectoryUserAgentStates.OutboundContact:
        case DirectoryUserAgentStates.InboundConsult:
        case DirectoryUserAgentStates.OutboundConsult:
        case DirectoryUserAgentStates.DialerPending:
        case DirectoryUserAgentStates.Working:
        case DirectoryUserAgentStates.Dialer:
            return getStateText('working', DirectoryUserAgentStates.Working, translate);
        case DirectoryUserAgentStates.LoggedOut:
        case DirectoryEntryStates.Grey:
            return getStateText('loggedOut', DirectoryUserAgentStates.LoggedOut, translate);
        default:
            return getStateText('unavailable', DirectoryUserAgentStates.Unavailable, translate);
    }
};
/**
 * Function to getUnifiedStateName
 * @param getUnifiedStateName - agentStateName: string
 * @example getUnifiedStateName(UnifiedDirectoryAgentStates.)
 * returns localized state
 */
export const getUnifiedStateName = (state, translate) => {
    switch (state) {
        case UnifiedDirectoryAgentStates.AGENT_STATE_AWAITING_CONTACTS:
            return getStateText('available', DirectoryUserAgentStates.Available, translate);
        case UnifiedDirectoryAgentStates.AGENT_STATE_UNAVAILABLE:
            return getStateText('unavailable', DirectoryUserAgentStates.Unavailable, translate);
        case UnifiedDirectoryAgentStates.AGENT_STATE_WORKING_CONTACTS:
            return getStateText('working', DirectoryUserAgentStates.Working, translate);
        case UnifiedDirectoryAgentStates.AGENT_STATE_ENDED:
            return getStateText('loggedOut', DirectoryUserAgentStates.LoggedOut, translate);
        default:
            return getStateText('unavailable', DirectoryUserAgentStates.Unavailable, translate);
    }
};
/**
   *
   * @param translationKey - string
   * @param agentStates - DirectoryUserAgentStates
   * @example - getStateText('available', DirectoryUserAgentStates.Available);
   * @returns
   */
const getStateText = (translationKey, agentStates, translate) => {
    return translate ? translate(translationKey) : agentStates;
};
//# sourceMappingURL=ccf-directory-utils.js.map