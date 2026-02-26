import { Theme } from '@mui/material';
/**
 * Styling for ccf-app-space-quick-replies
 * @returns ccf-app-space-quick-replies CSS properties as a JSON object
 * @example ccfQuickRepliesStyles(theme)
*/
declare const ccfAppHamburgerMenuStyles: (theme: Theme) => {
    divider: {
        opacity: number;
    };
    closeButton: {
        display: string;
        justifyContent: string;
        fontSize: string;
        marginTop: string;
        opacity: string;
        backgroundColor: string;
        border: string;
        boxShadow: string;
        '&:hover': {
            backgroundColor: string;
            border: string;
            boxShadow: string;
        };
    };
    menuName: {
        fontSize: string;
        marginLeft: string;
        marginRight: string;
        overflow: string;
        textOverflow: string;
    };
    launchIcon: {
        marginLeft: string;
        color: string;
        fontFamily: string;
    };
    dragIconContainer: {
        display: string;
    };
    closeIcon: {
        cursor: string;
        color: string;
    };
    draggableItem: {
        '& >div': {
            padding: string;
            opacity: string;
            '&:hover, &:visited': {
                backgroundColor: string;
            };
        };
        '&:nth-child(8)': {
            '&>div': {
                paddingBottom: string;
            };
        };
        '&:nth-child(9)': {
            '&>div': {
                paddingTop: string;
            };
        };
        '& button.popOverOverflow ': {
            maxHeight: string;
            '& span': {
                marginLeft: string;
            };
        };
    };
    customizeText: {
        fontWeight: import("csstype").Property.FontWeight | undefined;
        color: string;
    };
    listSubheader: {
        display: string;
        justifyContent: string;
        marginTop: string;
        paddingRight: string;
    };
    dragIcon: {
        cursor: string;
    };
    menuActive: {
        '& .Mui-selected': {
            backgroundColor: string | undefined;
        };
    };
    pinIcon: {
        height: string;
        width: string;
        color: string | undefined;
        padding: string;
        margin: string;
        transform: string;
    };
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
};
export default ccfAppHamburgerMenuStyles;
