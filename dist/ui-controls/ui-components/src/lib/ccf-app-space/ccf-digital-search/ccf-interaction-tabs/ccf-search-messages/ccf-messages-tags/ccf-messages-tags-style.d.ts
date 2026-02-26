import { Theme } from '@mui/material';
/**
 * Styling for CcfMessagesTag
 * @returns Scheduler CSS properties as a JSON object
 * @example CcfMessagesTagStyles
 */
declare const CcfMessagesTagStyles: (theme: Theme) => {
    tagWrapper: {
        display: string;
        flexWrap: string;
    };
    popover: {
        '.MuiPaper-root': {
            width: string;
            maxHeight: string;
            padding: string;
            position: string;
            overflowY: string;
        };
    };
    chipStyle: {
        [x: string]: string | {
            fontSize: string;
            marginRight?: undefined;
            marginBottom?: undefined;
            border?: undefined;
        } | {
            marginRight: string;
            marginBottom: string;
            fontSize?: undefined;
            border?: undefined;
        } | {
            border: string;
            fontSize?: undefined;
            marginRight?: undefined;
            marginBottom?: undefined;
        };
        color: string;
        width: string;
        maxWidth: string;
        margin: string;
        fontSize: string;
        border: string;
        '&.MuiButtonBase-root': {
            marginRight: string;
            marginBottom: string;
        };
        '&.Mui-focusVisible': {
            border: string;
        };
    };
    viewLess: {
        marginLeft: string;
    };
    flexVerticalCenter: {
        display: string;
        alignItems: string;
    };
};
export default CcfMessagesTagStyles;
