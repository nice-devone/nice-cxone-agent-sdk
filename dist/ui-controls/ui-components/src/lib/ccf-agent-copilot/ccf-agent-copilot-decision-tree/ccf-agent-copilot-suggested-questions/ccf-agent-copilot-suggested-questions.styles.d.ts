import { Theme } from '@mui/material';
/**
 * Styles factory for `CcfAgentCopilotSuggestedQuestions` component.
 * Simplified for single-section rendering with consistent spacing.
 * @param theme - The MUI theme object.
 * @returns An object containing the styles.
 * @example
 * const styles = ccfAgentCopilotSuggestedQuestionsStyles(theme);
 */
declare const ccfAgentCopilotSuggestedQuestionsStyles: (theme: Theme) => {
    root: {
        display: string;
        flexDirection: string;
        width: string;
        gap: string;
    };
    title: {
        fontWeight: import("csstype").Property.FontWeight | undefined;
        color: string;
        position: string;
        top: number;
        backgroundColor: string;
        zIndex: number;
    };
    list: {
        listStyle: string;
        margin: number;
        padding: number;
        display: string;
        flexDirection: string;
        gap: string;
    };
    questionBox: {
        display: string;
        justifyContent: string;
        alignItems: string;
        border: string;
        borderRadius: number;
        padding: string;
        backgroundColor: string;
        boxShadow: "none";
        gap: string;
    };
    question: {
        flex: number;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        lineHeight: number;
        color: string;
        wordBreak: string;
    };
    skipButton: {
        alignSelf: string;
        marginLeft: string;
        marginTop: number;
    };
    questionsContainer: {
        display: string;
        flexDirection: string;
        gap: string;
        flex: number;
        paddingRight: string;
    };
    returnLink: {
        ml: number;
        textDecoration: string;
        cursor: string;
        display: string;
        mt: number;
        color: string;
    };
};
export default ccfAgentCopilotSuggestedQuestionsStyles;
