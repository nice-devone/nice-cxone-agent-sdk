import { Theme } from '@mui/material';
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardDetailsStyles
 * @example <customerCardDetailsStyles />
 */
declare const customerCardStyles: (theme: Theme) => {
    customerCardContainer: {
        [x: string]: string | {
            marginLeft: string;
            overflow: string;
            height?: undefined;
            width?: undefined;
        } | {
            marginLeft: string;
            height: string;
            overflow: string;
            width?: undefined;
        } | {
            width: string;
            marginLeft?: undefined;
            overflow?: undefined;
            height?: undefined;
        };
        width: string;
        height: string;
        overflow: string;
        '&::-webkit-scrollbar': {
            width: string;
        };
    };
    accordionContainer: {
        boxShadow: string;
        display: string;
    };
    ccfAppSpaceAccordionHeader: {
        flexDirection: string;
        paddingLeft: string;
    };
    accordionHeaderExpand: {
        flexDirection: string;
        paddingLeft: string;
        borderTop: string;
        boxShadow: string;
    };
    accordionHeaderActivityExpand: {
        flexDirection: string;
        paddingLeft: string;
        borderTop: string;
        boxShadow: string;
    };
    contactCardDetailsContainer: {
        maxHeight: string;
        overflowY: string;
        paddingLeft: string;
    };
    expandedIcon: {
        transform: string;
        height: string;
        width: string;
        background: string;
        color: string;
    };
    contactCardTitle: {
        font: string;
        letterSpacing: string;
        color: string;
        opacity: number;
    };
    customerNoteParent: {
        display: string;
        justifyContent: string;
        alignItems: string;
        width: string;
    };
    hideAccordion: {
        display: string;
    };
    mergeIcon: {
        position: string;
        right: string;
    };
    ccAlert: {
        position: string;
        bottom: number;
        width: string;
    };
    notesAccordionTitle: {
        fontWeight: string;
    };
    alignCenter: {
        textAlign: string;
    };
    customerCardParentContainer: {
        width: string;
        height: string;
        position: string;
        display: string;
        flexDirection: string;
    };
    ccAlertContainer: {
        position: string;
        bottom: string;
        width: string;
        zIndex: string;
    };
};
export default customerCardStyles;
