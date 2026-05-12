import { Theme } from '@mui/material';
/**
 * renders the style for switch item
 * @param props - Theme
 * @example CCfSwitchItemStyle()
 * @returns return the style for switch item
 */
export declare const CCfSwitchItemStyle: (theme: Theme) => {
    toggleSwitch: {
        '& .MuiSwitch-track': {
            backgroundColor: string;
            opacity: number;
        };
        '& .MuiSwitch-thumb': {
            backgroundColor: string;
            border: string;
        };
        '& .MuiSwitch-switchBase:hover + .MuiSwitch-track': {
            backgroundColor: string;
            opacity: number;
        };
        '& .MuiSwitch-switchBase.Mui-focusVisible + .MuiSwitch-track': {
            outline: string;
            outlineOffset: string;
        };
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: string;
            opacity: number;
        };
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: string;
        };
    };
};
