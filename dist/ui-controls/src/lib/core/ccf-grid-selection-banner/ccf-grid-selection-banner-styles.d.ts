import { Theme } from '@mui/material';
/**
 * style object for ccf-grid-selection-banner
 * @returns CcfGridSelectionBannerStyle style object
 * @example CcfGridSelectionBannerStyle(theme)
 */
declare const CcfGridSelectionBannerStyle: (theme: Theme, isTwoColumnDesign: boolean) => {
    gridSelectionContainer: {
        width: string;
        height: string;
        border: string;
        borderColor: string;
        borderRadius: string;
        padding: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        flexDirection: string;
        gap: number;
    };
    gridItems: {
        display: string;
        justifyContent: string;
    };
    gridSelectionLabel: {
        color: string;
        fontSize: string;
        fontWeight: number;
    };
    headerContainer: {
        display: string;
    };
    actionButtonContainer: {
        display: string;
        gap: string;
    };
    actionButton: {
        display: string;
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
        height: string;
        maxWidth: string;
        padding: string;
        color: string;
        borderColor: string;
        alignContent: string;
        fontSize: string;
        fontWeight: number;
    };
};
export default CcfGridSelectionBannerStyle;
