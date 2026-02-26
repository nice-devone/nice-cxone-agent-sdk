import { Theme } from '@mui/material';
/**
 * Styling for ccf-network-speed-indicator
 * @returns ccf-network-speed-indicator CSS properties as a JSON object
 * @example ccfNetworkSpeedIndicatorStyles(theme)
 */
export declare const ccfNetworkSpeedIndicatorStyles: (theme: Theme) => {
    networkSpeed: {
        outline: number;
        border: number;
        borderRadius: string;
        width: string;
        transition: string;
        overflow: string;
        height: string;
        marginTop: string;
        '-webkit-appearance': string;
        backgroundImage: string;
        '&::-webkit-slider-runnable-track': {
            height: string;
            '-webkit-appearance': string;
            color: string;
            transition: string;
        };
        '&::-webkit-slider-thumb': {
            width: string;
            '-webkit-appearance': string;
            height: string;
            cursor: string;
            background: string;
            boxShadow: string;
            border: string;
            borderRadius: string;
            transition: string;
            position: string;
        };
        '&:active::-webkit-slider-thumb': {
            background: string;
        };
    };
    networkStatusLabel: {
        fontSize: string;
        lineHeight: string;
        color: string;
    };
};
export default ccfNetworkSpeedIndicatorStyles;
