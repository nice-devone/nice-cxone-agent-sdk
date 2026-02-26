/**
 * Styling for ccaiStyles
 * @returns ccaiStyles CSS properties as a JSON object
 * @example ccaiStyles(theme)
*/
const ccaiStyles = () => {
    const styles = {
        mainFlexContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1%',
            height: '100%',
        },
        kbArticlesListMainBoxFullView: {
            width: '100%',
            height: '100%',
            overflowY: 'auto',
        },
        kbArticlesListMainBoxPartialView: {
            width: '100%',
            height: '75%',
            overflowY: 'auto',
        },
        kbArticlesListFlexBox: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'flex-end',
        },
        smartReplyListContainer: {
            width: '100%',
            height: 'auto',
        },
        smViewSmartReplyListContainer: {
            width: '100%',
            height: 'auto',
            marginBottom: '2%',
        },
        noKbArticlesContainerFullView: {
            flex: 1,
            display: 'flex',
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        noKbArticlesContainerPartialView: {
            flex: 1,
            display: 'flex',
            height: '75%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
    return styles;
};
export default ccaiStyles;
//# sourceMappingURL=ccai.styles.js.map