/**
 * Styling for ccaiStyles
 * @returns ccaiStyles CSS properties as a JSON object
 * @example ccaiStyles(theme)
*/
declare const ccaiStyles: () => {
    mainFlexContainer: {
        flex: number;
        display: string;
        flexDirection: any;
        width: string;
        alignItems: string;
        justifyContent: string;
        gap: string;
        height: string;
    };
    kbArticlesListMainBoxFullView: {
        width: string;
        height: string;
        overflowY: string;
    };
    kbArticlesListMainBoxPartialView: {
        width: string;
        height: string;
        overflowY: any;
    };
    kbArticlesListFlexBox: {
        flex: number;
        display: string;
        flexDirection: any;
        justifyContent: string;
    };
    smartReplyListContainer: {
        width: string;
        height: string;
    };
    smViewSmartReplyListContainer: {
        width: string;
        height: string;
        marginBottom: string;
    };
    noKbArticlesContainerFullView: {
        flex: number;
        display: string;
        height: string;
        width: string;
        flexDirection: any;
        justifyContent: string;
        alignItems: string;
    };
    noKbArticlesContainerPartialView: {
        flex: number;
        display: string;
        height: string;
        width: string;
        flexDirection: any;
        justifyContent: string;
        alignItems: string;
    };
};
export default ccaiStyles;
