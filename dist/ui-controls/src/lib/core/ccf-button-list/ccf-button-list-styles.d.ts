import { Theme } from '@mui/material';
/**
 * Styles for Ccf Button List
 * @example CcfButtonListStyles()
 */
declare const CcfButtonListStyles: (theme: Theme) => {
    iconStyle: {
        backgroundColor: string;
        fontSize: string;
        padding: string;
        minWidth: string;
        width: string;
    };
    downArrowIcon: {
        borderLeft: string;
    };
    smallIcon: {
        '& svg': {
            fontSize: string;
        };
    };
};
export default CcfButtonListStyles;
