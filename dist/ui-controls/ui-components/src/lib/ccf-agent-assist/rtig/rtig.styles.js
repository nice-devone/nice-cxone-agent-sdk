/**
 * Styling for rtigStyles
 * @returns rtigStyles CSS properties as a JSON object
 * @example rtigStyles()
 */
const rtigStyles = (theme) => {
    const styles = {
        mainFlexContainer: {
            display: 'flex',
            width: '100%',
            height: '100%',
        },
        mainFlexContainerMDView: {
            flexDirection: 'column-reverse',
            // overflow: 'auto',
            justifyContent: 'flex-end',
        },
        contentSectionMDView: {
            width: '100%',
        },
        metricSection: {
            padding: '0 0 20px',
            margin: '20px 0',
            [theme.breakpoints.up('xl')]: {
                height: 'calc(100% - 53px)',
            },
            [theme.breakpoints.down('xl')]: {
                height: '100%',
            },
            [theme.breakpoints.down('md')]: {
                height: 'auto',
                width: '100%',
                overflow: 'visible',
            },
            [theme.breakpoints.up('md')]: {
                width: '40%',
                overflow: 'auto',
            },
        },
        overallSentimentMetricSection: {},
        overallMetricContainer: {
            display: 'flex',
            justifyContent: 'center',
            margin: '20px',
        },
        guidanceMetricsSection: {
            marginTop: '20px',
        },
        guidanceMetricsMainContainer: {
            maxHeight: '100%',
            width: '100%',
            flex: 1,
        },
        guidanceMetricsFlexContainer: {
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'left',
            '@media only screen and (min-width: 575px) and (max-width: 960px)': {
                justifyContent: 'center !important',
            },
            '@media only screen and (min-width: 575px) and (max-width: 1013px)': {
                paddingBottom: '20px !important',
            },
            '@media (max-width: 421px)': {
                justifyContent: 'center !important',
            },
        },
        guidanceMetricsGrid: {
            [theme.breakpoints.down('xl')]: {
                width: 'auto',
            },
            [theme.breakpoints.up('xl')]: {
                width: '33%',
            },
            textWrap: 'wrap',
            padding: '10px',
            minWidth: '33%',
        },
        suggestionSummariesSectionAccordion: {
            '.Mui-expanded': {
                margin: '0 !important',
            },
            '.MuiCollapse-hidden': {
                marginTop: '20px',
            },
        },
        suggestionSummaryAccordion: {
            borderRadius: '0 !important',
            boxShadow: 'none',
            borderBottom: '1px solid #D0D2D3',
        },
        suggestionSummariesSection: {
            width: '60%',
            [theme.breakpoints.down('md')]: {
                width: 'auto',
                margin: '20px 20px 0 20px',
                padding: '0 0 20px 0',
                borderBottom: '2px solid #D2D8DB',
                overflow: 'visible',
            },
            [theme.breakpoints.up('md')]: {
                width: '60%',
                margin: '20px 0 0 10px',
                padding: '0 20px 20px',
                borderBottom: '0px',
                overflow: 'auto',
            },
        },
        suggestionSummaryDetails: {
            padding: '0',
        },
        suggestionsListContainer: {
            width: '100%',
            overflowY: 'auto',
        },
        suggesttionListFlexBox: {
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'space-between',
            gap: '0px',
        },
        noSuggestions: {
            textAlign: 'left',
            padding: '10px 0 20px',
        },
        headingStyle: {
            fontWeight: '700',
            margin: '0 0 12px 0px',
            fontSize: theme.typography.h5.fontSize,
            [theme.breakpoints.down('md')]: {
                margin: '0',
                padding: '0',
            },
        },
        dividerLine: {
            color: '#D2D8DB',
        },
        rtigSuggestionDivider: {
            margin: '20px 5px',
            borderRightWidth: 'medium',
        },
        mdHeadingStyle: {
            margin: '20px',
        },
    };
    return styles;
};
export default rtigStyles;
//# sourceMappingURL=rtig.styles.js.map