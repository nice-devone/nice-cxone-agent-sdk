import { Theme } from '@mui/material';
/**
 * style object for ccf-productivity
 * @returns CcfProductivityStyles styles object
 * ```
 * @example
 * <CcfProductivityStyles />
 * ```
 */
declare const CcfProductivityStyles: (theme: Theme) => {
    productivityListContainer: {
        flexDirection: string;
        alignItems: string;
        marginBottom: string;
    };
    productivityListTitle: {
        display: string;
        flexDirection: string;
        alignItems: string;
    };
    productivityListItem: {
        display: string;
        flexDirection: string;
        width: string;
        marginBottom: string;
    };
    details: {
        background: string | undefined;
        height: string;
        display: string;
    };
    productivityListItemContainer: {
        display: string;
        flexDirection: string;
        alignItems: string;
        height: string;
        overflow: string;
        padding: string;
        backgroundColor: string;
    };
    textEllipsis: {
        whiteSpace: string;
        overflow: string;
        textOverflow: string;
    };
};
export default CcfProductivityStyles;
