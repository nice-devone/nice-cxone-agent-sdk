import { Theme } from '@mui/material';
/**
 * return styles used for the component
 * @example <ccfKeypadStyles />
 * @returns styles
 */
declare const ccfKeypadStyles: (theme: Theme) => {
    keyPadContainer: {
        width: string;
        backgroundColor: string;
        borderRadius: string;
        padding: string;
    };
    keyPadSmViewContainer: {
        width: string;
        height: string;
        backgroundColor: string;
        borderRadius: string;
        padding: string;
    };
    closeIconContainer: {
        display: string;
        alignItems: string;
        margin: string;
        cursor: string;
        width: string;
    };
    muteIconButtonContainer: {
        display: string;
        justifyContent: string;
        '& svg': {
            fill: string;
        };
    };
};
export default ccfKeypadStyles;
