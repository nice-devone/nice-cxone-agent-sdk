import { SxProps } from '@mui/material';
export declare enum DirectoryUserAgentStates {
    Available = "Available",
    Unavailable = "Unavailable",
    InboundContact = "InboundContact",
    OutboundContact = "OutboundContact",
    InboundConsult = "InboundConsult",
    OutboundConsult = "OutboundConsult",
    Dialer = "Dialer",
    DialerPending = "DialerPending",
    LoggedOut = "LoggedOut",
    Working = "Working"
}
export declare enum DirectoryEntryStates {
    Green = "Green",
    Orange = "Orange",
    Grey = "Grey",
    Red = "Red",
    Yellow = "Yellow"
}
/**
 * Function to getStatusIcon
 * @param getStatusIcon -status: string
 * @returns icon
 * @example getStatusIcon
 */
export declare const getStatusIcon: (status: string, style?: SxProps) => JSX.Element;
/**
 * Function to getUnifiedStatusIcon
 * @param getUnifiedStatusIcon - status: string
 * @returns icon
 * @example getStatusIcon
 */
export declare const getUnifiedStatusIcon: (status: string, style?: SxProps) => JSX.Element;
/**
 * Util to get feature toggle enablement
 * @param featureName - feature toggle Name
 * @returns - boolean
 * @example -
 * ```
 * isFeatureEnabled('release-ccf-digital_Dispostion-AW-2806');
 * ```
 */
export declare const isFeatureEnabled: (featureName: string) => boolean;
