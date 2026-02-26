import { Theme } from '@mui/material';
/**
 * style object for Ccf-interaction-reset-and-refresh-bar
 * @returns CcfInteractionResetAndRefreshStyles object
 * @example CcfInteractionResetAndRefreshStyles(theme)
 */
declare const CcfInteractionResetAndRefreshStyles: (theme: Theme) => {
    container: {
        display: string;
        flexDirection: string;
        flexWrap: string;
        button: {
            height: string;
            width: string;
            border: string;
            boxShadow: string;
            padding: string;
            marginLeft: string;
            '&:hover': {
                border: string;
                boxShadow: string;
                backgroundColor: string;
            };
            backgroundColor: string;
        };
    };
    icon: {
        height: string;
        width: string;
        color: string;
    };
    refreshIcon: {
        paddingBottom: string;
        marginRight: string;
    };
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    buttonText: {
        fontSize: string;
        fontWeight: string;
        fontStyle: string;
        marginLeft: string;
        color: string;
    };
};
export default CcfInteractionResetAndRefreshStyles;
