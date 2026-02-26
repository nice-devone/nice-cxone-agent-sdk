import { Theme } from '@mui/material';
/**
 * Styling for CcfEmptyCopilotState
 * @returns CcfEmptyCopilotState CSS properties as a JSON object
 *  @example -
 * ```
 * styles = ccfEmptyCopilotStateStyles(theme);
 * ```
*/
declare const ccfEmptyCopilotStateStyles: (theme: Theme) => {
    emptyStateContainer: {
        display: string;
        flexDirection: string;
        justifyContent: string;
        height: string;
        margin: string;
    };
    sparklesIcon: {
        height: string;
        width: string;
        alignSelf: string;
        m: number;
    };
    suggestionIcon: {
        alignSelf: string;
    };
    contentContainer: {
        display: string;
        flexDirection: string;
        alignItems: string;
        gap: number;
    };
    textContainer: {
        display: string;
        flexDirection: string;
    };
    title: {
        fontWeight: string;
    };
    description: {
        color: string;
    };
};
export default ccfEmptyCopilotStateStyles;
