import { Theme } from '@mui/material';
import { EmailMessageSortOrder } from '../../../enums/email-message-sort-order-type';
export interface CcfDigitalEmailV2StylesProps {
    theme: Theme;
    closedContact?: boolean;
    hasMoreMessages?: boolean;
    isScrolledToBottom?: boolean;
    hasNextCaseId?: boolean;
    emailMessageSortOrder?: EmailMessageSortOrder;
    isSmView?: boolean;
    hasPreviousCaseId?: boolean;
    showRecentMessagesButton?: boolean;
}
/**
 * style object for ccf-digital-email-v2 component
 * @returns CcfDigitalEmailV2 styles object
 * ```
 * @example
 * <CcfDigitalEmailV2Styles/>
 * ```
 */
declare const CcfDigitalEmailV2Styles: (props: CcfDigitalEmailV2StylesProps) => {
    mainContainer: {
        display: string;
        flexDirection: string;
        height: string;
        position: string;
    };
    boxContainer: {
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        padding: string;
    };
    previousMessageContainer: {
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        padding: string;
        opacity: number;
    };
    contactContentEmailContainer: {
        overflowY: string;
        flex: number;
        marginRight: string;
        '&::-webkit-scrollbar': {
            width: string;
        };
    };
    publicPostContainerStyles: {};
    divider: {
        borderTop: string;
    };
    footerSpacer: {
        height: string;
        flexShrink: number;
    };
    loaderContainer: {
        display: string;
        justifyContent: string;
        alignItems: string;
        minHeight: string;
    };
    previousMessagesContainer: {
        paddingTop: string;
    };
    previousCaseStatusDivider: {
        marginLeft: string;
        marginRight: string;
    };
    currentCaseStatusDivider: {
        paddingTop: string;
        paddingBottom: string;
    };
    caseStatus: {
        color: string;
        fontWeight: number;
        fontSize: string;
    };
    loadMessagesContainer: {
        display: string;
        width: string;
        flexDirection: string;
        marginRight: string;
        marginTop: string;
        marginLeft: string;
        flexShrink: number;
    };
    doubleArrowIcon: {
        color: string;
        height: string;
        width: string;
        maxWidth: string;
    };
    loadMessagesButton: {
        color: string;
        fontSize: string;
        fontWeight: number;
        textDecoration: string;
        cursor: string;
        lineHeight: string;
        marginLeft: string;
    };
    scrollToBottomStyles: {
        boxShadow: string;
        border: string;
        height: string;
        width: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        borderRadius: string;
    };
    scrollToBottomIcon: {
        height: string;
        width: string;
        transform: string;
    };
    loadMessagesContainerForViewRecent: {
        display: string;
        justifyContent: string;
        width: string;
        flexShrink: number;
        padding: string;
        flexDirection: string;
        alignItems: string;
    };
    previewStyles: {
        cursor: string;
        textDecoration: string;
        fontWeight: number;
        color: string;
        marginLeft: string;
    };
};
export default CcfDigitalEmailV2Styles;
