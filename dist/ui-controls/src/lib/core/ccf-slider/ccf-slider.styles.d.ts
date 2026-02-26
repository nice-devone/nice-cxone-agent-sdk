import { Theme } from '@mui/material';
/**
 * Styling for ccfSliderStyles
 * @returns ccfSliderStyles CSS properties as a JSON object
 * @example ccfSliderStyles
 */
declare const ccfSliderStyles: (theme: Theme) => {
    root: {
        width: number;
        margin: string;
    };
    margin: {
        height: string;
    };
    slider: {
        height: number;
        padding: string;
        background: string;
        pointerEvents: string;
        '& .MuiSlider-thumb': {
            height: number;
            width: number;
            backgroundColor: string;
            border: string;
            pointerEvents: string;
            marginTop: string;
            marginLeft: string;
            '&:focus, &:hover, &$active': {
                boxShadow: string;
            };
        };
        '& .MuiSlider-valueLabel': {
            left: string;
            top: number;
            '& *': {
                background: string;
                font: string;
                color: string;
            };
        };
        '& .MuiSlider-track': {
            height: number;
        };
        '& .MuiSlider-rail': {
            opacity: number;
            height: number;
        };
        '& .MuiSlider-mark': {
            backgroundColor: string;
            height: string;
            width: string;
            marginTop: string;
        };
        '& .MuiSlider-markActive': {
            opacity: number;
        };
    };
};
export default ccfSliderStyles;
