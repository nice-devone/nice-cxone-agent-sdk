import { Theme } from '@mui/material';
/**
 * renders the style for switch item
 * @param props - Theme
 * @example CCfSwitchItemStyle()
 * @returns return the style for switch item
 */
export declare const CCfSwitchItemStyle: (theme: Theme) => {
    toggleSwitch: {
        '& .MuiSwitch-switchBase.Mui-focusVisible + .MuiSwitch-track': {
            outline: string;
            outlineOffset: string;
        };
    };
};
