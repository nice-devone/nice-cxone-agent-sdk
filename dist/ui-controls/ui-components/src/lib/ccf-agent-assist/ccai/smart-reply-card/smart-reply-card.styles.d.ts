import { Theme } from '@mui/material';
/**
 * Styling for smartReplyCardStyles
 * @returns smartReplyCardStyles CSS properties as a JSON object
 * @example smartReplyCardStyles(theme)
*/
declare const smartReplyCardStyles: (theme: Theme) => {
    mainContainer: {
        width: string;
        borderRadius: string;
    };
    paddingContainer: {
        width: string;
        padding: string;
    };
    mainFlexContainer: {
        flex: number;
        display: string;
        width: string;
        flexDirection: any;
        alignItems: string;
        justifyContent: string;
        gap: string;
    };
    articleTitleContainer: {
        width: string;
        marginLeft: string;
    };
    articleTitleText: {
        fontSize: number;
        fontWeight: number;
    };
    cardFooterFlexContainer: {
        width: string;
        flex: number;
        display: string;
        flexDirection: any;
        alignItems: string;
        justifyContent: string;
        gap: string;
    };
    confidenceFlexContainer: {
        width: string;
        flex: number;
        display: string;
        flexDirection: any;
        alignItems: string;
        justifyContent: string;
        gap: string;
    };
    numericIconContainer: {
        marginTop: string;
        width: string;
    };
    confidenceScore: {
        width: string;
    };
    copyButtonContainer: {
        width: string;
    };
    copyButton: {
        backgroundColor: string;
        color: string;
        borderColor: string;
    };
    tag: {
        fontSize: string;
        backgroundColor: string;
        color: string;
        padding: string;
        borderRadius: string;
        lineHeight: string;
    };
};
export default smartReplyCardStyles;
