import { Theme } from '@mui/material';
/**
 *
 * @returns CcfAppHeaderStyles
 * @example - CcfAppHeaderStyles()
 */
export declare const CcfAppHeaderStyles: (theme: Theme) => {
    header: {
        display: string;
        justifyContent: string;
        alignItems: string;
        width: string;
        maxHeight: string;
        height: string;
        background: (theme: Theme) => string;
        ':focus, :focus-visible': {
            border: string;
        };
    };
    cxaLogo: {
        position: string;
        left: string;
        width: string;
        height: string;
    };
    cxaText: {
        position: string;
        left: string;
    };
    cxaTextStyles: {
        color: string;
        fontSize: string;
        fontWeight: string;
        letterSpacing: string;
    };
    logo: {
        [x: string]: {
            position: string;
            left: string;
        };
    };
    button: {
        margin: string;
        padding: string;
        ':hover, :focus, :focus-visible': {
            outline: string;
            backgroundColor: string;
            borderRadius: string;
        };
    };
    helpIcon: {
        lineHeight: string;
        padding: string;
    };
    notificationBadge: {
        top: string;
        right: string;
        height: string;
        minWidth: string;
        fontSize: string;
        padding: string;
        background: string;
    };
    rightSection: {
        position: string;
        right: string;
        justifyContent: string;
    };
    appHeaderDivider: {
        height: string;
        backgroundColor: string;
        opacity: string;
        borderBottomWidth: string;
    };
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    focussedBackground: {
        '&:focus': {
            backgroundColor: string;
        };
    };
    userProfile: {
        [x: string]: {
            boxSizing: string;
        };
    };
    cxoneLogo: {
        width: string;
        height: string;
    };
    agentChatStandaloneLogo: {
        width: string;
        height: string;
        fill: string;
    };
    logOutButton: {
        margin: string;
        padding: string;
        height: string;
        ':hover, :focus, :focus-visible': {
            outline: string;
            backgroundColor: string;
            borderRadius: string;
        };
    };
};
export default CcfAppHeaderStyles;
