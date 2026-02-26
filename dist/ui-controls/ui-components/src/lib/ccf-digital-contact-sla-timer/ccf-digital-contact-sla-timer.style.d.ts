import { Theme } from '@mui/material';
/**
   * style object for ccf-digital-contact-sla-timer
   * @returns ccfDigitalContactSLATimerStyles styles object
   * ```
   * @example
   * <CcfDigitalContactSLATimerStyles />
   * ```
   */
declare const CcfDigitalContactSLATimerStyles: (theme: Theme) => {
    timerBox: {
        display: string;
        justifyContent: string;
        padding: string;
        '@media (hover: none)': {
            borderBottom: string;
            padding: string;
            '.MuiBox-root': {
                paddingLeft: number;
                paddingBottom: string;
                marginLeft: string;
                marginRight: string;
            };
        };
    };
    timer: {
        fontWeight: string;
        fontSize: string;
    };
    yellowWarning: {
        color: string;
    };
    redWarning: {
        color: string;
    };
    restTimer: {
        button: {
            padding: number;
            boxShadow: string;
            cursor: string;
            borderRadius: string;
            lineHeight: string;
            minWidth: string;
        };
    };
    addIcon: {
        fontSize: string;
    };
    timeText: {
        color: string;
        fontSize: string;
        fontWeight: import("csstype").Property.FontWeight | undefined;
    };
    slaTooltip: {
        width: string;
        paddingBottom: string;
    };
    channelTypeTimer: {
        fontWeight: string;
        fontSize: string;
        padding: string;
    };
    timerTitle: {
        padding: string;
    };
    collapsedTimerTitle: {
        padding: string;
    };
};
export default CcfDigitalContactSLATimerStyles;
