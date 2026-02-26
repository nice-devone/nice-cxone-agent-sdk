import { Theme } from '@mui/material';
/**
 * style object for ccf-tooltip-style
 * @returns CcfTooltipStyle styles object
 * ```
 * @example
 * <CcfTooltipStyle/>
 * ```
 */
declare const CcfTooltipStyle: (theme: Theme) => {
    ccfTooltipArrow: {
        color: string;
    };
    ccfTooltipRight0: {
        marginRight: string;
        backgroundColor: string;
        font: string;
        letterSpacing: string;
        color: string;
        opacity: string;
        paddingTop: string;
        paddingBottom: string;
    };
    ccfTooltip: {
        backgroundColor: string;
        font: string;
        letterSpacing: string;
        lineHeight: string;
        color: string;
        opacity: string;
        paddingTop: string;
        paddingBottom: string;
    };
    '& .MuiTooltip-tooltipPlacementBottom': {
        marginTop: string;
    };
    '& .MuiTooltip-tooltipPlacementRight': {
        marginLeft: string;
    };
    ccfTooltipArrowSettings: {
        color: string;
    };
    ccfTooltipSettings: {
        borderRadius: string;
        width: string;
        height: string;
        backgroundColor: string;
        boxShadow: string;
        padding: string;
    };
};
export default CcfTooltipStyle;
