import { Theme } from '@mui/material';
/**
 * style object for ccf-preview-only-contact-card
 * @returns CcfPreviewOnlyContactCard styles object
 * ```
 * @example
 * <CcfPreviewOnlyContactCard />
 * ```
 */
declare const ccfPreviewOnlyContactCardStyle: (theme: Theme, isSelected: boolean) => {
    inboxExpandedCardContainer: {
        alignItems: string;
        justifyContent: string;
    };
    iconAndCustomerNameWrapper: {
        display: string;
        width: string;
        alignItems: string;
    };
    customerNameContainer: {
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
    };
    customerName: {
        font: string;
        display: string;
        padding: string;
        letterSpacing: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
        paddingLeft: string;
        marginTop: string;
    };
    inboxCollapsedCloseIcon: {
        padding: number;
        marginLeft: string;
    };
    revampinboxCollapsedCloseIcon: {
        padding: number;
    };
    previewOnlyContactCard: {
        display: string;
        position: string;
    };
    inboxCollapsedCardContent: {
        display: string;
        paddingRight: string | number;
    };
    crossIcon: {
        width: string;
    };
};
export default ccfPreviewOnlyContactCardStyle;
