import { Theme } from '@mui/material';
/**
   * @example styles for toast component
   */
declare const CcfAppToastMessageStyles: (theme: Theme) => {
    toastMessage: {
        '.text,.titleText,.subMessageText': {
            color: string;
            marginLeft: string;
            marginBottom: string;
            marginRight: string;
        };
        '.confimationBtn button': {
            marginRight: string;
            width: string;
            fontSize: string;
            padding: string;
        };
        '.text span': {
            fontWeight: string;
            fontSize: string;
        };
    };
    text: {
        color: string;
        fontWeight: string;
    };
    logoutConfirmationPanel: {
        [x: string]: {
            display: string;
        };
    };
    subText: {
        color: string;
    };
    secondaryButton: {
        float: string;
    };
    primaryBtn: {
        left: string;
    };
    alignButtonsRight: {
        display: string;
        justifyContent: string;
        button: {
            marginRight: string;
        };
    };
    primaryButtonAlertBackground: {
        '.primaryBtn, .primaryBtn:hover': {
            backgroundColor: string;
            boxShadow: string;
        };
    };
    buttonStyles: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
        '&:hover': {
            border: string;
            borderRadius: string;
        };
    };
};
export default CcfAppToastMessageStyles;
