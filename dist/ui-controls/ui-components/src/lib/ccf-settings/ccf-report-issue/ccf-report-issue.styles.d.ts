import { Theme } from '@mui/material';
/**
 * Styling for CcfReportIssue
 * @returns reportIssueStyles CSS properties as a JSON object
 * @example reportIssueStyles
 */
declare const reportIssueStyles: (theme: Theme) => {
    container: {
        display: string;
        flexDirection: string;
        marginLeft: string;
        paddingRight: string;
        overflowY: string;
        position: string;
        height: string;
        width: string;
        borderRadius: string;
        '& label': {
            marginLeft: number;
        };
    };
    header: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        fontWeight: import("csstype").Property.FontWeight | undefined;
        padding: string;
    };
    inputLabel: {
        textTransform: string;
        fontSize: import("csstype").Property.FontSize<string | number>;
        fontWeight: string | (string & {}) | (number & {});
        whiteSpace: string;
        overflow: string;
        '& .MuiInputLabel-asterisk': {
            color: string;
        };
    };
    select: {
        width: {
            xs: string;
            lg: string;
        };
        height: string;
    };
    textArea: {
        resize: string;
        border: string;
        borderRadius: string;
        width: string;
    };
    textAreaFocused: {
        border: string;
    };
    textAreaContainer: {
        width: {
            xs: string;
            lg: string;
        };
    };
    sendButton: {
        float: string;
        marginTop: string;
        boxShadow: string;
        '&:hover, &:disabled': {
            boxShadow: string;
        };
        '&:focus': {
            border: string;
        };
    };
    emptySelectionText: {
        color: string;
        fontSize: string;
        marginBottom: string;
    };
    menuItem: {
        border: string;
    };
    hoveredElement: {
        '&:hover': {
            backgroundColor: string;
        };
    };
    focusedElement: {
        border: string;
        '&:focus': {
            border: string;
        };
    };
    checkBox: {
        '&.MuiCheckbox-root': {
            border: string;
        };
        '&.MuiCheckbox-root.Mui-focusVisible': {
            border: string;
        };
    };
};
export default reportIssueStyles;
