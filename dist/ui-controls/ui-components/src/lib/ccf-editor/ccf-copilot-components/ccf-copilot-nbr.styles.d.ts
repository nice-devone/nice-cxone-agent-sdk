import { Theme } from '@mui/material';
/**
 * Styling for ccf-agent-copilot-nbr
 * @returns ccf-copilot-nbr CSS properties as a JSON object
 * @example CcfCopilotNBRStyles(theme)
*/
declare const CcfCopilotNBRStyles: (theme: Theme) => {
    line: {
        margin: string;
        border: string;
    };
    responseDiv: {
        padding: string;
        border: string;
        borderRadius: string;
        borderColor: string;
        display: string;
        alignItems: string;
        width: string;
        columnGap: string;
        '&:hover': {
            backgroundColor: string;
            borderRadius: string;
        };
    };
    responseText: {
        fontSize: string;
        lineHeight: string;
        color: string | undefined;
        fontWeight: string;
    };
    responseIcons: {
        display: string;
        marginLeft: string;
        marginTop: string;
        columnGap: string;
    };
    icons: {
        '&:hover svg path': {
            fill: string;
        };
    };
    nbrHoverStyle: {
        borderRadius: string;
        '&:hover': {
            backgroundColor: string;
            borderRadius: string;
        };
        '&:hover p, &:hover span, &:hover div': {
            color: string;
        };
        '&:hover div': {
            backgroundColor: string;
        };
    };
    nullHover: {
        '&:hover': {
            background: string;
        };
        padding: string;
    };
    sparklesIcon: {
        display: string;
        marginLeft: string;
        flexDirection: string;
    };
    nbrSparkle: {
        display: string;
        marginLeft: string;
        marginTop: string;
        flexDirection: string;
        height: string;
        width: string;
    };
    timeStampTooltipArrow: {
        color: string;
    };
    timeStampTooltip: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
    };
};
export default CcfCopilotNBRStyles;
