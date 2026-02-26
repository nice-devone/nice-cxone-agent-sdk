import { Theme } from '@mui/material';
/**
 * Styling for ccf-rich-editor-wrapper
 * @returns ccf-rich-editor-wrapper CSS properties as a JSON object
 * @example CcfContactEditorStyles(theme)
*/
declare const CcfContactEditorStyles: (theme: Theme, isOBContact?: boolean, isDraft?: boolean) => {
    iconContainer: {
        height: string;
        width: string;
    };
    revampedAddNotesContainer: {
        height: string;
        width: string;
    };
    commonBox: {
        display: string;
        justifyContent: string;
        flexWrap: string;
        button: {
            border: string;
            boxShadow: string;
            '&:hover': {
                border: string;
                boxShadow: string;
            };
        };
        marginTop: string;
        marginBottom: string;
    };
    revampCommonBox: {
        flexWrap: string;
        gap: string;
    };
    rightSideBox: {
        [x: string]: {
            paddingBottom: string;
        };
    };
    leftSideBox: {
        [x: string]: {};
    };
    btnContainer: {
        'min-width': string;
        padding: number;
    };
    button: {
        color: string;
        minWidth: string;
        '&:hover': {
            backgroundColor: string;
        };
        padding: number;
    };
    buttonActive: {
        background: string | undefined;
        marginRight: string;
    };
    clearRelpyBtn: {
        color: string;
        width: string;
    };
    revampedEmailClearReplyBtn: {
        color: string;
        width: string;
        height: string;
    };
    revampedClearReplyContainer: {
        height: string;
        width: string;
    };
    focusedElement: {
        border: string;
        '&:focus': {
            borderColor: string;
            borderRadius: string;
        };
    };
    addNotesBtn: {
        width: string;
    };
    revampedAddNotesBtn: {
        width: string;
        height: string;
    };
    sendButtonElement: {
        marginRight: string;
    };
    revampedSendButton: {
        marginRight: string;
        height: string;
        minWidth: string;
    };
    editorContainer: {
        'overflow-y': string | boolean;
        display: string;
        gridTemplateRows: string;
        gridTemplateColumns: string;
        height: string;
        borderRadius: string;
        width: string | boolean;
        margin: string;
        boxShadow: string;
    };
    customerNameBox: {
        width: string;
        justifyContent: string;
        display: string;
        flexDirection: string;
        alignItems: string;
        customerNameDisplay: {
            display: string;
            padding: string;
            width: string;
            fontWeight: number;
            fontSize: string;
            lineHeight: number;
        };
        discardBtnTooltip: {
            width: string;
        };
    };
};
export default CcfContactEditorStyles;
