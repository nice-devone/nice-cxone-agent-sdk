import { Theme } from '@mui/material';
/**
 * return styles used for the component
 * @example <directorySearchStyles />
 * @returns styles
 */
declare const directorySearchStyles: (theme: Theme) => {
    searchInputField: {
        '&::placeholder': {
            color: string;
            opacity: number;
        };
    };
};
export default directorySearchStyles;
