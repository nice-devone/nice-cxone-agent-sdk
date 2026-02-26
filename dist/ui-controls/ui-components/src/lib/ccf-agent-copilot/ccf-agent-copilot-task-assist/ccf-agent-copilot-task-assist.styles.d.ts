import { Theme } from '@mui/material';
/**
 * Styling for CcfAgentCopilotTaskAssist
 * @returns CcfAgentCopilotTaskAssist CSS properties as a JSON object
 * @example CcfAgentCopilotTaskAssistStyles(theme)
*/
declare const CcfAgentCopilotTaskAssistStyles: (theme: Theme) => {
    button: {
        padding: string;
        width: string;
        color: string;
        borderColor: string;
        '& span': {
            margin: string;
        };
    };
    sparklesIcon: {
        height: string;
        width: string;
    };
    popover: {
        transform: string;
    };
    popoverPaper: {
        width: string;
    };
    header: {
        display: string;
        justifyContent: string;
        alignItems: string;
        padding: number;
        backgroundColor: string | undefined;
    };
    headerTitle: {
        display: string;
        alignItems: string;
    };
    taskList: {
        maxHeight: string;
        minHeight: string;
        overflowY: string;
        padding: number;
        paddingTop: number;
        '&::-webkit-scrollbar': {
            width: string;
        };
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: string;
            borderRadius: string;
        };
        '&::-webkit-scrollbar-track': {
            backgroundColor: string;
        };
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: string;
        };
    };
    sparklesIconHeader: {
        marginTop: number;
        marginLeft: number;
    };
    headerText: {
        marginLeft: number;
        fontWeight: number;
        letterSpacing: string;
    };
    displayName: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        color: string;
        paddingBottom: number;
        fontWeight: number;
        letterSpacing: string;
    };
    intentDescription: {
        fontWeight: number;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        color: string;
    };
    listItem: {
        mb: number;
        borderRadius: number;
        border: string;
        padding: number;
        backgroundColor: string | undefined;
        cursor: string;
        '&:hover': {
            backgroundColor: string;
        };
    };
    listItemError: {
        cursor: string;
        backgroundColor: string;
        '&:hover': {
            backgroundColor: string;
        };
        mb: number;
        borderRadius: number;
        border: string;
        padding: number;
    };
    errorName: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        color: string;
        fontWeight: number;
        letterSpacing: string;
    };
    errorDescription: {
        fontWeight: number;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        color: string;
    };
    searchBox: {
        maxHeight: string;
        overflowY: string;
        padding: number;
        paddingBottom: string;
        paddingRight: number;
    };
    copilotContent: {
        color: string;
        border: string;
        margin: string;
        borderRadius: string;
        backgroundColor: string;
    };
    expandablePopover: {
        paper: {
            boxShadow: string;
            position: "relative";
            marginRight: string;
            marginBottom: string;
            pointerEvents: "auto";
        };
        container: {
            pointerEvents: "none";
            transform: string;
            '& .MuiBackdrop-root': {
                backgroundColor: string;
            };
        };
        closeButton: {
            display: string;
            flexDirection: "column";
            position: "absolute";
            top: string;
            right: string;
            zIndex: number;
        };
    };
};
export default CcfAgentCopilotTaskAssistStyles;
