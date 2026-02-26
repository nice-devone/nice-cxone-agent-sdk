import { Theme } from '@mui/material';
/**
 * style object for Ccf Digital Contact Tab Panel
 * @returns CcfDigitalContactTabPanelStyle styles object
 * ```
 * @example
 * <CcfDigitalContactTabPanelStyle/>
 * ```
 */
declare const CcfDigitalContactTabPanelStyle: (theme: Theme) => {
    tabsContainer: {
        [x: string]: string | {
            borderRadius: number;
            fill?: undefined;
        } | {
            fill: string;
            borderRadius?: undefined;
        };
        display: string;
        background: string;
        borderTop: string;
        borderBottomLeftRadius: string;
        borderBottomRightRadius: string;
        flexGrow: string;
        flexDirection: string;
        overflowX: string;
        height: string;
        '.MuiSvgIconroot': {
            fill: string;
        };
    };
    interactionGrid: {
        [x: string]: string | number | {
            width: string;
            position?: undefined;
        } | {
            position: string;
            width: string;
        };
        width: string;
        display: string;
        flexDirection: string;
        height: string;
        WebkitFlexGrow: number;
        position: string;
        tabsContainer: {
            position: string;
            width: string;
        };
    };
};
export default CcfDigitalContactTabPanelStyle;
