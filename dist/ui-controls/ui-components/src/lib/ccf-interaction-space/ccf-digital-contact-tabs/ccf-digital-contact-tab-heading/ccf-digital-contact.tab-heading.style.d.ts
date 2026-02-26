import { Theme } from '@mui/material';
/**
 * style object for ccf-digital-content-tabs-heading
 * @returns CcfDigitalContactTabHeadingStyles styles object
 * ```
 * @example
 * <CcfDigitalContactTabHeadingStyles/>
 * ```
 */
declare const CcfDigitalContactTabHeadingStyles: (theme: Theme) => {
    container: {
        overflow: string;
        height: string;
        width: string;
    };
    header: {
        height: string;
        position: string;
        width: string;
    };
    headerContainer: {
        width: string;
        '& > div': {
            width: string;
            height: string;
        };
        '&:focus-visible, &:focus': {
            outline: string;
        };
    };
    headerTabBackground: {
        [x: string]: string | {
            borderRadius: string;
            width: string;
        };
        borderRadius: string;
        height: string;
        width: string;
    };
    renderTabsContainer: {
        overflow: string;
    };
    active: {
        borderBottom: string;
        borderRadius: string;
        height: string;
    };
    tabContent: {
        height: string;
        display: string;
        textAlign: string;
        fontSize: string;
        letterSpacing: string;
        color: string;
        opacity: number;
        lineHeight: string;
        width: string;
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
        paddingTop: string;
    };
    tabContentSmallView: {
        display: string;
        width: string;
        textAlign: string;
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
        paddingTop: string;
    };
    integratedAgentTab: {
        fontSize: string;
        fontWeight: string;
        overflow: string;
        display: string;
        height: string;
        '& > div > span': {
            lineHeight: string;
            marginLeft: string;
        };
    };
    nonIntegratedTab: {
        display: string;
        alignItems: string;
        minWidth: string;
        width: string;
        padding: string;
        height: string;
    };
    integratedAgentTabCustomerName: {
        paddingLeft: string;
        whiteSpace: string;
    };
    globeIconWrapper: {
        width: string;
        height: string;
        borderTop: string;
        borderRight: string;
        position: string;
    };
    globeIcon: {
        transform: string;
        position: string;
    };
    channelIcon: {
        [x: string]: string | {
            margin: string;
            width: string;
        };
        height: string;
        display: string;
        alignItems: string;
        width: string;
    };
    notificationBadge: {
        '& .MuiBadge-badge': {
            backgroundColor: string;
            height: string;
            minWidth: string;
            borderRadius: string;
        };
    };
};
export default CcfDigitalContactTabHeadingStyles;
