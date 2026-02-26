import { Theme } from '@mui/material';
declare const CcfInteractionMenuStyles: (theme: Theme) => {
    moreItemsBtn: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    menuItemContent: {
        [x: string]: string | {
            color: string;
            width: string;
            overflow: string;
            fontSize: string;
            boxSizing: string;
            minHeight: string;
            fontWeight: string;
            lineHeight: string;
            whiteSpace: string;
        };
        alignItems: string;
    };
    menuItemIcon: {
        [x: string]: string | {
            marginRight: string;
        };
        alignItems: string;
    };
    menuItemMinHeight: {
        [x: string]: {
            minHeight: string;
            backgroundColor?: undefined;
            border?: undefined;
            borderRadius?: undefined;
        } | {
            backgroundColor: string;
            border: string;
            borderRadius: string;
            minHeight?: undefined;
        };
        '&:focus': {
            backgroundColor: string;
            border: string;
            borderRadius: string;
        };
    };
    menuItemNameBold: {
        [x: string]: {
            fontSize: string;
            fontWeight: string;
            paddingLeft: string;
            marginTop: string;
            display: string;
        };
    };
    menuItemTextNormal: {
        display: string;
    };
    menuItemMinTransfer: {
        [x: string]: string | {
            minHeight: string;
        };
        paddingLeft: string;
    };
    menuItemIconTransfer: {
        [x: string]: {
            paddingLeft: string;
        };
    };
    dividerMenuOption: {
        margin: string;
        borderBottomWidth: string;
        width: string;
    };
    deleteMenuOptions: {
        marginTop: string;
    };
    replyIcon: {
        position: string;
        top: string;
        left: string;
    };
    likeOption: {
        marginTop: string;
        paddingLeft: string;
    };
};
export default CcfInteractionMenuStyles;
