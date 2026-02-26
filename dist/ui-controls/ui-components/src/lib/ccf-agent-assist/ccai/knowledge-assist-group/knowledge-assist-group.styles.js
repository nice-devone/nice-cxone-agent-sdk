/**
 * Styling for knowledgeAssistGroupStyles
 * @returns knowledgeAssistGroupStyles CSS properties as a JSON object
 * @example knowledgeAssistGroupStyles(theme)
*/
const knowledgeAssistGroupStyles = () => {
    const styles = {
        mainBox: {
            margin: '0.4rem 0.6rem 0 0',
        },
        accordianMain: {
            borderWidth: '0.1rem',
            borderRadius: '0.5rem',
        },
        accordianSummary: {
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        smViewAccordianSummary: {
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        },
        accordianSummaryHeight: {},
        accordianHeading: {
            fontWeight: '800',
            fontSize: '15px',
        },
        accordianTimeStamp: {
            fontSize: '12px',
        },
        kbArticlesContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
        },
    };
    return styles;
};
export default knowledgeAssistGroupStyles;
//# sourceMappingURL=knowledge-assist-group.styles.js.map