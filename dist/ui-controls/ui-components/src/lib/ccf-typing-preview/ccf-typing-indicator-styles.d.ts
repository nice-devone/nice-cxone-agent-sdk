import { Theme } from '@mui/material';
/**
 * style object for ccf-typing-indicator
 * @returns CcfTypingIndicatorStyle styles object
 * ```
 * @example
 * <CcfTypingIndicatorStyle />
 * ```
 */
declare const CcfTypingIndicatorStyle: (theme: Theme) => {
    typingIndicatorContainer: {
        display: string;
        backgroundColor: string;
        padding: string;
        borderRadius: string;
        margin: string;
        maxWidth: string;
    };
    flexContainer: {
        display: string;
        flexDirection: string;
        alignItems: string;
    };
    iconContainer: {
        display: string;
        alignItems: string;
    };
    previewText: {
        color: string;
        fontSize: string;
        fontStyle: string;
        maxHeight: string;
        minHeight: string;
        overflowY: string;
    };
};
export default CcfTypingIndicatorStyle;
