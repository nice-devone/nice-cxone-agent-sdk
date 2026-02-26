import { Theme } from '@mui/material';
/**
 * Styling for agentAssistContainerStyles
 * @returns agentAssistContainerStyles CSS properties as a JSON object
 * @example agentAssistContainerStyles(theme)
 */
export declare const agentAssistContainerStyles: (theme: Theme) => {
    mainContainer: {
        height: string;
        overflowY: string;
    };
    mainContainerMdView: {
        display: string;
        flexDirection: string;
    };
    tabsFlexBox: {
        maxHeight: string;
    };
    tabsPanelsContainer: {
        height: string;
        backgroundColor: string;
    };
    tabsPanels: {
        height: string;
    };
};
/**
 * Styling for tabPanelStyles
 * @returns tabPanelStyles CSS properties as a JSON object
 * @example tabPanelStyles(theme)
 */
declare const tabPanelStyles: (theme: Theme) => {
    mainContainer: {
        height: string;
    };
    boxContainer: {
        [x: string]: string | {
            height: string;
            margin: string;
            overflow?: undefined;
        } | {
            margin: string;
            height: string;
            overflow: string;
        };
        padding: string;
    };
    typographyContainer: {
        [x: string]: string | {
            margin: string;
        };
        height: string;
    };
};
export default tabPanelStyles;
