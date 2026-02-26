import { Theme } from '@mui/material';
/**
 * Styles for Input menu control
 * @example - CcfInputMenuStyles(theme)
 */
export declare const CcfInputMenuStyles: (theme: Theme) => {
    container: {
        position: string;
        width: string;
    };
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    paper: {
        position: string;
        zIndex: number;
        marginTop: number;
        width: string;
        maxHeight: string;
        overflow: string;
        li: {
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            '&:focus-visible, &:active': {
                border: string;
                borderRadius: string;
            };
            '&:hover': {
                backgroundColor: string;
                borderRadius: string;
            };
        };
    };
};
