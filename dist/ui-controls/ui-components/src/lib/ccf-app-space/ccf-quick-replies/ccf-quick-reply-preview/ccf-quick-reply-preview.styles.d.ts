import { Theme } from '@mui/material';
/**
 * Styling for ccf-app-space-quick-replies-preview
 * @returns ccf-app-space-quick-replies-preview CSS properties as a JSON object
 * @example ccfQuickRepliesPreviewStyles(theme)
*/
declare const ccfQuickRepliesPreviewStyles: (theme: Theme, placeHolderArrayLength: number, error?: boolean) => {
    replyCardWrapper: {
        flexDirection: string;
        height: string;
        display: string;
        paddingTop: string;
        '*': {
            wordBreak: string;
        };
    };
    backSection: {
        display: string;
        padding: string;
        width: string;
        cursor: string;
    };
    backBtn: {
        padding: string;
    };
    breadcrumbLabel: {
        letterSpacing: number;
        color: string | undefined;
        fontSize: string;
        fontWeight: string;
    };
    backIcon: {
        fill: string | undefined;
        fontSize: string;
    };
    replyCardInfo: {
        display: string;
        justifyContent: string;
        height: string;
        background: string;
        paddingLeft: string;
        width: string;
    };
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    hoveredElement: {
        '&:hover': {
            backgroundColor: string;
            borderRadius: string;
        };
    };
    replyTitle: {
        display: string;
        alignItems: string;
        font: string;
        letterSpacing: string;
        color: string;
    };
    replyFavIcon: {
        display: string;
        justifyContent: string;
    };
    replyBodySection: {
        padding: string;
        flexGrow: number;
        maxHeight: string;
        overflowY: string;
    };
    replyContentBody: {
        [x: string]: string | number | {
            display: string;
            margin: string;
            position: string;
            bottom: string;
            fontSize?: undefined;
        } | {
            fontSize: string;
            display?: undefined;
            margin?: undefined;
            position?: undefined;
            bottom?: undefined;
        };
        letterSpacing: number;
        color: string;
        fontSize: string;
        display: string;
        borderBottom: string | 0;
        paddingBottom: string;
        '.placeholder': {
            display: string;
            margin: string;
            position: string;
            bottom: string;
        };
    };
    favReply: {
        color: string;
    };
    nonFavReply: {
        color: string;
    };
    editableVarFieldContainer: {
        [x: string]: string | {
            padding: string;
            width: string;
            fontSize: string;
            textOverflow: string;
            borderTop?: undefined;
            borderLeft?: undefined;
            borderRight?: undefined;
            borderRadius?: undefined;
            borderColor?: undefined;
        } | {
            borderTop: number;
            borderLeft: number;
            borderRight: number;
            borderRadius: number;
            borderColor: string;
            padding?: undefined;
            width?: undefined;
            fontSize?: undefined;
            textOverflow?: undefined;
        } | {
            fontSize: string;
            padding?: undefined;
            width?: undefined;
            textOverflow?: undefined;
            borderTop?: undefined;
            borderLeft?: undefined;
            borderRight?: undefined;
            borderRadius?: undefined;
            borderColor?: undefined;
        };
        display: string;
        flexDirection: string;
        width: string;
        margin: string;
        maxWidth: string;
        input: {
            padding: string;
            width: string;
            fontSize: string;
            textOverflow: string;
        };
        '.MuiOutlinedInput-notchedOutline': {
            borderTop: number;
            borderLeft: number;
            borderRight: number;
            borderRadius: number;
            borderColor: string;
        };
    };
    inputLabel: {
        font: string;
        letterSpacing: number;
        color: string | undefined;
    };
    sendBtn: {
        boxShadow: string;
        border: string;
        borderRadius: string;
        font: string;
        letterSpacing: string;
    };
    activeSend: {
        background: string;
        borderRadius: string;
        font: string;
        letterSpacing: string;
        color: string;
    };
    sendButtonBox: {
        width: string;
        justifyContent: string;
        button: {
            margin: string;
            boxShadow: string;
            cursor: string;
            ':hover': {
                boxShadow: string;
            };
        };
    };
    loader: {
        display: string;
        justifyContent: string;
        paddingTop: string;
        height: string;
    };
    inputContainer: {
        marginTop: string;
    };
    label: {
        marginBottom: string;
    };
    input: {
        marginBottom: string;
    };
    timerReplayContent: {
        buttonBox: {
            paddingLeft: string;
            paddingRight: string;
            display: string;
            justifyContent: string;
        };
        chip: {
            color: string;
            fontWeight: string;
            margin: string;
            backgroundColor: string;
        };
        date: {
            color: string;
            paddingBottom: string;
            fontSize: string;
        };
        timeSlotContainer: {
            padding: string;
        };
        icon: {
            height: string;
            width: string;
            color: string;
        };
        buttonText: {
            fontSize: string;
            fontWeight: string;
            fontStyle: string;
            marginLeft: string;
            color: string;
        };
        sendBtn: {
            ':hover': {
                border: string;
                borderRadius: string;
            };
            '&:focus': {
                border: string;
                borderRadius: string;
            };
        };
        slotsSection: {
            overflowY: string;
        };
        contentBody: {
            display: string;
            flexDirection: string;
            justifyContent: string;
            height: string;
            overflowY: string;
        };
        container: {
            PaddingLeft: string;
            marginTop: string;
        };
        label: {
            fontSize: string;
            fontWeight: string;
            paddingLeft: string;
        };
        label2: {
            fontSize: string;
            fontWeight: string;
            paddingLeft: string;
        };
        durationList: {
            width: string;
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            overflow: string;
            height: string;
            lineHeight: string;
            color: string;
            background: string;
            '&:focus': {
                border: string;
                borderRadius: string;
            };
        };
        footer: {
            padding: string;
            display: string;
            justifyContent: string;
        };
        calenderInput: {
            paddingLeft: string;
            width: string;
            paddingRight: string;
        };
        removeBtn: {
            border: string;
            boxShadow: string;
            ':hover': {
                backgroundColor: string;
                borderRadius: string;
                boxShadow: string;
            };
            '&:focus': {
                border: string;
                borderRadius: string;
            };
            '&.Mui-disabled': {
                boxShadow: string;
                backgroundColor: string;
            };
        };
    };
    secureFormLinkText: {
        padding: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
    };
    formSendButtonBox: {
        width: string;
        justifyContent: string;
        button: {
            border: string;
            margin: string;
            boxShadow: string;
            cursor: string;
            ':hover': {
                border: string;
                borderRadius: string;
                boxShadow: string;
            };
            '&:focus': {
                border: string;
                borderRadius: string;
            };
        };
    };
    menuItem: {
        border: string;
        '&:hover': {
            backgroundColor: string;
        };
        '&:focus': {
            border: string;
        };
    };
};
export default ccfQuickRepliesPreviewStyles;
