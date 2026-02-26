import { Theme } from '@mui/material';
/**
 * Styling for rtigStyles
 * @returns rtigStyles CSS properties as a JSON object
 * @example rtigStyles()
 */
declare const rtigStyles: (theme: Theme) => {
    mainFlexContainer: {
        display: string;
        width: string;
        height: string;
    };
    mainFlexContainerMDView: {
        flexDirection: string;
        justifyContent: string;
    };
    contentSectionMDView: {
        width: string;
    };
    metricSection: {
        [x: string]: string | {
            height: string;
            width?: undefined;
            overflow?: undefined;
        } | {
            height: string;
            width: string;
            overflow: string;
        } | {
            width: string;
            overflow: string;
            height?: undefined;
        };
        padding: string;
        margin: string;
    };
    overallSentimentMetricSection: {};
    overallMetricContainer: {
        display: string;
        justifyContent: string;
        margin: string;
    };
    guidanceMetricsSection: {
        marginTop: string;
    };
    guidanceMetricsMainContainer: {
        maxHeight: string;
        width: string;
        flex: number;
    };
    guidanceMetricsFlexContainer: {
        display: string;
        flexFlow: string;
        justifyContent: string;
        '@media only screen and (min-width: 575px) and (max-width: 960px)': {
            justifyContent: string;
        };
        '@media only screen and (min-width: 575px) and (max-width: 1013px)': {
            paddingBottom: string;
        };
        '@media (max-width: 421px)': {
            justifyContent: string;
        };
    };
    guidanceMetricsGrid: {
        [x: string]: string | {
            width: string;
        };
        textWrap: string;
        padding: string;
        minWidth: string;
    };
    suggestionSummariesSectionAccordion: {
        '.Mui-expanded': {
            margin: string;
        };
        '.MuiCollapse-hidden': {
            marginTop: string;
        };
    };
    suggestionSummaryAccordion: {
        borderRadius: string;
        boxShadow: string;
        borderBottom: string;
    };
    suggestionSummariesSection: {
        [x: string]: string | {
            width: string;
            margin: string;
            padding: string;
            borderBottom: string;
            overflow: string;
        };
        width: string;
    };
    suggestionSummaryDetails: {
        padding: string;
    };
    suggestionsListContainer: {
        width: string;
        overflowY: string;
    };
    suggesttionListFlexBox: {
        display: string;
        flexDirection: string;
        justifyContent: string;
        gap: string;
    };
    noSuggestions: {
        textAlign: string;
        padding: string;
    };
    headingStyle: {
        [x: string]: string | number | {
            margin: string;
            padding: string;
        } | undefined;
        fontWeight: string;
        margin: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
    };
    dividerLine: {
        color: string;
    };
    rtigSuggestionDivider: {
        margin: string;
        borderRightWidth: string;
    };
    mdHeadingStyle: {
        margin: string;
    };
};
export default rtigStyles;
